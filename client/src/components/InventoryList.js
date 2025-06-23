import React from 'react';
import { Link } from 'react-router-dom';

const InventoryList = ({ inventory, loading, onDelete }) => {
  if (loading) {
    return <div className="loading">Loading inventory...</div>;
  }

  return (
    <div className="inventory-list">
      <h2>Inventory Items</h2>
      <Link to="/add" className="add-button">Add New Item</Link>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="5">No items found</td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td className="actions">
                  <Link to={`/edit/${item._id}`} className="edit-button">Edit</Link>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;