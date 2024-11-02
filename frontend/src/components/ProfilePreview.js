import React from 'react';

const ProfilePreview = ({ user, onEditProfile }) => {
  return (
    <div className="flex items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg"> {/* Flexbox for aligning profile image and details */}
      {/* Profile Picture */}
      <img
        src={user.profileImage || '/path/to/default-image.jpg'} // Add a default image if none is provided
        alt={`${user.username}'s profile`}
        className="w-24 h-24 object-cover rounded-full mr-6" // Smaller circular profile picture
      />
      
      {/* User Details */}
      <div>
        <h3 className="text-2xl font-semibold">{user.username}</h3>
        <p>{user.pronouns}</p>
        <p>{user.email}</p>
        <p className="text-sm text-gray-300">{user.bio}</p>

        {/* Social Media Links */}
        <div className="mt-4">
          <h4 className="text-lg font-medium">Social Media Links:</h4>
          <ul className="space-y-2">
            {user.socialMedia && user.socialMedia.length > 0 ? (
              user.socialMedia.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.startsWith('http') ? link : `https://${link}`} // Ensure the link has http/https
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No social media links available</li>
            )}
          </ul>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-400"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
