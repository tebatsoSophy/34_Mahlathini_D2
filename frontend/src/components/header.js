import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State for storing search results
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchValue.trim() === '') return;

    try {
      const response = await fetch(`api/search/users?username=${searchValue}`);
      const users = await response.json();

      if (users.length > 0) {
        setSearchResults(users); // Set the search results
      } else {
        alert('No users found');
        setSearchResults([]); // Clear results if no users found
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleUserSelection = (user) => {
    props.onSearchResult(user); // Pass the selected user to App.js
    navigate('/user-info'); // Navigate to user-info page
  };

  const userId = localStorage.getItem('userId');

  return (
    <header className="flex items-center justify-between p-5 bg-gray-200 border-b border-gray-300">
      <div className="logo">
        <Link to="/home">
          <img src="/assets/images/logo.jpg" alt="Logo" className="logo-image h-10" />
        </Link>
      </div>

      <div className="Notifications">
        <Link to="/notifications" className="text-lg text-blue-700 hover:text-blue-500">Notifications</Link>
      </div>

      <div className="profile">
        <Link to={`/profile/${userId}`} className="text-lg text-blue-700 hover:text-blue-500">Profile</Link>
      </div>

      <div className="search-bar flex items-center relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleInputChange}
          className="border border-blue-300 p-2 rounded-l focus:outline-none focus:border-blue-500 text-sm"
        />
        <button onClick={handleSearchSubmit} className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-400 text-sm">Search</button>
        
        {/* Display the search results */}
        {searchResults.length > 0 && (
          <div className="search-results absolute bg-white shadow-lg rounded mt-2 w-48 z-10">
            <ul className="max-h-60 overflow-y-auto list-none p-0">
              {searchResults.map((user) => (
                <li key={user.id} onClick={() => handleUserSelection(user)} className="p-2 hover:bg-blue-200 cursor-pointer">
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
