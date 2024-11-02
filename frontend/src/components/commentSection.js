import React from "react";
class CommentSection extends React.Component {
    render() {
      const { comments } = this.props;
  
      return (
        <div className="comment-section">
          <h4>Comments</h4>
          <CommentList comments={comments} />
          <AddComment onAddComment={this.props.onAddComment} />
        </div>
      );
    }
  }
export default CommentSection;  