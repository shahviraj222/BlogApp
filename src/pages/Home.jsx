import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/configappwrite';
import { Container, PostCard } from '../components';

function Home(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();
                if (response && response.documents) {
                    setPosts(response.documents);
                } else {
                    console.error('No documents found.');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <Container>
                <h1>Login to read Post</h1>
            </Container>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                                content={post.content}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
