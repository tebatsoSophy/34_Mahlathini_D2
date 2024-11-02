import React, { Component } from 'react';

class PlaylistPreview extends Component {
  render() {
    const { playlist, onEdit } = this.props;

    return (
      <div className="playlist-preview bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <img 
          src={playlist.coverImage} 
          alt={`${playlist.name} Cover`} 
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h4 className="text-lg font-semibold">{playlist.name}</h4>
        <p>Category: {playlist.category}</p>
        <p>{playlist.description}</p>
        <div className="mt-2">
          {playlist.hashtags.map((tag, index) => (
            <span key={index} className="bg-blue-700 text-white text-xs px-2 py-1 rounded-md mr-2">
              #{tag}
            </span>
          ))}
        </div>
        <button 
          onClick={() => onEdit(playlist.id)} 
          className="bg-blue-600 p-3 w-full rounded-md hover:bg-blue-500 mt-4"
        >
          Edit
        </button>
      </div>
    );
  }
}

export default PlaylistPreview;
