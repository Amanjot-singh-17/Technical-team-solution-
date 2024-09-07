import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
      setEditData({ title: response.data.title, body: response.data.body });
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      navigate('/home');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/api/posts/${id}`, editData);
      setIsEditing(false);
      fetchPost();
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <textarea
            value={editData.body}
            onChange={(e) => setEditData({ ...editData, body: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostPage;

