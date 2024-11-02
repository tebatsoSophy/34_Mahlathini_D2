// src/component/FollowersFollowing.js
import React, { Component } from 'react';

class FollowersFollowing extends Component {
  render() {
    const { followers, following } = this.props;

    return (
      <div className="followers-following">
        <p>Followers: {followers.length}</p>
        <ul>
          {followers.map(follower => (
            <li key={follower.id}>{follower.name}</li>
          ))}
        </ul>
        <p>Following: {following.length}</p>
        <ul>
          {following.map(follow => (
            <li key={follow.id}>{follow.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FollowersFollowing;
