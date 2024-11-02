import React, { Component } from 'react';

class Playlist extends Component {
  handleSelect = () => {
    const { playlist, onSelect } = this.props;
    onSelect(playlist);
  };

  render() {
    const { playlist } = this.props;
    return (
      <div className="playlist">
        <h3>{playlist.title}</h3>
        <p>{playlist.description}</p>
        <button onClick={this.handleSelect}>View/Edit Playlist</button>
      </div>
    );
  }
}

export default Playlist;
