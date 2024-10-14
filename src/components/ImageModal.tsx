import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faTimes } from '@fortawesome/free-solid-svg-icons';
import './css/ImageModal.css'

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    description: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, description, onClose }) => {
    if (!isOpen) return null;

    const openInNewTab = () => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <FontAwesomeIcon
                    icon={faTimes}
                    className="close-icon"
                    onClick={onClose}
                />
                <div className="image-container">
                    <img src={imageUrl} alt="Selected" />
                </div>
                <div className="modal-footer">
                    <p>{description}</p>
                    <FontAwesomeIcon
                        icon={faExpand}
                        className="enlarge-icon"
                        onClick={openInNewTab}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageModal;