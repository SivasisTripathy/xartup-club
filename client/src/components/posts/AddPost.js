import React, { useState, useContext, useEffect } from 'react'
import PostContext from '../../context/posts/postContext';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';

const AddPost = () => {
  const postContext = useContext(PostContext);
  const { addPost, updatePost, clearCurrent, current } = postContext;
  useEffect(() => {
    if (current !== null) {
      setPost(current);
    } else {
      setPost({
        title: '',
        description: ''
      });
    }
  }, [postContext, current]);
  const [post, setPost] = useState({
    title: '',
    description: ''
  });
  const { title, description } = post;

  const onChange = e =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addPost(post);
      window.location.href = '/';
    }
    else {
      updatePost(post);
    }
    clearAll();
  };
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div style={{ backgroundColor: "var(--dark-color)", height: "100%", minHeight: "100vh" }}>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Navbar />
      <div className="col-md-4 offset-md-4 text-center" id="page-wrap">
        <h2 style={{ marginTop: "5rem", marginBottom: "3rem", color: "var(--logo-color)" }}><b>
          {current ? 'Edit the Idea' : 'Add Your Idea'}
        </b>
        </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            type='text'
            placeholder='Title'
            name='title'
            value={title}
            onChange={onChange}
            required
            autoFocus
            rows={2}
            cols={50}
            style={{ borderRadius: "10px", marginBottom: "1rem" }}
          />
          <textarea
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={onChange}
            required
            rows={5}
            cols={50}
            style={{ borderRadius: "10px" }}
          />
          <div>
            <input
              type='submit'
              value={current ? 'Update Post' : 'Add Post'}
              className='btn btn-block' style={{ color: 'var(--logo-color)', backgroundColor: 'var(--black-color)', borderRadius: "10px" }}
            />
          </div>
          {current && (
            <div>
              <button className='btn btn-light btn-block' onClick={clearAll}>
                Clear
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddPost;
