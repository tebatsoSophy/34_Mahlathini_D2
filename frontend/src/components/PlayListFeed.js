import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlaylistPreview from './PlayListPreview';
import CreatePlaylist from './CreatePlayList';
import AddSongToPlaylist from './AddSongToPlayList'; // Import the AddSongToPlaylist component
import PlaySong from './PlaySong';

class PlayListFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      showCreatePlaylist: false,
      addingSongPlaylistId: null,
      selectedPlaylist: null,
      songs: [],
      loading: false,
      error: null,
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchPlaylists();
    this.fetchAllSongs();
  }

 // Method to update playlists by refetching them from the API
 updatePlaylists = async () => {
  this.setState({ loading: true });
  try {
    const response = await fetch('/api/playlist');
    const playlists = await response.json();
    this.setState({ playlists });
  } catch (error) {
    this.setState({ error: 'Error fetching playlists.' });
  } finally {
    this.setState({ loading: false });
  }
};

  fetchPlaylists = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch('/api/playlist');
      const playlists = await response.json();
      this.setState({ playlists });
    } catch (error) {
      this.setState({ error: 'Error fetching playlists.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchAllSongs = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch('/api/songs');
      const songs = await response.json();
      this.setState({ songs });
    } catch (error) {
      this.setState({ error: 'Error fetching songs.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchPlaylistDetails = async (playlistId) => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`/api/playlist/${playlistId}`);
      const playlist = await response.json();
      const songs = await this.fetchSongs(playlist.songs);
      this.setState({ selectedPlaylist: playlist, songs });
    } catch (error) {
      this.setState({ error: 'Error fetching playlist details.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchSongs = async (songIds) => {
    const promises = songIds.map(id => fetch(`/api/song/${id}`));
    const responses = await Promise.all(promises);
    const songs = await Promise.all(responses.map(res => res.json()));
    return songs;
  };

  handleSelectPlaylist = (playlistId) => {
    this.fetchPlaylistDetails(playlistId);
    this.props.navigate(`/playlist/${playlistId}`);
  };

  handleBackToFeed = () => {
    this.setState({
      selectedPlaylist: null,
      addingSongPlaylistId: null,
      songs: [],
    });
    this.props.navigate('/playlists');
  };

  handleCreatePlaylist = () => {
    this.setState({ showCreatePlaylist: true });
  };


  handleCreatePlaylistSubmit = (playlistId) => {
    this.setState({ showCreatePlaylist: false });
    this.updatePlaylists(); // Fetch the updated playlists
    this.handleSelectPlaylist(playlistId);
  };

  handleAddSong = (playlistId) => {
    this.setState({ addingSongPlaylistId: playlistId });
  };

  handleDeletePlaylist = async (playlistId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.setState({ error: 'User ID not found.' });
      return;
    }

    this.setState({ loading: true });
    try {
      const response = await fetch(`/api/deleteplaylist/${playlistId}/${userId}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok) {
        this.setState((prevState) => ({
          playlists: prevState.playlists.filter((playlist) => playlist._id !== playlistId),
        }));
      } else {
        this.setState({ error: result.message || 'Error deleting playlist.' });
      }
    } catch (error) {
      this.setState({ error: 'Error deleting playlist.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  

  handleSearch = async () => {
    const { searchQuery } = this.state;
    if (!searchQuery) return;

    this.setState({ loading: true });
    try {
      const response = await fetch(`/api/search/playlists?name=${encodeURIComponent(searchQuery)}`);
      const playlists = await response.json();
      this.setState({ playlists });
    } catch (error) {
      this.setState({ error: 'Error fetching search results.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  renderError = () => {
    return this.state.error && <div className="text-red-500">{this.state.error}</div>;
  };

  renderPlaylists = () => {
    const { playlists, searchQuery } = this.state;
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <h3 className={`text-2xl mb-4 ${searchQuery ? 'text-darkblue-800' : 'text-black'}`}>
          Your Playlists
        </h3>
        
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={this.handleCreatePlaylist}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400"
          >
            Create New Playlist
          </button>
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
              placeholder="Search for playlists..."
              style={{
                border: '1px solid gray',
                padding: '8px',
                borderRadius: '4px',
                color: '#1E3A8A',
                backgroundColor: 'white',
              }}
            />
            <button
              onClick={this.handleSearch}
              className="ml-2 bg-gray-300 p-2 rounded-md hover:bg-gray-400"
            >
              Search
            </button>
          </div>
        </div>
  
        {playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="flex justify-between items-center bg-white p-2 rounded-md shadow mb-2"
          >
            <div className="flex items-center">
              <img
                src={playlist.coverImage || 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2'}  // Use default if coverImage is empty
                alt={`${playlist.name} Cover`}
                className="w-16 h-16 object-cover rounded-lg mr-2 cursor-pointer"
                onClick={() => this.handleSelectPlaylist(playlist._id)}
              />
              <button
                onClick={() => this.handleSelectPlaylist(playlist._id)}
                className="text-darkblue-800 hover:underline"
              >
                {playlist.name}
              </button>
            </div>
            <button
              onClick={() => this.handleDeletePlaylist(playlist._id)}
              className="bg-red-500 text-white p-1 rounded-md hover:bg-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };

  renderSongs = () => {
    const { selectedPlaylist, songs } = this.state;
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
        <PlaylistPreview
          playlist={selectedPlaylist}
        />
        {songs.length > 0 ? (
          <ul className="song-list">
            {songs.map((song) => (
              <li key={song.id}>
                <PlaySong name={song.name} artist={song.artist} link={song.link} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs in this playlist.</p>
        )}
        <button onClick={() => this.handleAddSong(selectedPlaylist._id)} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400">Add Song</button>
        <button onClick={this.handleBackToFeed} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400">Back to Playlists</button>
      </div>
    );
  };

  render() {
    const { showCreatePlaylist, addingSongPlaylistId, selectedPlaylist } = this.state;

    if (showCreatePlaylist) {
      return (
        <CreatePlaylist
          onCancel={this.handleBackToFeed}
          onCreate={(playlistId) => {
            this.setState({ showCreatePlaylist: false });
            this.fetchPlaylists();
            this.handleSelectPlaylist(playlistId);
          }}
          userId={localStorage.getItem('userId')}
        />
      );
    }

    if (addingSongPlaylistId) {
      return (
        <AddSongToPlaylist
          selectedPlaylistId={addingSongPlaylistId}
          onCancel={() => this.setState({ addingSongPlaylistId: null })}
          songs={this.state.songs}
          userId={localStorage.getItem('userId')}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gray-800 p-4">
        {this.renderError()}
        {this.state.loading ? <p className="text-gray-500">Loading...</p> : selectedPlaylist ? this.renderSongs() : this.renderPlaylists()}
      </div>
    );
  }
}

// Higher Order Component to pass `navigate` prop to class component
const PlayListFeedWithNavigate = (props) => {
  const navigate = useNavigate();
  return <PlayListFeed {...props} navigate={navigate} />;
};

export default PlayListFeedWithNavigate;
