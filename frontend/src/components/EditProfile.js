import React, { useState } from 'react';

const EditProfile = ({ user, onSave, onCancel }) => {
  const [bio, setBio] = useState(user.bio || '');
  const [email, setEmail] = useState(user.email || '');
  const [username, setUsername] = useState(user.username || '');
  const [socialMedia, setSocialMedia] = useState((user.socialMedia || []).join(', '));

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      bio,
      email,
      username,
      socialMedia: socialMedia.split(',').map(link => link.trim()), // Convert to array
    };
    onSave(updatedUser);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Center the container */}
      <div className="edit-profile bg-white p-6 rounded-lg shadow-md w-96"> {/* Container styles */}
        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4"> {/* Add spacing between form elements */}
          <div>
            <label>
              Bio:
              <textarea
                className="text-black w-full p-2 border border-gray-300 rounded-md" // Full width, padding, and border
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                className="text-black w-full p-2 border border-gray-300 rounded-md" // Full width, padding, and border
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Username:
              <input
                type="text"
                className="text-black w-full p-2 border border-gray-300 rounded-md" // Full width, padding, and border
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Social Media Links:
              <input
                type="text"
                className="text-black w-full p-2 border border-gray-300 rounded-md" // Full width, padding, and border
                value={socialMedia}
                onChange={(e) => setSocialMedia(e.target.value)}
              />
              <small className="text-gray-500">Enter links separated by commas (e.g., "https://link1, https://link2").</small>
            </label>
          </div>
          <div className="flex space-x-2"> {/* Flexbox for button layout */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save Changes</button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
