// src/utils/codeGenerator.ts
import type { Node, Edge } from 'reactflow';
import type { SklearnNodeData } from '../types';
import { COMPONENT_LIBRARY } from '../componentLibrary';

export function generateCode(nodes: Node<SklearnNodeData>[], edges: Edge[]): string {
    if (nodes.length === 0) return "# Drag nodes from the sidebar to start building.";

    // 1. Sort nodes topologically
    // Since we assume a linear pipeline, we can find the start node (no incoming edges)
    // and follow the path.
    const sortedNodes: Node<SklearnNodeData>[] = [];

    // Create a map of edges for easy traversal
    const edgeMap: Record<string, string> = {}; // source -> target
    const incomingEdges: Record<string, boolean> = {};

    edges.forEach(edge => {
        edgeMap[edge.source] = edge.target;
        incomingEdges[edge.target] = true;
    });

    // Find start node(s)
    const startNodes = nodes.filter(n => !incomingEdges[n.id]);

    // If multiple start nodes, we just pick the first one for the linear sequence for now
    let currentNode = startNodes[0];

    while (currentNode) {
        sortedNodes.push(currentNode);
        const nextNodeId = edgeMap[currentNode.id];
        if (!nextNodeId) break;
        currentNode = nodes.find(n => n.id === nextNodeId)!;
    }

    // 2. Collect Imports
    const imports = new Set<string>();
    imports.add("from sklearn.pipeline import Pipeline");

    let usesColumnTransformer = false;

    sortedNodes.forEach(node => {
        const comp = COMPONENT_LIBRARY.find(c => c.id === node.data.componentId);
        if (comp) {
            imports.add(`from ${comp.module} import ${comp.className}`);
        }
        if (node.data.selectedColumns && node.data.selectedColumns.length > 0) {
            usesColumnTransformer = true;
        }
    });

    if (usesColumnTransformer) {
        imports.add("from sklearn.compose import ColumnTransformer");
    }

    // 3. Generate Pipeline steps
    const steps = sortedNodes.map((node, index) => {
        const comp = COMPONENT_LIBRARY.find(c => c.id === node.data.componentId);
        if (!comp) return "";

        const params = node.data.params;
        const paramStrings: string[] = [];

        comp.params.forEach(p => {
            const val = params[p.name] ?? p.defaultValue;
            let valStr = "";
            if (typeof val === 'string') {
                valStr = `'${val}'`;
            } else if (typeof val === 'boolean') {
                valStr = val ? 'True' : 'False';
            } else {
                valStr = String(val);
            }

             // If the value is 0 and it represents 'None' for max_depth etc.
             if (p.name === 'max_depth' && val === 0) {
                 valStr = 'None';
            }
             // For penalty='None' string
             if (p.name === 'penalty' && val === 'None') {
                 valStr = 'None';
             }

            paramStrings.push(`${p.name}=${valStr}`);
        });

        // Basic instantiation string
        const estimatorCode = `${comp.className}(${paramStrings.join(', ')})`;
        const stepName = comp.name.toLowerCase().replace(/\s+/g, '_');
        const uniqueStepName = `${stepName}_${index}`;

        // Check if we need to wrap in ColumnTransformer
        const selectedCols = node.data.selectedColumns;
        if (selectedCols && selectedCols.length > 0) {
            // Format column list for python
            const colsStr = `[${selectedCols.map(c => `'${c}'`).join(', ')}]`;

            // Generate ColumnTransformer code
            // We use 'passthrough' for remainder to keep other columns
            return `    ('${uniqueStepName}', ColumnTransformer(\n        [('${stepName}', ${estimatorCode}, ${colsStr})],\n        remainder='passthrough'\n    ))`;
        } else {
            return `    ('${uniqueStepName}', ${estimatorCode})`;
        }
    });

    return [
        ...Array.from(imports).sort(),
        "",
        "# Define the pipeline",
        "pipeline = Pipeline([",
        steps.join(',\n'),
        "])",
        "",
        "# pipeline.fit(X_train, y_train)",
        "# pipeline.predict(X_test)"
    ].join('\n');
}
