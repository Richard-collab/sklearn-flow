// src/components/Sidebar.tsx
import React, { useState, useMemo } from 'react';
import { COMPONENT_LIBRARY } from '../componentLibrary';
import { Box, Typography, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, nodeType: string, componentId: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/sklearnId', componentId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredComponents = useMemo(() => {
      if (!searchTerm) return COMPONENT_LIBRARY;
      return COMPONENT_LIBRARY.filter(c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.className.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  // Group by category
  const groupedComponents = useMemo(() => {
      const groups: Record<string, typeof COMPONENT_LIBRARY> = {};
      filteredComponents.forEach(comp => {
          const cat = comp.category || 'Other';
          if (!groups[cat]) groups[cat] = [];
          groups[cat].push(comp);
      });
      return groups;
  }, [filteredComponents]);

  // Sort categories (Estimators / Classifiers usually at bottom, Transformers top, but let's just sort alphabetically or by custom order)
  const sortedCategories = Object.keys(groupedComponents).sort();

  return (
    <Box sx={{ width: 250, borderRight: 1, borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
            Components
        </Typography>
        <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
            }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {sortedCategories.map(category => (
            <Box key={category} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {category}
                </Typography>
                {groupedComponents[category].map((component) => (
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
                            bgcolor: component.type === 'estimator' ? '#f0f7ff' : 'background.paper',
                            borderColor: component.type === 'estimator' ? '#cce5ff' : 'divider',
                            '&:hover': {
                                bgcolor: component.type === 'estimator' ? '#e0efff' : 'action.hover',
                                borderColor: component.type === 'estimator' ? '#99ccff' : 'text.disabled'
                            }
                        }}
                    >
                        <Typography variant="body2">{component.name}</Typography>
                    </Paper>
                ))}
            </Box>
        ))}
        {sortedCategories.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center">
                No components found.
            </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
