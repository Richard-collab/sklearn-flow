// src/components/PropertiesPanel.tsx
import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Divider, Chip, OutlinedInput } from '@mui/material';
import type { Node } from 'reactflow';
import { COMPONENT_LIBRARY } from '../componentLibrary';
import type { SklearnNodeData } from '../types';

interface PropertiesPanelProps {
  selectedNode: Node<SklearnNodeData> | null;
  onUpdateParams: (nodeId: string, newParams: Record<string, any>, selectedColumns?: string[]) => void;
  datasetColumns: string[];
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedNode, onUpdateParams, datasetColumns }) => {
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

  const handleColumnChange = (event: any) => {
      const {
        target: { value },
      } = event;
      // On autofill we get a stringified value.
      const newSelectedColumns = typeof value === 'string' ? value.split(',') : value;

      onUpdateParams(selectedNode.id, selectedNode.data.params, newSelectedColumns);
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

      {/* Column Selection */}
      <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>Target Columns</Typography>
           <FormControl fullWidth size="small">
            <InputLabel id="column-select-label">Select Columns</InputLabel>
            <Select
              labelId="column-select-label"
              id="column-select"
              multiple
              value={selectedNode.data.selectedColumns || []}
              onChange={handleColumnChange}
              input={<OutlinedInput label="Select Columns" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {datasetColumns.length === 0 ? (
                  <MenuItem disabled value="">
                      <em>No columns defined (Global Settings)</em>
                  </MenuItem>
              ) : (
                  datasetColumns.map((col) => (
                    <MenuItem key={col} value={col}>
                      {col}
                    </MenuItem>
                  ))
              )}
            </Select>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                If empty, applies to all columns (or previous output).
            </Typography>
          </FormControl>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" gutterBottom>Parameters</Typography>
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
