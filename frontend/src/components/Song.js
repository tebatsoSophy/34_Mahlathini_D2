// Song.js
import React, { Component } from 'react';

class Song extends Component {
  render() {
    const { name, artist, link, onDelete } = this.props;

    return (
      <div className="song bg-gray-200 rounded p-4 flex justify-between items-center">
        <div className="song-details">
          <h3 className="text-lg font-semibold text-blue-800">{name}</h3> {/* Dark blue text */}
          <p className="text-gray-600">{artist}</p>
        </div>
        <div className="song-actions">
          <a href={link} className="text-blue-500 hover:underline">Listen</a>
          <button onClick={onDelete} className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded ml-2">Delete</button>
        </div>
      </div>
    );
  }
}

export default Song;
