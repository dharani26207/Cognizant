import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [], // initialized with a list of Post
      hasError: false,
      errorMessage: ''
    };
  }

  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Map the loaded array into instances of the Post class
        const postInstances = data.slice(0, 10).map(p => new Post(p.id, p.title, p.body));
        this.setState({ posts: postInstances });
      })
      .catch(error => {
        // Trigger error reporting or update state
        this.setState({ hasError: true, errorMessage: error.message });
        throw error; // Let componentDidCatch handle it if desired, or handle here
      });
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidCatch(error, info) {
    // Set state and display error as alert message
    this.setState({ hasError: true, errorMessage: error.toString() });
    alert(`An error occurred in Posts component: ${error.toString()}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-alert">
          <h3>Failed to load blog posts.</h3>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return (
      <div className="posts-list">
        {this.state.posts.map(post => (
          <div key={post.id} className="post-item">
            <h3 className="post-heading">{post.title}</h3>
            <p className="post-paragraph">{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
