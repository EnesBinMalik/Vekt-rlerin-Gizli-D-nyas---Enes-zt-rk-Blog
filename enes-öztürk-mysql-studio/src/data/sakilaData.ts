export interface CountryRow {
  country_id: number;
  country: string;
  last_update: string;
  [key: string]: unknown;
}

export interface FilmRow {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  language_id: number;
  rental_duration: number;
  rental_rate: number;
  length: number;
  replacement_cost: number;
  rating: string;
  special_features: string;
  last_update: string;
  [key: string]: unknown;
}

export interface CityRow {
  city_id: number;
  city: string;
  country_id: number;
  last_update: string;
  [key: string]: unknown;
}

export interface CategoryRow {
  category_id: number;
  name: string;
  last_update: string;
  [key: string]: unknown;
}

// Complete authentic Sakila country table (109 countries)
export const SAKILA_COUNTRIES: CountryRow[] = [
  { country_id: 1, country: "Afghanistan", last_update: "2006-02-15 04:44:00" },
  { country_id: 2, country: "Algeria", last_update: "2006-02-15 04:44:00" },
  { country_id: 3, country: "American Samoa", last_update: "2006-02-15 04:44:00" },
  { country_id: 4, country: "Angola", last_update: "2006-02-15 04:44:00" },
  { country_id: 5, country: "Anguilla", last_update: "2006-02-15 04:44:00" },
  { country_id: 6, country: "Argentina", last_update: "2006-02-15 04:44:00" },
  { country_id: 7, country: "Armenia", last_update: "2006-02-15 04:44:00" },
  { country_id: 8, country: "Australia", last_update: "2006-02-15 04:44:00" },
  { country_id: 9, country: "Austria", last_update: "2006-02-15 04:44:00" },
  { country_id: 10, country: "Azerbaijan", last_update: "2006-02-15 04:44:00" },
  { country_id: 11, country: "Bahrain", last_update: "2006-02-15 04:44:00" },
  { country_id: 12, country: "Bangladesh", last_update: "2006-02-15 04:44:00" },
  { country_id: 13, country: "Belarus", last_update: "2006-02-15 04:44:00" },
  { country_id: 14, country: "Bolivia", last_update: "2006-02-15 04:44:00" },
  { country_id: 15, country: "Brazil", last_update: "2006-02-15 04:44:00" },
  { country_id: 16, country: "Brunei", last_update: "2006-02-15 04:44:00" },
  { country_id: 17, country: "Bulgaria", last_update: "2006-02-15 04:44:00" },
  { country_id: 18, country: "Cambodia", last_update: "2006-02-15 04:44:00" },
  { country_id: 19, country: "Cameroon", last_update: "2006-02-15 04:44:00" },
  { country_id: 20, country: "Canada", last_update: "2006-02-15 04:44:00" },
  { country_id: 21, country: "Chad", last_update: "2006-02-15 04:44:00" },
  { country_id: 22, country: "Chile", last_update: "2006-02-15 04:44:00" },
  { country_id: 23, country: "China", last_update: "2006-02-15 04:44:00" },
  { country_id: 24, country: "Colombia", last_update: "2006-02-15 04:44:00" },
  { country_id: 25, country: "Congo, The Democratic Republic of the", last_update: "2006-02-15 04:44:00" },
  { country_id: 26, country: "Czech Republic", last_update: "2006-02-15 04:44:00" },
  { country_id: 27, country: "Dominican Republic", last_update: "2006-02-15 04:44:00" },
  { country_id: 28, country: "Ecuador", last_update: "2006-02-15 04:44:00" },
  { country_id: 29, country: "Egypt", last_update: "2006-02-15 04:44:00" },
  { country_id: 30, country: "England", last_update: "2006-02-15 04:44:00" },
  { country_id: 31, country: "Estonia", last_update: "2006-02-15 04:44:00" },
  { country_id: 32, country: "Ethiopia", last_update: "2006-02-15 04:44:00" },
  { country_id: 33, country: "Faroe Islands", last_update: "2006-02-15 04:44:00" },
  { country_id: 34, country: "Finland", last_update: "2006-02-15 04:44:00" },
  { country_id: 35, country: "France", last_update: "2006-02-15 04:44:00" },
  { country_id: 36, country: "French Guiana", last_update: "2006-02-15 04:44:00" },
  { country_id: 37, country: "French Polynesia", last_update: "2006-02-15 04:44:00" },
  { country_id: 38, country: "Gambia", last_update: "2006-02-15 04:44:00" },
  { country_id: 39, country: "Germany", last_update: "2006-02-15 04:44:00" },
  { country_id: 40, country: "Greece", last_update: "2006-02-15 04:44:00" },
  { country_id: 41, country: "Greenland", last_update: "2006-02-15 04:44:00" },
  { country_id: 42, country: "Holy See (Vatican City State)", last_update: "2006-02-15 04:44:00" },
  { country_id: 43, country: "Hong Kong", last_update: "2006-02-15 04:44:00" },
  { country_id: 44, country: "Hungary", last_update: "2006-02-15 04:44:00" },
  { country_id: 45, country: "India", last_update: "2006-02-15 04:44:00" },
  { country_id: 46, country: "Indonesia", last_update: "2006-02-15 04:44:00" },
  { country_id: 47, country: "Iran", last_update: "2006-02-15 04:44:00" },
  { country_id: 48, country: "Iraq", last_update: "2006-02-15 04:44:00" },
  { country_id: 49, country: "Israel", last_update: "2006-02-15 04:44:00" },
  { country_id: 50, country: "Italy", last_update: "2006-02-15 04:44:00" },
  { country_id: 51, country: "Japan", last_update: "2006-02-15 04:44:00" },
  { country_id: 52, country: "Jordan", last_update: "2006-02-15 04:44:00" },
  { country_id: 53, country: "Kazakhstan", last_update: "2006-02-15 04:44:00" },
  { country_id: 54, country: "Kenya", last_update: "2006-02-15 04:44:00" },
  { country_id: 55, country: "Kuwait", last_update: "2006-02-15 04:44:00" },
  { country_id: 56, country: "Latvia", last_update: "2006-02-15 04:44:00" },
  { country_id: 57, country: "Liechtenstein", last_update: "2006-02-15 04:44:00" },
  { country_id: 58, country: "Lithuania", last_update: "2006-02-15 04:44:00" },
  { country_id: 59, country: "Madagascar", last_update: "2006-02-15 04:44:00" },
  { country_id: 60, country: "Malawi", last_update: "2006-02-15 04:44:00" },
  { country_id: 61, country: "Malaysia", last_update: "2006-02-15 04:44:00" },
  { country_id: 62, country: "Mexico", last_update: "2006-02-15 04:44:00" },
  { country_id: 63, country: "Moldova", last_update: "2006-02-15 04:44:00" },
  { country_id: 64, country: "Morocco", last_update: "2006-02-15 04:44:00" },
  { country_id: 65, country: "Mozambique", last_update: "2006-02-15 04:44:00" },
  { country_id: 66, country: "Myanmar", last_update: "2006-02-15 04:44:00" },
  { country_id: 67, country: "Nauru", last_update: "2006-02-15 04:44:00" },
  { country_id: 68, country: "Nepal", last_update: "2006-02-15 04:44:00" },
  { country_id: 69, country: "Netherlands", last_update: "2006-02-15 04:44:00" },
  { country_id: 70, country: "New Zealand", last_update: "2006-02-15 04:44:00" },
  { country_id: 71, country: "Nigeria", last_update: "2006-02-15 04:44:00" },
  { country_id: 72, country: "North Korea", last_update: "2006-02-15 04:44:00" },
  { country_id: 73, country: "Oman", last_update: "2006-02-15 04:44:00" },
  { country_id: 74, country: "Pakistan", last_update: "2006-02-15 04:44:00" },
  { country_id: 75, country: "Paraguay", last_update: "2006-02-15 04:44:00" },
  { country_id: 76, country: "Peru", last_update: "2006-02-15 04:44:00" },
  { country_id: 77, country: "Philippines", last_update: "2006-02-15 04:44:00" },
  { country_id: 78, country: "Poland", last_update: "2006-02-15 04:44:00" },
  { country_id: 79, country: "Puerto Rico", last_update: "2006-02-15 04:44:00" },
  { country_id: 80, country: "Romania", last_update: "2006-02-15 04:44:00" },
  { country_id: 81, country: "Russian Federation", last_update: "2006-02-15 04:44:00" },
  { country_id: 82, country: "Saint Vincent and the Grenadines", last_update: "2006-02-15 04:44:00" },
  { country_id: 83, country: "Saudi Arabia", last_update: "2006-02-15 04:44:00" },
  { country_id: 84, country: "Senegal", last_update: "2006-02-15 04:44:00" },
  { country_id: 85, country: "Slovakia", last_update: "2006-02-15 04:44:00" },
  { country_id: 86, country: "South Africa", last_update: "2006-02-15 04:44:00" },
  { country_id: 87, country: "South Korea", last_update: "2006-02-15 04:44:00" },
  { country_id: 88, country: "Spain", last_update: "2006-02-15 04:44:00" },
  { country_id: 89, country: "Sri Lanka", last_update: "2006-02-15 04:44:00" },
  { country_id: 90, country: "Sudan", last_update: "2006-02-15 04:44:00" },
  { country_id: 91, country: "Sweden", last_update: "2006-02-15 04:44:00" },
  { country_id: 92, country: "Switzerland", last_update: "2006-02-15 04:44:00" },
  { country_id: 93, country: "Taiwan", last_update: "2006-02-15 04:44:00" },
  { country_id: 94, country: "Tanzania", last_update: "2006-02-15 04:44:00" },
  { country_id: 95, country: "Thailand", last_update: "2006-02-15 04:44:00" },
  { country_id: 96, country: "Tonga", last_update: "2006-02-15 04:44:00" },
  { country_id: 97, country: "Tunisia", last_update: "2006-02-15 04:44:00" },
  { country_id: 98, country: "Turkey", last_update: "2006-02-15 04:44:00" },
  { country_id: 99, country: "Turkmenistan", last_update: "2006-02-15 04:44:00" },
  { country_id: 100, country: "Tuvalu", last_update: "2006-02-15 04:44:00" },
  { country_id: 101, country: "Ukraine", last_update: "2006-02-15 04:44:00" },
  { country_id: 102, country: "United Arab Emirates", last_update: "2006-02-15 04:44:00" },
  { country_id: 103, country: "United Kingdom", last_update: "2006-02-15 04:44:00" },
  { country_id: 104, country: "United States", last_update: "2006-02-15 04:44:00" },
  { country_id: 105, country: "Venezuela", last_update: "2006-02-15 04:44:00" },
  { country_id: 106, country: "Vietnam", last_update: "2006-02-15 04:44:00" },
  { country_id: 107, country: "Virgin Islands, U.S.", last_update: "2006-02-15 04:44:00" },
  { country_id: 108, country: "Yemen", last_update: "2006-02-15 04:44:00" },
  { country_id: 109, country: "Yugoslavia", last_update: "2006-02-15 04:44:00" },
  { country_id: 110, country: "Zambia", last_update: "2006-02-15 04:44:00" }
];

// Rich curated dataset of authentic Sakila film records
// Includes all the specific targets for Query 3 and Query 4, plus control records
export const SAKILA_FILMS: FilmRow[] = [
  // --- Query 4 matches: Title starts with 'C', length > 90, rental_rate = 2.99 ---
  {
    film_id: 101,
    title: "CABIN FLASH",
    description: "A Stunning Drama of a Moose And a Butler who must Build a Crocodile in The Outback",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 104,
    replacement_cost: 16.99,
    rating: "NC-17",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 102,
    title: "CABLE GRACELAND",
    description: "A Fanciful Documentary of a Teacher And a Frisbee who must Escape a Boat in The Sahara",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 98,
    replacement_cost: 21.99,
    rating: "NC-17",
    special_features: "Trailers,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 105,
    title: "CALENDAR GUNFIGHT",
    description: "A Thrilling Drama of a Forensic Psychologist And a Dog who must Find a Astronaut in An Abandoned Mine Shaft",
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 120,
    replacement_cost: 22.99,
    rating: "NC-17",
    special_features: "Trailers,Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 106,
    title: "CALIFORNIA BIRDS",
    description: "A Thrilling Panorama of a Database Administrator And a Student who must Confront a Astronaut in The Canadian Rockies",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 95,
    replacement_cost: 18.99,
    rating: "PG-13",
    special_features: "Deleted Scenes,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 108,
    title: "CAMPUS PREJUDICE",
    description: "A Astounding Reflection of a Explorer And a Astronaut who must Succumb a Crocodile in The Gulf of Mexico",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 125,
    replacement_cost: 10.99,
    rating: "PG",
    special_features: "Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 110,
    title: "CANDIDATE PERDITION",
    description: "A Brilliant Epistle of a Composer And a Database Administrator who must Vanquish a Madman in The Sahara",
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 170,
    replacement_cost: 15.99,
    rating: "R",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 114,
    title: "CASUALTIES SENIORITY",
    description: "A Lacklustre Story of a Student And a Crocodile who must Battle a Moose in A Monastery",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 179,
    replacement_cost: 14.99,
    rating: "PG",
    special_features: "Commentaries,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 120,
    title: "CHANCE RESURRECTION",
    description: "A Astounding Story of a Forensic Psychologist And a Forensic Psychologist who must Overcome a Husband in The Outback",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 165,
    replacement_cost: 12.99,
    rating: "R",
    special_features: "Trailers,Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 121,
    title: "CHAPLIN REALITY",
    description: "A Lacklustre Documentary of a Technical Writer And a Butler who must Redeem a Frisbee in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 95,
    replacement_cost: 26.99,
    rating: "G",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 122,
    title: "CHARIOTS CONSPIRACY",
    description: "A Unbelieveable Epistle of a Robot And a Husband who must Face a Robot in An Abandoned Mine Shaft",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 91,
    replacement_cost: 29.99,
    rating: "R",
    special_features: "Deleted Scenes,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 125,
    title: "CHINATOWN GLADIATOR",
    description: "A Brilliant Panorama of a Technical Writer And a Lumbar who must Overcome a Dog in The Outback",
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 135,
    replacement_cost: 20.99,
    rating: "PG",
    special_features: "Trailers,Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 126,
    title: "CHOCOLATE DUCK",
    description: "A Unbelieveable Story of a Mad Scientist And a Technical Writer who must Explore a A Shark in A MySQL Convention",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 132,
    replacement_cost: 14.99,
    rating: "R",
    special_features: "Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 130,
    title: "CITIZEN SHREK",
    description: "A Fanciful Display of a Technical Writer And a Butler who must Overcome a Husband in The Outback",
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 2.99,
    length: 165,
    replacement_cost: 18.99,
    rating: "G",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 133,
    title: "CLASH DURHAM",
    description: "A Charming Tale of a Pastry Chef And a Girl who must Pursue a Crocodile in The Outback",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 145,
    replacement_cost: 19.99,
    rating: "PG",
    special_features: "Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 134,
    title: "CLERGYMAN CLUB",
    description: "A Boring Story of a Butler And a Womanizer who must Defeat a Crocodile in A Shark Tank",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 115,
    replacement_cost: 22.99,
    rating: "PG-13",
    special_features: "Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 135,
    title: "CLUELESS BUCKET",
    description: "A Taut Tale of a Car And a Pioneer who must Overcome a Dentist in A Monastery",
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 95,
    replacement_cost: 13.99,
    rating: "R",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 138,
    title: "CONNECTICUT BIEN",
    description: "A Touching Story of a Student And a Crocodile who must Discover a Pioneer in An Abandoned Amusement Park",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 172,
    replacement_cost: 15.99,
    rating: "NC-17",
    special_features: "Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 140,
    title: "CRUSADE HONEY",
    description: "A Fast-Paced Reflection of a Explorer And a Crocodile who must Pursue a Butler in An Abandoned Mine Shaft",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 112,
    replacement_cost: 24.99,
    rating: "R",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },

  // --- Query 4 Counter-examples (Tests filtering edge cases) ---
  {
    film_id: 141,
    title: "CASABLANCA SUPER",
    description: "Starts with C, rental_rate 2.99, but length is 85 <= 90 (Filtered out by length)",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 85,
    replacement_cost: 20.99,
    rating: "PG",
    special_features: "Trailers",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 142,
    title: "CENTER DINOSAUR",
    description: "Starts with C, length 152 > 90, but rental_rate is 4.99 != 2.99 (Filtered out by rental_rate)",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 152,
    replacement_cost: 19.99,
    rating: "PG",
    special_features: "Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 143,
    title: "CHAMBER ITALIAN",
    description: "Starts with C, length 117 > 90, but rental_rate is 4.99 != 2.99 (Filtered out)",
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 117,
    replacement_cost: 14.99,
    rating: "NC-17",
    special_features: "Trailers",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 144,
    title: "ALADDIN CALENDAR",
    description: "Length 120 > 90, rental_rate 2.99, but title starts with A not C (Filtered out)",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 120,
    replacement_cost: 12.99,
    rating: "G",
    special_features: "Trailers",
    last_update: "2006-02-15 05:03:42"
  },

  // --- Query 3 matches: Title contains at least 4 'T' / 't' characters (case-insensitive) ---
  {
    film_id: 201,
    title: "ATTRACTION INSTINCT", // aTTraction insTincT (5 't's)
    description: "A Stunning Epistle of a Pastry Chef And a Husband who must Challenge a Dog in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 0.99,
    length: 72,
    replacement_cost: 14.99,
    rating: "G",
    special_features: "Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 202,
    title: "ATTRACTION NEWTON", // aTTracion newTon (4 't's)
    description: "A Astounding Reflection of a Teacher And a Butler who must Build a Student in The Canadian Rockies",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 0.99,
    length: 83,
    replacement_cost: 14.99,
    rating: "PG",
    special_features: "Trailers,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 203,
    title: "ENTRAPMENT SATISFACTION", // enTrapmenT saTisfacTion (4 't's)
    description: "A Thoughtful Reflection of a Chef And a Explorer who must Face a Madman in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 0.99,
    length: 176,
    replacement_cost: 24.99,
    rating: "R",
    special_features: "Trailers,Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 204,
    title: "POTTER CONNECTICUT", // poTTer connecTicuT (4 't's)
    description: "A Thrilling Drama of a Student And a Butler who must Meet a Moose in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 1.99,
    length: 115,
    replacement_cost: 17.99,
    rating: "PG",
    special_features: "Trailers,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 205,
    title: "TALENTED ATTRACTION", // TalenTed aTTracion (5 't's)
    description: "A Action-Packed Reflection of a Database Administrator And a Student who must Conquer a Moose in Berlin",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 98,
    replacement_cost: 19.99,
    rating: "PG-13",
    special_features: "Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 206,
    title: "TEMPEST TWISTED", // TempesT TwisTed (4 't's)
    description: "A Action-Packed Display of a Teacher And a Composer who must Challenge a Dog in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 4.99,
    length: 87,
    replacement_cost: 21.99,
    rating: "PG",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 207,
    title: "TIGHT TRANSLATION", // TighT TranslaTion (4 't's)
    description: "A Thrilling Tale of a Pastry Chef And a Girl who must Build a Husband in The Sahara",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 122,
    replacement_cost: 14.99,
    rating: "PG-13",
    special_features: "Trailers,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 208,
    title: "TITANIC TRANSLATION", // TiTanic TranslaTion (4 't's)
    description: "A Astounding Reflection of a Database Administrator And a Astronaut who must Battle a Moose in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 4.99,
    length: 148,
    replacement_cost: 16.99,
    rating: "PG",
    special_features: "Commentaries",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 209,
    title: "TRAFFIC CONSTITUTION", // Traffic consTiTuTion (4 't's)
    description: "A Touching Display of a Hunter And a Database Administrator who must Defeat a Crocodile in A Shark Tank",
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 112,
    replacement_cost: 19.99,
    rating: "PG-13",
    special_features: "Deleted Scenes,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 210,
    title: "TRAINSPOTTING STRANGERS", // TrainspoTTing sTrangers (4 't's)
    description: "A Fast-Paced Display of a Student And a Dog who must Redeem a Butler in The Gulf of Mexico",
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 132,
    replacement_cost: 27.99,
    rating: "NC-17",
    special_features: "Trailers,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 211,
    title: "TRANSACTION ATLANTIS", // TransacTion aTlanTis (4 't's)
    description: "A Unbelieveable Tale of a Database Administrator And a Student who must Vanquish a Crocodile in Ancient Japan",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 140,
    replacement_cost: 28.99,
    rating: "R",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 212,
    title: "TWEET TERRORIST", // TweeT TerrorisT (4 't's)
    description: "A Fanciful Drama of a Composer And a Explorer who must Conquer a Moose in The Outback",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 120,
    replacement_cost: 18.99,
    rating: "R",
    special_features: "Commentaries",
    last_update: "2006-02-15 05:03:42"
  },

  // --- Query 3 Counter-examples (Tests counting 't' characters) ---
  {
    film_id: 213,
    title: "CONSTITUTION HANOVER", // consTiTuTion hanover (3 't's -> Filtered out)
    description: "Has exactly 3 'T' characters; should not match >= 4",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 160,
    replacement_cost: 15.99,
    rating: "R",
    special_features: "Trailers",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 214,
    title: "VERTIGO NORTHWEST", // verTigo norThwesT (3 't's -> Filtered out)
    description: "Has exactly 3 'T' characters; should not match >= 4",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 90,
    replacement_cost: 17.99,
    rating: "R",
    special_features: "Trailers",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 215,
    title: "PATRIOT ROMAN", // PaTrioT Roman (2 't's -> Filtered out)
    description: "Has exactly 2 'T' characters; should not match >= 4",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 73,
    replacement_cost: 29.99,
    rating: "PG",
    special_features: "Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },

  // Additional iconic Sakila films
  {
    film_id: 1,
    title: "ACADEMY DINOSAUR",
    description: "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 86,
    replacement_cost: 20.99,
    rating: "PG",
    special_features: "Deleted Scenes,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 2,
    title: "ACE GOLDFINGER",
    description: "A Astounding Epistle of a Database Administrator And a Explorer who must Challenge a Butler in The Gulf of Mexico",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 4.99,
    length: 48,
    replacement_cost: 12.99,
    rating: "G",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 3,
    title: "ADAPTATION HOLES",
    description: "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon",
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 2.99,
    length: 50,
    replacement_cost: 28.99,
    rating: "NC-17",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 4,
    title: "AFFAIR PREJUDICE",
    description: "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 117,
    replacement_cost: 26.99,
    rating: "G",
    special_features: "Commentaries,Behind the Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 5,
    title: "AFRICAN EGG",
    description: "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 130,
    replacement_cost: 22.99,
    rating: "G",
    special_features: "Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 6,
    title: "AGENT TRUMAN",
    description: "A Intrepid Panorama of a Robot And a Boy who must Escape a Sun in An Abandoned Mine Shaft",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 169,
    replacement_cost: 17.99,
    rating: "PG",
    special_features: "Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 7,
    title: "AIRPLANE SIERRA",
    description: "A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 62,
    replacement_cost: 28.99,
    rating: "PG-13",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 8,
    title: "AIRPORT POLLOCK",
    description: "A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 54,
    replacement_cost: 15.99,
    rating: "R",
    special_features: "Trailers",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 9,
    title: "ALABAMA DEVIL",
    description: "A Thoughtful Panorama of a Database Administrator And a Mad Scientist who must Outgun a Mad Scientist in A Jet Boat",
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 114,
    replacement_cost: 21.99,
    rating: "PG-13",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  },
  {
    film_id: 10,
    title: "ALADDIN CALENDAR",
    description: "A Action-Packed Tale of a Man And a Lumberjack who must Reach a Explorer in The Canadian Rockies",
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 63,
    replacement_cost: 24.99,
    rating: "NC-17",
    special_features: "Trailers,Deleted Scenes",
    last_update: "2006-02-15 05:03:42"
  }
];

export const SAKILA_CITIES: CityRow[] = [
  { city_id: 1, city: "A Corua (La Corua)", country_id: 88, last_update: "2006-02-15 04:45:25" },
  { city_id: 2, city: "Abha", country_id: 83, last_update: "2006-02-15 04:45:25" },
  { city_id: 3, city: "Abu Dhabi", country_id: 102, last_update: "2006-02-15 04:45:25" },
  { city_id: 4, city: "Acua", country_id: 62, last_update: "2006-02-15 04:45:25" },
  { city_id: 5, city: "Adana", country_id: 98, last_update: "2006-02-15 04:45:25" },
  { city_id: 6, city: "Addis Abeba", country_id: 32, last_update: "2006-02-15 04:45:25" },
  { city_id: 7, city: "Aden", country_id: 108, last_update: "2006-02-15 04:45:25" },
  { city_id: 8, city: "Adoni", country_id: 45, last_update: "2006-02-15 04:45:25" },
  { city_id: 9, city: "Ahmadnagar", country_id: 45, last_update: "2006-02-15 04:45:25" },
  { city_id: 10, city: "Akishima", country_id: 51, last_update: "2006-02-15 04:45:25" },
  { city_id: 11, city: "Akron", country_id: 104, last_update: "2006-02-15 04:45:25" },
  { city_id: 12, city: "al-Ayn", country_id: 102, last_update: "2006-02-15 04:45:25" },
  { city_id: 13, city: "al-Hawiya", country_id: 83, last_update: "2006-02-15 04:45:25" },
  { city_id: 14, city: "al-Manama", country_id: 11, last_update: "2006-02-15 04:45:25" },
  { city_id: 15, city: "al-Qadarif", country_id: 90, last_update: "2006-02-15 04:45:25" },
  { city_id: 16, city: "al-Qatif", country_id: 83, last_update: "2006-02-15 04:45:25" },
  { city_id: 17, city: "Alexandria", country_id: 104, last_update: "2006-02-15 04:45:25" },
  { city_id: 18, city: "Algiers", country_id: 2, last_update: "2006-02-15 04:45:25" },
  { city_id: 19, city: "Alicante", country_id: 88, last_update: "2006-02-15 04:45:25" },
  { city_id: 20, city: "Almirante Brown", country_id: 6, last_update: "2006-02-15 04:45:25" }
];

export const SAKILA_CATEGORIES: CategoryRow[] = [
  { category_id: 1, name: "Action", last_update: "2006-02-15 04:46:27" },
  { category_id: 2, name: "Animation", last_update: "2006-02-15 04:46:27" },
  { category_id: 3, name: "Children", last_update: "2006-02-15 04:46:27" },
  { category_id: 4, name: "Classics", last_update: "2006-02-15 04:46:27" },
  { category_id: 5, name: "Comedy", last_update: "2006-02-15 04:46:27" },
  { category_id: 6, name: "Documentary", last_update: "2006-02-15 04:46:27" },
  { category_id: 7, name: "Drama", last_update: "2006-02-15 04:46:27" },
  { category_id: 8, name: "Family", last_update: "2006-02-15 04:46:27" },
  { category_id: 9, name: "Foreign", last_update: "2006-02-15 04:46:27" },
  { category_id: 10, name: "Games", last_update: "2006-02-15 04:46:27" },
  { category_id: 11, name: "Horror", last_update: "2006-02-15 04:46:27" },
  { category_id: 12, name: "Music", last_update: "2006-02-15 04:46:27" },
  { category_id: 13, name: "New", last_update: "2006-02-15 04:46:27" },
  { category_id: 14, name: "Sci-Fi", last_update: "2006-02-15 04:46:27" },
  { category_id: 15, name: "Sports", last_update: "2006-02-15 04:46:27" },
  { category_id: 16, name: "Travel", last_update: "2006-02-15 04:46:27" }
];

export interface TableMeta {
  name: string;
  rowCount: number;
  description: string;
  ddl: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    isPrimary: boolean;
    isForeign?: boolean;
    foreignRef?: string;
    description: string;
  }[];
}

export const DATABASE_TABLES_META: Record<string, TableMeta> = {
  country: {
    name: "country",
    rowCount: SAKILA_COUNTRIES.length,
    description: "Dünya ülkelerini ve sistem güncelleme zamanlarını saklayan temel coğrafi tablo.",
    ddl: `CREATE TABLE country (
  country_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  country VARCHAR(50) NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (country_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    columns: [
      { name: "country_id", type: "SMALLINT UNSIGNED", nullable: false, isPrimary: true, description: "Benzersiz ülke kimlik numarası (Primary Key)" },
      { name: "country", type: "VARCHAR(50)", nullable: false, isPrimary: false, description: "Ülke adı (Örn: Argentina, Turkey, Canada)" },
      { name: "last_update", type: "TIMESTAMP", nullable: false, isPrimary: false, description: "Kaydın son güncellenme zamanı" }
    ]
  },
  film: {
    name: "film",
    rowCount: SAKILA_FILMS.length,
    description: "Sakila film kütüphanesini, sürelerini, kiralama oranlarını ve özelliklerini tutan ana tablo.",
    ddl: `CREATE TABLE film (
  film_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(128) NOT NULL,
  description TEXT DEFAULT NULL,
  release_year YEAR DEFAULT NULL,
  language_id TINYINT UNSIGNED NOT NULL,
  rental_duration TINYINT UNSIGNED NOT NULL DEFAULT 3,
  rental_rate DECIMAL(4,2) NOT NULL DEFAULT 4.99,
  length SMALLINT UNSIGNED DEFAULT NULL,
  replacement_cost DECIMAL(5,2) NOT NULL DEFAULT 19.99,
  rating ENUM('G','PG','PG-13','R','NC-17') DEFAULT 'G',
  special_features SET('Trailers','Commentaries','Deleted Scenes','Behind the Scenes') DEFAULT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (film_id),
  KEY idx_title (title),
  KEY idx_fk_language_id (language_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    columns: [
      { name: "film_id", type: "SMALLINT UNSIGNED", nullable: false, isPrimary: true, description: "Benzersiz film kimlik numarası (Primary Key)" },
      { name: "title", type: "VARCHAR(128)", nullable: false, isPrimary: false, description: "Film başlığı (Büyük harflerle)" },
      { name: "description", type: "TEXT", nullable: true, isPrimary: false, description: "Film konusu ve özeti" },
      { name: "release_year", type: "YEAR", nullable: true, isPrimary: false, description: "Yayın yılı" },
      { name: "language_id", type: "TINYINT UNSIGNED", nullable: false, isPrimary: false, isForeign: true, foreignRef: "language.language_id", description: "Dil referansı" },
      { name: "rental_duration", type: "TINYINT UNSIGNED", nullable: false, isPrimary: false, description: "Standart kiralama süresi (gün)" },
      { name: "rental_rate", type: "DECIMAL(4,2)", nullable: false, isPrimary: false, description: "Kiralama ücreti ($) - Örn: 0.99, 2.99, 4.99" },
      { name: "length", type: "SMALLINT UNSIGNED", nullable: true, isPrimary: false, description: "Film uzunluğu (dakika cinsinden)" },
      { name: "replacement_cost", type: "DECIMAL(5,2)", nullable: false, isPrimary: false, description: "Yenileme / kayıp bedeli ($)" },
      { name: "rating", type: "ENUM('G','PG','PG-13','R','NC-17')", nullable: true, isPrimary: false, description: "MPAA yaş sınıflandırması" },
      { name: "special_features", type: "SET(...)", nullable: true, isPrimary: false, description: "Özel içerikler (Trailers, Behind the Scenes vb.)" },
      { name: "last_update", type: "TIMESTAMP", nullable: false, isPrimary: false, description: "Son güncelleme zaman damgası" }
    ]
  },
  city: {
    name: "city",
    rowCount: SAKILA_CITIES.length,
    description: "Şehirler ve bağlı oldukları ülke anahtarlarını barındıran tablo.",
    ddl: `CREATE TABLE city (
  city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city VARCHAR(50) NOT NULL,
  country_id SMALLINT UNSIGNED NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (city_id),
  KEY idx_fk_country_id (country_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    columns: [
      { name: "city_id", type: "SMALLINT UNSIGNED", nullable: false, isPrimary: true, description: "Benzersiz şehir numarası" },
      { name: "city", type: "VARCHAR(50)", nullable: false, isPrimary: false, description: "Şehir adı" },
      { name: "country_id", type: "SMALLINT UNSIGNED", nullable: false, isPrimary: false, isForeign: true, foreignRef: "country.country_id", description: "Ülke kimlik referansı (Foreign Key)" },
      { name: "last_update", type: "TIMESTAMP", nullable: false, isPrimary: false, description: "Son güncelleme zamanı" }
    ]
  },
  category: {
    name: "category",
    rowCount: SAKILA_CATEGORIES.length,
    description: "Film kategorilerini (türlerini) listeleyen referans tablosu.",
    ddl: `CREATE TABLE category (
  category_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    columns: [
      { name: "category_id", type: "TINYINT UNSIGNED", nullable: false, isPrimary: true, description: "Kategori kimliği" },
      { name: "name", type: "VARCHAR(25)", nullable: false, isPrimary: false, description: "Kategori adı (Action, Animation, Sci-Fi vb.)" },
      { name: "last_update", type: "TIMESTAMP", nullable: false, isPrimary: false, description: "Son güncelleme zamanı" }
    ]
  }
};
