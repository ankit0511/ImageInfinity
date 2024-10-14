import React from 'react';
import ImageGallery from './components/ImageGallery';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Image Gallery</h1>
            <h2> Store Of Infinity Images Just For You </h2>
            <ImageGallery />
        </div>
    );
};

export default App;