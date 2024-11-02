import React, { useState } from 'react';

const EditPlaylist = ({ playlist, onEdit, onCancel }) => {
  const [name, setName] = useState(playlist.name);
  const [category, setCategory] = useState(playlist.category);
  const [description, setDescription] = useState(playlist.description);
  const [hashtags, setHashtags] = useState(playlist.hashtags.join(', '));

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlaylist = {
      ...playlist,
      name,
      category,
      description,
      hashtags: hashtags.split(',').map(tag => tag.trim()),
    };
    onEdit(updatedPlaylist);
  };

  return (
    <div className="edit-playlist">
      <h3>Edit Playlist</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Hashtags:
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <small>Separate tags with commas.</small>
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save Changes</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 rounded-md">Cancel</button>
      </form>
    </div>
  );
};

export default EditPlaylist;
