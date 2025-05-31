// Application data from the provided JSON
const appData = {
  "xrf_pca": {
    "PC": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    "Explained_Variance": [31.71, 19.83, 14.46, 8.22, 7.84, 6.22, 5.26, 2.20, 1.99, 1.29, 0.52, 0.43, 0.04],
    "Dominant_Loadings": [
      "S (0.93), Zn (-0.87), Cl (-0.85), Al (-0.67), Fe (-0.64), Na (-0.66)",
      "Ni (0.66), Mg (0.64), Na (0.43), Al (-0.49), Si (-0.60), Fe (-0.49), K (-0.59)",
      "Ca (0.68), Si (0.67), Mg (0.58), Ni (0.40)",
      "V (0.78), Pb (0.32)"
    ],
    "Interpretation": [
      "Secondary sulfate vs mixed anthropogenic metals",
      "Crustal dust vs industry-related Ni",
      "Road dust and construction",
      "Combustion source: residual fuel oil and traffic"
    ]
  },
  "xrf_seasonal": {
    "Element": ["S", "K", "Na", "Cl", "Al", "Ca", "Fe", "Zn", "Pb", "Ni", "Mg", "Si", "V"],
    "Dry_Mean": [54.36, 13.33, 7.42, 0.97, 1.58, 2.50, 3.53, 5.03, 1.75, 0.028, 0.822, 4.78, 0.024],
    "Wet_Mean": [30.56, 10.88, 13.96, 4.99, 2.17, 3.60, 4.34, 13.61, 5.54, 0.030, 0.685, 5.13, 0.029],
    "P_value": [0.0000, 0.0006, 0.0000, 0.0000, 0.005, 0.005, 0.005, 0.0000, 0.0000, 0.0453, 0.0021, 0.1005, 0.2645],
    "Season_Pattern": ["Dry > Wet", "Dry > Wet", "Wet > Dry", "Wet > Dry", "Wet > Dry", "Wet > Dry", "Wet > Dry", "Wet > Dry", "Wet > Dry", "Wet > Dry", "Dry > Wet", "No diff", "No diff"]
  },
  "ic_pca": {
    "PC": [1, 2, 3, 4, 5, 6, 7, 8, 9],
    "Explained_Variance": [43.10, 21.55, 16.72, 9.84, 6.32, 1.99, 0.29, 0.13, 0.07],
    "Dominant_Loadings": [
      "SO₄²⁻ (0.98), NH₄⁺ (0.96), K⁺ (0.63), Ca²⁺ (0.47), NO₃⁻ (0.25)",
      "Cl⁻ (0.88), Na⁺ (0.89), K⁺ (0.60)",
      "NO₃⁻ (0.90), NO₃⁻-N (0.87)",
      "Mg²⁺ (0.81), Ca²⁺ (0.43), Cl⁻ (-0.30), K⁺ (-0.31)"
    ],
    "Interpretation": [
      "Secondary inorganic aerosols (SIA)",
      "Sea salt influence and possible waste burning",
      "Nitrate aerosol formation",
      "Crustal/resuspended dust signal"
    ]
  },
  "ic_seasonal": {
    "Ion": ["SO₄²⁻", "NH₄⁺", "Cl⁻", "K⁺", "SO₄²⁻-S", "NH₄⁺-N", "Mg²⁺", "Ca²⁺", "Na⁺", "NO₃⁻"],
    "Dry_Mean": [7.60, 2.57, 0.03, 0.56, 2.54, 1.99, 0.033, 0.135, 0.319, 0.511],
    "Wet_Mean": [2.42, 0.57, 0.27, 0.32, 0.81, 0.44, 0.028, 0.084, 0.345, 0.385],
    "P_value": [0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0025, 0.0051, 0.0387, 0.6437],
    "Season_Pattern": ["Dry > Wet", "Dry > Wet", "Wet > Dry", "Dry > Wet", "Dry > Wet", "Dry > Wet", "Dry > Wet", "Dry > Wet", "Wet > Dry", "No diff"]
  },
  "ionic_balance": { 
    "slope": 1.15,
    "intercept": -0.01,
    "interpretation": "Slight excess of cations over anions on average"
  },
  "so4_no3_ratio": {
    "range_min": 4.8, 
    "range_max": 12,  
    "interpretation": "Dominance of sulfur-based secondary aerosol from SO2 emissions"
  },
  "nh4_neutralization": {
    "range_min": 0.34, 
    "range_max": 0.99,  
    "interpretation": "Under-neutralization indicates some sulfate exists as acidic species"
  },
  "nss_data": {
    "nss_SO4_contribution": ">95%",
    "example_total_SO4": 3.11,
    "example_nss_SO4": 3.07,
    "interpretation": "Anthropogenic SO2 origin dominates"
  },
  "methods_consistency": {
    "xrf_ic_sulfur_correlation": "Strong and direct correlation", // This text can be updated based on actual correlation
    "xrf_ic_potassium_correlation": "Consistent cross-method signal", // This text can be updated
    "crustal_elements_correlation": "Yes, especially in PC4 of IC PCA"
  },
  "loadings_data": {
    "xrf_pc1": {"S": 0.93, "Zn": -0.87, "Cl": -0.85, "Al": -0.67, "Fe": -0.64, "Na": -0.66},
    "xrf_pc2": {"Ni": 0.66, "Mg": 0.64, "Na": 0.43, "Al": -0.49, "Si": -0.60, "Fe": -0.49, "K": -0.59},
    "xrf_pc3": {"Ca": 0.68, "Si": 0.67, "Mg": 0.58, "Ni": 0.40},
    "xrf_pc4": {"V": 0.78, "Pb": 0.32},
    "ic_pc1": {"SO₄²⁻": 0.98, "NH₄⁺": 0.96, "K⁺": 0.63, "Ca²⁺": 0.47, "NO₃⁻": 0.25},
    "ic_pc2": {"Cl⁻": 0.88, "Na⁺": 0.89, "K⁺": 0.60},
    "ic_pc3": {"NO₃⁻": 0.90, "NO₃⁻-N": 0.87},
    "ic_pc4": {"Mg²⁺": 0.81, "Ca²⁺": 0.43, "Cl⁻": -0.30, "K⁺": -0.31}
  },
  "ic_kemayoran_data": { // For ratio histograms
    "so4_no3_ratios": [
        12.184, 11.042, 5.578, 4.811, 6.324, 7.222, 15.954, 5.611, 11.141, 3.538, 6.633, 8.926, 9.495, 12.619, 48.338, 
        23.953, 42.891, 59.722, 112.508, 73.435, 110.135, 53.864, 40.418, 36.442, 53.649, 106.000, 71.885, 55.877, 
        41.292, 58.756, 6.596, 7.361, 12.805, 12.229, 8.370, 10.958, 21.259, 14.678, 8.603, 16.621, 29.028, 53.415, 
        38.177, 21.581, 6.852, 15.497, 8.498, 6.417, 7.601, 6.288, 6.117, 6.699, 3.917, 6.764, 7.443, 4.389, 3.539, 
        9.257, 12.504, 4.932, 7.298, 6.141, 4.443, 3.532, 7.938, 6.075, 8.930, 14.525, 8.552, 7.272, 2.994, 6.282, 
        3.915, 11.648
    ],
    "nh4_neutralization_ratios": [
        0.2718619869, 0.2748025666, 0.2728747567, 0.2095283242, 0.2555823778, 0.23290938, 0.309178744, 0.2868975904, 
        0.2766906118, 0.2567365269, 0.2956188856, 0.2815302423, 0.2991704868, 0.3084039342, 0.3552801446, 0.3382716049, 
        0.3520916335, 0.3278438548, 0.3272674754, 0.3690863127, 0.3642498702, 0.3445094509, 0.3461695192, 0.3140286759, 
        0.3567733282, 0.3612790911, 0.3204230384, 0.3487068416, 0.355765733, 0.324220746, 0.1786242604, 0.286882716, 
        0.3107800773, 0.3100902379, 0.3311397234, 0.3390690872, 0.3380243572, 0.3273084479, 0.3107046679, 0.321098971, 
        0.3331365139, 0.3402289616, 0.2746781116, 0.3218903255, 0.2918393369, 0.2667205496, 0.2169351817, 0.1825842697, 
        0.1949500881, 0.2048192771, 0.2230997038, 0.1895459345, 0.1228968544, 0.1738443303, 0.2036363636, 0.1694247439, 
        0.1333333333, 0.2229535171, 0.23, 0.2170431211, 0.1678415576, 0.1778478163, 0.1406976744, 0.1496984746, 
        0.1966753829, 0.2221569204, 0.1565371025, 0.2749259625, 0.2626353791, 0.2588996764, 0.195535462, 0.1662951404, 
        0.2010997643, 0.2404752151
    ]
  },
// ****** YOU NEED TO POPULATE THIS SECTION ******
  // Data for Method Comparison from Method_Kemayoran.csv
  // Assumed column names: S_XRF, SO4_IC, K_XRF, K_IC
  "method_comparison_raw_data": [
    { "Sample": "IND_A_001", "S_XRF": 57.53, "SO4_IC": 3.107, "K_XRF": 14.65, "K_IC": 0.247 },
    { "Sample": "IND_A_002", "S_XRF": 52.92, "SO4_IC": 7.431, "K_XRF": 18.94, "K_IC": 0.872 },
    { "Sample": "IND_A_003", "S_XRF": 48.67, "SO4_IC": 5.227, "K_XRF": 18.98, "K_IC": 0.663 },
    { "Sample": "IND_A_004", "S_XRF": 34.99, "SO4_IC": 3.493, "K_XRF": 18.94, "K_IC": 0.619 },
    { "Sample": "IND_A_005", "S_XRF": 45.42, "SO4_IC": 5.723, "K_XRF": 14.11, "K_IC": 0.576 },
    { "Sample": "IND_A_006", "S_XRF": 37.95, "SO4_IC": 4.42, "K_XRF": 15.89, "K_IC": 0.594 },
    { "Sample": "IND_A_007", "S_XRF": 65.81, "SO4_IC": 8.376, "K_XRF": 9.37, "K_IC": 0.333 },
    { "Sample": "IND_A_008", "S_XRF": 56.97, "SO4_IC": 9.017, "K_XRF": 14.76, "K_IC": 0.765 },
    { "Sample": "IND_A_009", "S_XRF": 59.99, "SO4_IC": 7.409, "K_XRF": 10.6, "K_IC": 0.424 },
    { "Sample": "IND_A_010", "S_XRF": 34.38, "SO4_IC": 5.208, "K_XRF": 8.62, "K_IC": 0.381 },
    { "Sample": "IND_A_011", "S_XRF": 55.46, "SO4_IC": 4.086, "K_XRF": 8.78, "K_IC": 0.178 },
    { "Sample": "IND_A_012", "S_XRF": 50.96, "SO4_IC": 9.426, "K_XRF": 9.46, "K_IC": 0.532 },
    { "Sample": "IND_A_013", "S_XRF": 55.72, "SO4_IC": 8.289, "K_XRF": 13.95, "K_IC": 0.651 },
    { "Sample": "IND_A_014", "S_XRF": 55.65, "SO4_IC": 9.515, "K_XRF": 10.1, "K_IC": 0.517 },
    { "Sample": "IND_A_015", "S_XRF": 56.76, "SO4_IC": 7.589, "K_XRF": 13.8, "K_IC": 0.564 },
    { "Sample": "IND_A_016", "S_XRF": 45.66, "SO4_IC": 5.054, "K_XRF": 16.8, "K_IC": 0.661 },
    { "Sample": "IND_A_017", "S_XRF": 55.45, "SO4_IC": 7.849, "K_XRF": 14.67, "K_IC": 0.664 },
    { "Sample": "IND_A_018", "S_XRF": 56.59, "SO4_IC": 6.45, "K_XRF": 15.87, "K_IC": 0.567 },
    { "Sample": "IND_A_019", "S_XRF": 59.88, "SO4_IC": 6.863, "K_XRF": 12.46, "K_IC": 0.449 },
    { "Sample": "IND_A_020", "S_XRF": 59.2, "SO4_IC": 13.659, "K_XRF": 7.58, "K_IC": 0.589 },
    { "Sample": "IND_A_021", "S_XRF": 68.65, "SO4_IC": 11.454, "K_XRF": 8.42, "K_IC": 0.405 },
    { "Sample": "IND_A_022", "S_XRF": 60.18, "SO4_IC": 8.726, "K_XRF": 12.23, "K_IC": 0.537 },
    { "Sample": "IND_A_023", "S_XRF": 57.43, "SO4_IC": 9.579, "K_XRF": 15.73, "K_IC": 0.831 },
    { "Sample": "IND_A_024", "S_XRF": 49.39, "SO4_IC": 10.386, "K_XRF": 12.06, "K_IC": 0.788 },
    { "Sample": "IND_A_025", "S_XRF": 55.93, "SO4_IC": 10.247, "K_XRF": 12.8, "K_IC": 0.628 },
    { "Sample": "IND_A_026", "S_XRF": 59.54, "SO4_IC": 10.812, "K_XRF": 10.35, "K_IC": 0.499 },
    { "Sample": "IND_A_027", "S_XRF": 49.71, "SO4_IC": 6.901, "K_XRF": 10.13, "K_IC": 0.416 },
    { "Sample": "IND_A_028", "S_XRF": 59.18, "SO4_IC": 7.711, "K_XRF": 13.77, "K_IC": 0.528 },
    { "Sample": "IND_A_029", "S_XRF": 56.92, "SO4_IC": 8.052, "K_XRF": 14.55, "K_IC": 0.658 },
    { "Sample": "IND_A_030", "S_XRF": 52.25, "SO4_IC": 7.697, "K_XRF": 13.62, "K_IC": 0.641 },
    { "Sample": "IND_A_031", "S_XRF": 34.37, "SO4_IC": 4.696, "K_XRF": 16.41, "K_IC": 0.745 },
    { "Sample": "IND_A_032", "S_XRF": 49.2, "SO4_IC": 5.705, "K_XRF": 19.21, "K_IC": 0.743 },
    { "Sample": "IND_A_033", "S_XRF": 55.26, "SO4_IC": 8.157, "K_XRF": 13.13, "K_IC": 0.564 },
    { "Sample": "IND_A_034", "S_XRF": 54.66, "SO4_IC": 7.888, "K_XRF": 16.46, "K_IC": 0.732 },
    { "Sample": "IND_A_035", "S_XRF": 57.11, "SO4_IC": 9.366, "K_XRF": 12.09, "K_IC": 0.542 },
    { "Sample": "IND_A_036", "S_XRF": 63.67, "SO4_IC": 10.651, "K_XRF": 13.43, "K_IC": 0.61 },
    { "Sample": "IND_A_037", "S_XRF": 59.84, "SO4_IC": 10.587, "K_XRF": 13.64, "K_IC": 0.703 },
    { "Sample": "IND_A_038", "S_XRF": 64.18, "SO4_IC": 7.148, "K_XRF": 16.67, "K_IC": 0.553 },
    { "Sample": "IND_A_039", "S_XRF": 53.23, "SO4_IC": 7.984, "K_XRF": 16.54, "K_IC": 0.743 },
    { "Sample": "IND_A_042", "S_XRF": 60.02, "SO4_IC": 8.892, "K_XRF": 12.74, "K_IC": 0.62 },
    { "Sample": "IND_A_043", "S_XRF": 65.63, "SO4_IC": 8.186, "K_XRF": 13.01, "K_IC": 0.467 },
    { "Sample": "IND_A_044", "S_XRF": 64.86, "SO4_IC": 9.775, "K_XRF": 10.89, "K_IC": 0.451 },
    { "Sample": "IND_A_045", "S_XRF": 51.37, "SO4_IC": 4.314, "K_XRF": 16.62, "K_IC": 0.391 },
    { "Sample": "IND_A_046", "S_XRF": 57.51, "SO4_IC": 6.431, "K_XRF": 14.29, "K_IC": 0.461 },
    { "Sample": "IND_A_047", "S_XRF": 57.12, "SO4_IC": 5.475, "K_XRF": 13.49, "K_IC": 0.385 },
    { "Sample": "IND_A_048", "S_XRF": 47.66, "SO4_IC": 4.649, "K_XRF": 10.8, "K_IC": 0.343 },
    { "Sample": "IND_B_001", "S_XRF": 31.6, "SO4_IC": 2.388, "K_XRF": 12.05, "K_IC": 0.253 },
    { "Sample": "IND_B_002", "S_XRF": 21.45, "SO4_IC": 1.848, "K_XRF": 7.96, "K_IC": 0.2 },
    { "Sample": "IND_B_003", "S_XRF": 28.03, "SO4_IC": 1.505, "K_XRF": 10.71, "K_IC": 0.185 },
    { "Sample": "IND_B_004", "S_XRF": 34.91, "SO4_IC": 1.289, "K_XRF": 11.34, "K_IC": 0.138 },
    { "Sample": "IND_B_005", "S_XRF": 37.7, "SO4_IC": 2.612, "K_XRF": 13.4, "K_IC": 0.299 },
    { "Sample": "IND_B_006", "S_XRF": 26.99, "SO4_IC": 1.648, "K_XRF": 9.95, "K_IC": 0.189 },
    { "Sample": "IND_B_007", "S_XRF": 13.57, "SO4_IC": 1.089, "K_XRF": 10.62, "K_IC": 0.23 },
    { "Sample": "IND_B_008", "S_XRF": 20.14, "SO4_IC": 2.205, "K_XRF": 7.49, "K_IC": 0.246 },
    { "Sample": "IND_B_009", "S_XRF": 23.77, "SO4_IC": 1.697, "K_XRF": 8.96, "K_IC": 0.209 },
    { "Sample": "IND_B_010", "S_XRF": 20.22, "SO4_IC": 2.067, "K_XRF": 9.03, "K_IC": 0.27 },
    { "Sample": "IND_B_011", "S_XRF": 16.12, "SO4_IC": 1.497, "K_XRF": 9.77, "K_IC": 0.222 },
    { "Sample": "IND_B_012", "S_XRF": 41.2, "SO4_IC": 2.194, "K_XRF": 12.82, "K_IC": 0.233 },
    { "Sample": "IND_B_013", "S_XRF": 41.08, "SO4_IC": 3.426, "K_XRF": 16.16, "K_IC": 0.406 },
    { "Sample": "IND_B_014", "S_XRF": 32.15, "SO4_IC": 4.049, "K_XRF": 11.47, "K_IC": 0.409 },
    { "Sample": "IND_B_015", "S_XRF": 25.19, "SO4_IC": 2.62, "K_XRF": 11.61, "K_IC": 0.328 },
    { "Sample": "IND_B_016", "S_XRF": 26.83, "SO4_IC": 1.91, "K_XRF": 13.47, "K_IC": 0.274 },
    { "Sample": "IND_B_017", "S_XRF": 35.27, "SO4_IC": 2.808, "K_XRF": 10.05, "K_IC": 0.001 },
    { "Sample": "IND_B_018", "S_XRF": 35.02, "SO4_IC": 2.197, "K_XRF": 7.49, "K_IC": 0.138 },
    { "Sample": "IND_B_019", "S_XRF": 36.01, "SO4_IC": 4.755, "K_XRF": 10.02, "K_IC": 0.402 },
    { "Sample": "IND_B_020", "S_XRF": 24.77, "SO4_IC": 2.922, "K_XRF": 13.35, "K_IC": 1.717 },
    { "Sample": "IND_B_021", "S_XRF": 21.04, "SO4_IC": 2.545, "K_XRF": 11.12, "K_IC": 0.398 },
    { "Sample": "IND_B_022", "S_XRF": 45.53, "SO4_IC": 3.791, "K_XRF": 10.61, "K_IC": 0.403 },
    { "Sample": "IND_B_023", "S_XRF": 49.8, "SO4_IC": 2.976, "K_XRF": 7.5, "K_IC": 0.136 },
    { "Sample": "IND_B_024", "S_XRF": 37.71, "SO4_IC": 3.803, "K_XRF": 10.61, "K_IC": 0.401 },
    { "Sample": "IND_B_025", "S_XRF": 34.42, "SO4_IC": 2.653, "K_XRF": 17.5, "K_IC": 0.5 },
    { "Sample": "IND_B_026", "S_XRF": 22.31, "SO4_IC": 1.935, "K_XRF": 6.94, "K_IC": 0.195 },
    { "Sample": "IND_B_027", "S_XRF": 35.02, "SO4_IC": 1.014, "K_XRF": 11.38, "K_IC": 0.208 },
    { "Sample": "IND_B_028", "S_XRF": 37.68, "SO4_IC": 2.248, "K_XRF": 11.17, "K_IC": 0.226 }
  ]
  // ***************************************************
};

// Chart color palette
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart instances
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabNavigation();
    initializeCharts();
    initializeInteractiveElements();
    initializeExportFunctionality();
});

// Tab Navigation
function initializeTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Helper function to create histogram data (bins and frequencies)
function createHistogramData(data, numBins = 10) {
    if (!data || data.length === 0) return { labels: [], frequencies: [] };
    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    if (minVal === maxVal) { return { labels: [`${minVal.toFixed(2)}`], frequencies: [data.length]}; }
    const binSize = (maxVal - minVal) / numBins;
    const bins = Array(numBins).fill(0);
    const labels = [];
    for (let i = 0; i < numBins; i++) {
        const binStart = minVal + i * binSize;
        const binEnd = minVal + (i + 1) * binSize;
        labels.push(`${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`);
    }
    data.forEach(value => {
        let binIndex = Math.floor((value - minVal) / binSize);
        if (value === maxVal) { binIndex = numBins - 1; }
        if (binIndex >= 0 && binIndex < numBins) { bins[binIndex]++; }
    });
    return { labels, frequencies: bins };
}

// Initialize all charts
function initializeCharts() {
    createXRFVarianceChart();
    createXRFLoadingsChart();
    createICVarianceChart();
    createICLoadingsChart();
    createSeasonalChart();
    createIonicBalanceChart();
    createSO4NO3DistributionChart(); 
    createNH4NeutralizationDistributionChart(); 
    createNSSChart(); 
    createCorrelationCharts(); // This will now use actual data if populated
    populateInterpretations();
}

function createXRFVarianceChart() {
    const ctx = document.getElementById('xrfVarianceChart');
    if (!ctx) return;
    charts.xrfVariance = new Chart(ctx, {
        type: 'bar',
        data: { labels: appData.xrf_pca.PC.map(pc => `PC${pc}`), datasets: [{ label: 'Explained Variance (%)', data: appData.xrf_pca.Explained_Variance, backgroundColor: chartColors[0], borderColor: chartColors[0], borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'XRF Principal Component Analysis - Variance Explained', color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
                   scales: { y: { beginAtZero: true, title: { display: true, text: 'Explained Variance (%)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             x: { title: { display: true, text: 'Principal Component', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}
        }
    });
}

function createXRFLoadingsChart() {
    const ctx = document.getElementById('xrfLoadingsChart');
    if (!ctx) return;
    updateXRFLoadingsChart(1);
}

function updateXRFLoadingsChart(pcNumber) {
    const ctx = document.getElementById('xrfLoadingsChart');
    if (!ctx) return;
    const loadingsData = appData.loadings_data[`xrf_pc${pcNumber}`];
    const elements = Object.keys(loadingsData);
    const values = Object.values(loadingsData);
    if (charts.xrfLoadings) charts.xrfLoadings.destroy();
    charts.xrfLoadings = new Chart(ctx, {
        type: 'bar', data: { labels: elements, datasets: [{ label: `PC${pcNumber} Loadings`, data: values, backgroundColor: values.map(v => v >= 0 ? chartColors[0] : chartColors[2]), borderColor: values.map(v => v >= 0 ? chartColors[0] : chartColors[2]), borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: `XRF PC${pcNumber} Element Loadings`, color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
                   scales: { y: { title: { display: true, text: 'Loading Value', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             x: { title: { display: true, text: 'Elements', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}}
    });
}

function createICVarianceChart() {
    const ctx = document.getElementById('icVarianceChart');
    if (!ctx) return;
    charts.icVariance = new Chart(ctx, {
        type: 'bar', data: { labels: appData.ic_pca.PC.map(pc => `PC${pc}`), datasets: [{ label: 'Explained Variance (%)', data: appData.ic_pca.Explained_Variance, backgroundColor: chartColors[1], borderColor: chartColors[1], borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'IC Principal Component Analysis - Variance Explained', color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
                   scales: { y: { beginAtZero: true, title: { display: true, text: 'Explained Variance (%)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             x: { title: { display: true, text: 'Principal Component', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}}
    });
}

function createICLoadingsChart() {
    const ctx = document.getElementById('icLoadingsChart');
    if (!ctx) return;
    updateICLoadingsChart(1);
}

function updateICLoadingsChart(pcNumber) {
    const ctx = document.getElementById('icLoadingsChart');
    if (!ctx) return;
    const loadingsData = appData.loadings_data[`ic_pc${pcNumber}`];
    const ions = Object.keys(loadingsData);
    const values = Object.values(loadingsData);
    if (charts.icLoadings) charts.icLoadings.destroy();
    charts.icLoadings = new Chart(ctx, {
        type: 'bar', data: { labels: ions, datasets: [{ label: `PC${pcNumber} Loadings`, data: values, backgroundColor: values.map(v => v >= 0 ? chartColors[1] : chartColors[2]), borderColor: values.map(v => v >= 0 ? chartColors[1] : chartColors[2]), borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: `IC PC${pcNumber} Ion Loadings`, color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
                   scales: { y: { title: { display: true, text: 'Loading Value', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             x: { title: { display: true, text: 'Ions', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}}
    });
}

function createSeasonalChart() {
    const ctx = document.getElementById('seasonalChart');
    if (!ctx) return;
    updateSeasonalChart('xrf', 'absolute');
}

function updateSeasonalChart(method, displayMode) {
    const ctx = document.getElementById('seasonalChart');
    if (!ctx) return;
    let data, labels, pValues;
    if (method === 'xrf') { data = appData.xrf_seasonal; labels = data.Element.filter((_, i) => data.Dry_Mean[i] !== null && data.Wet_Mean[i] !== null); const validIndices = data.Element.map((_, i) => i).filter(i => data.Dry_Mean[i] !== null && data.Wet_Mean[i] !== null); const dryData = validIndices.map(i => data.Dry_Mean[i]); const wetData = validIndices.map(i => data.Wet_Mean[i]); pValues = validIndices.map(i => data.P_value[i]); createSeasonalChartData(ctx, labels, dryData, wetData, pValues, 'Element mass ratio', method, displayMode);
    } else { data = appData.ic_seasonal; labels = data.Ion; createSeasonalChartData(ctx, labels, data.Dry_Mean, data.Wet_Mean, data.P_value, 'Ions (μg/m³)', method, displayMode); }
}

function createSeasonalChartData(ctx, labels, dryData, wetData, pValues, yLabel, method, displayMode) {
    if (charts.seasonal) charts.seasonal.destroy();
    let chartData; let yAxisLabel = yLabel;
    if (displayMode === 'absolute') { chartData = { labels: labels, datasets: [ { label: 'Dry Season', data: dryData, backgroundColor: chartColors[0], borderColor: chartColors[0], borderWidth: 1 }, { label: 'Wet Season', data: wetData, backgroundColor: chartColors[4], borderColor: chartColors[4], borderWidth: 1 } ] };
    } else { const percentDiff = dryData.map((dry, i) => wetData[i] === 0 ? (dry === 0 ? 0 : Infinity) : ((dry - wetData[i]) / wetData[i]) * 100); yAxisLabel = 'Percentage Difference (%)'; chartData = { labels: labels, datasets: [{ label: 'Dry vs Wet Season (%)', data: percentDiff, backgroundColor: percentDiff.map((_, i) => pValues[i] < 0.05 ? chartColors[0] : chartColors[2]), borderColor: percentDiff.map((_, i) => pValues[i] < 0.05 ? chartColors[0] : chartColors[2]), borderWidth: 1 }] }; }
    charts.seasonal = new Chart(ctx, { type: 'bar', data: chartData, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: `${method.toUpperCase()} Seasonal Comparison - ${displayMode === 'absolute' ? 'Absolute Values' : 'Percentage Differences'}`, color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}, tooltip: { callbacks: { afterLabel: function(context) { const index = context.dataIndex; const pValue = pValues[index]; return `p-value: ${pValue.toFixed(4)} ${pValue < 0.05 ? '(Significant)' : '(Not Significant)'}`; }}}},
        scales: { y: { title: { display: true, text: yAxisLabel, color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}, x: { title: { display: true, text: method === 'xrf' ? 'Elements' : 'Ions', color: '#f5f5f5' }, ticks: { color: '#f5f5f5', maxRotation: 45 }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}} }});
}

function createIonicBalanceChart() {
    const ctx = document.getElementById('ionicBalanceChart'); 
    if (!ctx) return;
    const csvData = [
        { sample: "IND_A_001", cations: 0.066392, anions: 0.06883 }, { sample: "IND_A_002", cations: 0.171848, anions: 0.165711 },
        { sample: "IND_A_003", cations: 0.133099, anions: 0.12425 }, { sample: "IND_A_004", cations: 0.083618, anions: 0.089652 },
        { sample: "IND_A_005", cations: 0.13179, anions: 0.135556 }, { sample: "IND_A_006", cations: 0.102043, anions: 0.106917 },
        { sample: "IND_A_007", cations: 0.174198, anions: 0.182943 }, { sample: "IND_A_008", cations: 0.204683, anions: 0.214839 },
        { sample: "IND_A_009", cations: 0.161399, anions: 0.165067 }, { sample: "IND_A_010", cations: 0.126193, anions: 0.144189 },
        { sample: "IND_A_011", cations: 0.09157, anions: 0.095373 }, { sample: "IND_A_012", cations: 0.206316, anions: 0.214581 },
        { sample: "IND_A_013", cations: 0.191049, anions: 0.18697 }, { sample: "IND_A_014", cations: 0.213035, anions: 0.210943 },
        { sample: "IND_A_015", cations: 0.188929, anions: 0.160904 }, { sample: "IND_A_016", cations: 0.136281, anions: 0.109814 },
        { sample: "IND_A_017", cations: 0.195172, anions: 0.166906 }, { sample: "IND_A_018", cations: 0.155634, anions: 0.136484 },
        { sample: "IND_A_019", cations: 0.165473, anions: 0.143986 }, { sample: "IND_A_020", cations: 0.357689, anions: 0.288146 },
        { sample: "IND_A_021", cations: 0.264863, anions: 0.240464 }, { sample: "IND_A_022", cations: 0.20748, anions: 0.184573 },
        { sample: "IND_A_023", cations: 0.235509, anions: 0.203937 }, { sample: "IND_A_024", cations: 0.254444, anions: 0.22188 },
        { sample: "IND_A_025", cations: 0.241495, anions: 0.216793 }, { sample: "IND_A_026", cations: 0.246192, anions: 0.227036 },
        { sample: "IND_A_027", cations: 0.157769, anions: 0.145934 }, { sample: "IND_A_028", cations: 0.187499, anions: 0.162912 },
        { sample: "IND_A_029", cations: 0.202547, anions: 0.171072 }, { sample: "IND_A_030", cations: 0.189139, anions: 0.163467 },
        { sample: "IND_A_031", cations: 0.119118, anions: 0.109707 }, { sample: "IND_A_032", cations: 0.14265, anions: 0.131477 },
        { sample: "IND_A_033", cations: 0.194994, anions: 0.180246 }, { sample: "IND_A_034", cations: 0.192198, anions: 0.174718 },
        { sample: "IND_A_035", cations: 0.224968, anions: 0.213473 }, { sample: "IND_A_036", cations: 0.251517, anions: 0.237518 },
        { sample: "IND_A_037", cations: 0.24489, anions: 0.228541 }, { sample: "IND_A_038", cations: 0.168394, anions: 0.156734 },
        { sample: "IND_A_039", cations: 0.194587, anions: 0.181506 }, { sample: "IND_A_042", cations: 0.211665, anions: 0.194214 },
        { sample: "IND_A_043", cations: 0.188863, anions: 0.174983 }, { sample: "IND_A_044", cations: 0.22023, anions: 0.206555 },
        { sample: "IND_A_045", cations: 0.097843, anions: 0.09167 }, { sample: "IND_A_046", cations: 0.148652, anions: 0.13873 },
        { sample: "IND_A_047", cations: 0.129608, anions: 0.127019 }, { sample: "IND_A_048", cations: 0.10322, anions: 0.102394 },
        { sample: "IND_B_001", cations: 0.066156, anions: 0.055097 }, { sample: "IND_B_002", cations: 0.039056, anions: 0.049157 },
        { sample: "IND_B_003", cations: 0.032302, anions: 0.037405 }, { sample: "IND_B_004", cations: 0.029787, anions: 0.031385 },
        { sample: "IND_B_005", cations: 0.059961, anions: 0.062031 }, { sample: "IND_B_006", cations: 0.032709, anions: 0.0422 },
        { sample: "IND_B_007", cations: 0.024086, anions: 0.033503 }, { sample: "IND_B_008", cations: 0.048236, anions: 0.061885 },
        { sample: "IND_B_009", cations: 0.045286, anions: 0.04451 }, { sample: "IND_B_010", cations: 0.04262, anions: 0.062704 },
        { sample: "IND_B_011", cations: 0.035524, anions: 0.043801 }, { sample: "IND_B_012", cations: 0.051394, anions: 0.050094 },
        { sample: "IND_B_013", cations: 0.074119, anions: 0.07716 }, { sample: "IND_B_014", cations: 0.098027, anions: 0.105751 },
        { sample: "IND_B_015", cations: 0.060382, anions: 0.065952 }, { sample: "IND_B_016", cations: 0.050623, anions: 0.048562 },
        { sample: "IND_B_017", cations: 0.070807, anions: 0.071928 }, { sample: "IND_B_018", cations: 0.06545, anions: 0.060146 },
        { sample: "IND_B_019", cations: 0.108889, anions: 0.110946 }, { sample: "IND_B_020", cations: 0.18831, anions: 0.15705 },
        { sample: "IND_B_021", cations: 0.046452, anions: 0.066554 }, { sample: "IND_B_022", cations: 0.090777, anions: 0.087314 },
        { sample: "IND_B_023", cations: 0.064908, anions: 0.06842 }, { sample: "IND_B_024", cations: 0.09114, anions: 0.0943 },
        { sample: "IND_B_025", cations: 0.064681, anions: 0.071698 }, { sample: "IND_B_026", cations: 0.03736, anions: 0.051883 },
        { sample: "IND_B_027", cations: 0.035115, anions: 0.031071 }, { sample: "IND_B_028", cations: 0.051964, anions: 0.050199 }
    ];
    const chartPoints = csvData.map(d => ({ x: d.anions, y: d.cations })); const xValues = chartPoints.map(p => p.x); const minX = Math.min(...xValues); const maxX = Math.max(...xValues);
    if (charts.ionicBalance) charts.ionicBalance.destroy();
    charts.ionicBalance = new Chart(ctx, { type: 'scatter', data: { datasets: [{ label: 'Ionic Balance', data: chartPoints, backgroundColor: chartColors[0], borderColor: chartColors[0], pointRadius: 3 }, { label: 'Regression Line', data: [ {x: minX, y: appData.ionic_balance.slope * minX + appData.ionic_balance.intercept}, {x: maxX, y: appData.ionic_balance.slope * maxX + appData.ionic_balance.intercept} ], type: 'line', backgroundColor: chartColors[2], borderColor: chartColors[2], pointRadius: 0, fill: false }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Ionic Balance: Cations vs Anions', color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
                   scales: { x: { title: { display: true, text: 'Total Anion Equivalents (μeq/m³)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             y: { title: { display: true, text: 'Total Cation Equivalents (μeq/m³)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}}
    });
}

function createSO4NO3DistributionChart() {
    const ctx = document.getElementById('so4no3DistributionChart'); 
    if (!ctx) return;
    const data = appData.ic_kemayoran_data.so4_no3_ratios;
    const { labels, frequencies } = createHistogramData(data, 15); 
    if (charts.so4no3Distribution) charts.so4no3Distribution.destroy();
    charts.so4no3Distribution = new Chart(ctx, {
        type: 'bar', data: { labels: labels, datasets: [{ label: 'Frequency', data: frequencies, backgroundColor: chartColors[1], borderColor: chartColors[1], borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'SO₄²⁻/NO₃⁻ Ratio Distribution', color: '#f5f5f5' }, legend: { display: false }},
                   scales: { y: { beginAtZero: true, title: { display: true, text: 'Frequency', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             x: { title: { display: true, text: 'SO₄²⁻/NO₃⁻ Ratio Bins', color: '#f5f5f5' }, ticks: { color: '#f5f5f5', maxRotation: 270, autoSkip: true, maxTicksLimit: 15 }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}}
    });
}

function createNH4NeutralizationDistributionChart() {
    const ctx = document.getElementById('nh4NeutralizationDistributionChart'); 
    if (!ctx) return;
    const data = appData.ic_kemayoran_data.nh4_neutralization_ratios;
    const { labels, frequencies } = createHistogramData(data, 10); 
    if (charts.nh4NeutralizationDistribution) charts.nh4NeutralizationDistribution.destroy();
    charts.nh4NeutralizationDistribution = new Chart(ctx, {
        type: 'bar', data: { labels: labels, datasets: [{ label: 'Frequency', data: frequencies, backgroundColor: chartColors[0], borderColor: chartColors[0], borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'NH₄⁺ Neutralization Ratio Distribution', color: '#f5f5f5' }, legend: { display: false }},
                   scales: { y: { beginAtZero: true, title: { display: true, text: 'Frequency', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             x: { title: { display: true, text: 'NH₄⁺ Neutralization Ratio Bins', color: '#f5f5f5' }, ticks: { color: '#f5f5f5', maxRotation: 270, autoSkip: true, maxTicksLimit: 10 }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}}}
    });
}

function createNSSChart() {
    const ctx = document.getElementById('nssChart'); 
    if (!ctx) return;
    const nssContributionText = appData.nss_data.nss_SO4_contribution || ">0";
    const nssContribution = parseFloat(nssContributionText.replace('>', '').replace('%', ''));
    if (charts.nssChart) charts.nssChart.destroy();
    charts.nssChart = new Chart(ctx, {
        type: 'bar', data: { labels: ['nss-SO₄²⁻ Contribution'], datasets: [{ label: 'Contribution (%)', data: [nssContribution], backgroundColor: chartColors[3], borderColor: chartColors[3], borderWidth: 1, maxBarThickness: 10 }] },
        options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { title: { display: true, text: 'Non-Sea-Salt Sulfate (nss-SO₄²⁻) Contribution', color: '#f5f5f5' }, legend: { display: false }},
                   scales: { x: { beginAtZero: true, max: 100, title: { display: true, text: 'Contribution (%)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                             y: { ticks: { color: '#f5f5f5' }, grid: { display: false }}}}
    });
}

// --- MODIFIED CORRELATION CHARTS ---
function createCorrelationCharts() {
    createSulfurCorrelationChart();
    createPotassiumCorrelationChart();
}

function createSulfurCorrelationChart() {
    const ctx = document.getElementById('sulfurCorrelationChart');
    if (!ctx) return;

    let correlationData = [];
    if (appData.method_comparison_raw_data && appData.method_comparison_raw_data.length > 0) {
        correlationData = appData.method_comparison_raw_data.map(d => ({
            x: parseFloat(d.S_XRF), // Assuming column name is 'S_XRF'
            y: parseFloat(d.SO4_IC)  // Assuming column name is 'SO4_IC'
        })).filter(p => !isNaN(p.x) && !isNaN(p.y)); // Filter out any NaN pairs
    } else {
        // Fallback to sample data or empty if you prefer
        console.warn("Method comparison data for sulfur correlation not found or empty. Using sample data.");
        for (let i = 0; i < 20; i++) {
            const xrf = Math.random() * 50 + 10;
            const ic = xrf * 0.8 + Math.random() * 5; 
            correlationData.push({x: xrf, y: ic});
        }
    }
    
    if (charts.sulfurCorrelation) {
        charts.sulfurCorrelation.destroy();
    }
    charts.sulfurCorrelation = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'XRF S vs IC SO₄²⁻',
                data: correlationData,
                backgroundColor: chartColors[0],
                borderColor: chartColors[0],
                pointRadius: 5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'XRF Sulfur vs IC Sulfate', color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
            scales: {
                x: { title: { display: true, text: 'XRF Sulfur (mass ratio)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                y: { title: { display: true, text: 'IC Sulfate (μg/m³)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}
            }
        }
    });
}

function createPotassiumCorrelationChart() {
    const ctx = document.getElementById('potassiumCorrelationChart');
    if (!ctx) return;

    let correlationData = [];
    if (appData.method_comparison_raw_data && appData.method_comparison_raw_data.length > 0) {
        correlationData = appData.method_comparison_raw_data.map(d => ({
            x: parseFloat(d.K_XRF), // Assuming column name is 'K_XRF'
            y: parseFloat(d.K_IC)   // Assuming column name is 'K_IC'
        })).filter(p => !isNaN(p.x) && !isNaN(p.y)); // Filter out any NaN pairs
    } else {
        // Fallback to sample data or empty
        console.warn("Method comparison data for potassium correlation not found or empty. Using sample data.");
        for (let i = 0; i < 20; i++) {
            const xrf = Math.random() * 15 + 5;
            const ic = xrf * 0.7 + Math.random() * 2; 
            correlationData.push({x: xrf, y: ic});
        }
    }

    if (charts.potassiumCorrelation) {
        charts.potassiumCorrelation.destroy();
    }
    charts.potassiumCorrelation = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'XRF K vs IC K⁺',
                data: correlationData,
                backgroundColor: chartColors[1],
                borderColor: chartColors[1],
                pointRadius: 5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'XRF Potassium vs IC Potassium', color: '#f5f5f5' }, legend: { labels: { color: '#f5f5f5' }}},
            scales: {
                x: { title: { display: true, text: 'XRF Potassium (mass ratio)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }},
                y: { title: { display: true, text: 'IC Potassium (μg/m³)', color: '#f5f5f5' }, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }}
            }
        }
    });
}
// --- END OF MODIFIED CORRELATION CHARTS ---

function populateInterpretations() { populateXRFInterpretations(); populateICInterpretations(); }
function populateXRFInterpretations() {
    const container = document.getElementById('xrfInterpretations');
    if (!container) return;
    container.innerHTML = '';

    appData.xrf_pca.PC.forEach((pc, index) => {
        // Only process if pc is one of 1, 2, 3, or 4
        if (pc >= 1 && pc <= 4) {
            const div = document.createElement('div');
            // Make the item for PC1 active by default if it's being rendered
            div.className = `interpretation-item${pc === 1 ? ' active' : ''}`;
            div.dataset.pc = pc; // Use the actual pc value (1, 2, 3, or 4)
            // Ensure data exists at the current index to prevent errors if arrays are mismatched
            if (appData.xrf_pca.Explained_Variance[index] !== undefined &&
                appData.xrf_pca.Dominant_Loadings[index] !== undefined &&
                appData.xrf_pca.Interpretation[index] !== undefined) {
                div.innerHTML = `<h4>PC${pc} (${appData.xrf_pca.Explained_Variance[index]}%)</h4><p><strong>Dominant Loadings:</strong> ${appData.xrf_pca.Dominant_Loadings[index]}</p><p><strong>Interpretation:</strong> ${appData.xrf_pca.Interpretation[index]}</p>`;
                container.appendChild(div);
            }
        }
    });
}

function populateICInterpretations() {
    const container = document.getElementById('icInterpretations');
    if (!container) return;
    container.innerHTML = '';

    appData.ic_pca.PC.forEach((pc, index) => {
        // Only process if pc is one of 1, 2, 3, or 4
        if (pc >= 1 && pc <= 4) {
            const div = document.createElement('div');
            // Make the item for PC1 active by default if it's being rendered
            div.className = `interpretation-item${pc === 1 ? ' active' : ''}`;
            div.dataset.pc = pc; // Use the actual pc value (1, 2, 3, or 4)
            // Ensure data exists at the current index
            if (appData.ic_pca.Explained_Variance[index] !== undefined &&
                appData.ic_pca.Dominant_Loadings[index] !== undefined &&
                appData.ic_pca.Interpretation[index] !== undefined) {
                div.innerHTML = `<h4>PC${pc} (${appData.ic_pca.Explained_Variance[index]}%)</h4><p><strong>Dominant Loadings:</strong> ${appData.ic_pca.Dominant_Loadings[index]}</p><p><strong>Interpretation:</strong> ${appData.ic_pca.Interpretation[index]}</p>`;
                container.appendChild(div);
            }
        }
    });
}

// The main populateInterpretations function remains the same:
// function populateInterpretations() { populateXRFInterpretations(); populateICInterpretations(); }
function initializeInteractiveElements() { initializePCSelectors(); initializeSeasonalControls(); }
function initializePCSelectors() {
    const xrfPcBtns = document.querySelectorAll('.pc-btn'); xrfPcBtns.forEach(btn => { btn.addEventListener('click', function() { const pc = parseInt(this.dataset.pc); xrfPcBtns.forEach(b => b.classList.remove('active')); this.classList.add('active'); updateXRFLoadingsChart(pc); document.querySelectorAll('#xrfInterpretations .interpretation-item').forEach((item, index) => item.classList.toggle('active', index === pc - 1)); }); });
    const icPcBtns = document.querySelectorAll('.ic-pc-btn'); icPcBtns.forEach(btn => { btn.addEventListener('click', function() { const pc = parseInt(this.dataset.pc); icPcBtns.forEach(b => b.classList.remove('active')); this.classList.add('active'); updateICLoadingsChart(pc); document.querySelectorAll('#icInterpretations .interpretation-item').forEach((item, index) => item.classList.toggle('active', index === pc - 1)); }); });
}
function initializeSeasonalControls() {
    const methodBtns = document.querySelectorAll('.method-btn'); methodBtns.forEach(btn => { btn.addEventListener('click', function() { const method = this.dataset.method; methodBtns.forEach(b => b.classList.remove('active')); this.classList.add('active'); const displayMode = document.querySelector('.display-btn.active').dataset.display; updateSeasonalChart(method, displayMode); }); });
    const displayBtns = document.querySelectorAll('.display-btn'); displayBtns.forEach(btn => { btn.addEventListener('click', function() { const displayMode = this.dataset.display; displayBtns.forEach(b => b.classList.remove('active')); this.classList.add('active'); const method = document.querySelector('.method-btn.active').dataset.method; updateSeasonalChart(method, displayMode); }); });
}

function initializeExportFunctionality() {
    const exportBtn = document.getElementById('exportBtn'); if (exportBtn) { exportBtn.addEventListener('click', function() { const activeTab = document.querySelector('.nav-tab.active').dataset.tab; exportTabData(activeTab); }); }
}
function exportTabData(tabName) {
    let exportData = {};
    switch(tabName) {
        case 'overview': exportData = { summary: 'PM2.5 Chemical Composition Analysis Overview', statistics: { xrf_variance_total: '74.54%', ic_variance_total: '91.21%', ionic_balance_slope: appData.ionic_balance.slope }}; 
            break;
        case 'xrf-analysis': exportData = appData.xrf_pca; break;
        case 'ic-analysis': exportData = appData.ic_pca; break;
        case 'seasonal': exportData = { xrf_seasonal: appData.xrf_seasonal, ic_seasonal: appData.ic_seasonal }; break;
        case 'ratios': 
            exportData = {
                ionic_balance_params: appData.ionic_balance, 
                so4_no3_ratios_all: appData.ic_kemayoran_data.so4_no3_ratios,
                nh4_neutralization_ratios_all: appData.ic_kemayoran_data.nh4_neutralization_ratios,
                nss_data: appData.nss_data
            };
            break;
        case 'methods': // Include actual correlation data if populated
            exportData = { 
                ...appData.methods_consistency,
                sulfur_correlation_points: (appData.method_comparison_raw_data && appData.method_comparison_raw_data.length > 0) ? appData.method_comparison_raw_data.map(d => ({ xrf_S: d.S_XRF, ic_SO4: d.SO4_IC })).filter(p=>!isNaN(p.xrf_S) && !isNaN(p.ic_SO4)) : "No data",
                potassium_correlation_points: (appData.method_comparison_raw_data && appData.method_comparison_raw_data.length > 0) ? appData.method_comparison_raw_data.map(d => ({ xrf_K: d.K_XRF, ic_K: d.K_IC })).filter(p=>!isNaN(p.xrf_K) && !isNaN(p.ic_K)) : "No data"
            };
            break;
        default: exportData = appData;
    }
    const dataStr = JSON.stringify(exportData, null, 2); const dataBlob = new Blob([dataStr], {type: 'application/json'}); const url = URL.createObjectURL(dataBlob); const link = document.createElement('a'); link.href = url; link.download = `pm25_analysis_${tabName}_${new Date().toISOString().split('T')[0]}.json`; document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(url);
    const exportBtn = document.getElementById('exportBtn'); if (exportBtn) { const originalText = exportBtn.textContent; exportBtn.textContent = 'Exported!'; exportBtn.classList.add('status--success'); setTimeout(() => { exportBtn.textContent = originalText; exportBtn.classList.remove('status--success'); }, 2000); }
}
