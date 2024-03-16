import { useState, useEffect, useCallback } from 'react';
import Post from './Post.tsx';
import userData from '../backend/user.json'
import { CommentType } from './CommentSection.tsx';

type PostType = {
  key: number;
  post_url: string;
  title: string;
  created_at: string;
  num_hugs: number;
  patient_description: string;
  assessment: string;
  question: string;
  comments: Record<string, CommentType>;
  isHuggedByUser: boolean;
};

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [likedPostsUrls, setLikedPostsUrls] = useState<Record<number, boolean>>({});
  const [loadedPosts, setLoadedPosts] = useState<PostType[]>([]);
  const postsPerLoad = 10;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = () => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoadedPosts(data.slice(0, postsPerLoad)); // load initial posts
        if (data.length <= postsPerLoad) {
          setHasMore(false);
        }
        setLikedPostsUrls(userData.likedPostsUrls)
      })
      .catch(error => console.error('Error fetching post data:', error));
  };

  const loadMorePosts = useCallback(() => {
    const nextIndex = loadedPosts.length;
    const newLoadedPosts = posts.slice(nextIndex, nextIndex + postsPerLoad);
    setLoadedPosts(prev => [...prev, ...newLoadedPosts]);

    if (loadedPosts.length + newLoadedPosts.length === posts.length) {
      setHasMore(false);
    }
  }, [loadedPosts, posts]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 5 && hasMore
    ) {
      loadMorePosts();
    }
  }, [hasMore, loadMorePosts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="feed min-w-[px] bg-base-100 p-1 pt-0 mt-0 mx-5">
        {loadedPosts.map((post, index) =>
          <Post
            key={index}
            index={index}
            post_url={post.post_url}
            title={post.title}
            created_at={post.created_at}
            num_hugs={post.num_hugs}
            patient_description={post.patient_description}
            assessment={post.assessment}
            question={post.question}
            comments={post.comments}
            isHuggedByUser={likedPostsUrls[index]}
          />
          )}
          {hasMore && <div>Loading more posts...</div>}
          </div>
    </>
  );
}

export default Feed;