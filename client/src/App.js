import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import Navigation from './components/Navigation';
import './styles/App.css';

function App() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inventory');
      setInventory(response.data);
    } catch (error) {
      toast.error('Failed to fetch inventory');
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (item) => {
    try {
      await axios.post('/api/inventory', item);
      toast.success('Item added successfully');
      fetchInventory();
    } catch (error) {
      toast.error('Failed to add item');
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (id, updatedItem) => {
    try {
      await axios.put(`/api/inventory/${id}`, updatedItem);
      toast.success('Item updated successfully');
      fetchInventory();
    } catch (error) {
      toast.error('Failed to update item');
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      toast.success('Item deleted successfully');
      fetchInventory();
    } catch (error) {
      toast.error('Failed to delete item');
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route
            path="/"
            element={
              <InventoryList
                inventory={inventory}
                loading={loading}
                onDelete={handleDeleteItem}
              />
            }
          />
          <Route
            path="/add"
            element={<InventoryForm onSubmit={handleAddItem} />}
          />
          <Route
            path="/edit/:id"
            element={<InventoryForm onSubmit={handleUpdateItem} isEdit />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;