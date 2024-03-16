import { React, useState, useEffect, useCallback } from 'react';
import Post from './Post.tsx';
import userData from '../backend/user.json'

function Feed() {

  const [posts, setPosts] = useState([]);

  const [likedPostsUrls, setLikedPostsUrls] = useState({})
  // const [likedCommentsIds, setLikedCommentsIds] = useState({})

  const [loadedPosts, setLoadedPosts] = useState([]);
  const postsPerLoad = 10;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    requestData();
  }, []);


  const requestData = () => {
    // Simulating fetching data
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoadedPosts(data.slice(0, postsPerLoad)); // Load initial posts
        if (data.length <= postsPerLoad) {
          setHasMore(false); // No more posts to load if initial load covers all
        }
        setLikedPostsUrls(userData.likedPostsUrls)
        // setLikedCommentsIds(userData.likedCommentsIds)
      })
      .catch(error => console.error('Error fetching post data:', error));
  };
  const loadMorePosts = useCallback(() => {
    const nextIndex = loadedPosts.length;
    const newLoadedPosts = posts.slice(nextIndex, nextIndex + postsPerLoad);
    setLoadedPosts(prevLoadedPosts => prevLoadedPosts.concat(newLoadedPosts));

    if (loadedPosts.length + newLoadedPosts.length === posts.length) {
      setHasMore(false); // Set hasMore to false if all posts are loaded
    }
  }, [loadedPosts, posts]); // Dependencies for useCallback

  // Using useCallback to memoize the function so it doesn't change on every render
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
            key={index} // It's better if post has a unique identifier to use as a key
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
            requestData={requestData}
          />
          )}
          {hasMore && <div>Loading more posts...</div>}
          </div>
    </>
  );
}

export default Feed;