import React, { Component } from 'react';
import Comment from './comment';

class CommentList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <div className="comment-list">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}

export default CommentList;
