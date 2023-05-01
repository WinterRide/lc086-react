import { gql } from '@apollo/client';

export const GET_ANIME_DETAIL = gql`
query getAnimeList($id:Int){
    Page(page:1, perPage:1){
      media(type:ANIME, id:$id) {
        id
        coverImage {
          large
        }
        title {
          romaji
          english
          native
          userPreferred
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        episodes
        averageScore
        description
        genres
        duration
      }
    }
    
  }
`;