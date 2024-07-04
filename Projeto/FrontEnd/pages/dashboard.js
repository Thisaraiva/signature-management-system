// pages/dashboard.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Typography, Grid } from '@mui/material';
import jwt from 'jsonwebtoken';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        jwt.verify(token, 'secretpassword');
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => router.push('/employees')}>
            Gerenciar Funcionários
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => router.push('/submitExpense')}>
            Submeter Relatório de Despesa
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
