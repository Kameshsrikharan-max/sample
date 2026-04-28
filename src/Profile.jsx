import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = {
    name: "Alex Rivera",
    bio: "Digital Creator & Photographer",
    avatar: "https://via.placeholder.com/150"
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <img 
        src={user.avatar} 
        alt="Profile" 
        style={{ borderRadius: '50%', width: '150px' }} 
      />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>

      {/* This is the connection point */}
      <Link to="/dashboard">
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          View Photo Dashboard
        </button>
      </Link>
    </div>
  );
};

export default Profile;