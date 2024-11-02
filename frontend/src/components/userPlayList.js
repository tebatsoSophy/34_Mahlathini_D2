import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserPlaylistsAndSongs extends Component {
  render() {
    const { playlists, songs } = this.props; // Destructure props for convenience

    return (
      <div className="user-playlists-and-songs">
        <h3>Playlists</h3>
        {playlists.length > 0 ? (
          <ul className="playlist-list">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link to={`/playlist/${playlist.id}`}>
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No playlists available.</p>
        )}

        <h3>Songs</h3>
        {songs.length > 0 ? (
          <ul className="song-list">
            {songs.map((song) => (
              <li key={song.id}>
                {song.name} by {song.artist}
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs available.</p>
        )}
      </div>
    );
  }
}

export default UserPlaylistsAndSongs;
