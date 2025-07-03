import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.uuid}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.impactScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;