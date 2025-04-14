import { Box, ThemeProvider } from '@mui/system';
import { Header } from './components/Header';
import { Layout } from './components/Layout';

// const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <Box
        component='main'
        sx={{
          height: '100vh',
          backgroundColor: '#000',
        }}
      >
        <Header />
        <Layout>
          <h1>Olá mundo</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}
