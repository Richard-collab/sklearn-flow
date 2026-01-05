// src/components/PropertiesPanel.tsx
import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Divider } from '@mui/material';
import type { Node } from 'reactflow';
import { COMPONENT_LIBRARY } from '../componentLibrary';
import type { SklearnNodeData } from '../types';

interface PropertiesPanelProps {
  selectedNode: Node<SklearnNodeData> | null;
  onUpdateParams: (nodeId: string, newParams: Record<string, any>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedNode, onUpdateParams }) => {
  if (!selectedNode) {
    return (
      <Box sx={{ width: 300, borderLeft: 1, borderColor: 'divider', height: '100%', p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          Select a node to configure properties.
        </Typography>
      </Box>
    );
  }

  const componentDef = COMPONENT_LIBRARY.find(c => c.id === selectedNode.data.componentId);

  if (!componentDef) {
    return (
      <Box sx={{ width: 300, borderLeft: 1, borderColor: 'divider', height: '100%', p: 2, bgcolor: 'background.paper' }}>
         <Typography variant="body2" color="error">
          Unknown component type.
        </Typography>
      </Box>
    );
  }

  const handleChange = (paramName: string, value: any) => {
    onUpdateParams(selectedNode.id, {
      ...selectedNode.data.params,
      [paramName]: value
    });
  };

  return (
    <Box sx={{ width: 300, borderLeft: 1, borderColor: 'divider', height: '100%', overflowY: 'auto', p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        {componentDef.name}
      </Typography>
      <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
        {componentDef.module}.{componentDef.className}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {componentDef.params.map((param) => (
        <Box key={param.name} sx={{ mb: 2 }}>
          {param.type === 'number' && (
            <TextField
              fullWidth
              label={param.label}
              type="number"
              size="small"
              value={selectedNode.data.params[param.name] ?? param.defaultValue}
              onChange={(e) => handleChange(param.name, Number(e.target.value))}
              helperText={param.helperText}
            />
          )}
           {param.type === 'text' && (
            <TextField
              fullWidth
              label={param.label}
              type="text"
              size="small"
              value={selectedNode.data.params[param.name] ?? param.defaultValue}
              onChange={(e) => handleChange(param.name, e.target.value)}
              helperText={param.helperText}
            />
          )}
          {param.type === 'boolean' && (
            <FormControlLabel
              control={
                <Switch
                  checked={selectedNode.data.params[param.name] ?? param.defaultValue}
                  onChange={(e) => handleChange(param.name, e.target.checked)}
                />
              }
              label={param.label}
            />
          )}
          {param.type === 'select' && (
            <FormControl fullWidth size="small">
              <InputLabel>{param.label}</InputLabel>
              <Select
                value={selectedNode.data.params[param.name] ?? param.defaultValue}
                label={param.label}
                onChange={(e) => handleChange(param.name, e.target.value)}
              >
                {param.options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PropertiesPanel;
