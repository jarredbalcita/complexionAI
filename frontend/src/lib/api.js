import { supabase } from './supabase';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const authHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { Authorization: `Bearer ${session.access_token}` } : {};
};

export const getProfile = async () => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    headers: await authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const updateProfile = async (profileData) => {
  const res = await fetch(`${API_BASE}/api/profile`, {
    method: 'PUT',
    headers: { ...await authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

export const chatRoutine = async (message) => {
  const res = await fetch(`${API_BASE}/api/routine`, {
    method: 'POST',
    headers: { ...await authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Failed to get routine response');
  return res.json();
};

export const scanProduct = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const res = await fetch(`${API_BASE}/api/scan`, {
    method: 'POST',
    headers: await authHeaders(),
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to scan product');
  return res.json();
};
