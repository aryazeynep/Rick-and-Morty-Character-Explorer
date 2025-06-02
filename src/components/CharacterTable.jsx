import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Pagination,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../services/api';

const CharacterTable = () => {
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: ''
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', page, filters],
    queryFn: () => fetchCharacters(page, filters)
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading characters. Please try again later.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="alive">Alive</MenuItem>
              <MenuItem value="dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Species</InputLabel>
            <Select
              value={filters.species}
              label="Species"
              onChange={(e) => handleFilterChange('species', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Human">Human</MenuItem>
              <MenuItem value="Alien">Alien</MenuItem>
              <MenuItem value="Humanoid">Humanoid</MenuItem>
              <MenuItem value="Mythological Creature">Mythological Creature</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={filters.gender}
              label="Gender"
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="genderless">Genderless</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((character) => (
              <TableRow
                key={character.id}
                onClick={() => handleRowClick(character)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              >
                <TableCell>
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.status}</TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>{character.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {data?.results?.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No characters found matching your filters.
        </Alert>
      )}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={data?.info?.pages || 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {selectedCharacter && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  {selectedCharacter.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {selectedCharacter.status}
                </Typography>
                <Typography variant="body1">
                  <strong>Species:</strong> {selectedCharacter.species}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {selectedCharacter.gender}
                </Typography>
                <Typography variant="body1">
                  <strong>Origin:</strong> {selectedCharacter.origin.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {selectedCharacter.location.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Created:</strong> {new Date(selectedCharacter.created).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CharacterTable; 