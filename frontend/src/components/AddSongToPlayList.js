import React, { useState, useEffect } from 'react';

const AddSongToPlaylist = ({ selectedPlaylistId, userId, onCancel }) => {
  const [allSongs, setAllSongs] = useState([]); // Store all songs
  const [selectedSongs, setSelectedSongs] = useState([]);

  // Fetch all songs when the component mounts
  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        const songs = await response.json();
        setAllSongs(songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchAllSongs();
  }, []);

  const handleCheckboxChange = (songId) => {
    setSelectedSongs((prev) =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  };

  const handleAddSongs = async () => {
    try {
      // Make a POST request to add the selected songs to the playlist
      await fetch(`/api/playlist/${selectedPlaylistId}/add-songs/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songIds: selectedSongs }), // send song IDs in the body
      });
      alert('Songs added to playlist!');
      onCancel(); // Close the dialog after adding songs
    } catch (error) {
      console.error('Error adding songs:', error);
    }
  };

  return (
    <div className="add-song-to-playlist">
      <h2>Add Songs to Playlist</h2>
      <button onClick={onCancel}>Cancel</button>
      <ul>
        {allSongs.map(song => (
          <li key={song.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedSongs.includes(song.id)}
                onChange={() => handleCheckboxChange(song.id)}
              />
              {song.name} by {song.artist}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAddSongs}>Add Selected Songs</button>
    </div>
  );
};

export default AddSongToPlaylist;
