import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  UPVOTE_POST,
  POST_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: [],
    current: null,
    error: null
  };
  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts')
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  };

  const addPost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/posts', post, config);
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    };
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  };

  const updatePost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(`/api/posts/${post.id}`, post, config);

      dispatch({
        type: UPDATE_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  };

  const upvotePost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.put(`/api/posts/${post.id}/upvote`, post, config);
      dispatch({
        type: UPVOTE_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    };
  };

  const addComment = async (post, comment) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post(`/api/posts/${post.id}/comments`, comment, config);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };

  const deleteComment = async (post, comment) => {
    try {
      await axios.delete(`/api/posts/${post.id}/comments/${comment.id}`);
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          postId: post.id,
          commentId: comment.id
        }
      });
    } catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        error: err
      });
    }
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        error: state.error,
        current: state.current,
        getPosts,
        addPost,
        deletePost,
        updatePost,
        upvotePost,
        addComment,
        deleteComment,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;