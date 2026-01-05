// src/test_generation.test.ts
import { describe, it, expect } from 'vitest';
import { generateCode } from './utils/codeGenerator';
import type { Node, Edge } from 'reactflow';
import type { SklearnNodeData } from './types';

// Mock data
const mockNodes: Node<SklearnNodeData>[] = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: {
            label: 'Standard Scaler',
            componentId: 'standard_scaler',
            params: { with_mean: true, with_std: false }
        }
    },
    {
        id: '2',
        position: { x: 100, y: 0 },
        data: {
            label: 'PCA',
            componentId: 'pca',
            params: { n_components: 5 }
        }
    },
     {
        id: '3',
        position: { x: 200, y: 0 },
        data: {
            label: 'Logistic Regression',
            componentId: 'logistic_regression',
            params: { C: 0.5, penalty: 'l1' }
        }
    }
];

const mockEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' }
];

describe('Code Generator', () => {
    it('should generate correct imports and pipeline definition', () => {
        const code = generateCode(mockNodes, mockEdges);

        console.log(code);

        expect(code).toContain('from sklearn.pipeline import Pipeline');
        expect(code).toContain('from sklearn.preprocessing import StandardScaler');
        expect(code).toContain('from sklearn.decomposition import PCA');
        expect(code).toContain('from sklearn.linear_model import LogisticRegression');

        // Check order and params
        // StandardScaler should be first
        // PCA second
        // LogisticRegression third

        // Note: The exact string match might be brittle due to formatting, but we check key parts.
        expect(code).toContain("('standard_scaler_0', StandardScaler(with_mean=True, with_std=False))");
        expect(code).toContain("('pca_1', PCA(n_components=5, whiten=False))"); // whiten is default false in our lib
        expect(code).toContain("('logistic_regression_2', LogisticRegression(penalty='l1', C=0.5, solver='lbfgs'))");
    });

    it('should handle unconnected nodes (start with first found node)', () => {
        // If we have just one node
         const singleNode: Node<SklearnNodeData>[] = [
            {
                id: '1',
                position: { x: 0, y: 0 },
                data: {
                    label: 'SVC',
                    componentId: 'svc',
                    params: { C: 1.0 }
                }
            }
        ];
        const code = generateCode(singleNode, []);
        expect(code).toContain('SVC(C=1');
    });
});
