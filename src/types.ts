// src/types.ts

// The type of parameter for a node (e.g., number, select option, boolean)
export type ParamType = 'number' | 'text' | 'boolean' | 'select';

// Definition of a single parameter
export interface NodeParam {
    name: string;           // Internal name (e.g., 'n_estimators')
    label: string;          // Display label (e.g., 'Number of Estimators')
    type: ParamType;
    defaultValue: any;
    options?: string[];     // For 'select' type
    helperText?: string;
}

// Metadata for a Sklearn component (available in the library)
export interface SklearnComponent {
    id: string;             // Unique identifier for the component type (e.g., 'standard_scaler')
    name: string;           // Display name (e.g., 'Standard Scaler')
    module: string;         // Python module (e.g., 'sklearn.preprocessing')
    className: string;      // Python class name (e.g., 'StandardScaler')
    type: 'transformer' | 'estimator'; // Rough categorization
    category?: string;      // Finer categorization (e.g., 'Preprocessing', 'Classification')
    params: NodeParam[];
}

// Data stored inside a React Flow Node
export interface SklearnNodeData {
    label: string;
    componentId: string; // References the SklearnComponent.id
    params: Record<string, any>; // Current values for the parameters
    selectedColumns?: string[]; // Columns to apply this estimator/transformer to
}
