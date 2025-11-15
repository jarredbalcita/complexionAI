import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import './Profile.css';

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'User Name',
    email: 'user@example.com',
  });

  const [skinProfile] = useState({
    skinType: 'Combination',
    experienceLevel: 'Some Experience',
    timeCommitment: 'Moderate (5-10 min)',
    budget: '$20-50/month',
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Update profile:', { personalInfo, skinProfile });
  };

  return (
    <div className="profile">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p className="page-subtitle">Manage your account and preferences</p>
        </div>
      </div>

      <div className="profile-grid">
        <Card padding="lg" className="profile-section">
          <h2 className="section-title">Personal Information</h2>

          <div className="profile-avatar-section">
            <div className="profile-avatar">U</div>
            <div>
              <h3>User Name</h3>
              <p className="avatar-subtitle">Skincare Enthusiast</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile}>
            <Input
              label="Name"
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
          </form>
        </Card>

        <Card padding="lg" className="profile-section">
          <h2 className="section-title">Skin Profile</h2>

          <div className="skin-profile-grid">
            <div className="profile-item">
              <label className="profile-label">Skin Type</label>
              <p className="profile-value">{skinProfile.skinType}</p>
            </div>

            <div className="profile-item">
              <label className="profile-label">Experience Level</label>
              <p className="profile-value">{skinProfile.experienceLevel}</p>
            </div>

            <div className="profile-item">
              <label className="profile-label">Time Commitment</label>
              <p className="profile-value">{skinProfile.timeCommitment}</p>
            </div>

            <div className="profile-item">
              <label className="profile-label">Budget</label>
              <p className="profile-value">{skinProfile.budget}</p>
            </div>
          </div>

          <Button variant="primary" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
