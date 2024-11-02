import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Comment from './comment';
import AddComment from './AddComment';
import AddSong from './AddSong';

const PlaylistDetails = ({ playlists, updatePlaylists }) => {
  const { id } = useParams(); // Get the id from the URL parameters
  const navigate = useNavigate(); // Use navigate for navigation
  const [playlist, setPlaylist] = useState({});
  const [comments, setComments] = useState([
    { user: 'Alice', text: 'Great playlist!' },
    { user: 'Bob', text: 'Love these songs!' },
  ]);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPlaylist, setUpdatedPlaylist] = useState({});

  useEffect(() => {
    const foundPlaylist = playlists.find((p) => p._id === id);
    setPlaylist(foundPlaylist);
    setUpdatedPlaylist({
      name: foundPlaylist.name,
      description: foundPlaylist.description,
      hashtags: foundPlaylist.hashtags.join(', '), // Assuming hashtags is an array
    });
  }, [id, playlists]);

  const handleAddComment = (commentText) => {
    const newComment = { user: 'CurrentUser', text: commentText };
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleAddSong = (newSong) => {
    setPlaylist((prevPlaylist) => ({
      ...prevPlaylist,
      songs: [...prevPlaylist.songs, newSong],
    }));
    setIsAddingSong(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlaylist((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditPlaylist = async () => {
    const playlistId = playlist._id;
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch(`/api/editPlaylist/${playlistId}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlaylist),
      });

      if (response.ok) {
        const updatedPlaylistData = await response.json();
        setPlaylist((prev) => ({ ...prev, ...updatedPlaylistData }));
        setIsEditing(false);
        updatePlaylists(updatedPlaylistData); // Pass updated playlist to parent component
      } else {
        console.error('Error updating playlist.');
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-darkblue-800">{playlist?.name}</h2>

      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={updatedPlaylist.name}
            onChange={handleEditChange}
            placeholder="Playlist Name"
            className="mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            value={updatedPlaylist.description}
            onChange={handleEditChange}
            placeholder="Playlist Description"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="hashtags"
            value={updatedPlaylist.hashtags}
            onChange={handleEditChange}
            placeholder="Hashtags (comma-separated)"
            className="mb-2 p-2 border rounded"
          />
          <button onClick={handleEditPlaylist} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400">
            Save Changes
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-300 p-2 ml-2 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-700 mb-2">Songs:</p>
          <ul className="song-list">
            {playlist?.songs.map((song) => (
              <li key={song.id} className="text-gray-800">{song.name} by {song.artist}</li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-400">
            Edit Playlist
          </button>
        </div>
      )}

      <div className="comments-section mt-6">
        <h3 className="text-xl text-darkblue-800">Comments</h3>
        {comments.map((comment, index) => (
          <Comment key={index} user={comment.user} text={comment.text} />
        ))}
        <AddComment onAddComment={handleAddComment} />
      </div>

      <div className="songs-section mt-6">
        <button onClick={() => setIsAddingSong(true)} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-400">
          Add Song
        </button>
        {isAddingSong && (
          <AddSong
            onAddSong={handleAddSong}
            onCancel={() => setIsAddingSong(false)}
          />
        )}
      </div>

      <button onClick={() => navigate('/playlists')} className="bg-gray-300 p-2 mt-6 rounded-md hover:bg-gray-400">
        Back to Playlists
      </button>
    </div>
  );
};

export default PlaylistDetails;
