
// pages/index.js
//new_23
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GifGallery from '../components/GifGallery';
import firebase from '../firebase';
import styles from '../styles/home.module.css';


const Home = () => {
  const [user, setUser] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
 // const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    
    const { searchKeyword: querySearchKeyword } = router.query;

    
    if (querySearchKeyword && querySearchKeyword !== searchKeyword) {
      setSearchKeyword(querySearchKeyword);
    }

    return () => {
      authListener(); 
    };
  }, [searchKeyword, router.query.searchKeyword]);

  const handleSearch = async () => {
    try {
      console.log('Searching for:', searchKeyword);
     
      const giphyEndpoint = `https://api.giphy.com/v1/gifs/search?q=${searchKeyword}&api_key=Zn0jaH8oioEmjjqpow99uk5YbVSru4WE&limit=10`;

     
      const response = await fetch(giphyEndpoint);
      const data = await response.json();

      
      const gifResults = data.data.map((gif) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,
        }));

      
      setSearchResults(gifResults);

      
      router.push(`/?searchKeyword=${searchKeyword}`);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Find Your Favourite GIF's Here~</h1>
        {user ? (
          <button onClick={() => firebase.auth().signOut()} className={styles['search-button']}>
            Sign Out
          </button>
        ) : (
          <div>
            <Link href="/login">
              Login
            </Link>{' '}
            |{' '}
            <Link href="/signup">
              Signup
            </Link>
          </div>
        )}
      </header>

      <main className={styles.mainContent}>
        <div className={styles['search-container']}>
          <input
            type="text"
            placeholder="Search GIFs"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className={styles['search-input']}
          />
          <button type="button" onClick={handleSearch} className={styles['search-button']}>
            Search
          </button>
        </div>

        <GifGallery searchKeyword={searchKeyword} />

        
      </main>
    </div>
  );
};

export default Home;
