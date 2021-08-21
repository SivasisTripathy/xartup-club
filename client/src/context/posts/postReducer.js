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

const postReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case ADD_POST:
      console.log(state.posts);
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id)
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? post = action.payload : post
        )
      };
    case POST_ERROR:
    case COMMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPVOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.id !== action.payload.commentId)
            };
          }
          return post;
        })
      };
    default:
      return state;
  }
};

export default postReducer;