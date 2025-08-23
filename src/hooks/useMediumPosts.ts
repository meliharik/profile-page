import { useState, useEffect } from 'react';
import { MediumPost } from '@/types';

export const useMediumPosts = (activeSection: string) => {
  const [mediumPosts, setMediumPosts] = useState<MediumPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const fetchMediumPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@melihify');
      const data = await response.json();
      
      if (data.status === 'ok') {
        setMediumPosts(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching Medium posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (activeSection === 'blogs' && mediumPosts.length === 0) {
      fetchMediumPosts();
    }
  }, [activeSection, mediumPosts.length]);

  return { mediumPosts, loadingPosts, fetchMediumPosts };
}; 