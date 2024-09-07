import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    // Add event listener for infinite scrolling
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/posts?page=${page}&sort=updated_at,asc`);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage((prevPage) => prevPage + 1); // Increment page to fetch more posts
  };

  return (
    <div>
      <h1>Home Page</h1>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
