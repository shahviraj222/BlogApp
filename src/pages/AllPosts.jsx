import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/configappwrite'

function AllPosts(props) {
    const [posts, setPost] = useState([])
    useEffect(() => {
        appwriteService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPost(posts.documents)
                }
            })
        console.log(posts)
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (
                            < div key={post.$id} className='p-2 w-1/4' >
                                <PostCard
                                    $id={post.$id}
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                    content={post.content}
                                />
                            </div>
                        ))
                    }
                </div>
            </Container >
        </div >
    );
}

export default AllPosts;