import { Show } from '../types';

/**
 * Sample shows and movies available across streaming platforms
 * This would typically be populated from a comprehensive database
 */
export const shows: Show[] = [
  // Netflix Originals
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    genre: ['Sci-Fi', 'Horror', 'Drama'],
    year: 2016,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 9,
    imdbRating: 8.7,
    description: 'A group of kids uncover supernatural mysteries in their small town',
    imageUrl: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'
  },
  {
    id: 'the-crown',
    title: 'The Crown',
    genre: ['Drama', 'Biography', 'History'],
    year: 2016,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 8,
    imdbRating: 8.6,
    description: 'Chronicles the reign of Queen Elizabeth II',
    imageUrl: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg'
  },
  
  // Disney+ Content
  {
    id: 'mandalorian',
    title: 'The Mandalorian',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    year: 2019,
    type: 'series',
    streamingServices: ['disney-plus'],
    popularity: 9,
    imdbRating: 8.7,
    description: 'A lone bounty hunter in the Star Wars universe',
    imageUrl: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg'
  },
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    year: 2019,
    type: 'movie',
    streamingServices: ['disney-plus'],
    popularity: 10,
    imdbRating: 8.4,
    description: 'The epic conclusion to the Marvel Cinematic Universe\'s Infinity Saga',
    imageUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  },

  // HBO Max / Max Content
  {
    id: 'game-of-thrones',
    title: 'Game of Thrones',
    genre: ['Fantasy', 'Drama', 'Action'],
    year: 2011,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 9,
    imdbRating: 9.2,
    description: 'Epic fantasy series about power struggles in Westeros',
    imageUrl: 'https://image.tmdb.org/t/p/w500/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg'
  },
  {
    id: 'succession',
    title: 'Succession',
    genre: ['Drama', 'Comedy'],
    year: 2018,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 8.8,
    description: 'A media dynasty family fights for control of their empire'
  },

  // Amazon Prime Video
  {
    id: 'the-boys',
    title: 'The Boys',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    year: 2019,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 9,
    imdbRating: 8.7,
    description: 'A dark take on superheroes and corporate corruption',
    imageUrl: 'https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg'
  },
  {
    id: 'jack-ryan',
    title: 'Tom Clancy\'s Jack Ryan',
    genre: ['Action', 'Drama', 'Thriller'],
    year: 2018,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 7,
    imdbRating: 8.0,
    description: 'CIA analyst Jack Ryan gets pulled into dangerous field assignments'
  },

  // Hulu
  {
    id: 'handmaids-tale',
    title: 'The Handmaid\'s Tale',
    genre: ['Drama', 'Sci-Fi', 'Thriller'],
    year: 2017,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 8,
    imdbRating: 8.4,
    description: 'Dystopian tale of a totalitarian society and forced reproduction'
  },
  {
    id: 'only-murders-building',
    title: 'Only Murders in the Building',
    genre: ['Comedy', 'Crime', 'Mystery'],
    year: 2021,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 8,
    imdbRating: 8.1,
    description: 'Three strangers become obsessed with a murder in their apartment building'
  },

  // Apple TV+
  {
    id: 'ted-lasso',
    title: 'Ted Lasso',
    genre: ['Comedy', 'Drama', 'Sport'],
    year: 2020,
    type: 'series',
    streamingServices: ['apple-tv-plus'],
    popularity: 9,
    imdbRating: 8.8,
    description: 'An American football coach moves to England to coach soccer'
  },
  {
    id: 'severance',
    title: 'Severance',
    genre: ['Drama', 'Mystery', 'Sci-Fi'],
    year: 2022,
    type: 'series',
    streamingServices: ['apple-tv-plus'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'Workers surgically divide their memories between work and personal life'
  },

  // Multi-platform content
  {
    id: 'the-office',
    title: 'The Office',
    genre: ['Comedy'],
    year: 2005,
    type: 'series',
    streamingServices: ['peacock', 'netflix'],
    popularity: 10,
    imdbRating: 8.9,
    description: 'Mockumentary about office workers at a paper company'
  },
  {
    id: 'friends',
    title: 'Friends',
    genre: ['Comedy', 'Romance'],
    year: 1994,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 10,
    imdbRating: 8.9,
    description: 'Six friends navigate life and love in New York City'
  },
  {
    id: 'always-sunny',
    title: 'It\'s Always Sunny in Philadelphia',
    genre: ['Comedy'],
    year: 2005,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 8,
    imdbRating: 8.8,
    description: 'A group of friends run a bar and get into ridiculous situations'
  },
  {
    id: 'brooklyn-nine-nine',
    title: 'Brooklyn Nine-Nine',
    genre: ['Comedy', 'Crime'],
    year: 2013,
    type: 'series',
    streamingServices: ['hulu', 'peacock'],
    popularity: 9,
    imdbRating: 8.4,
    description: 'Comedy series about detectives in a Brooklyn police precinct'
  },
  {
    id: 'parks-and-rec',
    title: 'Parks and Recreation',
    genre: ['Comedy'],
    year: 2009,
    type: 'series',
    streamingServices: ['peacock', 'hulu'],
    popularity: 9,
    imdbRating: 8.6,
    description: 'Mockumentary about local government employees in a small town'
  },
  {
    id: 'schitts-creek',
    title: 'Schitt\'s Creek',
    genre: ['Comedy'],
    year: 2015,
    type: 'series',
    streamingServices: ['hulu', 'netflix'],
    popularity: 8,
    imdbRating: 8.5,
    description: 'A wealthy family loses everything and must live in a small town they once bought as a joke'
  },

  // Paramount+
  {
    id: 'yellowstone',
    title: 'Yellowstone',
    genre: ['Drama', 'Western'],
    year: 2018,
    type: 'series',
    streamingServices: ['paramount-plus'],
    popularity: 9,
    imdbRating: 8.7,
    description: 'A ranching family fights to protect their land in Montana'
  },
  {
    id: 'letterkenny',
    title: 'Letterkenny',
    genre: ['Comedy', 'Drama'],
    year: 2016,
    type: 'series',
    streamingServices: ['crave'],
    popularity: 8,
    imdbRating: 8.6,
    description: 'Canadian comedy series about life in rural Ontario'
  },
  {
    id: 'schitts-creek',
    title: "Schitt's Creek",
    genre: ['Comedy', 'Drama'],
    year: 2015,
    type: 'series',
    streamingServices: ['crave', 'netflix'],
    popularity: 9,
    imdbRating: 8.5,
    description: 'A wealthy family suddenly finds themselves broke'
  }
];