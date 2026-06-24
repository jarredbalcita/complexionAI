import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import './Products.css';

const CATEGORIES = ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Eye Cream', 'Mask', 'Exfoliant', 'Other'];

const CATEGORY_ICONS = {
  Cleanser: '🧴', Toner: '🌊', Serum: '💧', Moisturizer: '☁️',
  Sunscreen: '☀️', 'Eye Cream': '👁️', Mask: '🌿', Exfoliant: '✨', Other: '🫙',
};

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'CeraVe Hydrating Cleanser', category: 'Cleanser' },
  { id: 2, name: 'The Ordinary Vitamin C 23%', category: 'Serum' },
  { id: 3, name: 'Neutrogena Hydro Boost', category: 'Moisturizer' },
  { id: 4, name: 'La Roche-Posay Anthelios SPF 50', category: 'Sunscreen' },
];

const EMPTY_FORM = { name: '', category: 'Cleanser' };
const STORAGE_KEY = 'complexionai_products';

export default function Products() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  function openAdd() {
    setForm(EMPTY_FORM);
    setModal({ mode: 'add' });
  }

  function openEdit(product) {
    setForm({ name: product.name, category: product.category });
    setModal({ mode: 'edit', product });
  }

  function closeModal() {
    setModal(null);
    setForm(EMPTY_FORM);
  }

  function saveModal() {
    if (!form.name.trim()) return;
    if (modal.mode === 'add') {
      setProducts(prev => [...prev, { id: Date.now(), name: form.name.trim(), category: form.category }]);
    } else {
      setProducts(prev => prev.map(p =>
        p.id === modal.product.id ? { ...p, name: form.name.trim(), category: form.category } : p
      ));
    }
    closeModal();
  }

  function confirmDelete(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="products">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p className="page-subtitle">Browse and manage your skincare products</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={openAdd}>
          Add New Product
        </Button>
      </div>

      <div className="products-grid">
        {products.length === 0 && (
          <p className="products-empty">No products yet. Add your first product above.</p>
        )}
        {products.map(product => (
          <Card key={product.id} padding="lg" className="product-card" hover>
            <div className="product-icon">{CATEGORY_ICONS[product.category] || '🫙'}</div>
            <h3 className="product-name">{product.name}</h3>
            <span className="product-category">{product.category}</span>
            <div className="product-actions">
              <Button variant="outline" size="sm" icon={<Edit2 size={14} />} onClick={() => openEdit(product)}>
                Edit
              </Button>
              {deleteId === product.id ? (
                <div className="delete-confirm">
                  <span>Delete?</span>
                  <Button variant="danger" size="sm" onClick={() => confirmDelete(product.id)}>Yes</Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteId(null)}>No</Button>
                </div>
              ) : (
                <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={() => setDeleteId(product.id)}>
                  Delete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modal.mode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Product Name</label>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="e.g. CeraVe Hydrating Cleanser"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && saveModal()}
                  autoFocus
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Category</label>
                <select
                  className="modal-select"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={saveModal} disabled={!form.name.trim()}>
                {modal.mode === 'add' ? 'Add Product' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
