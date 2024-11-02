import React, { Component } from 'react';
import Song from './Song';
import AddSong from './AddSong';

class SongFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      searchResults: [],
      searchValue: '',
      errorMessage: '',
      loading: false,
    };
  }

  async componentDidMount() {
    await this.loadSongs();
  }

  loadSongs = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch('/api/songs');
      const data = await response.json();

      if (response.ok) {
        this.setState({ songs: data });
      } else {
        this.setState({ errorMessage: data.message || 'Failed to load songs.' });
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      this.setState({ errorMessage: 'An unexpected error occurred.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearchInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearchSubmit = async () => {
    const { searchValue } = this.state;

    if (searchValue.trim() === '') return;

    try {
      const response = await fetch(`/api/search/songs?name=${searchValue}`);
      const results = await response.json();

      if (response.ok) {
        this.setState({ searchResults: results });
      } else {
        this.setState({ errorMessage: 'No songs found.' });
      }
    } catch (error) {
      console.error('Error searching songs:', error);
      this.setState({ errorMessage: 'An unexpected error occurred during search.' });
    }
  };

  addSong = (newSong) => {
    this.setState((prevState) => ({
      songs: [...prevState.songs, newSong],
    }));
  };

  deleteSong = async (songId) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`/api/deletesong/${songId}/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        this.setState((prevState) => ({
          songs: prevState.songs.filter((song) => song._id !== songId),
        }));
        alert(data.message);
      } else {
        alert(data.message || 'Failed to delete the song.');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('An unexpected error occurred while deleting the song.');
    }
  };

  render() {
    const { songs, searchResults, searchValue, errorMessage, loading } = this.state;

    return (
      <div className="container mx-auto p-6 my-8 bg-pink-100 border border-brown-500 rounded-lg shadow-lg">
        {loading && <div className="text-black">Loading...</div>}
        {errorMessage && <div className="text-red-500 font-bold mb-2">{errorMessage}</div>}

        <div className="flex justify-center mb-6">
          <AddSong addSong={this.addSong} />
        </div>

        {/* Search box and button */}
        <div className="flex justify-center mt-4 mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="border border-brown-400 rounded-lg p-2 w-64 text-darkblue-800" // Smaller width and centered
              placeholder="Search songs by name..."
              value={searchValue}
              onChange={this.handleSearchInputChange}
            />
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500" // Blue button
              onClick={this.handleSearchSubmit}
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-4">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((song) => (
                <li key={song._id}>
                  <Song
                    name={song.name}
                    artist={song.artist}
                    link={song.link}
                    onDelete={() => this.deleteSong(song._id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            searchValue && <p className="text-black">No songs found for "{searchValue}".</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {songs.map((song) => (
            <Song
              key={song._id}
              name={song.name}
              artist={song.artist}
              link={song.link}
              onDelete={() => this.deleteSong(song._id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SongFeed;
