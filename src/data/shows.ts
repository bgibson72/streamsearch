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
    id: 'only-murders-in-the-building',
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

  // More Netflix Content
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2008,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 10,
    imdbRating: 9.5,
    description: 'A high school chemistry teacher turned methamphetamine cook'
  },
  {
    id: 'ozark',
    title: 'Ozark',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2017,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 8,
    imdbRating: 8.4,
    description: 'A financial advisor launders money for a Mexican cartel'
  },
  {
    id: 'narcos',
    title: 'Narcos',
    genre: ['Crime', 'Drama', 'Biography'],
    year: 2015,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 8,
    imdbRating: 8.8,
    description: 'The rise and fall of Colombian drug lord Pablo Escobar'
  },
  {
    id: 'money-heist',
    title: 'Money Heist (La Casa de Papel)',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2017,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 9,
    imdbRating: 8.2,
    description: 'A criminal mastermind manipulates hostages and police'
  },
  {
    id: 'squid-game',
    title: 'Squid Game',
    genre: ['Drama', 'Thriller', 'Horror'],
    year: 2021,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 10,
    imdbRating: 8.0,
    description: 'Desperate contestants compete in deadly childhood games'
  },

  // More Disney+ Content  
  {
    id: 'wanda-vision',
    title: 'WandaVision',
    genre: ['Sci-Fi', 'Drama', 'Comedy'],
    year: 2021,
    type: 'series',
    streamingServices: ['disney-plus'],
    popularity: 8,
    imdbRating: 7.9,
    description: 'Wanda and Vision live idealized suburban lives'
  },
  {
    id: 'loki',
    title: 'Loki',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    year: 2021,
    type: 'series',
    streamingServices: ['disney-plus'],
    popularity: 8,
    imdbRating: 8.2,
    description: 'The god of mischief steps out of his brother\'s shadow'
  },
  {
    id: 'frozen',
    title: 'Frozen',
    genre: ['Animation', 'Adventure', 'Comedy'],
    year: 2013,
    type: 'movie',
    streamingServices: ['disney-plus'],
    popularity: 9,
    imdbRating: 7.4,
    description: 'A fearless princess sets off to find her estranged sister'
  },
  {
    id: 'moana',
    title: 'Moana',
    genre: ['Animation', 'Adventure', 'Comedy'],
    year: 2016,
    type: 'movie',
    streamingServices: ['disney-plus'],
    popularity: 8,
    imdbRating: 7.6,
    description: 'A spirited teenager sails across the Pacific'
  },

  {
    id: 'the-sopranos',
    title: 'The Sopranos',
    genre: ['Crime', 'Drama'],
    year: 1999,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 9.2,
    description: 'A New Jersey mob boss struggles to manage his family'
  },
  {
    id: 'euphoria',
    title: 'Euphoria',
    genre: ['Drama', 'Romance'],
    year: 2019,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 8.4,
    description: 'A group of teenagers navigate love, drugs, and trauma'
  },
  {
    id: 'the-white-lotus',
    title: 'The White Lotus',
    genre: ['Comedy', 'Drama', 'Mystery'],
    year: 2021,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 7.9,
    description: 'Dark comedy set at a tropical resort'
  },

  // More Amazon Prime Content
  {
    id: 'marvelous-mrs-maisel',
    title: 'The Marvelous Mrs. Maisel',
    genre: ['Comedy', 'Drama'],
    year: 2017,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'A housewife discovers a talent for stand-up comedy'
  },
  {
    id: 'fleabag',
    title: 'Fleabag',
    genre: ['Comedy', 'Drama'],
    year: 2016,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'A dry-witted woman navigates life in London'
  },

  // More Hulu Content  
  {
    id: 'the-bear',
    title: 'The Bear',
    genre: ['Comedy', 'Drama'],
    year: 2022,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'A young chef tries to save his family\'s Italian beef restaurant'
  },
  {
    id: 'abbott-elementary',
    title: 'Abbott Elementary',
    genre: ['Comedy'],
    year: 2021,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 7,
    imdbRating: 8.2,
    description: 'Mockumentary about teachers in an underfunded school'
  },

  // Apple TV+ Content
  {
    id: 'the-morning-show',
    title: 'The Morning Show',
    genre: ['Drama'],
    year: 2019,
    type: 'series',
    streamingServices: ['apple-tv-plus'],
    popularity: 7,
    imdbRating: 7.8,
    description: 'Behind the scenes drama at a morning news show'
  },
  {
    id: 'foundation',
    title: 'Foundation',
    genre: ['Drama', 'Sci-Fi'],
    year: 2021,
    type: 'series',
    streamingServices: ['apple-tv-plus'],
    popularity: 7,
    imdbRating: 7.3,
    description: 'A mathematician predicts the fall of the galactic empire'
  },

  // More Paramount+ Content
  {
    id: 'star-trek-strange-new-worlds',
    title: 'Star Trek: Strange New Worlds',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    year: 2022,
    type: 'series',
    streamingServices: ['paramount-plus'],
    popularity: 7,
    imdbRating: 8.4,
    description: 'Captain Pike explores strange new worlds'
  },
  {
    id: 'south-park',
    title: 'South Park',
    genre: ['Animation', 'Comedy'],
    year: 1997,
    type: 'series',
    streamingServices: ['paramount-plus', 'hbo-max'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'Four boys have surreal adventures in a Colorado town'
  },
  {
    id: 'the-good-fight',
    title: 'The Good Fight',
    genre: ['Drama', 'Crime'],
    year: 2017,
    type: 'series',
    streamingServices: ['paramount-plus'],
    popularity: 7,
    imdbRating: 8.4,
    description: 'Lawyers navigate the political and legal landscape'
  },

  // Discovery+ Content
  {
    id: 'fixer-upper',
    title: 'Fixer Upper',
    genre: ['Reality'],
    year: 2013,
    type: 'series',
    streamingServices: ['discovery-plus'],
    popularity: 7,
    imdbRating: 7.8,
    description: 'Chip and Joanna Gaines renovate homes in Waco, Texas'
  },
  {
    id: '90-day-fiance',
    title: '90 Day Fiancé',
    genre: ['Reality', 'Romance'],
    year: 2014,
    type: 'series',
    streamingServices: ['discovery-plus'],
    popularity: 7,
    imdbRating: 6.8,
    description: 'Americans marry foreigners on K-1 visas'
  },
  {
    id: 'planet-earth',
    title: 'Planet Earth',
    genre: ['Documentary', 'Nature'],
    year: 2006,
    type: 'series',
    streamingServices: ['discovery-plus', 'netflix'],
    popularity: 8,
    imdbRating: 9.4,
    description: 'Stunning wildlife documentary series'
  },

  // Tubi Content (Free)
  {
    id: 'the-pursuit-of-happyness',
    title: 'The Pursuit of Happyness',
    genre: ['Biography', 'Drama'],
    year: 2006,
    type: 'movie',
    streamingServices: ['tubi'],
    popularity: 8,
    imdbRating: 8.0,
    description: 'A struggling salesman takes custody of his son'
  },
  {
    id: 'john-wick',
    title: 'John Wick',
    genre: ['Action', 'Crime', 'Thriller'],
    year: 2014,
    type: 'movie',
    streamingServices: ['tubi', 'peacock'],
    popularity: 8,
    imdbRating: 7.4,
    description: 'An ex-hitman seeks vengeance for his murdered dog'
  },
  {
    id: 'midsommar',
    title: 'Midsommar',
    genre: ['Drama', 'Horror', 'Mystery'],
    year: 2019,
    type: 'movie',
    streamingServices: ['tubi'],
    popularity: 7,
    imdbRating: 7.1,
    description: 'A couple travels to Sweden for a midsummer festival'
  },

  // Pluto TV Content (Free)
  {
    id: 'the-twilight-zone',
    title: 'The Twilight Zone',
    genre: ['Drama', 'Fantasy', 'Horror'],
    year: 1959,
    type: 'series',
    streamingServices: ['pluto-tv'],
    popularity: 8,
    imdbRating: 9.0,
    description: 'Anthology series of supernatural and sci-fi stories'
  },
  {
    id: 'mystery-science-theater-3000',
    title: 'Mystery Science Theater 3000',
    genre: ['Comedy', 'Sci-Fi'],
    year: 1988,
    type: 'series',
    streamingServices: ['pluto-tv', 'netflix'],
    popularity: 7,
    imdbRating: 8.6,
    description: 'A man and his robot friends make fun of bad movies'
  },

  // Cross-platform Popular Shows
  {
    id: 'grey-anatomy',
    title: 'Grey\'s Anatomy',
    genre: ['Drama', 'Romance'],
    year: 2005,
    type: 'series',
    streamingServices: ['hulu', 'netflix'],
    popularity: 8,
    imdbRating: 7.6,
    description: 'Surgical interns and residents navigate medicine and relationships'
  },
  {
    id: 'criminal-minds',
    title: 'Criminal Minds',
    genre: ['Crime', 'Drama', 'Mystery'],
    year: 2005,
    type: 'series',
    streamingServices: ['paramount-plus', 'hulu'],
    popularity: 8,
    imdbRating: 8.1,
    description: 'FBI behavioral analysts profile serial killers'
  },
  {
    id: 'jeopardy',
    title: 'Jeopardy!',
    genre: ['Game Show'],
    year: 1984,
    type: 'series',
    streamingServices: ['pluto-tv'],
    popularity: 7,
    imdbRating: 8.0,
    description: 'Classic quiz show with Alex Trebek and Mayim Bialik'
  },

  // Recent Popular Movies
  {
    id: 'dune',
    title: 'Dune',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    year: 2021,
    type: 'movie',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 8.0,
    description: 'A noble family becomes embroiled in a war for a desert planet'
  },
  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: No Way Home',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    year: 2021,
    type: 'movie',
    streamingServices: ['netflix'],
    popularity: 9,
    imdbRating: 8.2,
    description: 'Spider-Man faces villains from alternate realities'
  },
  {
    id: 'top-gun-maverick',
    title: 'Top Gun: Maverick',
    genre: ['Action', 'Drama'],
    year: 2022,
    type: 'movie',
    streamingServices: ['paramount-plus'],
    popularity: 9,
    imdbRating: 8.3,
    description: 'Maverick trains a new generation of Top Gun pilots'
  },
  {
    id: 'everything-everywhere-all-at-once',
    title: 'Everything Everywhere All at Once',
    genre: ['Action', 'Adventure', 'Comedy'],
    year: 2022,
    type: 'movie',
    streamingServices: ['amazon-prime'],
    popularity: 8,
    imdbRating: 7.8,
    description: 'A woman explores parallel universes to save her family'
  },
  {
    id: 'the-batman',
    title: 'The Batman',
    genre: ['Action', 'Crime', 'Drama'],
    year: 2022,
    type: 'movie',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 7.8,
    description: 'Batman investigates corruption in Gotham City'
  },

  // Classic Movies  
  {
    id: 'pulp-fiction',
    title: 'Pulp Fiction',
    genre: ['Crime', 'Drama'],
    year: 1994,
    type: 'movie',
    streamingServices: ['netflix', 'tubi'],
    popularity: 9,
    imdbRating: 8.9,
    description: 'Interconnected stories of crime in Los Angeles'
  },
  {
    id: 'the-godfather',
    title: 'The Godfather',
    genre: ['Crime', 'Drama'],
    year: 1972,
    type: 'movie',
    streamingServices: ['paramount-plus'],
    popularity: 9,
    imdbRating: 9.2,
    description: 'The aging patriarch transfers control of his crime family'
  },
  {
    id: 'forrest-gump',
    title: 'Forrest Gump',
    genre: ['Drama', 'Romance'],
    year: 1994,
    type: 'movie',
    streamingServices: ['netflix', 'paramount-plus'],
    popularity: 9,
    imdbRating: 8.8,
    description: 'A man with low IQ accomplishes great things'
  },
  {
    id: 'shawshank-redemption',
    title: 'The Shawshank Redemption',
    genre: ['Drama'],
    year: 1994,
    type: 'movie',
    streamingServices: ['netflix'],
    popularity: 9,
    imdbRating: 9.3,
    description: 'Two imprisoned men bond and find solace through acts of decency'
  },

  // Additional Popular Netflix Content
  {
    id: 'wednesday',
    title: 'Wednesday',
    genre: ['Comedy', 'Crime', 'Fantasy'],
    year: 2022,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 9,
    imdbRating: 8.1,
    description: 'Wednesday Addams investigates mysteries at Nevermore Academy'
  },
  {
    id: 'cobra-kai',
    title: 'Cobra Kai',
    genre: ['Action', 'Comedy', 'Drama'],
    year: 2018,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 8,
    imdbRating: 8.5,
    description: 'The Karate Kid saga continues decades later'
  },
  {
    id: 'bridgerton',
    title: 'Bridgerton',
    genre: ['Drama', 'Romance'],
    year: 2020,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 8,
    imdbRating: 7.3,
    description: 'Romantic drama set in Regency England'
  },
  {
    id: 'dark',
    title: 'Dark',
    genre: ['Drama', 'Mystery', 'Sci-Fi'],
    year: 2017,
    type: 'series',
    streamingServices: ['netflix'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'Time travel thriller across multiple generations'
  },

  // Additional Disney+ Content
  {
    id: 'encanto',
    title: 'Encanto',
    genre: ['Animation', 'Adventure', 'Comedy'],
    year: 2021,
    type: 'movie',
    streamingServices: ['disney-plus'],
    popularity: 8,
    imdbRating: 7.2,
    description: 'A magical family loses their powers'
  },
  {
    id: 'turning-red',
    title: 'Turning Red',
    genre: ['Animation', 'Adventure', 'Comedy'],
    year: 2022,
    type: 'movie',
    streamingServices: ['disney-plus'],
    popularity: 7,
    imdbRating: 7.0,
    description: 'A teenager turns into a giant red panda when excited'
  },
  {
    id: 'moon-knight',
    title: 'Moon Knight',
    genre: ['Action', 'Adventure', 'Fantasy'],
    year: 2022,
    type: 'series',
    streamingServices: ['disney-plus'],
    popularity: 8,
    imdbRating: 7.3,
    description: 'A man with multiple personalities becomes a superhero'
  },

  // Additional HBO Max Content
  {
    id: 'house-of-dragon',
    title: 'House of the Dragon',
    genre: ['Action', 'Adventure', 'Drama'],
    year: 2022,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 9,
    imdbRating: 8.4,
    description: 'Game of Thrones prequel about the Targaryen civil war'
  },
  {
    id: 'peacemaker',
    title: 'Peacemaker',
    genre: ['Action', 'Comedy', 'Crime'],
    year: 2022,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 8.3,
    description: 'Antihero vigilante fights aliens and corruption'
  },
  {
    id: 'barry',
    title: 'Barry',
    genre: ['Comedy', 'Crime', 'Drama'],
    year: 2018,
    type: 'series',
    streamingServices: ['hbo-max'],
    popularity: 8,
    imdbRating: 8.3,
    description: 'A hitman discovers a passion for acting'
  },

  // Additional Amazon Prime Content
  {
    id: 'rings-of-power',
    title: 'The Lord of the Rings: The Rings of Power',
    genre: ['Adventure', 'Drama', 'Fantasy'],
    year: 2022,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 8,
    imdbRating: 6.9,
    description: 'Second Age of Middle-earth epic fantasy series'
  },
  {
    id: 'invincible',
    title: 'Invincible',
    genre: ['Animation', 'Action', 'Adventure'],
    year: 2021,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 8,
    imdbRating: 8.7,
    description: 'Teenage superhero discovers dark family secrets'
  },
  {
    id: 'upload',
    title: 'Upload',
    genre: ['Comedy', 'Sci-Fi'],
    year: 2020,
    type: 'series',
    streamingServices: ['amazon-prime'],
    popularity: 7,
    imdbRating: 7.8,
    description: 'A man uploads his consciousness to digital afterlife'
  },

  // Additional Hulu Content
  {
    id: 'dopesick',
    title: 'Dopesick',
    genre: ['Biography', 'Drama', 'History'],
    year: 2021,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 8,
    imdbRating: 8.6,
    description: 'The story of the opioid crisis in America'
  },
  {
    id: 'pen15',
    title: 'PEN15',
    genre: ['Comedy'],
    year: 2019,
    type: 'series',
    streamingServices: ['hulu'],
    popularity: 7,
    imdbRating: 8.0,
    description: 'Adult women play their teenage selves in middle school'
  },

  // Additional Apple TV+ Content
  {
    id: 'for-all-mankind',
    title: 'For All Mankind',
    genre: ['Drama', 'Sci-Fi'],
    year: 2019,
    type: 'series',
    streamingServices: ['apple-tv-plus'],
    popularity: 8,
    imdbRating: 8.1,
    description: 'Alternate history where the space race never ended'
  },
  {
    id: 'mythic-quest',
    title: 'Mythic Quest',
    genre: ['Comedy'],
    year: 2020,
    type: 'series',
    streamingServices: ['apple-tv-plus'],
    popularity: 7,
    imdbRating: 7.7,
    description: 'Comedy about video game developers'
  },

  // Additional Paramount+ Content
  {
    id: 'yellowjackets',
    title: 'Yellowjackets',
    genre: ['Drama', 'Horror', 'Mystery'],
    year: 2021,
    type: 'series',
    streamingServices: ['paramount-plus'],
    popularity: 8,
    imdbRating: 7.8,
    description: 'Survival thriller about a high school soccer team'
  },
  {
    id: 'evil',
    title: 'Evil',
    genre: ['Crime', 'Drama', 'Mystery'],
    year: 2019,
    type: 'series',
    streamingServices: ['paramount-plus'],
    popularity: 7,
    imdbRating: 7.7,
    description: 'Investigators examine supernatural phenomena'
  },

  // Additional Peacock Content
  {
    id: 'bel-air',
    title: 'Bel-Air',
    genre: ['Drama'],
    year: 2022,
    type: 'series',
    streamingServices: ['peacock'],
    popularity: 7,
    imdbRating: 6.3,
    description: 'Dramatic reimagining of The Fresh Prince of Bel-Air'
  },
  {
    id: 'saved-by-the-bell-reboot',
    title: 'Saved by the Bell (2020)',
    genre: ['Comedy'],
    year: 2020,
    type: 'series',
    streamingServices: ['peacock'],
    popularity: 6,
    imdbRating: 6.8,
    description: 'New generation at Bayside High School'
  },

  // Additional Discovery+ Content
  {
    id: 'tiger-king',
    title: 'Tiger King',
    genre: ['Documentary', 'Crime'],
    year: 2020,
    type: 'series',
    streamingServices: ['discovery-plus'],
    popularity: 8,
    imdbRating: 7.5,
    description: 'Wild documentary about big cat owners'
  },
  {
    id: 'deadliest-catch',
    title: 'Deadliest Catch',
    genre: ['Documentary', 'Reality-TV'],
    year: 2005,
    type: 'series',
    streamingServices: ['discovery-plus'],
    popularity: 7,
    imdbRating: 8.2,
    description: 'Dangerous Alaskan crab fishing adventures'
  },

  // Additional Tubi Content
  {
    id: 'the-hills-have-eyes',
    title: 'The Hills Have Eyes',
    genre: ['Horror', 'Thriller'],
    year: 2006,
    type: 'movie',
    streamingServices: ['tubi'],
    popularity: 6,
    imdbRating: 6.4,
    description: 'Horror remake about a family stranded in the desert'
  },
  {
    id: 'hell-house-llc',
    title: 'Hell House LLC',
    genre: ['Horror'],
    year: 2015,
    type: 'movie',
    streamingServices: ['tubi'],
    popularity: 6,
    imdbRating: 6.4,
    description: 'Found footage horror in a haunted house attraction'
  },

  // Additional Pluto TV Content
  {
    id: 'forensic-files',
    title: 'Forensic Files',
    genre: ['Documentary', 'Crime'],
    year: 1996,
    type: 'series',
    streamingServices: ['pluto-tv'],
    popularity: 7,
    imdbRating: 8.8,
    description: 'True crime cases solved through forensic science'
  },
  {
    id: 'unsolved-mysteries',
    title: 'Unsolved Mysteries',
    genre: ['Documentary', 'Crime', 'Mystery'],
    year: 1987,
    type: 'series',
    streamingServices: ['pluto-tv'],
    popularity: 7,
    imdbRating: 8.2,
    description: 'Real-life mysteries and cold cases'
  },

  // Cross-platform Recent Hits
  {
    id: 'top-chef',
    title: 'Top Chef',
    genre: ['Reality-TV'],
    year: 2006,
    type: 'series',
    streamingServices: ['peacock', 'hulu'],
    popularity: 7,
    imdbRating: 7.5,
    description: 'Professional chefs compete in culinary challenges'
  },
  {
    id: 'the-masked-singer',
    title: 'The Masked Singer',
    genre: ['Music', 'Reality-TV'],
    year: 2019,
    type: 'series',
    streamingServices: ['hulu', 'tubi'],
    popularity: 6,
    imdbRating: 5.8,
    description: 'Celebrities perform songs while wearing elaborate costumes'
  },
  {
    id: 'survivor',
    title: 'Survivor',
    genre: ['Adventure', 'Game-Show', 'Reality-TV'],
    year: 2000,
    type: 'series',
    streamingServices: ['paramount-plus', 'hulu'],
    popularity: 7,
    imdbRating: 7.5,
    description: 'Reality competition show about survival and strategy'
  }
];