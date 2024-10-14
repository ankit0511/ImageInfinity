import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Masonry from 'react-responsive-masonry';
import ImageModal from './ImageModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import './css/ImageGallery.css';

const API_KEY = '3WIgPehJxybIe6Pqll8wCcoX326leGDHA3ZawQeVpSVzFIS3fy2hSrJF';

interface Image {
    url: string;
    description: string;
}

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [description, setDescription] = useState<string>(''); 

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.pexels.com/v1/search?query=nature&page=${page}&per_page=25`,
                { headers: { Authorization: API_KEY } }
            );

            // Extract image URL and description
            const newImages = response.data.photos.map((img: { src: { medium: string }, alt: string }) => ({
                url: img.src.medium,
                description: img.alt || 'No description available',
            }));

            setImages((prevImages) => [...prevImages, ...newImages]);
            setLoading(false);

            if (newImages.length < 25) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const loadMoreImages = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const openModal = (imageUrl: string, description: string) => {
        console.log("Opening modal for image:", imageUrl);
        setSelectedImage(imageUrl);
        setDescription(description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={images.length}
                next={loadMoreImages}
                hasMore={hasMore}
                loader={loading && (
                    <div className="skeleton-wrapper">
                        {Array.from({ length: 25 }).map((_, index) => (
                            <div key={index} className="skeleton-item" />
                        ))}
                    </div>
                )}
                endMessage={<p style={{ textAlign: 'center' }}>No more images to load</p>}
            >
                <Masonry columnsCount={3} gutter="16px">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            alt={img.description}
                            onClick={() => openModal(img.url, img.description)}
                            className="image"
                        />
                    ))}
                </Masonry>
            </InfiniteScroll>
            <ImageModal isOpen={isModalOpen} imageUrl={selectedImage} description={description} onClose={closeModal} />
        </div>
    );
};

export default ImageGallery;
