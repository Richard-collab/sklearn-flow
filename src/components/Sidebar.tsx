// src/components/Sidebar.tsx
import React from 'react';
import { COMPONENT_LIBRARY } from '../componentLibrary';
import { Box, Typography, Paper } from '@mui/material';

const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, componentId: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/sklearnId', componentId);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box sx={{ width: 250, borderRight: 1, borderColor: 'divider', height: '100%', overflowY: 'auto', p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        Components
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
        Transformers
      </Typography>
      {COMPONENT_LIBRARY.filter(c => c.type === 'transformer').map((component) => (
        <Paper
          key={component.id}
          onDragStart={(event) => onDragStart(event, 'default', component.id)}
          draggable
          variant="outlined"
          sx={{
            p: 1.5,
            mb: 1,
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          <Typography variant="body2">{component.name}</Typography>
        </Paper>
      ))}

      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
        Estimators
      </Typography>
      {COMPONENT_LIBRARY.filter(c => c.type === 'estimator').map((component) => (
        <Paper
          key={component.id}
          onDragStart={(event) => onDragStart(event, 'default', component.id)}
          draggable
          variant="outlined"
          sx={{
             p: 1.5,
             mb: 1,
             cursor: 'grab',
             bgcolor: '#f0f7ff',
             borderColor: '#cce5ff',
             '&:hover': { bgcolor: '#e0efff' }
            }}
        >
          <Typography variant="body2">{component.name}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Sidebar;
