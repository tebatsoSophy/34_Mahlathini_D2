import React, { Component } from 'react';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      artist: '',
      link: '',
      userId: localStorage.getItem('userId') || '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, artist, link, userId } = this.state;

    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`/api/addsong/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          artist,
          link,
        }),
      });

      if (response.ok) {
        this.props.addSong(this.state);
        this.setState({ name: '', artist: '', link: '' });
      } else {
        const error = await response.json();
        alert(`Failed to add song: ${error.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  render() {
    return (
      <div className="add-song border border-gray-300 bg-gray-50 p-4 rounded-lg shadow-md mb-4">
        <form 
          onSubmit={this.handleSubmit} 
          className="flex items-center justify-center space-x-2" // Horizontal layout
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Song Name"
            required
            className="border border-gray-400 rounded-lg p-1 text-sm text-darkblue-800" // Dark blue text
          />
          <input
            type="text"
            name="artist"
            value={this.state.artist}
            onChange={this.handleChange}
            placeholder="Artist"
            required
            className="border border-gray-400 rounded-lg p-1 text-sm text-darkblue-800" // Dark blue text
          />
          <input
            type="text"
            name="link"
            value={this.state.link}
            onChange={this.handleChange}
            placeholder="Song Link"
            required
            className="border border-gray-400 rounded-lg p-1 text-sm text-darkblue-800" // Dark blue text
          />
          <button 
            type="submit"
            className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600"
          >
            Add Song
          </button>
        </form>
      </div>
    );
  }
}

export default AddSong;
