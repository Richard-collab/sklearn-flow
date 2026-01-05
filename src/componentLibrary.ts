// src/componentLibrary.ts
import type { SklearnComponent } from './types';

export const COMPONENT_LIBRARY: SklearnComponent[] = [
    // --- Preprocessing ---
    {
        id: 'standard_scaler',
        name: 'Standard Scaler',
        module: 'sklearn.preprocessing',
        className: 'StandardScaler',
        type: 'transformer',
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
        id: 'pca',
        name: 'PCA',
        module: 'sklearn.decomposition',
        className: 'PCA',
        type: 'transformer',
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
    // --- Classifiers ---
    {
        id: 'logistic_regression',
        name: 'Logistic Regression',
        module: 'sklearn.linear_model',
        className: 'LogisticRegression',
        type: 'estimator',
        params: [
            {
                name: 'penalty',
                label: 'Penalty',
                type: 'select',
                options: ['l2', 'l1', 'elasticnet', 'none'],
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
        name: 'Decision Tree',
        module: 'sklearn.tree',
        className: 'DecisionTreeClassifier',
        type: 'estimator',
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
        name: 'Random Forest',
        module: 'sklearn.ensemble',
        className: 'RandomForestClassifier',
        type: 'estimator',
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
    }
];
