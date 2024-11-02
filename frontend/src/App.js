// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, withRouter } from "react-router-dom";
import Splash from "./pages/Splash";
import SignUp from "./pages/SignUp";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import Header from "./components/header";
import '../public/assets/style.css';
import ProfilePage from "./components/Profile";
import CreatePlaylist from "./components/CreatePlayList";
import UserInfo from "./components/userInfo";
import PlaylistDetails from "./components/PlaylistDetails";
import PlaylistFeed from "./components/PlayListFeed";
import ProfilePageWrapper from "./components/Profile";
import EditPlaylist from "./components/EditPlayList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null
    };
  }

  handleSearchResult = (user) => {
    this.setState({ selectedUser: user });
  };

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route 
            path="/profile/:userId" 
            element={
              <>
                <Header />
                <ProfilePageWrapper />
              </>
            } 
          />
          <Route path="/createPlaylist" element={<CreatePlaylist />} />
          <Route path="/edit/:playlistId" element={<EditPlaylist />} />

          <Route 
            path="/home" 
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route 
            path="/playlists" 
            element={
              <>
                <Header />
                <PlaylistFeed />
              </>
            }
          />
          <Route 
            path="/playlist/:id" 
            element={
              <>
                <Header />
                <PlaylistFeed />
              </>
            }
          />
          <Route 
            path="/user-info" 
            element={
              <>
                <Header onSearchResult={this.handleSearchResult} />
                <UserInfo user={this.state.selectedUser} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;