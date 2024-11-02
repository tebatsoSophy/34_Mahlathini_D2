// src/component/CreatePlaylist.js
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = (props) => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    name: '',
    category: '',
    description: '',
    hashtags: '',
    coverImage: '',  // New state for cover image
    error: '',
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value, error: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, coverImage } = state;
    const { userId } = props;

    if (!name || !category) {
      setState({ ...state, error: 'Name and category are required.' });
      return;
    }

    const newPlaylist = {
      name: state.name,
      category: state.category,
      description: state.description,
      hashtags: state.hashtags,
      coverImage: coverImage || 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2',  // Use default if coverImage is empty
    };

    try {
      const response = await fetch(`/api/createPlaylist/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist),
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      const data = await response.json();
      props.onCreate(data.playlistId);
      resetForm();
    } catch (error) {
      console.error('Error creating playlist:', error);
      setState({ ...state, error: 'Error creating playlist. Please try again.' });
    }
  };

  const resetForm = () => {
    setState({
      name: '',
      category: '',
      description: '',
      hashtags: '',
      coverImage: '',  // Reset cover image as well
      error: '',
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-md mx-auto text-white">
      <h3 className="text-2xl mb-4">Create New Playlist</h3>
      {state.error && <div className="text-red-500 mb-4">{state.error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Playlist Name"
          value={state.name}
          onChange={handleChange}
          className="border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={state.category}
          onChange={handleChange}
          className="border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={state.description}
          onChange={handleChange}
          className="border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags (comma separated)"
          value={state.hashtags}
          onChange={handleChange}
          className="border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL (optional)"
          value={state.coverImage}
          onChange={handleChange}
          className="border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white placeholder-gray-400"
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 w-full">
            Create
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/playlists')}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-500 w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;
