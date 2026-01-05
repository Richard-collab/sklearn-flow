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
    // In a real DAG we would handle this differently.
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

    sortedNodes.forEach(node => {
        const comp = COMPONENT_LIBRARY.find(c => c.id === node.data.componentId);
        if (comp) {
            imports.add(`from ${comp.module} import ${comp.className}`);
        }
    });

    // 3. Generate Pipeline steps
    const steps = sortedNodes.map((node, index) => {
        const comp = COMPONENT_LIBRARY.find(c => c.id === node.data.componentId);
        if (!comp) return "";

        const params = node.data.params;
        const paramStrings: string[] = [];

        comp.params.forEach(p => {
            const val = params[p.name] ?? p.defaultValue;

            // Only include non-default values to keep code clean?
            // Or include all? Let's include if it's explicitly different from default
            // OR just include everything to be explicit.
            // For code clarity, let's format strings properly.

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

            paramStrings.push(`${p.name}=${valStr}`);
        });

        // step name: 'standard_scaler' or 'pca'
        // If multiple of same type, we might want to append index, but for now simple snake_case of name
        const stepName = comp.name.toLowerCase().replace(/\s+/g, '_');

        return `    ('${stepName}_${index}', ${comp.className}(${paramStrings.join(', ')}))`;
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
