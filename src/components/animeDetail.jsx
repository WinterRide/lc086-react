import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { useState, useEffect } from "react";
import { GET_ANIME_DETAIL } from '../lib/queries/GetAnimeDetail';
import '../css/animeDetail.css';
import '../css/navbar.css';

export function AnimeDetail(){
    let param = useParams();
    const animeid = param.animeId;

    const {loading, error, data} = useQuery(GET_ANIME_DETAIL, {
        variables : {
            id: animeid
        }
    })

    useEffect(() => {
        setIsFavorite(localStorage.getItem(animeid) === "true");
    }, [animeid]);

    const isFavorited = localStorage.getItem(animeid);
    const [isFavorite, setIsFavorite] = useState(isFavorited === 'true');
    const handleAddToFavorite = () => {
        localStorage.setItem(animeid, 'true');
        setIsFavorite(true);
    }

    if(loading) return <h5>Loading...</h5>
    else if (error) return <h5>Error : {error.message}</h5>

    const handleFavoriteClick = () => {
        if (isFavorited) {
            localStorage.removeItem(animeid);
        } else {
            localStorage.setItem(animeid, true);
        }
        window.location.reload();
    };

    console.log(data);

    return (
        <div>
           {
            data.Page.media.map((anime)=> {
                return (
                    <div class="background">
                        <div class="image-detail">
                            <span><img src={anime.coverImage.large}/></span>
                            <span>
                                {isFavorite 
                                    ? <button onClick={handleFavoriteClick}>Remove from Favorites</button>
                                    : <button onClick={handleAddToFavorite}>Add to Favorites</button>
                                }
                            </span>
                        </div>
                        <br />
                        <div class="title">
                            <span class="head">Title</span>
                            <span>{'\u00A0'.repeat(17)} : &nbsp;</span>
                            <span>{anime.title.english}</span>
                        </div>
                        <div class="score">
                            <span class="head">Score</span>
                            <span>{'\u00A0'.repeat(15)} : &nbsp;</span>                            <span>{anime.averageScore}.0</span>
                        </div>
                        <div class="duration">
                            <span class="head">Duration</span>
                            <span>{'\u00A0'.repeat(9)} : &nbsp;</span>                            <span>{anime.duration} minutes</span>
                        </div>    
                        <div class="episodes">
                            <span class="head">Total Episodes</span>
                            <span>{'\u00A0'.repeat(0)} : &nbsp;</span>                            <span>{anime.episodes}</span>
                        </div>
                        <div class="genre">
                            <span class="head">Genre</span>
                            <span>{'\u00A0'.repeat(14)} : &nbsp;</span>                            <span>{anime.genres}</span>
                        </div>
                        <div>
                            <span class="head">Description</span>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</span>
                        </div>
                        <div class="description-content" dangerouslySetInnerHTML={{__html: anime.description}}> 
                        </div>
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
            })
           }
        </div>
    );
}
