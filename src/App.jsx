import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box } from '@mui/material';
import CharacterTable from './components/CharacterTable';

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Box sx={{ my: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Rick and Morty Character Explorer
            </Typography>
            <CharacterTable />
          </Box>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
