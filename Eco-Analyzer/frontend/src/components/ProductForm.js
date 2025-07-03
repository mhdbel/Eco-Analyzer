import { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manufacturingDetails: '',
    supplyChainInfo: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/analyze', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Manufacturing Details"
        value={formData.manufacturingDetails}
        onChange={(e) => setFormData({ ...formData, manufacturingDetails: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Supply Chain Info"
        value={formData.supplyChainInfo}
        onChange={(e) => setFormData({ ...formData, supplyChainInfo: e.target.value })}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        Analyze
      </Button>
    </form>
  );
};

export default ProductForm;