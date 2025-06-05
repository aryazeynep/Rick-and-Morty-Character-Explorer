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
          <Box sx={{ my: 1 }}>
            <Box
              sx={{
                mb: 1,
                p: 3,
                background: 'linear-gradient(45deg, #1a237e 0%, #4a148c 100%)',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '2px solid #00e5ff',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(0,229,255,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #00e5ff, #2979ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Bangers", cursive',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  textShadow: '0 0 10px rgba(0,229,255,0.3)',
                  position: 'relative',
                  '&::before': {
                    content: '"🚀"',
                    position: 'absolute',
                    left: '-40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.8em'
                  },
                  '&::after': {
                    content: '"👽"',
                    position: 'absolute',
                    right: '-40px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.8em'
                  }
                }}
              >
                Rick and Morty Character Explorer
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center',
                  mt: 2,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #ff4081, #7c4dff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Bangers", cursive',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textShadow: '0 0 10px rgba(124,77,255,0.3)'
                }}
              >
                Multiverse Character Database
              </Typography>
            </Box>
            <CharacterTable />
          </Box>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
