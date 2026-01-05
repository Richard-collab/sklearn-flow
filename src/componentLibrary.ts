// src/componentLibrary.ts
import type { SklearnComponent } from './types';

export const COMPONENT_LIBRARY: SklearnComponent[] = [
    // --- Preprocessing & Scaling ---
    {
        id: 'standard_scaler',
        name: 'Standard Scaler',
        module: 'sklearn.preprocessing',
        className: 'StandardScaler',
        type: 'transformer',
        category: 'Preprocessing',
        params: [
            {
                name: 'with_mean',
                label: 'With Mean',
                type: 'boolean',
                defaultValue: true,
                helperText: 'If True, center the data before scaling.'
            },
            {
                name: 'with_std',
                label: 'With Std',
                type: 'boolean',
                defaultValue: true,
                helperText: 'If True, scale the data to unit variance.'
            }
        ]
    },
    {
        id: 'min_max_scaler',
        name: 'MinMax Scaler',
        module: 'sklearn.preprocessing',
        className: 'MinMaxScaler',
        type: 'transformer',
        category: 'Preprocessing',
        params: [
            {
                name: 'feature_range_min',
                label: 'Feature Range (Min)',
                type: 'number',
                defaultValue: 0,
            },
             {
                name: 'feature_range_max',
                label: 'Feature Range (Max)',
                type: 'number',
                defaultValue: 1,
            }
        ]
    },
    {
        id: 'robust_scaler',
        name: 'Robust Scaler',
        module: 'sklearn.preprocessing',
        className: 'RobustScaler',
        type: 'transformer',
        category: 'Preprocessing',
        params: [
            {
                name: 'with_centering',
                label: 'With Centering',
                type: 'boolean',
                defaultValue: true,
            },
            {
                name: 'with_scaling',
                label: 'With Scaling',
                type: 'boolean',
                defaultValue: true,
            }
        ]
    },
    {
        id: 'max_abs_scaler',
        name: 'MaxAbs Scaler',
        module: 'sklearn.preprocessing',
        className: 'MaxAbsScaler',
        type: 'transformer',
        category: 'Preprocessing',
        params: []
    },
    // --- Encoding ---
    {
        id: 'one_hot_encoder',
        name: 'One Hot Encoder',
        module: 'sklearn.preprocessing',
        className: 'OneHotEncoder',
        type: 'transformer',
        category: 'Encoding',
        params: [
            {
                name: 'drop',
                label: 'Drop',
                type: 'select',
                options: ['None', 'first', 'if_binary'],
                defaultValue: 'None'
            },
            {
                name: 'sparse_output',
                label: 'Sparse Output',
                type: 'boolean',
                defaultValue: true
            },
            {
                name: 'handle_unknown',
                label: 'Handle Unknown',
                type: 'select',
                options: ['error', 'ignore'],
                defaultValue: 'error'
            }
        ]
    },
    {
        id: 'ordinal_encoder',
        name: 'Ordinal Encoder',
        module: 'sklearn.preprocessing',
        className: 'OrdinalEncoder',
        type: 'transformer',
        category: 'Encoding',
        params: [
            {
                 name: 'handle_unknown',
                label: 'Handle Unknown',
                type: 'select',
                options: ['error', 'use_encoded_value'],
                defaultValue: 'error'
            }
        ]
    },
    // --- Imputation ---
    {
        id: 'simple_imputer',
        name: 'Simple Imputer',
        module: 'sklearn.impute',
        className: 'SimpleImputer',
        type: 'transformer',
        category: 'Imputation',
        params: [
            {
                name: 'strategy',
                label: 'Strategy',
                type: 'select',
                options: ['mean', 'median', 'most_frequent', 'constant'],
                defaultValue: 'mean'
            },
            {
                name: 'fill_value',
                label: 'Fill Value (if constant)',
                type: 'text',
                defaultValue: '',
                helperText: 'Only used when strategy="constant"'
            }
        ]
    },
    // --- Dimensionality Reduction ---
    {
        id: 'pca',
        name: 'PCA',
        module: 'sklearn.decomposition',
        className: 'PCA',
        type: 'transformer',
        category: 'Dimensionality Reduction',
        params: [
            {
                name: 'n_components',
                label: 'N Components',
                type: 'number',
                defaultValue: 2,
                helperText: 'Number of components to keep.'
            },
            {
                name: 'whiten',
                label: 'Whiten',
                type: 'boolean',
                defaultValue: false,
                helperText: 'When True, the components_ vectors are multiplied by the square root of n_samples and then divided by the singular values.'
            }
        ]
    },
    {
        id: 'truncated_svd',
        name: 'Truncated SVD',
        module: 'sklearn.decomposition',
        className: 'TruncatedSVD',
        type: 'transformer',
        category: 'Dimensionality Reduction',
        params: [
            {
                name: 'n_components',
                label: 'N Components',
                type: 'number',
                defaultValue: 2,
            },
             {
                name: 'algorithm',
                label: 'Algorithm',
                type: 'select',
                options: ['arpack', 'randomized'],
                defaultValue: 'randomized'
            }
        ]
    },
    // --- Feature Selection ---
    {
        id: 'select_k_best',
        name: 'Select K Best',
        module: 'sklearn.feature_selection',
        className: 'SelectKBest',
        type: 'transformer',
        category: 'Feature Selection',
        params: [
             {
                name: 'k',
                label: 'k',
                type: 'number',
                defaultValue: 10,
            }
        ]
    },
    {
        id: 'variance_threshold',
        name: 'Variance Threshold',
        module: 'sklearn.feature_selection',
        className: 'VarianceThreshold',
        type: 'transformer',
        category: 'Feature Selection',
        params: [
             {
                name: 'threshold',
                label: 'Threshold',
                type: 'number',
                defaultValue: 0.0,
            }
        ]
    },
    // --- Regression ---
    {
        id: 'linear_regression',
        name: 'Linear Regression',
        module: 'sklearn.linear_model',
        className: 'LinearRegression',
        type: 'estimator',
        category: 'Regression',
        params: [
            {
                name: 'fit_intercept',
                label: 'Fit Intercept',
                type: 'boolean',
                defaultValue: true,
            }
        ]
    },
    {
        id: 'ridge',
        name: 'Ridge',
        module: 'sklearn.linear_model',
        className: 'Ridge',
        type: 'estimator',
        category: 'Regression',
        params: [
            {
                name: 'alpha',
                label: 'Alpha',
                type: 'number',
                defaultValue: 1.0,
            },
             {
                name: 'solver',
                label: 'Solver',
                type: 'select',
                options: ['auto', 'svd', 'cholesky', 'lsqr', 'sparse_cg', 'sag', 'saga'],
                defaultValue: 'auto'
            }
        ]
    },
    {
        id: 'lasso',
        name: 'Lasso',
        module: 'sklearn.linear_model',
        className: 'Lasso',
        type: 'estimator',
        category: 'Regression',
        params: [
            {
                name: 'alpha',
                label: 'Alpha',
                type: 'number',
                defaultValue: 1.0,
            }
        ]
    },
    {
        id: 'svr',
        name: 'SVR',
        module: 'sklearn.svm',
        className: 'SVR',
        type: 'estimator',
        category: 'Regression',
        params: [
             {
                name: 'kernel',
                label: 'Kernel',
                type: 'select',
                options: ['linear', 'poly', 'rbf', 'sigmoid', 'precomputed'],
                defaultValue: 'rbf'
            },
            {
                name: 'C',
                label: 'C',
                type: 'number',
                defaultValue: 1.0,
            },
             {
                name: 'epsilon',
                label: 'Epsilon',
                type: 'number',
                defaultValue: 0.1,
            }
        ]
    },
    {
        id: 'random_forest_regressor',
        name: 'Random Forest Regressor',
        module: 'sklearn.ensemble',
        className: 'RandomForestRegressor',
        type: 'estimator',
        category: 'Regression',
        params: [
            {
                name: 'n_estimators',
                label: 'N Estimators',
                type: 'number',
                defaultValue: 100,
            },
            {
                name: 'max_depth',
                label: 'Max Depth',
                type: 'number',
                defaultValue: 0,
            }
        ]
    },
    // --- Classifiers ---
    {
        id: 'logistic_regression',
        name: 'Logistic Regression',
        module: 'sklearn.linear_model',
        className: 'LogisticRegression',
        type: 'estimator',
        category: 'Classification',
        params: [
            {
                name: 'penalty',
                label: 'Penalty',
                type: 'select',
                options: ['l2', 'l1', 'elasticnet', 'None'],
                defaultValue: 'l2'
            },
            {
                name: 'C',
                label: 'C (Inverse Reg)',
                type: 'number',
                defaultValue: 1.0,
                helperText: 'Inverse of regularization strength; smaller values specify stronger regularization.'
            },
            {
                name: 'solver',
                label: 'Solver',
                type: 'select',
                options: ['lbfgs', 'liblinear', 'newton-cg', 'newton-cholesky', 'sag', 'saga'],
                defaultValue: 'lbfgs'
            }
        ]
    },
    {
        id: 'decision_tree_classifier',
        name: 'Decision Tree Classifier',
        module: 'sklearn.tree',
        className: 'DecisionTreeClassifier',
        type: 'estimator',
        category: 'Classification',
        params: [
            {
                name: 'criterion',
                label: 'Criterion',
                type: 'select',
                options: ['gini', 'entropy', 'log_loss'],
                defaultValue: 'gini'
            },
            {
                name: 'max_depth',
                label: 'Max Depth',
                type: 'number',
                defaultValue: 0, // 0 will represent None in our logic
                helperText: 'The maximum depth of the tree. 0 for unlimited.'
            },
             {
                name: 'min_samples_split',
                label: 'Min Samples Split',
                type: 'number',
                defaultValue: 2,
            }
        ]
    },
    {
        id: 'svc',
        name: 'SVC',
        module: 'sklearn.svm',
        className: 'SVC',
        type: 'estimator',
        category: 'Classification',
        params: [
            {
                name: 'C',
                label: 'C',
                type: 'number',
                defaultValue: 1.0,
            },
            {
                name: 'kernel',
                label: 'Kernel',
                type: 'select',
                options: ['linear', 'poly', 'rbf', 'sigmoid'],
                defaultValue: 'rbf'
            },
             {
                name: 'degree',
                label: 'Degree (Poly)',
                type: 'number',
                defaultValue: 3,
                helperText: 'Degree of the polynomial kernel function (poly).'
            }
        ]
    },
    {
        id: 'random_forest_classifier',
        name: 'Random Forest Classifier',
        module: 'sklearn.ensemble',
        className: 'RandomForestClassifier',
        type: 'estimator',
        category: 'Classification',
        params: [
            {
                name: 'n_estimators',
                label: 'N Estimators',
                type: 'number',
                defaultValue: 100,
            },
            {
                name: 'criterion',
                label: 'Criterion',
                type: 'select',
                options: ['gini', 'entropy', 'log_loss'],
                defaultValue: 'gini'
            },
             {
                name: 'max_depth',
                label: 'Max Depth',
                type: 'number',
                defaultValue: 0,
            }
        ]
    },
    {
        id: 'gradient_boosting_classifier',
        name: 'Gradient Boosting Classifier',
        module: 'sklearn.ensemble',
        className: 'GradientBoostingClassifier',
        type: 'estimator',
        category: 'Classification',
        params: [
            {
                name: 'learning_rate',
                label: 'Learning Rate',
                type: 'number',
                defaultValue: 0.1,
            },
            {
                name: 'n_estimators',
                label: 'N Estimators',
                type: 'number',
                defaultValue: 100,
            },
             {
                name: 'max_depth',
                label: 'Max Depth',
                type: 'number',
                defaultValue: 3,
            }
        ]
    },
    {
        id: 'k_neighbors_classifier',
        name: 'K Neighbors Classifier',
        module: 'sklearn.neighbors',
        className: 'KNeighborsClassifier',
        type: 'estimator',
        category: 'Classification',
        params: [
            {
                name: 'n_neighbors',
                label: 'N Neighbors',
                type: 'number',
                defaultValue: 5,
            },
            {
                name: 'weights',
                label: 'Weights',
                type: 'select',
                options: ['uniform', 'distance'],
                defaultValue: 'uniform'
            }
        ]
    },
    {
        id: 'gaussian_nb',
        name: 'Gaussian Naive Bayes',
        module: 'sklearn.naive_bayes',
        className: 'GaussianNB',
        type: 'estimator',
        category: 'Classification',
        params: []
    },
    // --- Clustering ---
    {
        id: 'kmeans',
        name: 'KMeans',
        module: 'sklearn.cluster',
        className: 'KMeans',
        type: 'estimator',
        category: 'Clustering',
        params: [
            {
                name: 'n_clusters',
                label: 'N Clusters',
                type: 'number',
                defaultValue: 8,
            },
            {
                name: 'init',
                label: 'Init',
                type: 'select',
                options: ['k-means++', 'random'],
                defaultValue: 'k-means++'
            }
        ]
    },
    {
        id: 'dbscan',
        name: 'DBSCAN',
        module: 'sklearn.cluster',
        className: 'DBSCAN',
        type: 'estimator',
        category: 'Clustering',
        params: [
            {
                name: 'eps',
                label: 'Eps',
                type: 'number',
                defaultValue: 0.5,
            },
            {
                name: 'min_samples',
                label: 'Min Samples',
                type: 'number',
                defaultValue: 5,
            }
        ]
    }
];
