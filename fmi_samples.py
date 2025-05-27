import pandas as pd
import numpy as np
from scipy.stats import mannwhitneyu
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
import matplotlib

# Use a non-interactive backend for matplotlib to ensure it runs in various environments
# especially if no display server is available (e.g., some remote execution environments)
# This should be set before any plotting commands.
try:
    matplotlib.use('Agg')
except ImportError:
    print("Matplotlib backend 'Agg' could not be set. Plots might not save correctly in all environments.")


# --- Helper Functions ---
def load_and_prepare_data(file_path, sheet_name=None):
    """Loads data, identifies seasons, and separates data."""
    try:
        if sheet_name: # For older pandas versions or specific excel cases
             df = pd.read_excel(file_path, sheet_name=sheet_name, engine='openpyxl')
        elif file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx'):
             df = pd.read_excel(file_path, engine='openpyxl') # Reads the first sheet by default
        else:
            print(f"Unsupported file format for {file_path}")
            return None, None, None, None

        # Assuming the first column contains sample IDs like 'IND_A_xxx' or 'IND_B_xxx'
        if df.empty:
            print(f"File {file_path} is empty.")
            return None, None, None, None

        sample_id_col = df.columns[0]
        df['Season'] = df[sample_id_col].apply(lambda x: 'Dry' if 'IND_A' in str(x) else ('Wet' if 'IND_B' in str(x) else 'Unknown'))

        # Set Sample ID as index
        df = df.set_index(sample_id_col)

        # Separate numeric data for analysis (excluding the 'Season' column temporarily)
        numeric_cols = df.select_dtypes(include=np.number).columns
        df_numeric = df[numeric_cols].copy()

        # Handle potential non-numeric placeholders if any (e.g. '<DL') by converting to NaN
        for col in numeric_cols:
            df_numeric[col] = pd.to_numeric(df_numeric[col], errors='coerce')

        # Re-attach Season column
        df_numeric['Season'] = df['Season']

        # Ensure we only proceed if there are numeric columns
        if df_numeric.drop(columns=['Season']).empty:
            print(f"No numeric data found in {file_path} after attempting conversion.")
            return None, None, None, None


        df_dry = df_numeric[df_numeric['Season'] == 'Dry'].drop(columns=['Season'])
        df_wet = df_numeric[df_numeric['Season'] == 'Wet'].drop(columns=['Season'])

        # Drop rows with all NaNs if any were created by coercion, for numeric parts
        df_dry = df_dry.dropna(axis=0, how='all')
        df_wet = df_wet.dropna(axis=0, how='all')

        # Return the full numeric dataset (without season column for PCA input)
        # and the season labels Series aligned with the full numeric dataset
        return df_numeric.drop(columns=['Season']), df_dry, df_wet, df_numeric['Season']
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        return None, None, None, None
    except Exception as e:
        print(f"An error occurred while loading {file_path}: {e}")
        return None, None, None, None

def calculate_descriptive_stats(df_dry, df_wet, data_type_name):
    """Calculates and prints descriptive statistics and Mann-Whitney U test results."""
    print(f"\n--- Descriptive Statistics and Seasonal Comparison for {data_type_name} ---")

    if df_dry is None or df_wet is None or df_dry.empty or df_wet.empty:
        print(f"Data for {data_type_name} is missing or empty for one or both seasons. Skipping stats.")
        return pd.DataFrame()

    stats_list = []
    # Ensure columns are matched between dry and wet, iterate over common columns
    common_columns = df_dry.columns.intersection(df_wet.columns)
    if not common_columns.any():
        print(f"No common columns found between dry and wet season data for {data_type_name}.")
        return pd.DataFrame()

    for col in common_columns:
        dry_data_col = df_dry[col].dropna()
        wet_data_col = df_wet[col].dropna()

        dry_mean = dry_data_col.mean()
        dry_median = dry_data_col.median()
        dry_std = dry_data_col.std()

        wet_mean = wet_data_col.mean()
        wet_median = wet_data_col.median()
        wet_std = wet_data_col.std()

        stat, p_value = float('nan'), float('nan')
        if len(dry_data_col) >= 3 and len(wet_data_col) >= 3 and \
           dry_data_col.nunique() > 1 and wet_data_col.nunique() > 1 :
            try:
                stat, p_value = mannwhitneyu(dry_data_col, wet_data_col, alternative='two-sided', nan_policy='omit')
            except ValueError as e:
                print(f"Could not perform Mann-Whitney U for {col}: {e}")

        stats_list.append({
            'Species': col,
            'Dry Mean (±SD)': f"{dry_mean:.3f} ± {dry_std:.3f}" if pd.notnull(dry_mean) and pd.notnull(dry_std) else "N/A",
            'Dry Median': f"{dry_median:.3f}" if pd.notnull(dry_median) else "N/A",
            'Wet Mean (±SD)': f"{wet_mean:.3f} ± {wet_std:.3f}" if pd.notnull(wet_mean) and pd.notnull(wet_std) else "N/A",
            'Wet Median': f"{wet_median:.3f}" if pd.notnull(wet_median) else "N/A",
            'P-value (M-W U)': f"{p_value:.4f}" if pd.notnull(p_value) else "N/A"
        })

    stats_df = pd.DataFrame(stats_list)
    print(f"\nTable: (Part {data_type_name}): Seasonal Summary Statistics")
    if not stats_df.empty:
        print(stats_df.to_string())
    else:
        print("No statistics generated.")
    return stats_df

def perform_pca(df_for_pca, data_type_name, season_labels_aligned=None, n_components=None):
    """Performs PCA and generates relevant plots.
    df_for_pca should be the numeric data for all samples.
    season_labels_aligned should be a Series of season labels, with an index matching df_for_pca.
    """
    print(f"\n--- PCA for {data_type_name} ---")

    if df_for_pca is None or df_for_pca.empty:
        print(f"Data for {data_type_name} PCA is missing or empty. Skipping.")
        return None, None

    # Drop columns that are all NaN (often from species not measured in any sample)
    df_cleaned = df_for_pca.dropna(axis=1, how='all')
    # Then, drop rows that have any NaN (samples with incomplete data for the remaining species)
    # This ensures the PCA matrix is complete.
    original_index_before_row_dropna = df_cleaned.index # Keep track for aligning season_labels
    df_cleaned = df_cleaned.dropna(axis=0, how='any')

    if df_cleaned.empty or df_cleaned.shape[1] == 0:
        print(f"Not enough valid data for PCA on {data_type_name} after cleaning NaNs (0 species or 0 samples left).")
        return None, None

    X = df_cleaned.values
    X_scaled = StandardScaler().fit_transform(X)

    if n_components is None:
        n_components_pca = min(X_scaled.shape[0], X_scaled.shape[1])
    else:
        n_components_pca = min(n_components, X_scaled.shape[0], X_scaled.shape[1])

    if n_components_pca == 0:
        print(f"Cannot perform PCA with 0 components for {data_type_name}.")
        return None, None

    pca = PCA(n_components=n_components_pca)
    principal_components = pca.fit_transform(X_scaled)

    explained_variance_ratio = pca.explained_variance_ratio_

    print(f"\nTable: PCA Explained Variance Ratio for {data_type_name}")
    for i, ratio in enumerate(explained_variance_ratio):
        print(f"PC{i+1}: {ratio:.4f} (Cumulative: {sum(explained_variance_ratio[:i+1]):.4f})")

    loadings = pca.components_.T * np.sqrt(pca.explained_variance_)
    loadings_df = pd.DataFrame(loadings, columns=[f'PC{i+1}' for i in range(n_components_pca)], index=df_cleaned.columns)
    print(f"\nTable: PCA Loadings for {data_type_name}")
    print(loadings_df.to_string())

    plt.figure(figsize=(8, 5))
    plt.plot(range(1, len(explained_variance_ratio) + 1), explained_variance_ratio, 'o-', linewidth=2)
    plt.title(f'Scree Plot for {data_type_name} PCA')
    plt.xlabel('Principal Component')
    plt.ylabel('Proportion of Variance Explained')
    plt.xticks(range(1, len(explained_variance_ratio) + 1))
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(f"{data_type_name.lower().replace(' ', '_')}_pca_scree_plot.png")
    # plt.show() # Avoid showing interactively if backend is 'Agg'
    plt.close() # Close the figure to free memory
    print(f"Saved {data_type_name.lower().replace(' ', '_')}_pca_scree_plot.png")

    if n_components_pca >= 2:
        plt.figure(figsize=(10, 10)) # Increased size for better label readability
        for i, var_name in enumerate(df_cleaned.columns):
            plt.arrow(0, 0, loadings_df.iloc[i, 0], loadings_df.iloc[i, 1],
                      head_width=0.03, head_length=0.03, fc='blue', ec='blue', alpha=0.7)
            plt.text(loadings_df.iloc[i, 0]*1.1, loadings_df.iloc[i, 1]*1.1, var_name, color='red', ha='center', va='center', fontsize=9)
        plt.xlim(-1.1, 1.1) # Adjusted limits slightly
        plt.ylim(-1.1, 1.1)
        plt.xlabel(f'PC1 Loadings ({explained_variance_ratio[0]*100:.1f}%)')
        plt.ylabel(f'PC2 Loadings ({explained_variance_ratio[1]*100:.1f}%)')
        plt.title(f'PCA Loading Plot (PC1 vs PC2) for {data_type_name}')
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.axhline(0, color='black', linewidth=0.5)
        plt.axvline(0, color='black', linewidth=0.5)
        plt.tight_layout()
        plt.savefig(f"{data_type_name.lower().replace(' ', '_')}_pca_loading_plot_pc1_pc2.png")
        # plt.show()
        plt.close()
        print(f"Saved {data_type_name.lower().replace(' ', '_')}_pca_loading_plot_pc1_pc2.png")

        # Align season_labels_aligned with the samples actually used in PCA (after df_cleaned.dropna(axis=0))
        if season_labels_aligned is not None and not season_labels_aligned.empty:
            aligned_labels_for_scores = season_labels_aligned.loc[df_cleaned.index]

            if not aligned_labels_for_scores.empty and principal_components.shape[0] == len(aligned_labels_for_scores):
                scores_df = pd.DataFrame(data=principal_components[:, :2], columns=['PC1', 'PC2'], index=df_cleaned.index)
                scores_df['Season'] = aligned_labels_for_scores.values

                plt.figure(figsize=(8, 6))
                colors = {'Dry': 'red', 'Wet': 'blue', 'Unknown': 'grey'}
                for season_val, color in colors.items(): # Renamed 'season' to 'season_val' to avoid conflict
                    subset = scores_df[scores_df['Season'] == season_val]
                    if not subset.empty:
                        plt.scatter(subset['PC1'], subset['PC2'], label=season_val, c=color, alpha=0.7, edgecolors='k', s=50)

                plt.xlabel(f'PC1 Scores ({explained_variance_ratio[0]*100:.1f}%)')
                plt.ylabel(f'PC2 Scores ({explained_variance_ratio[1]*100:.1f}%)')
                plt.title(f'PCA Score Plot (PC1 vs PC2) for {data_type_name}')
                plt.legend()
                plt.grid(True, linestyle='--', alpha=0.7)
                plt.axhline(0, color='black', linewidth=0.5)
                plt.axvline(0, color='black', linewidth=0.5)
                plt.tight_layout()
                plt.savefig(f"{data_type_name.lower().replace(' ', '_')}_pca_score_plot_pc1_pc2.png")
                # plt.show()
                plt.close()
                print(f"Saved {data_type_name.lower().replace(' ', '_')}_pca_score_plot_pc1_pc2.png")
            else:
                print("Season labels could not be aligned for score plot, or not enough PCs.")
        else:
            print("Season labels not available for score plot.")
    else:
        print("Not enough components (need at least 2) for PC1 vs PC2 loading/score plots.")

    return pca, loadings_df

def calculate_ionic_balance(df_ic_all_numeric, season_labels_all_ic):
    """Calculates and plots ionic balance.
       df_ic_all_numeric should be the numeric IC data for all samples.
       season_labels_all_ic should be a Series of season labels, with an index matching df_ic_all_numeric.
    """
    print("\n--- Ionic Balance Calculation ---")
    if df_ic_all_numeric is None or df_ic_all_numeric.empty:
        print("IC data is missing or empty. Skipping ionic balance.")
        return

    molar_masses = {
        'Na+': 22.990, 'NH4+': 18.039, 'K+': 39.098, 'Mg2+': 24.305, 'Ca2+': 40.078, 'SO42-': 96.06,
        'Cl-': 35.453, 'NO3-': 62.004,
        # Adding common forms if names differ slightly (case-insensitivity not handled here, exact match needed)
        'Na': 22.990, 'NH4': 18.039, 'K': 39.098, 'Mg': 24.305, 'Ca': 40.078, 'SO4': 96.06,
        'Cl': 35.453, 'NO3': 62.004
    }
    charges = {
        'Na+': 1, 'NH4+': 1, 'K+': 1, 'Mg2+': 2, 'Ca2+': 2, 'SO42-': -2, # SO42- is an anion but often listed with cations if total
        'Cl-': -1, 'NO3-': -1,
        'Na': 1, 'NH4': 1, 'K': 1, 'Mg': 2, 'Ca': 2, 'SO4': -2,
        'Cl': -1, 'NO3': -1
    }

    # Cations usually measured: Na+, NH4+, K+, Mg2+, Ca2+
    # Anions usually measured: Cl-, NO3-, SO42-
    # Use a copy for calculations
    df_ic_copy = df_ic_all_numeric.copy()

    # Standardize column names somewhat (e.g. look for 'Na' if 'Na+' not found)
    # This is a simple approach; more robust mapping might be needed if names vary a lot.
    ion_map = {
        'Na+': ['Na+', 'Na'], 'NH4+': ['NH4+', 'NH4'], 'K+': ['K+', 'K'],
        'Mg2+': ['Mg2+', 'Mg'], 'Ca2+': ['Ca2+', 'Ca'],
        'Cl-': ['Cl-', 'Cl'], 'NO3-': ['NO3-', 'NO3'], 'SO42-': ['SO42-', 'SO4']
    }

    # Find which ion name is present in the dataframe columns
    def get_ion_col(df_cols, ion_variants):
        for var in ion_variants:
            if var in df_cols:
                return var
        return None

    # Calculate ueq/m3
    for canonical_ion, variants in ion_map.items():
        actual_col_name = get_ion_col(df_ic_copy.columns, variants)
        if actual_col_name and actual_col_name in molar_masses and canonical_ion in charges:
            # Ensure data is numeric, coerce errors to NaN
            df_ic_copy[actual_col_name] = pd.to_numeric(df_ic_copy[actual_col_name], errors='coerce')
            df_ic_copy[canonical_ion + '_ueq'] = (df_ic_copy[actual_col_name] / molar_masses[actual_col_name]) * abs(charges[canonical_ion])
        elif actual_col_name:
             print(f"Warning: Ion {actual_col_name} (for {canonical_ion}) found but missing molar mass or charge info.")
        else:
             print(f"Warning: Ion {canonical_ion} (variants: {', '.join(variants)}) not found in IC data columns for ionic balance.")
             df_ic_copy[canonical_ion + '_ueq'] = 0 # Ensure column exists to prevent later errors

    cation_ueq_cols = [ion + '_ueq' for ion in ['Na+', 'NH4+', 'K+', 'Mg2+', 'Ca2+'] if ion + '_ueq' in df_ic_copy.columns]
    anion_ueq_cols = [ion + '_ueq' for ion in ['Cl-', 'NO3-', 'SO42-'] if ion + '_ueq' in df_ic_copy.columns]

    total_cations_ueq = df_ic_copy[cation_ueq_cols].sum(axis=1)
    total_anions_ueq = df_ic_copy[anion_ueq_cols].sum(axis=1)

    if total_cations_ueq.empty or total_anions_ueq.empty:
        print("Could not calculate cation or anion sums. Check ion names and data availability.")
        return

    print("\nIonic Balance Summary (first five rows with calculated ueq):")
    balance_summary_df = pd.DataFrame({'Total_Cations_ueq': total_cations_ueq, 'Total_Anions_ueq': total_anions_ueq})
    # Merge with original index if it got lost
    balance_summary_df.index = df_ic_all_numeric.index
    print(balance_summary_df.head().to_string())

    plt.figure(figsize=(8, 6))

    # Filter out NaN pairs for plotting and regression
    valid_balance_indices = total_anions_ueq.notna() & total_cations_ueq.notna()
    plot_anions = total_anions_ueq[valid_balance_indices]
    plot_cations = total_cations_ueq[valid_balance_indices]

    if season_labels_all_ic is not None and not season_labels_all_ic.empty:
        aligned_season_labels = season_labels_all_ic[valid_balance_indices]
        plot_df = pd.DataFrame({'Anions': plot_anions, 'Cations': plot_cations, 'Season': aligned_season_labels})
        colors = {'Dry': 'red', 'Wet': 'blue', 'Unknown': 'grey'}
        for season_val, color in colors.items():
            subset = plot_df[plot_df['Season'] == season_val]
            if not subset.empty:
                plt.scatter(subset['Anions'], subset['Cations'], label=season_val, c=color, alpha=0.7, edgecolors='k', s=50)
    else:
        plt.scatter(plot_anions, plot_cations, alpha=0.7, edgecolors='k', s=50)

    if not plot_anions.empty and not plot_cations.empty:
        max_val = max(plot_anions.max(), plot_cations.max()) if not (plot_anions.empty or plot_cations.empty) else 10
        min_val = min(plot_anions.min(), plot_cations.min()) if not (plot_anions.empty or plot_cations.empty) else 0
        if pd.isna(max_val) or max_val == float('-inf'): max_val = 10
        if pd.isna(min_val) or min_val == float('inf'): min_val = 0

        plt.plot([min_val, max_val], [min_val, max_val], 'k--', lw=2, label='1:1 Line')

        if len(plot_anions) > 1: # Need at least 2 points for regression
            slope, intercept = np.polyfit(plot_anions, plot_cations, 1)
            plt.plot(plot_anions, slope * plot_anions + intercept, 'g-', label=f'Fit: y={slope:.2f}x+{intercept:.2f}')
            print(f"Ionic Balance Regression: Cations = {slope:.2f} * Anions + {intercept:.2f}")
    else:
        print("Not enough valid data points to plot ionic balance or perform regression.")


    plt.xlabel('Total Anions (µeq/m³)')
    plt.ylabel('Total Cations (µeq/m³)')
    plt.title('Ionic Balance')
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig("ionic_balance_plot.png")
    # plt.show()
    plt.close()
    print("Saved ionic_balance_plot.png")

# --- Main Execution ---
xrf_file_path = "XRF_IC_Kemayoran - XRF.csv"
ic_file_path = "XRF_IC_Kemayoran - IC.csv"

print("Starting Data Analysis...")
print("NOTE: Ensure your CSV files have Sample IDs in the first column (e.g., 'IND_A_xxx').")
print("Column headers should start from the first row for elements/ions.")
print(f"Using Matplotlib backend: {matplotlib.get_backend()}")


# Load and Prepare XRF Data
print(f"\nProcessing XRF data from: {xrf_file_path}")
xrf_all_numeric, xrf_dry, xrf_wet, xrf_season_labels_all = load_and_prepare_data(xrf_file_path)

if xrf_all_numeric is not None and not xrf_all_numeric.empty:
    print("\nXRF Data - First 5 rows of numeric part (all seasons, used for PCA):")
    print(xrf_all_numeric.head().to_string())
    if xrf_dry is not None and not xrf_dry.empty:
        print("\nXRF Data Dry Season - First 5 rows (used for stats):")
        print(xrf_dry.head().to_string())
    if xrf_wet is not None and not xrf_wet.empty:
        print("\nXRF Data Wet Season - First 5 rows (used for stats):")
        print(xrf_wet.head().to_string())

    stats_xrf_df = calculate_descriptive_stats(xrf_dry, xrf_wet, "XRF Elements (Ratios)")
    if not stats_xrf_df.empty:
         stats_xrf_df.to_csv("xrf_seasonal_statistics.csv", index=False)
         print("Saved xrf_seasonal_statistics.csv")

    perform_pca(xrf_all_numeric, "XRF Elements", season_labels_aligned=xrf_season_labels_all)
else:
    print("Could not load or prepare XRF data sufficiently. Further XRF analysis skipped.")

# Load and Prepare IC Data
print(f"\nProcessing IC data from: {ic_file_path}")
ic_all_numeric, ic_dry, ic_wet, ic_season_labels_all = load_and_prepare_data(ic_file_path)

if ic_all_numeric is not None and not ic_all_numeric.empty:
    print("\nIC Data - First 5 rows of numeric part (all seasons, used for PCA & Ionic Balance):")
    print(ic_all_numeric.head().to_string())
    if ic_dry is not None and not ic_dry.empty:
        print("\nIC Data Dry Season - First 5 rows (used for stats):")
        print(ic_dry.head().to_string())
    if ic_wet is not None and not ic_wet.empty:
        print("\nIC Data Wet Season - First 5 rows (used for stats):")
        print(ic_wet.head().to_string())

    stats_ic_df = calculate_descriptive_stats(ic_dry, ic_wet, "IC Ions (µg/m³)")
    if not stats_ic_df.empty:
        stats_ic_df.to_csv("ic_seasonal_statistics.csv", index=False)
        print("Saved ic_seasonal_statistics.csv")

    calculate_ionic_balance(ic_all_numeric, ic_season_labels_all)
    perform_pca(ic_all_numeric, "IC Ions", season_labels_aligned=ic_season_labels_all)
else:
    print("Could not load or prepare IC data sufficiently. Further IC analysis skipped.")

print("\n--- Analysis Complete ---")
print("Please check the console output for tables and the saved .png files for plots.")
print("Descriptive statistics have also been saved to 'xrf_seasonal_statistics.csv' and 'ic_seasonal_statistics.csv'.")
