import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InventoryForm = ({ onSubmit, isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`/api/inventory/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching item:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await onSubmit(id, formData);
      } else {
        await onSubmit(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="inventory-form">
      <h2>{isEdit ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="submit-button">
          {isEdit ? 'Update Item' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;