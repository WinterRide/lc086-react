import { useQuery } from '@apollo/client';
import { GET_ANIME_LIST } from '../lib/queries/GetAnimeList';
import "../css/animeCard.css";
import '../css/navbar.css';
import { Link } from 'react-router-dom';

export default function Card(){
    <link rel="stylesheet" href="https://cdn.tailwindcss.com" />
    const {loading, error, data} = useQuery(GET_ANIME_LIST, {
        variables : {
            page : 1,
            perPage : 50
        }
    })

    if(loading) return <h5>Loading...</h5>
    else if (error) return <h5>Error : {error.message}</h5>

    console.log(data);

    return (
        <div>
            <h2>Anime List</h2>
            <div class="card-container">
            {
                data.Page.media.map((media) => {
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