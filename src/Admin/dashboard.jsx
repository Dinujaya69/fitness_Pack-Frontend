import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [data, setData] = useState({
    budget: 0,
    totalMembers: 0,
    totalTrainers: 0,
    totalPlans: 0,
    sales: [],
    trafficSource: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get('http://localhost:5000/api/budget');
        const membersResponse = await axios.get('http://localhost:5000/auth/users');
        const trainersResponse = await axios.get('http://localhost:5000/api/trainers');
        const plansResponse = await axios.get('http://localhost:5000/api/plans');
        const salesResponse = await axios.get('http://localhost:5000/api/sales');
        const trafficResponse = await axios.get('http://localhost:5000/api/traffic');

        setData({
          budget: budgetResponse.data,
          totalMembers: membersResponse.data.length,
          totalTrainers: trainersResponse.data.length,
          totalPlans: plansResponse.data.length,
          sales: salesResponse.data,
          trafficSource: trafficResponse.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const salesData = {
    labels: data.sales.map(sale => sale.month),
    datasets: [
      {
        label: 'Sales',
        data: data.sales.map(sale => sale.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }
    ]
  };

  const trafficData = {
    labels: data.trafficSource.map(source => source.label),
    datasets: [
      {
        data: data.trafficSource.map(source => source.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Budget</Typography>
              <Typography variant="h4">${data.budget}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Members</Typography>
              <Typography variant="h4">{data.totalMembers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Trainers</Typography>
              <Typography variant="h4">{data.totalTrainers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Plans</Typography>
              <Typography variant="h4">{data.totalPlans}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">Sales</Typography>
              <Bar data={salesData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Traffic Source</Typography>
              <Doughnut data={trafficData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
