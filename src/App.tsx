// src/App.tsx
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
} from 'reactflow';
import type {
    Connection,
    Node,
    ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Box, Paper, Typography, Button, Modal } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

import Sidebar from './components/Sidebar';
import PropertiesPanel from './components/PropertiesPanel';
import { COMPONENT_LIBRARY } from './componentLibrary';
import type { SklearnNodeData } from './types';
import { generateCode } from './utils/codeGenerator';

const initialNodes: Node<SklearnNodeData>[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const App: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const componentId = event.dataTransfer.getData('application/sklearnId');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type || !componentId) {
        return;
      }

      const componentDef = COMPONENT_LIBRARY.find(c => c.id === componentId);
      if (!componentDef) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<SklearnNodeData> = {
        id: getId(),
        type, // 'default'
        position,
        data: {
            label: componentDef.name,
            componentId: componentDef.id,
            params: {} // will be populated with defaults by PropertiesPanel or we can pre-populate here
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
      setSelectedNodeId(null);
  }, []);

  const handleUpdateParams = (nodeId: string, newParams: Record<string, any>) => {
      setNodes((nds) => nds.map((node) => {
          if (node.id === nodeId) {
              return {
                  ...node,
                  data: {
                      ...node.data,
                      params: newParams
                  }
              };
          }
          return node;
      }));
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const handleGenerateCode = () => {
      const code = generateCode(nodes, edges);
      setGeneratedCode(code);
      setCodeModalOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <ReactFlowProvider>
        <Sidebar />

        <Box sx={{ flexGrow: 1, height: '100%', position: 'relative' }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
          >
            <Controls />
            <Background />
            <Panel position="top-right">
                <Button
                    variant="contained"
                    startIcon={<CodeIcon />}
                    onClick={handleGenerateCode}
                    sx={{ m: 1 }}
                >
                    Generate Code
                </Button>
            </Panel>
          </ReactFlow>
        </Box>

        <PropertiesPanel
            selectedNode={selectedNode}
            onUpdateParams={handleUpdateParams}
        />

        {/* Code Preview Modal */}
        <Modal
            open={codeModalOpen}
            onClose={() => setCodeModalOpen(false)}
            aria-labelledby="code-modal-title"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                outline: 'none'
            }}>
                <Typography id="code-modal-title" variant="h6" component="h2" gutterBottom>
                    Generated Code
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5', maxHeight: '60vh', overflow: 'auto' }}>
                    <pre style={{ margin: 0, fontFamily: 'monospace' }}>
                        {generatedCode}
                    </pre>
                </Paper>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                     <Button onClick={() => setCodeModalOpen(false)}>Close</Button>
                     <Button
                        variant="contained"
                        onClick={() => navigator.clipboard.writeText(generatedCode)}
                        sx={{ ml: 1 }}
                     >
                        Copy
                     </Button>
                </Box>
            </Box>
        </Modal>

      </ReactFlowProvider>
    </Box>
  );
};

export default App;
