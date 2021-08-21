import React, { Fragment, useContext, useEffect } from 'react'
import PostItem from './PostItem'
import PostContext from '../../context/posts/postContext'
import axios from 'axios';

const Posts = () => {
  const postContext = useContext(PostContext)
  const { posts, getPosts } = postContext;
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  console.log(posts);
  if (posts != null && posts.length === 0) {
    return <h4>No posts found</h4>
  }

  return (
    <Fragment>
      {posts.map(post => (
        <PostItem post={post} />
      ))}
    </Fragment>
  )
}

export default Posts
