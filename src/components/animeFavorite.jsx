import '../css/navbar.css';
import '../css/animeFavorite.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GET_ANIME_DETAIL } from '../lib/queries/GetAnimeDetail';
import { GET_ANIME_LIST } from '../lib/queries/GetAnimeList';
import { useQuery } from '@apollo/client';

export function AnimeFavorite(){
    
    const [favorites, setFavorites] = useState([]);

    // useEffect(() => {
    //     const storedFavorites = JSON.parse(localStorage.getItem('16498')) || [];
    //     setFavorites(storedFavorites.map((id) => parseInt(id)));
    //   }, []);

    useEffect(() => {
        const storedFavorites = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          if (value === 'true') {
            storedFavorites.push(parseInt(key));
          }
        }
        setFavorites(storedFavorites);
    }, []);

    const { loading, error, data } = useQuery(GET_ANIME_LIST, {
        id : favorites
      });

    if(loading) return <h5>Loading...</h5>
    else if (error) return <h5>Error : {error.message}</h5>

    console.log(data);

    const favoritedAnime = data.Page.media.filter((anime) => favorites.includes(anime.id));

    function handleRemoveAllFavorites() {
        setFavorites([]);
        localStorage.clear();
    }

    return (
    <div>
        {favorites.length > 0 ? <h2>Favorite Anime List</h2> : (
        <h3>There's no favorite anime</h3>
        )}
        <div class="card-container">
            {
                favoritedAnime.map((media) => {
                    return (
                    <div class="content">
                        <div class="image">
                            <CardImage src={media.coverImage.large} />
                        </div>
                        <div class="score-amount" style={{backgroundColor: media.averageScore < 75 ? "orange" : "green"}}>
                            <CardContent>Score {media.averageScore}.0</CardContent>
                        </div>
                        <div class="title">
                            <CardTitle id={media.id}>{media.title.english}</CardTitle>
                        </div>
                    </div>
                    )
                })
            }
        </div>
        {favorites.length > 0 ? 
        <div class="remove-favorite-button">
            <button onClick={handleRemoveAllFavorites}>Remove All Favorites</button>
        </div>
        : (null)}
        
        <div class="footer"></div>
            <div class="bar">
                <div class="icon">
                    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,100,1,200" rel="stylesheet" />
                    <Link to={`/search`} class="material-symbols-outlined">search</Link>
                    <Link to={`/`} class="material-symbols-outlined">home</Link>
                    <Link to={`/favorite`} class="material-symbols-outlined">favorite</Link>
                </div>
            </div>
    </div>
    )
}

export function CardImage({ ...Attr}){
    return <img {...Attr} alt =""/>
}

export function CardContent({children}){
    return <p>{children}</p>
}

export function CardTitle({ id, children}){
    return <Link to={`/${id}`} style={{textDecoration: "none", color: "inherit", backgroundColor: "inherit"}}>{children}</Link>;
}