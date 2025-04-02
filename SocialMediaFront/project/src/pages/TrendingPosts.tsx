import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { fetchTrendingPosts } from '../api';
import { MessageSquare, TrendingUp } from 'lucide-react';

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchTrendingPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <TrendingUp className="text-red-500" />
        Trending Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
          >
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex items-center gap-2 text-indigo-600">
                <MessageSquare size={20} />
                <span>{post.commentCount} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;