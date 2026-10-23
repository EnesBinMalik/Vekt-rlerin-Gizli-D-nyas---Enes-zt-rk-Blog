/**
 * DVD Rental / Sakila Sample Database (MySQL Compatible)
 * Realistic sample dataset mirroring the real DVD Rental database
 * Author Signature: Enes Öztürk
 */

export interface FilmRow {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rental_rate: number;
  length: number; // in minutes
  replacement_cost: number;
  rating: string;
  special_features: string;
}

export interface CustomerRow {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: number;
  create_date: string;
}

export interface PaymentRow {
  payment_id: number;
  customer_id: number;
  staff_id: number;
  rental_id: number;
  amount: number;
  payment_date: string;
}

// 60+ representative films from dvdrental with realistic lengths, rental rates, and replacement costs
export const SAMPLE_FILMS: FilmRow[] = [
  { film_id: 1, title: 'ACADEMY DINOSAUR', description: 'A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies', release_year: 2006, rental_rate: 0.99, length: 86, replacement_cost: 20.99, rating: 'PG', special_features: 'Deleted Scenes,Behind the Scenes' },
  { film_id: 2, title: 'ACE GOLDFINGER', description: 'A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China', release_year: 2006, rental_rate: 4.99, length: 48, replacement_cost: 12.99, rating: 'G', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 3, title: 'ADAPTATION HOLES', description: 'A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory', release_year: 2006, rental_rate: 2.99, length: 50, replacement_cost: 18.99, rating: 'NC-17', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 4, title: 'AFFAIR PREJUDICE', description: 'A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank', release_year: 2006, rental_rate: 2.99, length: 117, replacement_cost: 26.99, rating: 'G', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 5, title: 'AFRICAN EGG', description: 'A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico', release_year: 2006, rental_rate: 2.99, length: 130, replacement_cost: 22.99, rating: 'G', special_features: 'Deleted Scenes' },
  { film_id: 6, title: 'AGENT TRUMAN', description: 'A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient Japan', release_year: 2006, rental_rate: 4.99, length: 169, replacement_cost: 17.99, rating: 'PG', special_features: 'Behind the Scenes' },
  { film_id: 7, title: 'AIRPLANE SIERRA', description: 'A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat', release_year: 2006, rental_rate: 4.99, length: 62, replacement_cost: 28.99, rating: 'PG-13', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 8, title: 'AIRPORT POLLOCK', description: 'A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India', release_year: 2006, rental_rate: 4.99, length: 54, replacement_cost: 15.99, rating: 'R', special_features: 'Trailers' },
  { film_id: 9, title: 'ALABAMA DEVIL', description: 'A Thoughtful Panorama of a Database Administrator And a Mad Scientist who must Outgun a Mad Scientist in A Jet Boat', release_year: 2006, rental_rate: 2.99, length: 114, replacement_cost: 21.99, rating: 'PG-13', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 10, title: 'ALADDIN CALENDAR', description: 'A Action-Packed Tale of a Man And a Lumberjack who must Reach a Feminist in Ancient China', release_year: 2006, rental_rate: 4.99, length: 63, replacement_cost: 24.99, rating: 'NC-17', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 11, title: 'ALAMO VIDEOTAPE', description: 'A Boring Epistle of a Butler And a Cat who must Fight a Pastry Chef in A MySQL Database', release_year: 2006, rental_rate: 0.99, length: 126, replacement_cost: 9.99, rating: 'G', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 12, title: 'ALASKA PHANTOM', description: 'A Fanciful Saga of a Hunter And a Pastry Chef who must Vanquish a Boy in A Baloon Factory', release_year: 2006, rental_rate: 0.99, length: 136, replacement_cost: 22.99, rating: 'PG', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 13, title: 'ALI FOREVER', description: 'A Action-Packed Drama of a Dentist And a Crocodile who must Battle a Boy in A MySQL Database', release_year: 2006, rental_rate: 4.99, length: 150, replacement_cost: 21.99, rating: 'PG', special_features: 'Deleted Scenes,Behind the Scenes' },
  { film_id: 14, title: 'ALICE FANTASIA', description: 'A Emotional Drama of a A Shark And a Database Administrator who must Vanquish a Pioneer in An Abandoned Amusement Park', release_year: 2006, rental_rate: 0.99, length: 94, replacement_cost: 23.99, rating: 'NC-17', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 15, title: 'ALIEN CENTER', description: 'A Brilliant Drama of a Cat And a Mad Scientist who must Battle a Feminist in A MySQL Database', release_year: 2006, rental_rate: 2.99, length: 72, replacement_cost: 10.99, rating: 'NC-17', special_features: 'Trailers,Commentaries' },
  { film_id: 16, title: 'ALLEY EVOLUTION', description: 'A Fast-Paced Drama of a Robot And a Composer who must Battle a Astronaut in New Orleans', release_year: 2006, rental_rate: 2.99, length: 180, replacement_cost: 23.99, rating: 'NC-17', special_features: 'Trailers,Commentaries' },
  { film_id: 17, title: 'ALONE TRIP', description: 'A Fast-Paced Character Study of a Composer And a Dog who must Outgun a Boat in An Abandoned Funhouse', release_year: 2006, rental_rate: 0.99, length: 82, replacement_cost: 14.99, rating: 'R', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 18, title: 'ALTER VICTORY', description: 'A Thoughtful Drama of a Composer And a Feminist who must Meet a Secret Agent in The Canadian Rockies', release_year: 2006, rental_rate: 0.99, length: 57, replacement_cost: 27.99, rating: 'PG-13', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 19, title: 'AMADEUS HOLY', description: 'A Emotional Display of a Pioneer And a Technical Writer who must Initialise a Monkey in A Baloon Factory', release_year: 2006, rental_rate: 0.99, length: 113, replacement_cost: 20.99, rating: 'PG', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 20, title: 'AMELIE HELLFIGHTERS', description: 'A Boring Drama of a Womanizer And a Squirrel who must Conquer a Student in A Baloon', release_year: 2006, rental_rate: 4.99, length: 79, replacement_cost: 23.99, rating: 'R', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 21, title: 'AMERICAN CIRCUS', description: 'A Insightful Drama of a Teacher And a Hunter who must Face a Girl in The Sahara Desert', release_year: 2006, rental_rate: 4.99, length: 129, replacement_cost: 17.99, rating: 'R', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 22, title: 'AMISTAD MIDSUMMER', description: 'A Emotional Character Study of a Dentist And a Crocodile who must Meet a Squirrel in A Jet Boat', release_year: 2006, rental_rate: 2.99, length: 85, replacement_cost: 10.99, rating: 'G', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 23, title: 'ANACONDA CONFESSIONS', description: 'A Lacklustre Display of a Dentist And a Dentist who must Fight a Girl in Australia', release_year: 2006, rental_rate: 0.99, length: 92, replacement_cost: 9.99, rating: 'R', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 24, title: 'ANALYZE HOOSIERS', description: 'A Thoughtful Display of a Explorer And a Pastry Chef who must Overcome a Feminist in The Sahara Desert', release_year: 2006, rental_rate: 2.99, length: 181, replacement_cost: 19.99, rating: 'R', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 25, title: 'ANGELS LIFE', description: 'A Thoughtful Display of a Woman And a Astronaut who must Battle a Robot in A Shark Tank', release_year: 2006, rental_rate: 2.99, length: 74, replacement_cost: 15.99, rating: 'G', special_features: 'Trailers' },
  { film_id: 26, title: 'ANNIE IDENTITY', description: 'A Amazing Panorama of a Pastry Chef And a Boat who must Escape a Frisbee in A Submarine', release_year: 2006, rental_rate: 0.99, length: 86, replacement_cost: 15.99, rating: 'G', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 27, title: 'ANONYMOUS HUMAN', description: 'A Amazing Reflection of a Database Administrator And a Astronaut who must Outrace a Database Administrator in An Abandoned Amusement Park', release_year: 2006, rental_rate: 0.99, length: 179, replacement_cost: 12.99, rating: 'NC-17', special_features: 'Deleted Scenes,Behind the Scenes' },
  { film_id: 28, title: 'ANTHEM LUKE', description: 'A Touching Panorama of a Waitress And a Woman who must Outrace a Dog in An Abandoned Amusement Park', release_year: 2006, rental_rate: 4.99, length: 91, replacement_cost: 16.99, rating: 'PG-13', special_features: 'Deleted Scenes,Behind the Scenes' },
  { film_id: 29, title: 'ANTITRUST TOMATOES', description: 'A Fateful Yarn of a Womanizer And a Feminist who must Succumb a Database Administrator in Ancient Japan', release_year: 2006, rental_rate: 2.99, length: 168, replacement_cost: 11.99, rating: 'NC-17', special_features: 'Trailers,Commentaries' },
  { film_id: 30, title: 'ANYTHING SAVANNAH', description: 'A Epic Story of a Pastry Chef And a Woman who must Chase a Feminist in An Abandoned Mine Shaft', release_year: 2006, rental_rate: 2.99, length: 82, replacement_cost: 27.99, rating: 'R', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 31, title: 'APACHE DIVINE', description: 'A Awe-Inspiring Reflection of a Teacher And a Singer who must Overcome a Moose in The Canadian Rockies', release_year: 2006, rental_rate: 4.99, length: 92, replacement_cost: 16.99, rating: 'NC-17', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 32, title: 'APOCALYPSE FLAMINGOS', description: 'A Astounding Story of a Dog And a Squirrel who must Defeat a Boy in An Abandoned Amusement Park', release_year: 2006, rental_rate: 4.99, length: 119, replacement_cost: 11.99, rating: 'R', special_features: 'Trailers,Commentaries' },
  { film_id: 33, title: 'BABY HALL', description: 'A Boring Character Study of a A Shark And a Girl who must Outrace a Feminist in An Abandoned Mine Shaft', release_year: 2006, rental_rate: 0.99, length: 153, replacement_cost: 4.99, rating: 'NC-17', special_features: 'Commentaries' },
  { film_id: 34, title: 'BACKLASH UNDEFEATED', description: 'A Stunning Reflection of a Lumberjack And a Pioneer who must Face a Mad Scientist in A Shark Tank', release_year: 2006, rental_rate: 4.99, length: 118, replacement_cost: 24.99, rating: 'PG-13', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 35, title: 'BANG KWAI', description: 'A Epic Display of a Secret Agent And a Madman who must Vanquish a Robot in The Gulf of Mexico', release_year: 2006, rental_rate: 2.99, length: 87, replacement_cost: 25.99, rating: 'NC-17', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 36, title: 'BANGER PINOCCHIO', description: 'A Awe-Inspiring Drama of a Car And a Pastry Chef who must Chase a Crocodile in The First Manned Space Station', release_year: 2006, rental_rate: 0.99, length: 113, replacement_cost: 19.99, rating: 'R', special_features: 'Trailers,Commentaries' },
  { film_id: 37, title: 'BARBARELLA STREETCAR', description: 'A Awe-Inspiring Story of a Feminist And a Cat who must Conquer a Dog in A Monastery', release_year: 2006, rental_rate: 2.99, length: 65, replacement_cost: 27.99, rating: 'G', special_features: 'Behind the Scenes' },
  { film_id: 38, title: 'BAREFOOT MANCHURIAN', description: 'A Fateful Story of a Lumberjack And a Feminist who must Conquer a Student in A Baloon Factory', release_year: 2006, rental_rate: 2.99, length: 129, replacement_cost: 15.99, rating: 'G', special_features: 'Trailers,Commentaries' },
  { film_id: 39, title: 'BASIC EASY', description: 'A Stunning Epistle of a Boy And a Husband who must Outrace a Pioneer in The Gulf of Mexico', release_year: 2006, rental_rate: 2.99, length: 90, replacement_cost: 27.99, rating: 'PG-13', special_features: 'Deleted Scenes' },
  { film_id: 40, title: 'BEACH FROGMEN', description: 'A Fateful Display of a Technical Writer And a Teacher who must Defeat a Womanizer in The Sahara Desert', release_year: 2006, rental_rate: 0.99, length: 82, replacement_cost: 29.99, rating: 'PG', special_features: 'Behind the Scenes' },
  { film_id: 41, title: 'BEAR GRACELAND', description: 'A Astounding Saga of a Dog And a Boy who must Pursue a Composer in The Sahara Desert', release_year: 2006, rental_rate: 2.99, length: 160, replacement_cost: 20.99, rating: 'R', special_features: 'Deleted Scenes' },
  { film_id: 42, title: 'BEAST HUNCHBACK', description: 'A Awe-Inspiring Epistle of a Student And a Squirrel who must Defeat a Boy in Ancient China', release_year: 2006, rental_rate: 4.99, length: 89, replacement_cost: 22.99, rating: 'R', special_features: 'Deleted Scenes,Behind the Scenes' },
  { film_id: 43, title: 'BEAUTY GREASE', description: 'A Fast-Paced Display of a Composer And a Moose who must Sink a Robot in An Abandoned Mine Shaft', release_year: 2006, rental_rate: 4.99, length: 175, replacement_cost: 28.99, rating: 'G', special_features: 'Trailers,Commentaries' },
  { film_id: 44, title: 'BED HIGHBALL', description: 'A Astounding Panorama of a Lumberjack And a Dog who must Redeem a Woman in An Abandoned Funhouse', release_year: 2006, rental_rate: 2.99, length: 106, replacement_cost: 21.99, rating: 'NC-17', special_features: 'Trailers,Commentaries' },
  { film_id: 45, title: 'BEDAZZLED MARRIED', description: 'A Astounding Character Study of a Madman And a Robot who must Meet a Mad Scientist in An Abandoned Funhouse', release_year: 2006, rental_rate: 0.99, length: 73, replacement_cost: 21.99, rating: 'PG', special_features: 'Trailers,Commentaries' },
  { film_id: 46, title: 'BEETHOVEN EXORCIST', description: 'A Epic Display of a Pioneer And a Student who must Challenge a Butler in The Gulf of Mexico', release_year: 2006, rental_rate: 0.99, length: 151, replacement_cost: 26.99, rating: 'PG-13', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 47, title: 'BEHAVIOR RUNAWAY', description: 'A Unbelieveable Drama of a Student And a Husband who must Outrace a Frisbee in A Berlin Gate', release_year: 2006, rental_rate: 4.99, length: 100, replacement_cost: 20.99, rating: 'PG', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 48, title: 'BETRAYED REAR', description: 'A Emotional Story of a Boat And a Composer who must Meet a Mad Scientist in An Abandoned Amusement Park', release_year: 2006, rental_rate: 4.99, length: 122, replacement_cost: 24.99, rating: 'NC-17', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 49, title: 'BEVERLY OUTLAW', description: 'A Fanciful Documentary of a Womanizer And a Boat who must Defeat a Explorer in The First Manned Space Station', release_year: 2006, rental_rate: 2.99, length: 85, replacement_cost: 15.99, rating: 'R', special_features: 'Trailers' },
  { film_id: 50, title: 'BIKINI BORROWERS', description: 'A Astounding Drama of a Astronaut And a Cat who must Discover a Hunter in A MySQL Database', release_year: 2006, rental_rate: 4.99, length: 142, replacement_cost: 26.99, rating: 'NC-17', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 51, title: 'BLACKOUT PRIVATE', description: 'A Intrepid Yarn of a Pastry Chef And a Mad Scientist who must Challenge a Secret Agent in Ancient Japan', release_year: 2006, rental_rate: 2.99, length: 85, replacement_cost: 12.99, rating: 'PG', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 52, title: 'BLINDNESS GUN', description: 'A Touching Drama of a Robot And a Technical Writer who must Meet a A Shark in Ancient Japan', release_year: 2006, rental_rate: 4.99, length: 103, replacement_cost: 14.99, rating: 'PG-13', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 53, title: 'BLOOD ARGONAUTS', description: 'A Boring Drama of a Explorer And a Pastry Chef who must Succumb a Crocodile in An Abandoned Mine Shaft', release_year: 2006, rental_rate: 0.99, length: 71, replacement_cost: 20.99, rating: 'G', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 54, title: 'BLUES INSTINCT', description: 'A Epic Documentary of a Frisbee And a Dog who must Redeem a Frisbee in A Submarine', release_year: 2006, rental_rate: 2.99, length: 50, replacement_cost: 20.99, rating: 'G', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 55, title: 'BOILED DARES', description: 'A Awe-Inspiring Story of a Waitress And a Dog who must Discover a Dentist in Ancient Japan', release_year: 2006, rental_rate: 4.99, length: 102, replacement_cost: 13.99, rating: 'PG-13', special_features: 'Commentaries,Deleted Scenes' },
  { film_id: 56, title: 'BONNIE PACK', description: 'A Fast-Paced Display of a Explorer And a Remote Control who must Defeat a Womanizer in The Gulf of Mexico', release_year: 2006, rental_rate: 0.99, length: 177, replacement_cost: 21.99, rating: 'NC-17', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 57, title: 'BORROWERS RENEGADE', description: 'A Brilliant Drama of a Secret Agent And a Teacher who must Chase a Mad Scientist in A Shark Tank', release_year: 2006, rental_rate: 4.99, length: 162, replacement_cost: 22.99, rating: 'PG-13', special_features: 'Commentaries,Behind the Scenes' },
  { film_id: 58, title: 'BOUND CHEAPER', description: 'A Action-Packed Reflection of a Database Administrator And a Astronaut who must Outgun a Cat in Ancient Japan', release_year: 2006, rental_rate: 0.99, length: 98, replacement_cost: 17.99, rating: 'PG', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 59, title: 'BOWFINGER GABLES', description: 'A Fast-Paced Yarn of a Waitress And a Composer who must Outgun a Crocodile in A Shark Tank', release_year: 2006, rental_rate: 4.99, length: 72, replacement_cost: 19.99, rating: 'NC-17', special_features: 'Trailers,Deleted Scenes' },
  { film_id: 60, title: 'BRANNIGAN SUNRISE', description: 'A Amazing Reflection of a Moose And a Lumberjack who must Fight a Womanizer in A Baloon Factory', release_year: 2006, rental_rate: 4.99, length: 121, replacement_cost: 16.99, rating: 'PG', special_features: 'Trailers,Commentaries' },
  { film_id: 61, title: 'BRAVEHEART HUMAN', description: 'A Insightful Story of a Dog And a Pastry Chef who must Battle a Girl in An Abandoned Amusement Park', release_year: 2006, rental_rate: 2.99, length: 176, replacement_cost: 9.99, rating: 'PG-13', special_features: 'Behind the Scenes' },
  { film_id: 62, title: 'BREAKER CLUB', description: 'A Fable Reflection of a Database Administrator And a Dog who must Overcome a Husband in A Baloon Factory', release_year: 2006, rental_rate: 0.99, length: 99, replacement_cost: 9.99, rating: 'PG', special_features: 'Trailers,Behind the Scenes' },
  { film_id: 63, title: 'BRIGHT ENCOUNTERS', description: 'A Epic Display of a Dog And a Robot who must Redeem a Mad Scientist in Ancient Japan', release_year: 2006, rental_rate: 4.99, length: 73, replacement_cost: 12.99, rating: 'PG-13', special_features: 'Trailers' },
  { film_id: 64, title: 'BRINGING HYPOTHESIS', description: 'A Fateful Display of a Frisbee And a Mad Scientist who must Face a Cat in Ancient China', release_year: 2006, rental_rate: 2.99, length: 179, replacement_cost: 29.99, rating: 'PG', special_features: 'Trailers' },
  { film_id: 65, title: 'BULL SHAWSHANK', description: 'A Fanciful Drama of a Astronaut And a Technical Writer who must Redeem a Moose in The Canadian Rockies', release_year: 2006, rental_rate: 0.99, length: 125, replacement_cost: 24.99, rating: 'NC-17', special_features: 'Trailers,Behind the Scenes' }
];

export const SAMPLE_CUSTOMERS: CustomerRow[] = [
  { customer_id: 1, first_name: 'MARY', last_name: 'SMITH', email: 'mary.smith@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 2, first_name: 'PATRICIA', last_name: 'JOHNSON', email: 'patricia.johnson@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 3, first_name: 'LINDA', last_name: 'WILLIAMS', email: 'linda.williams@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 4, first_name: 'BARBARA', last_name: 'JONES', email: 'barbara.jones@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 5, first_name: 'ELIZABETH', last_name: 'BROWN', email: 'elizabeth.brown@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 6, first_name: 'JENNIFER', last_name: 'DAVIS', email: 'jennifer.davis@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 7, first_name: 'MARIA', last_name: 'MILLER', email: 'maria.miller@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 8, first_name: 'SUSAN', last_name: 'WILSON', email: 'susan.wilson@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 9, first_name: 'MARGARET', last_name: 'MOORE', email: 'margaret.moore@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 10, first_name: 'DOROTHY', last_name: 'TAYLOR', email: 'dorothy.taylor@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 144, first_name: 'CLARA', last_name: 'SHAW', email: 'clara.shaw@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 148, first_name: 'ELEANOR', last_name: 'HUNT', email: 'eleanor.hunt@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 178, first_name: 'MARION', last_name: 'SNYDER', email: 'marion.snyder@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 236, first_name: 'MARCIA', last_name: 'DEAN', email: 'marcia.dean@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' },
  { customer_id: 526, first_name: 'KARL', last_name: 'SEAL', email: 'karl.seal@sakilacustomer.org', active: 1, create_date: '2006-02-14 05:12:00' }
];

// Realistic payments generated to mirror the dvdrental leaderboard
// Eleanor Hunt has 46 purchases, Karl Seal has 45, Clara Shaw has 42, Marion Snyder has 39, etc.
const generateSamplePayments = (): PaymentRow[] => {
  const payments: PaymentRow[] = [];
  let id = 1;

  const customerCounts: { [cid: number]: number } = {
    148: 46, // Eleanor Hunt (top buyer)
    526: 45, // Karl Seal
    144: 42, // Clara Shaw
    178: 39, // Marion Snyder
    236: 38, // Marcia Dean
    1: 32,   // Mary Smith
    2: 27,   // Patricia Johnson
    3: 26,   // Linda Williams
    4: 22,   // Barbara Jones
    5: 38,   // Elizabeth Brown
    6: 18,   // Jennifer Davis
    7: 33,   // Maria Miller
    8: 24,   // Susan Wilson
    9: 23,   // Margaret Moore
    10: 25   // Dorothy Taylor
  };

  const dates = ['2007-02-15', '2007-03-01', '2007-03-18', '2007-04-10', '2007-04-29', '2007-05-14'];
  const amounts = [0.99, 2.99, 4.99, 5.99, 7.99];

  Object.entries(customerCounts).forEach(([cidStr, count]) => {
    const customerId = Number(cidStr);
    for (let i = 0; i < count; i++) {
      const amt = amounts[(customerId + i) % amounts.length];
      const d = dates[(customerId + i) % dates.length];
      payments.push({
        payment_id: id++,
        customer_id: customerId,
        staff_id: (id % 2) + 1,
        rental_id: 1000 + id,
        amount: amt,
        payment_date: `${d} 14:${(i * 7) % 60}:00`
      });
    }
  });

  return payments;
};

export const SAMPLE_PAYMENTS: PaymentRow[] = generateSamplePayments();
