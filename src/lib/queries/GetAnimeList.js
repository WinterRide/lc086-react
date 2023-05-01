import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
query getAnimeList($page:Int, $perPage:Int){
    Page(page:$page, perPage:$perPage){
      media(type:ANIME, sort:POPULARITY_DESC) {
        id
        coverImage {  
          medium  
          large
          extraLarge
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
      }
    }
  }
`;