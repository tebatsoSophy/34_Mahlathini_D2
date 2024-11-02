import React from 'react';

class UserInfo extends React.Component {
  render() {
    const { user } = this.props; // Pass the user object as a prop

    if (!user) {
      return <p>No user selected</p>;
    }

    return (
      <div className="user-info">
 <img 
            src={user.profileImage} 
            alt={`${user.username}'s profile`} 
            className="profile-image" 
          />

      
        <p><strong>Username:</strong> {user.username}</p>
   
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Pronouns:</strong> {user.pronouns}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        {/* Exclude email, password, and ID */}
      </div>
    );
  }
}

export default UserInfo;
