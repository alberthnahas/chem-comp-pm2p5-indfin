# Chemical Component Analysis of PM₂.₅ during INDFIN Campaign

## Project Overview

This project focuses on the chemical component analysis of PM₂.₅ (Particulate Matter with a diameter of 2.5 micrometers or less) samples collected during the INDFIN campaign. The analysis includes descriptive statistics, seasonal comparisons (Dry vs. Wet seasons), and Principal Component Analysis (PCA) for both X-Ray Fluorescence (XRF) and Ion Chromatography (IC) data. Additionally, ionic balance calculations are performed using the IC data.

The primary goal is to identify and characterize the chemical composition of PM₂.₅ and explore seasonal variations and potential sources of pollutants.

## Repository Structure
```
chem-comp-pm2p5-indfin/
├── jupyter/
│   └── PCA_ChemComp_Analysis.ipynb  # Jupyter notebook with the main analysis workflow
├── README.md                    # This README file
├── code/
│   └── process.py           # Python script with helper functions for data loading, preparation, statistical analysis, and PCA
├── data/
│   ├── XRF_IC_Kemayoran - IC.csv    # Input data: Ion Chromatography results
│   └── XRF_IC_Kemayoran - XRF.csv   # Input data: X-Ray Fluorescence results
├── doc/
│   └── ChemComp_Analysis.pdf        # PDF document detailing the analysis
└── results/
├── ic_seasonal_statistics.csv   # Output: Seasonal statistics for IC data
├── xrf_seasonal_statistics.csv  # Output: Seasonal statistics for XRF data
├── ionic_balance_plot.png       # Output: Plot of ionic balance
├── ic_ions_pca_scree_plot.png   # Output: Scree plot for IC PCA
├── ic_ions_pca_loading_plot_pc1_pc2.png # Output: PCA loading plot for IC data (PC1 vs PC2)
├── ic_ions_pca_score_plot_pc1_pc2.png   # Output: PCA score plot for IC data (PC1 vs PC2)
├── xrf_elements_pca_scree_plot.png # Output: Scree plot for XRF PCA
├── xrf_elements_pca_loading_plot_pc1_pc2.png # Output: PCA loading plot for XRF data (PC1 vs PC2)
└── xrf_elements_pca_score_plot_pc1_pc2.png  # Output: PCA score plot for XRF data (PC1 vs PC2)
```
## Data

The analysis utilizes two main data files located in the `data/` directory:

* **`XRF_IC_Kemayoran - XRF.csv`**: Contains elemental concentration data obtained from X-Ray Fluorescence analysis. Columns include sample IDs and concentrations of various elements (e.g., Na, Mg, Al, Si, S, Cl, K, Ca, V, Fe, Ni, Zn, Pb).
* **`XRF_IC_Kemayoran - IC.csv`**: Contains ionic concentration data obtained from Ion Chromatography. Columns include sample IDs and concentrations of various ions (e.g., Cl, NO3-N, NO3, SO4-S, SO4, Na, NH4-N, NH4, K, Mg, Ca).

Sample IDs in both files are used to distinguish between Dry season (e.g., 'IND_A_xxx') and Wet season (e.g., 'IND_B_xxx') samples.

## Analysis

The core analysis is performed in the `jupyter/PCA_ChemComp_Analysis.ipynb` Jupyter notebook, which utilizes helper functions defined in `code/process.py`. The analysis steps include:

1.  **Data Loading and Preparation**:
    * Loading XRF and IC data from CSV files.
    * Identifying sample seasons (Dry/Wet) based on Sample IDs.
    * Separating numeric data for analysis.
    * Handling non-numeric placeholders and missing values.

2.  **Descriptive Statistics and Seasonal Comparison**:
    * Calculating descriptive statistics (mean, median, standard deviation) for each element/ion for both Dry and Wet seasons.
    * Performing Mann-Whitney U tests to compare seasonal differences.
    * Saving seasonal statistics to CSV files (`xrf_seasonal_statistics.csv`, `ic_seasonal_statistics.csv`).

3.  **Ionic Balance Calculation (for IC data)**:
    * Calculating the microequivalents (µeq/m³) for major cations (Na+, NH4+, K+, Mg2+, Ca2+) and anions (Cl-, NO3-, SO42-).
    * Plotting total cations vs. total anions to assess ionic balance.
    * Performing a linear regression on the ionic balance.
    * Saving the ionic balance plot (`ionic_balance_plot.png`).

4.  **Principal Component Analysis (PCA)**:
    * Performed separately for XRF elements and IC ions.
    * Data is scaled using StandardScaler before PCA.
    * Calculation of explained variance ratio for each principal component.
    * Calculation of PCA loadings.
    * Generation and saving of:
        * Scree plots (`xrf_elements_pca_scree_plot.png`, `ic_ions_pca_scree_plot.png`).
        * Loading plots for PC1 vs PC2 (`xrf_elements_pca_loading_plot_pc1_pc2.png`, `ic_ions_pca_loading_plot_pc1_pc2.png`).
        * Score plots for PC1 vs PC2, colored by season (`xrf_elements_pca_score_plot_pc1_pc2.png`, `ic_ions_pca_score_plot_pc1_pc2.png`).

The `doc/ChemComp_Analysis.pdf` file provides a preliminary analysis report including PCA interpretations and seasonal chemistry highlights.

## Results

The main outputs of this analysis are:

* **Seasonal Statistics Tables**:
    * `xrf_seasonal_statistics.csv`: Shows mean, median, standard deviation, and p-values from Mann-Whitney U tests for XRF elemental concentrations (the README previously stated ratios, but the PDF and common practice suggest concentrations or mass fractions, which are akin to ratios against total mass if not explicitly stated as elemental ratios against a specific element), comparing Dry and Wet seasons.
    * `ic_seasonal_statistics.csv`: Shows mean, median, standard deviation, and p-values from Mann-Whitney U tests for IC ion concentrations (in µg/m³), comparing Dry and Wet seasons.
* **PCA Results**:
    * Explained variance ratios and loadings for XRF elements and IC ions, indicating the contribution of different chemical species to the principal components. These are detailed in the Jupyter Notebook output and the `doc/ChemComp_Analysis.pdf`.
* **Plots**:
    * Visualizations of ionic balance, PCA scree plots, loading plots, and score plots, providing insights into the data structure, dominant chemical profiles, and seasonal differences. These are saved in the `results/` directory.

Key findings can be inferred from the seasonal statistics tables (e.g., significantly different concentrations of certain species between seasons) and PCA plots (e.g., grouping of samples by season, identification of elements/ions that co-vary). The PDF report also details interpretations, such as secondary sulfate formation in the dry season and sea salt influence in the wet season.

## How to Run

1.  **Prerequisites**:
    * Python 3
    * Jupyter Notebook or JupyterLab
    * Required Python libraries (see `Dependencies` section).
2.  **Setup**:
    * Clone this repository.
    * Ensure the data files (`XRF_IC_Kemayoran - XRF.csv` and `XRF_IC_Kemayoran - IC.csv`) are present in the `data/` directory.
3.  **Execution**:
    * Open and run the `jupyter/PCA_ChemComp_Analysis.ipynb` notebook.
    * Alternatively, the Python script `code/process.py` contains the functions used in the notebook and could potentially be run if adapted into a main executable script, though the primary interface appears to be the notebook.

The notebook will generate output tables in the console and save plots and CSV files to the `results/` directory.

## Dependencies

Based on the import statements in the `jupyter/PCA_ChemComp_Analysis.ipynb` notebook and `code/process.py` script, the following Python libraries are required:

* pandas
* numpy
* scipy (specifically `scipy.stats.mannwhitneyu`)
* scikit-learn (specifically `sklearn.preprocessing.StandardScaler` and `sklearn.decomposition.PCA`)
* matplotlib
* openpyxl (though CSV files are used as primary input in the notebook, `load_and_prepare_data` function in `process.py` has .xlsx handling capabilities)

These can typically be installed using pip:
```bash
pip install pandas numpy scipy scikit-learn matplotlib openpyxl
