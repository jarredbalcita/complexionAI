import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import './Products.css';

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'CeraVe Hydrating Cleanser',
      category: 'Cleanser',
      icon: '🧴',
    },
    {
      id: 2,
      name: 'The Ordinary Vitamin C',
      category: 'Serum',
      icon: '💧',
    },
    {
      id: 3,
      name: 'Neutrogena Hydro Boost',
      category: 'Moisturizer',
      icon: '☀️',
    },
    {
      id: 4,
      name: 'La Roche-Posay SPF',
      category: 'Sunscreen',
      icon: '🌙',
    },
  ]);

  const handleEdit = (productId) => {
    console.log('Edit product:', productId);
  };

  const handleDelete = (productId) => {
    console.log('Delete product:', productId);
  };

  return (
    <div className="products">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p className="page-subtitle">Browse and manage your skincare products</p>
        </div>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add New Product
        </Button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Card key={product.id} padding="lg" className="product-card" hover>
            <div className="product-icon">{product.icon}</div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>

            <div className="product-actions">
              <Button
                variant="outline"
                size="sm"
                icon={<Edit2 size={16} />}
                onClick={() => handleEdit(product.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 size={16} />}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
