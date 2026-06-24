import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { getProfile, updateProfile } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const SKIN_TYPES = ['dry', 'oily', 'combination', 'normal', 'sensitive'];
const SKIN_TONES = ['fair', 'light', 'medium', 'olive', 'tan', 'deep', 'very_deep'];

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    display_name: '',
    email: '',
    skin_type: '',
    skin_tone: '',
    main_concerns: '',
    allergies: '',
    age_range: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const { profile } = await getProfile();
        if (profile) {
          setForm({
            display_name: profile.display_name || '',
            email: profile.email || user?.email || '',
            skin_type: profile.skin_type || '',
            skin_tone: profile.skin_tone || '',
            main_concerns: profile.main_concerns?.join(', ') || '',
            allergies: profile.allergies?.join(', ') || '',
            age_range: profile.age_range || '',
          });
        } else {
          setForm((f) => ({ ...f, email: user?.email || '' }));
        }
      } catch {
        setMessage({ type: 'error', text: 'Failed to load profile' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await updateProfile({
        ...form,
        main_concerns: form.main_concerns.split(',').map((s) => s.trim()).filter(Boolean),
        allergies: form.allergies.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const initials = form.display_name
    ? form.display_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p className="page-subtitle">Manage your account and skin profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="profile-grid">
          <Card padding="lg" className="profile-section">
            <h2 className="section-title">Personal Information</h2>

            <div className="profile-avatar-section">
              <div className="profile-avatar">{initials}</div>
              <div>
                <h3>{form.display_name || 'Your Name'}</h3>
                <p className="avatar-subtitle">Skincare Enthusiast</p>
              </div>
            </div>

            <Input
              label="Display Name"
              type="text"
              name="display_name"
              value={form.display_name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />

            <div className="form-group">
              <label className="input-label">Age Range</label>
              <select
                name="age_range"
                value={form.age_range}
                onChange={handleChange}
                className="profile-select"
              >
                <option value="">Select age range</option>
                {['under_18', '18-24', '25-34', '35-44', '45-54', '55+'].map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </Card>

          <Card padding="lg" className="profile-section">
            <h2 className="section-title">Skin Profile</h2>

            <div className="form-group">
              <label className="input-label">Skin Type</label>
              <select
                name="skin_type"
                value={form.skin_type}
                onChange={handleChange}
                className="profile-select"
              >
                <option value="">Select skin type</option>
                {SKIN_TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Skin Tone</label>
              <select
                name="skin_tone"
                value={form.skin_tone}
                onChange={handleChange}
                className="profile-select"
              >
                <option value="">Select skin tone</option>
                {SKIN_TONES.map((t) => (
                  <option key={t} value={t}>{t.replace('_', ' ').charAt(0).toUpperCase() + t.replace('_', ' ').slice(1)}</option>
                ))}
              </select>
            </div>

            <Input
              label="Main Concerns"
              type="text"
              name="main_concerns"
              value={form.main_concerns}
              onChange={handleChange}
              placeholder="e.g. acne, rosacea, dryness (comma separated)"
            />

            <Input
              label="Allergies / Ingredients to Avoid"
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              placeholder="e.g. fragrance, alcohol (comma separated)"
            />

            {message.text && (
              <p className={`profile-message profile-message-${message.type}`}>
                {message.text}
              </p>
            )}

            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : 'Update Profile'}
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Profile;
