import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfilePreview from './ProfilePreview';
import EditProfile from './EditProfile';
import FollowersFollowing from './followers';
import UserPlaylistsAndSongs from './userPlayList';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        gender: '',
        pronouns: '',
        username: '',
        email: '',
        profileImage: '',
        bio: '',
        socialMedia: [],
      },
      isEditing: false,
      playlists: [],
      songs: [],
      followers: [],
      following: [],
      friends: [],
      showFriends: false, // Toggle visibility for friends list
      showFollowers: false,   // Toggle visibility for followers list
      showFollowing: false, 
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    // Check if userId is in local storage
    if (!userId) {
      userId = localStorage.getItem('userId');
    } else {
      localStorage.setItem('userId', userId); // Save userId to local storage
    }

    if (userId) {
      this.fetchUserData(userId);
      this.fetchFriendsData(userId);
       // Fetch friends data
       this.fetchFollowersData(userId);
       this.fetchFollowingData(userId);
    } else {
      console.error('User ID not found in URL.');
    }
  }

  async fetchUserData(userId) {
    if (!userId || userId.length !== 24) {
      console.error('Invalid user ID');
      return;
    }
    try {
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();

      if (response.ok) {
        this.setState({
          user: {
            gender: data.gender,
            pronouns: data.pronouns,
            username: data.username,
            email: data.email,
            profileImage: data.profileImage,
            bio: data.bio,
            socialMedia: data.socialMedia,
          },
          playlists: data.playlists || [],
          followers: data.followers || [],
          following: data.following || [],
        });
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async fetchFriendsData(userId) {
    try {
      const response = await fetch(`/api/user/${userId}/friends`);
      const data = await response.json();

      if (response.ok) {
        this.setState({ friends: data.friends || [] });
      } else {
        console.error('Failed to fetch friends data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }

  async fetchFollowersData(userId) {
    try {
      const response = await fetch(`/api/user/${userId}/followers`);
      const data = await response.json();

      if (response.ok) {
        this.setState({ followers: data.followers || [] });
      } else {
        console.error('Failed to fetch followers data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }

  
  async fetchFollowingData(userId) {
    try {
      const response = await fetch(`/api/user/${userId}/following`);
      const data = await response.json();

      if (response.ok) {
        this.setState({ following: data.following || [] });
      } else {
        console.error('Failed to fetch following data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  }


  handleEditProfile = () => {
    this.setState({ isEditing: true });
  };

  handleSaveProfile = async (updatedUser) => {
    const { userId } = this.props;

    // Ensure socialMedia is sent as a comma-separated string
    const updatedUserData = {
      ...updatedUser,
      socialMedia: Array.isArray(updatedUser.socialMedia)
        ? updatedUser.socialMedia.join(', ')
        : updatedUser.socialMedia,
    };

    try {
      const response = await fetch(`/api/editProfile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        this.setState({
          user: { ...this.state.user, ...updatedUser },
          isEditing: false,
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to update user profile:', errorData.message || errorData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  handleCancelEdit = () => {
    this.setState({ isEditing: false });
  };

  // Toggle showing friends list
  toggleFriendsList = () => {
    this.setState((prevState) => ({ showFriends: !prevState.showFriends }));
  };

  toggleFollowersList = () => {
    this.setState((prevState) => ({ showFollowers: !prevState.showFollowers }));
  };

  // Toggle showing following list
  toggleFollowingList = () => {
    this.setState((prevState) => ({ showFollowing: !prevState.showFollowing }));
  };

  // Add delete profile method
  handleDeleteProfile = async () => {
    const { userId } = this.props;

    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/deleteProfile/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Redirect or handle successful deletion
          this.props.navigate('/'); // Redirect to home or another page
        } else {
          const errorData = await response.json();
          console.error('Failed to delete profile:', errorData.message || errorData);
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  render() {
    const { user, isEditing, playlists, followers, following, friends, showFriends, showFollowers, showFollowing,songs } = this.state;

    return (
      <div className="profile-page p-6 bg-gray-900 text-white">
        {isEditing ? (
          <EditProfile 
            user={user} 
            onSave={this.handleSaveProfile} 
            onCancel={this.handleCancelEdit} 
            userId={this.props.userId} 
          />
        ) : (
          <ProfilePreview user={user} onEditProfile={this.handleEditProfile} />
        )}

        {/* Friends Button */}
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-500"
          onClick={this.toggleFriendsList}
        >
          Friends: {friends.length}
        </button>

        {showFriends && (
          <div className="friends-list mt-4 p-4 bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Friends</h3>
            <ul>
              {friends.map((friend) => (
                <li key={friend._id} className="flex items-center space-x-3 mb-3">
                  <img
                    src={friend.profileImage || '/default-profile.png'}
                    alt={`${friend.username}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{friend.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Followers Button */}
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-500"
          onClick={this.toggleFollowersList}
        >
          Followers: {followers.length}
        </button>

        {showFollowers && (
          <div className="followers-list mt-4 p-4 bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Followers</h3>
            <ul>
              {followers.map((follower) => (
                <li key={follower._id} className="flex items-center space-x-3 mb-3">
                  <img
                    src={follower.profileImage || '/default-profile.png'}
                    alt={`${follower.username}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{follower.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Following Button */}
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-500"
          onClick={this.toggleFollowingList}
        >
          Following: {following.length}
        </button>

        {showFollowing && (
          <div className="following-list mt-4 p-4 bg-gray-800 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Following</h3>
            <ul>
              {following.map((followed) => (
                <li key={followed._id} className="flex items-center space-x-3 mb-3">
                  <img
                    src={followed.profileImage || '/default-profile.png'}
                    alt={`${followed.username}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{followed.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Delete Button */}
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-500"
          onClick={this.handleDeleteProfile}
        >
          Delete Profile
        </button>

        <div className="mt-6">
          <FollowersFollowing followers={followers} following={following} />
        </div>

        <div className="mt-6">
          <UserPlaylistsAndSongs playlists={playlists} songs={songs} />
        </div>
      </div>
    );
  }
}

const ProfilePageWrapper = (props) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  return <ProfilePage {...props} userId={userId} navigate={navigate} />;
};

export default ProfilePageWrapper;