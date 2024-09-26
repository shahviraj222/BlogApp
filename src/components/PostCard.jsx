import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/configappwrite';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, content }) {
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const preview = await appwriteService.getFilePreview(featuredImage);
                if (preview && preview.href) {
                    setPreviewUrl(preview.href);
                } else {
                    setError('Preview URL is missing');
                }
            } catch (error) {
                setError(`Error fetching file preview: ${error.message}`);
            }
        };

        if (featuredImage) {
            fetchPreview();
        }
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={previewUrl || 'placeholder-image-url.jpg'} // Use a placeholder image if previewUrl is empty
                        alt={title}
                        className='rounded-xl'
                    />
                    {error && <p className='text-red-500'>{error}</p>}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
                <div className='text-sm'>
                    {parse(content)} {/* Render the HTML content using html-react-parser */}
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
