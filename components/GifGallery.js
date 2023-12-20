import React, { useState, useEffect } from 'react';


const GifGallery = ({ searchKeyword }) => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  


  useEffect(() => {
    const fetchGifs = async () => {
      try {
        setLoading(true);
        
        const giphyEndpoint = `https://api.giphy.com/v1/gifs/search?q=${searchKeyword || 'trending'}&api_key=Zn0jaH8oioEmjjqpow99uk5YbVSru4WE&limit=10`;

        
        const response = await fetch(giphyEndpoint);
        const data = await response.json();

        
        const gifResults = data.data.map((gif) => ({
          id: gif.id,
          url: gif.images.fixed_height.url,
          title: gif.title,
        }));

        
        setGifs(gifResults);
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifs();
  }, [searchKeyword]);

 

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && gifs.length === 0 && <p>No GIFs found</p>}
      {!loading &&
        gifs.map((gif) => (
          <div key={gif.id}>
            <img src={gif.url} alt={gif.title} />
          </div>
        ))}
        
    </div>


  );
};

export default GifGallery;



// GifGallery.js

// GifGallery.js

