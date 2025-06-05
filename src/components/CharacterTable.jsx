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
  Alert,
  Button,
  InputAdornment,
  Menu,
  Snackbar
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../services/api';
import SearchIcon from '@mui/icons-material/Search';

const CharacterTable = () => {
  // State management for pagination, filters, and sorting
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [showNotification, setShowNotification] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    createdYear: ''
  });

  // Fetch characters data with current filters and pagination
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', page, filters, sortOrder, pageSize],
    queryFn: () => fetchCharacters(page, filters, sortOrder, pageSize)
  });

  // Handler functions for search, filters, and pagination
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, name: searchInput }));
    setPage(1);
    setSelectedCharacter(null);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1);
    setSelectedCharacter(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setSelectedCharacter(null);
  };

  const handleRowClick = (character) => {
    setShowNotification(true);
    setSelectedCharacter(character);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  // Reset all filters to their initial state
  const resetFilters = () => {
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
      createdYear: ''
    });
    setSearchInput('');
    setPage(1);
    setSelectedCharacter(null);
  };

  // Sorting functionality handlers
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setPage(1);
    setSelectedCharacter(null);
    handleSortClose();
  };

  // Loading state display
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // Error state display
  if (error) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Card 
          sx={{ 
            maxWidth: 600,
            width: '100%',
            background: 'linear-gradient(145deg, #1a237e 0%, #283593 100%)',
            color: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00e5ff, #2979ff, #651fff)',
            }
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #00e5ff, #2979ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Oops! Looks like we've got a problem...
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: '1.1rem',
                opacity: 0.9,
                mb: 2
              }}
            >
              Even Rick's portal gun couldn't find what you're looking for!
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.8,
                fontStyle: 'italic',
                mb: 3
              }}
            >
              Try adjusting your search or filters to explore other dimensions!
            </Typography>
            <Button
              variant="contained"
              onClick={resetFilters}
              sx={{
                background: 'linear-gradient(45deg, #00e5ff, #2979ff)',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '25px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 20px rgba(0, 229, 255, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00b8d4, #1a237e)',
                  boxShadow: '0 6px 25px rgba(0, 229, 255, 0.4)',
                }
              }}
            >
              Try Another Search
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters Section - Centered */}
      <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
        {/* Search Input */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleSearch}
                    sx={{ minWidth: 'auto', p: 1 }}
                  >
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                height: '56px',
                width: '100%'
              }
            }}
          />
        </Grid>
        {/* Status Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel id="status-label" sx={{ fontSize: '1rem' }}>Status</InputLabel>
            <Select
              labelId="status-label"
              value={filters.status}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
              sx={{ 
                height: '56px',
                '& .MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="alive">Alive</MenuItem>
              <MenuItem value="dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Species Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel id="species-label" sx={{ fontSize: '1rem' }}>Species</InputLabel>
            <Select
              labelId="species-label"
              value={filters.species}
              label="Species"
              onChange={(e) => handleFilterChange('species', e.target.value)}
              sx={{ 
                height: '56px',
                '& .MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Human">Human</MenuItem>
              <MenuItem value="Alien">Alien</MenuItem>
              <MenuItem value="Humanoid">Humanoid</MenuItem>
              <MenuItem value="Mythological Creature">Mythological Creature</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Gender Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel id="gender-label" sx={{ fontSize: '1rem' }}>Gender</InputLabel>
            <Select
              labelId="gender-label"
              value={filters.gender}
              label="Gender"
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              sx={{ 
                height: '56px',
                '& .MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="genderless">Genderless</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Created Year Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel id="year-label" sx={{ fontSize: '1rem' }}>Created Year</InputLabel>
            <Select
              labelId="year-label"
              value={filters.createdYear}
              label="Created Year"
              onChange={(e) => handleFilterChange('createdYear', e.target.value)}
              sx={{ 
                height: '56px',
                '& .MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value="">All Years</MenuItem>
              <MenuItem value="2017">2017</MenuItem>
              <MenuItem value="2018">2018</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Results per Page Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth sx={{ minWidth: '200px' }}>
            <InputLabel id="page-size-label" sx={{ fontSize: '1rem' }}>Results per Page</InputLabel>
            <Select
              labelId="page-size-label"
              value={pageSize}
              label="Results per Page"
              onChange={(e) => {
                setPageSize(e.target.value);
                setPage(1);
              }}
              sx={{ 
                height: '56px',
                '& .MuiSelect-select': {
                  padding: '8px 14px'
                }
              }}
            >
              <MenuItem value={10}>10 per page</MenuItem>
              <MenuItem value={20}>20 per page</MenuItem>
              <MenuItem value={50}>50 per page</MenuItem>
              <MenuItem value={100}>100 per page</MenuItem>
              <MenuItem value={250}>250 per page</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Action Buttons Section - Right Aligned */}
      <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'flex-end' }}>
        {/* Sort Button */}
        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSortClick}
            sx={{
              height: '56px',
              background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #388e3c, #689f38)',
              }
            }}
          >
            {sortOrder ? (sortOrder === 'asc' ? 'A to Z' : 'Z to A') : 'Sort Names'}
          </Button>
          <Menu
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}
          >
            <MenuItem onClick={() => handleSort('asc')}>A to Z</MenuItem>
            <MenuItem onClick={() => handleSort('desc')}>Z to A</MenuItem>
            {sortOrder && (
              <MenuItem onClick={() => handleSort('')}>Clear Sorting</MenuItem>
            )}
          </Menu>
        </Grid>
        {/* Clear Filters Button */}
        <Grid item xs={12} sm={6} md={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={resetFilters}
            sx={{
              height: '56px',
              background: 'linear-gradient(45deg, #ff4081, #ff6e40)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #f50057, #ff3d00)',
              }
            }}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      {/* Characters Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: 'primary.main',
              '& .MuiTableCell-root': {
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem'
              }
            }}>
              <TableCell width="10%">Image</TableCell>
              <TableCell width="25%">Name</TableCell>
              <TableCell width="15%">Status</TableCell>
              <TableCell width="20%">Species</TableCell>
              <TableCell width="15%">Gender</TableCell>
              <TableCell width="15%">Created Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((character) => (
              <TableRow
                key={character.id}
                onClick={() => handleRowClick(character)}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              >
                <TableCell width="10%">
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell width="25%">{character.name}</TableCell>
                <TableCell width="15%">{character.status}</TableCell>
                <TableCell width="20%">{character.species}</TableCell>
                <TableCell width="15%">{character.gender}</TableCell>
                <TableCell width="15%">{new Date(character.created).getFullYear()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* No Results Message */}
      {data?.results?.length === 0 && (
        <Box sx={{ mt: 4, textAlign: 'center', p: 4 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Wubba Lubba Dub Dub!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Looks like we couldn't find any characters matching your criteria in this dimension.
            Try different filters or search terms to find your favorite characters!
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={data?.info?.pages || 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Character Detail Card */}
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

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity="info" 
          sx={{ width: '100%' }}
        >
          Check out the character details below the table! 🚀
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CharacterTable; 