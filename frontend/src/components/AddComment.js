// src/component/AddComment.js
import React, { Component } from 'react';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { commentText } = this.state;
    const { onAddComment } = this.props;
    if (commentText.trim()) {
      onAddComment(commentText);
      this.setState({ commentText: '' }); // Clear the input field after submission
    }
  };

  handleChange = (e) => {
    this.setState({ commentText: e.target.value });
  };

  render() {
    const { commentText } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="add-comment-form">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          value={commentText}
          onChange={this.handleChange}
        />
        <button type="submit">Post</button>
      </form>
    );
  }
}

export default AddComment;
