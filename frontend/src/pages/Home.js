import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import SongFeed from '../components/Songfeed';
import AddSong from '../components/AddSong';
import PlaylistFeed from '../components/PlayListFeed';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'songfeed', // Default view
      songs: [],
    };
  }

  handleEdit = (playlistId) => {
    console.log('Edit Playlist with ID:', playlistId);
  };

  switchView = (view) => {
    this.setState({ view });
    // Navigate to the appropriate path based on the view
    if (view === 'playlistfeed') {
      this.props.navigate('/playlists');
    } else {
      this.props.navigate('/home');
    }
  };

  render() {
    const { view, songs } = this.state;
    const { playlists } = this.props; // Use playlists from props

    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="bg-mint-200 p-4 rounded-lg shadow-md">
          {view === 'songfeed' && (
            <>
              <SongFeed songs={songs} />
            </>
          )}

          {view === 'playlistfeed' && (
            <PlaylistFeed 
              playlists={playlists} 
              onEdit={this.handleEdit} 
            />
          )}

          <div className="flex justify-between mt-4">
            <button 
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => this.switchView('songfeed')}
            >
              Song Feed
            </button>
            <button 
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => this.switchView('playlistfeed')}
            >
              Playlist Feed
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Higher Order Component to pass navigate hook to the class component
export default (props) => (
  <Home {...props} navigate={useNavigate()} />
);