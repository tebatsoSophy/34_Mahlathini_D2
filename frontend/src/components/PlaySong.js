import React, { Component } from 'react';

class PlaySong extends Component {
  render() {
    const { name, artist, link } = this.props;
    return (
      <div className="song bg-gray-800 p-4 rounded-lg shadow-md text-white"> {/* Darker background with padding */}
        <div className="song-info mb-2">
          <strong className="text-lg">{name}</strong> {/* Increased text size */}
          <p className="text-sm">{artist}</p> {/* Smaller text for artist */}
        </div>
        <a className="song-link bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition" href={link} target="_blank" rel="noopener noreferrer">
          Listen
        </a>
      </div>
    );
  }
}

export default PlaySong;
