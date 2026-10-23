import { Film, Customer, TableDefinition, QueryPreset } from '../types/database';

export const SAKILA_FILMS: Film[] = [
  // Films ending with 'n' (various lengths, both long and short)
  {
    film_id: 814,
    title: 'SOLDIERS EVOLUTION',
    description: 'A Lacklustrian Panorama of a A Shark and a Pioneer who must Meet a Moose in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 185,
    replacement_cost: 27.99,
    rating: 'R',
    special_features: 'Behind the Scenes,Deleted Scenes'
  },
  {
    film_id: 869,
    title: 'SWORDFISH MADIGAN',
    description: 'A Thoughtful Documentary of a Dentist and a Dog who must Face a Pioneer in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 0.99,
    length: 184,
    replacement_cost: 16.99,
    rating: 'PG-13',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 849,
    title: 'SUNDANCE MAIDEN',
    description: 'A Fanciful Drama of a Frisbee and a Database Administrator who must Defeat a Butler in A Monastery',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 182,
    replacement_cost: 22.99,
    rating: 'PG-13',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 742,
    title: 'ROOF CHAMPION',
    description: 'A Unbelieveable Mystery of a Pastry Chef and a Husband who must Abandon a Crocodile in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 0.99,
    length: 181,
    replacement_cost: 24.99,
    rating: 'PG',
    special_features: 'Commentaries,Deleted Scenes'
  },
  {
    film_id: 428,
    title: 'HAUNTED CARIBBEAN',
    description: 'A Astounding Panorama of a Crocodile and a Mad Scientist who must Battle a Moose in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 0.99,
    length: 180,
    replacement_cost: 18.99,
    rating: 'G',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 749,
    title: 'RUNNER MADIGAN',
    description: 'A Action-Packed Tale of a Pioneer and a Student who must Conquer a Butler in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 178,
    replacement_cost: 13.99,
    rating: 'PG-13',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 285,
    title: 'ENGLISH BULWORTH',
    description: 'A Touching Drama of a Pioneer and a Crocodile who must Challenge a Teacher in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 175,
    replacement_cost: 11.99,
    rating: 'NC-17',
    special_features: 'Commentaries,Deleted Scenes'
  },
  {
    film_id: 973,
    title: 'WIFE SWEET',
    description: 'A Astounding Story of a Waitress and a Composer who must Challenge a Dog in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 174,
    replacement_cost: 15.99,
    rating: 'R',
    special_features: 'Trailers,Behind the Scenes'
  },
  {
    film_id: 672,
    title: 'PAPILLON TRUMAN',
    description: 'A Amazing Documentary of a Butler and a Monkey who must Meet a Composer in The Canadian Rockies',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 169,
    replacement_cost: 19.99,
    rating: 'R',
    special_features: 'Commentaries,Behind the Scenes'
  },
  {
    film_id: 388,
    title: 'GUNFIGHT MOON',
    description: 'A Epic Panorama of a A Shark and a Secret Agent who must Defeat a Composer in The First Manned Space Station',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 0.99,
    length: 168,
    replacement_cost: 21.99,
    rating: 'R',
    special_features: 'Deleted Scenes,Behind the Scenes'
  },
  {
    film_id: 323,
    title: 'FLIGHT LIES',
    description: 'A Stunning Drama of a Crocodile and a Pioneer who must Chase a Dog in The First Manned Space Station',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 165,
    replacement_cost: 22.99,
    rating: 'R',
    special_features: 'Trailers'
  },
  {
    film_id: 541,
    title: 'LUXURY TRUMAN',
    description: 'A Emotional Story of a Secret Agent and a Pioneer who must Meet a Student in The Canadian Rockies',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 154,
    replacement_cost: 14.99,
    rating: 'G',
    special_features: 'Trailers,Behind the Scenes'
  },
  {
    film_id: 288,
    title: 'ENTRAPMENT SATISFACTION',
    description: 'A Thoughtful Panorama of a Hunter and a Technical Writer who must Meet a Frisbee in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 0.99,
    length: 146,
    replacement_cost: 20.99,
    rating: 'R',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 591,
    title: 'MONSOON DRAGON',
    description: 'A Thrilling Display of a A Shark and a Butler who must Confront a Dentist in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 138,
    replacement_cost: 17.99,
    rating: 'PG-13',
    special_features: 'Trailers'
  },
  {
    film_id: 790,
    title: 'SEVEN SLEEPLESS',
    description: 'A Fateful Display of a Explorer and a Pastry Chef who must Confront a Dog in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 4.99,
    length: 135,
    replacement_cost: 23.99,
    rating: 'PG',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 611,
    title: 'MUSKETEERS WAIT',
    description: 'A Stunning Display of a Mad Scientist and a Robot who must Meet a Teacher in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 131,
    replacement_cost: 25.99,
    rating: 'PG',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 494,
    title: 'JEDI BENEATH',
    description: 'A Astounding Reflection of a Explorer and a Dentist who must Pursue a Student in Nigeria',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 0.99,
    length: 128,
    replacement_cost: 14.99,
    rating: 'PG',
    special_features: 'Commentaries,Deleted Scenes'
  },
  {
    film_id: 260,
    title: 'EASY HEAVEN',
    description: 'A Fateful Yarn of a Pastry Chef and a Dog who must Pursue a Boy in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 122,
    replacement_cost: 18.99,
    rating: 'PG-13',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 680,
    title: 'PARDON LOOK',
    description: 'A Action-Packed Panorama of a Database Administrator and a Crocodile who must Challenge a Teacher in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 115,
    replacement_cost: 19.99,
    rating: 'PG',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 345,
    title: 'GARDEN ISLAND',
    description: 'A Unbelieveable Panorama of a Monkey and a Moose who must Confront a Waitress in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 4.99,
    length: 105,
    replacement_cost: 24.99,
    rating: 'G',
    special_features: 'Trailers,Behind the Scenes'
  },
  {
    film_id: 808,
    title: 'SLIPPER FICTION',
    description: 'A Unbelieveable Display of a Database Administrator and a Husband who must Defeat a Crocodile in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 0.99,
    length: 102,
    replacement_cost: 21.99,
    rating: 'NC-17',
    special_features: 'Commentaries'
  },
  {
    film_id: 994,
    title: 'WYOMING STORM',
    description: 'A Awe-Inspiring Panorama of a Robot and a Boat who must Defeat a Sailor in Nigeria',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 100,
    replacement_cost: 29.99,
    rating: 'PG-13',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 785,
    title: 'SEA VIRGIN',
    description: 'A Beautiful Documentary of a Mad Scientist and a Composer who must Meet a Robot in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 98,
    replacement_cost: 13.99,
    rating: 'PG-13',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 638,
    title: 'OCEAN HURRICANE',
    description: 'A Emotional Drama of a Crocodile and a Dog who must Confront a Pioneer in A Monastery',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 2.99,
    length: 95,
    replacement_cost: 26.99,
    rating: 'PG-13',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 642,
    title: 'OPERATION OPERATION',
    description: 'A Intrepid Character Study of a Man and a Frisbee who must Overcome a Boy in The Canadian Rockies',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 92,
    replacement_cost: 23.99,
    rating: 'G',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 677,
    title: 'PARK CITIZEN',
    description: 'A Taut Reflection of a Technical Writer and a Girl who must Face a Secret Agent in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 88,
    replacement_cost: 21.99,
    rating: 'PG-13',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 684,
    title: 'PATRIOT ROMAN',
    description: 'A Astounding Yarn of a Car and a Robot who must Meet a Pioneer in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 82,
    replacement_cost: 29.99,
    rating: 'PG',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 265,
    title: 'ELEPHANT TROJAN',
    description: 'A Astounding Panorama of a Monkey and a Teacher who must Challenge a Explorer in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 4.99,
    length: 78,
    replacement_cost: 16.99,
    rating: 'PG-13',
    special_features: 'Trailers,Behind the Scenes'
  },
  // Shortest films ending in 'n':
  // Rank 1 to 5 (Shortest ending in 'n'):
  {
    film_id: 466,
    title: 'IRON MOON',
    description: 'A Fast-Paced Documentary of a Mad Scientist and a A Shark who must Pursue a Dentist in An Abandoned Amusement Park',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 46, // #1 shortest ending in 'n'
    replacement_cost: 27.99,
    rating: 'PG',
    special_features: 'Commentaries,Behind the Scenes'
  },
  {
    film_id: 497,
    title: 'JINX INSECTS',
    description: 'A Amazing Documentary of a Butler and a Monkey who must Meet a Composer in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 48,
    replacement_cost: 19.99,
    rating: 'PG',
    special_features: 'Deleted Scenes'
  },
  {
    film_id: 508,
    title: 'LAMBS CINCINATTI',
    description: 'A Insightful Story of a Man and a Feminist who must Face a Pioneer in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 50,
    replacement_cost: 20.99,
    rating: 'PG',
    special_features: 'Trailers'
  },
  {
    film_id: 512,
    title: 'LAWLESS VISION',
    description: 'A Fast-Paced Yarn of a A Shark and a Student who must Conquer a Dog in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 4.99,
    length: 51, // #2 shortest ending in 'n'
    replacement_cost: 29.99,
    rating: 'G',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 168,
    title: 'CABIN FLASH',
    description: 'A Stunning Epitaph of a Madman and a Dentist who must Challenge a Dog in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 0.99,
    length: 53,
    replacement_cost: 24.99,
    rating: 'PG',
    special_features: 'Commentaries'
  },
  {
    film_id: 711,
    title: 'PULP BEVERLY',
    description: 'A Emotional Reflection of a Teacher and a Frisbee who must Meet a Explorer in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 0.99,
    length: 54,
    replacement_cost: 23.99,
    rating: 'G',
    special_features: 'Trailers'
  },
  {
    film_id: 514,
    title: 'LEATHERNECKS DWARFS',
    description: 'A Fateful Reflection of a Dog and a Mad Scientist who must Face a Butler in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 55,
    replacement_cost: 28.99,
    rating: 'G',
    special_features: 'Trailers'
  },
  {
    film_id: 524,
    title: 'LION UNCUT',
    description: 'A Action-Packed Display of a Explorer and a Pastry Chef who must Overcome a Car in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 0.99,
    length: 56,
    replacement_cost: 10.99,
    rating: 'PG',
    special_features: 'Trailers'
  },
  {
    film_id: 809,
    title: 'SMILE CABIN',
    description: 'A Unbelieveable Tale of a Butler and a Waitress who must Face a Crocodile in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 57, // #3 shortest ending in 'n'
    replacement_cost: 16.99,
    rating: 'R',
    special_features: 'Commentaries,Behind the Scenes'
  },
  {
    film_id: 539,
    title: 'LUCK OPUS',
    description: 'A Touching Display of a Teacher and a Hunter who must Defeat a Mad Scientist in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 4.99,
    length: 58,
    replacement_cost: 20.99,
    rating: 'NC-17',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 996,
    title: 'YOUNG LANGUAGE',
    description: 'A Unbelieveable Yarn of a Boat and a Database Administrator who must Meet a Boy in The Canadian Rockies',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 59,
    replacement_cost: 9.99,
    rating: 'G',
    special_features: 'Trailers,Behind the Scenes'
  },
  {
    film_id: 802,
    title: 'SHOCK CABIN',
    description: 'A Insightful Documentary of a Boy and a Butler who must Challenge a Crocodile in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 2.99,
    length: 60, // #4 shortest ending in 'n'
    replacement_cost: 27.99,
    rating: 'PG-13',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 560,
    title: 'MARS WONDERLAND',
    description: 'A Lacklustrian Character Study of a Mad Scientist and a Technical Writer who must Face a Pioneer in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 2.99,
    length: 61,
    replacement_cost: 18.99,
    rating: 'PG',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 561,
    title: 'MASK PEACH',
    description: 'A Boring Character Study of a Student and a Robot who must Meet a Woman in An Abandoned Mine Shaft',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 2.99,
    length: 62,
    replacement_cost: 14.99,
    rating: 'NC-17',
    special_features: 'Trailers'
  },
  {
    film_id: 382,
    title: 'GROOVE FICTION',
    description: 'A Unbelieveable Reflection of a Database Administrator and a Moose who must Confront a Waitress in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 0.99,
    length: 63, // #5 shortest ending in 'n'
    replacement_cost: 21.99,
    rating: 'PG-13',
    special_features: 'Trailers,Deleted Scenes'
  },

  // NOW THE SECOND 5 SHORTEST ENDING IN 'N' (RANK 6, 7, 8, 9, 10):
  {
    film_id: 433,
    title: 'HEAVENLY GUN',
    description: 'A Intrepid Reflection of a Student and a Hunter who must Face a Pastry Chef in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 64, // #6 shortest ending in 'n' (1st of 2nd five!)
    replacement_cost: 28.99,
    rating: 'PG',
    special_features: 'Commentaries,Deleted Scenes'
  },
  {
    film_id: 301,
    title: 'FACTORY DRAGON',
    description: 'A Action-Packed Reflection of a Monkey and a Moose who must Defeat a Technical Writer in The Outback',
    release_year: 2006,
    language_id: 1,
    rental_duration: 4,
    rental_rate: 0.99,
    length: 66, // #7 shortest ending in 'n' (2nd of 2nd five!)
    replacement_cost: 14.99,
    rating: 'PG-13',
    special_features: 'Trailers,Behind the Scenes'
  },
  {
    film_id: 457,
    title: 'IMPACT ALADDIN',
    description: 'A Thrilling Character Study of a Boat and a Secret Agent who must Defeat a Teacher in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 0.99,
    length: 68, // #8 shortest ending in 'n' (3rd of 2nd five!)
    replacement_cost: 12.99,
    rating: 'PG-13',
    special_features: 'Deleted Scenes,Behind the Scenes'
  },
  {
    film_id: 624,
    title: 'NIGHTMARE CHILL',
    description: 'A Awe-Inspiring Story of a Dog and a Butler who must Overcome a Crocodile in An Abandoned Mine Shaft',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 69,
    replacement_cost: 11.99,
    rating: 'PG',
    special_features: 'Behind the Scenes'
  },
  {
    film_id: 635,
    title: 'NOON PAPILLON',
    description: 'A Fast-Paced Display of a Composer and a Robot who must Challenge a Dog in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 0.99,
    length: 71, // #9 shortest ending in 'n' (4th of 2nd five!)
    replacement_cost: 28.99,
    rating: 'R',
    special_features: 'Trailers,Commentaries'
  },
  {
    film_id: 771,
    title: 'SAMURAI LION',
    description: 'A Touching Tale of a Pioneer and a Pastry Chef who must Face a Composer in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 4.99,
    length: 75, // #10 shortest ending in 'n' (5th of 2nd five!)
    replacement_cost: 20.99,
    rating: 'G',
    special_features: 'Commentaries,Deleted Scenes'
  },

  // And other films (rank > 10 ending in 'n' or ending in other characters):
  {
    film_id: 489,
    title: 'JAWBREAKER BROOKLYN',
    description: 'A Stunning Display of a A Shark and a Husband who must Overcome a Boy in An Abandoned Mine Shaft',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 77,
    replacement_cost: 24.99,
    rating: 'PG-13',
    special_features: 'Deleted Scenes'
  },
  {
    film_id: 1,
    title: 'ACADEMY DINOSAUR',
    description: 'A Epic Drama of a Feminist and a Mad Scientist who must Battle a Teacher in The Canadian Rockies',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 0.99,
    length: 86,
    replacement_cost: 20.99,
    rating: 'PG',
    special_features: 'Deleted Scenes,Behind the Scenes'
  },
  {
    film_id: 2,
    title: 'ACE GOLDFINGER',
    description: 'A Astounding Epistle of a Database Administrator and a Explorer who must Find a Car in Ancient China',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 4.99,
    length: 48,
    replacement_cost: 12.99,
    rating: 'G',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 3,
    title: 'ADAPTATION HOLES',
    description: 'A Astounding Reflection of a Lumberjack and a Car who must Sink a Lumberjack in A Balmy Expedition',
    release_year: 2006,
    language_id: 1,
    rental_duration: 7,
    rental_rate: 2.99,
    length: 50,
    replacement_cost: 18.99,
    rating: 'NC-17',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 4,
    title: 'AFFAIR PREJUDICE',
    description: 'A Fanciful Documentary of a Frisbee and a Lumberjack who must Chase a Monkey in A Shark Tank',
    release_year: 2006,
    language_id: 1,
    rental_duration: 5,
    rental_rate: 2.99,
    length: 117,
    replacement_cost: 26.99,
    rating: 'G',
    special_features: 'Commentaries,Behind the Scenes'
  },
  {
    film_id: 5,
    title: 'AFRICAN EGG',
    description: 'A Fast-Paced Documentary of a Pastry Chef and a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 2.99,
    length: 130,
    replacement_cost: 22.99,
    rating: 'G',
    special_features: 'Deleted Scenes'
  },
  {
    film_id: 6,
    title: 'AGENT TRUMAN',
    description: 'A Intrepid Panorama of a Robot and a Boy who must Escape a Astronaut in The Sahara',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 169,
    replacement_cost: 17.99,
    rating: 'PG',
    special_features: 'Commentaries'
  },
  {
    film_id: 7,
    title: 'AIRPLANE SIERRA',
    description: 'A Touching Saga of a Hunter and a Butler who must Discover a Butler in A Jet Boat',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 62,
    replacement_cost: 28.99,
    rating: 'PG-13',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 8,
    title: 'AIRPORT POLLOCK',
    description: 'A Epic Tale of a Moose and a Girl who must Confront a Monkey in Ancient India',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 54,
    replacement_cost: 15.99,
    rating: 'R',
    special_features: 'Trailers'
  },
  {
    film_id: 9,
    title: 'ALABAMA DEVIL',
    description: 'A Thoughtful Panorama of a Database Administrator and a Mad Scientist who must Outgun a Mad Scientist in An Abandoned Amusement Park',
    release_year: 2006,
    language_id: 1,
    rental_duration: 3,
    rental_rate: 2.99,
    length: 114,
    replacement_cost: 21.99,
    rating: 'PG-13',
    special_features: 'Trailers,Deleted Scenes'
  },
  {
    film_id: 10,
    title: 'ALADDIN CALENDAR',
    description: 'A Action-Packed Tale of a Man and a Lumberjack who must Reach a Feminist in Ancient China',
    release_year: 2006,
    language_id: 1,
    rental_duration: 6,
    rental_rate: 4.99,
    length: 63,
    replacement_cost: 24.99,
    rating: 'NC-17',
    special_features: 'Trailers,Deleted Scenes'
  }
];

export const SAKILA_CUSTOMERS: Customer[] = [
  // Store 1 Customers (with varied last names, including top Z/W/V names)
  {
    customer_id: 597,
    store_id: 1,
    first_name: 'BRIAN',
    last_name: 'WYMAN',
    email: 'brian.wyman@sakilacustomer.org',
    address_id: 603,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 598,
    store_id: 1,
    first_name: 'RACHEL',
    last_name: 'WRIGHT',
    email: 'rachel.wright@sakilacustomer.org',
    address_id: 604,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 595,
    store_id: 1,
    first_name: 'FLORENCE',
    last_name: 'WOOD',
    email: 'florence.wood@sakilacustomer.org',
    address_id: 601,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 594,
    store_id: 1,
    first_name: 'FREDDIE',
    last_name: 'WILLIS',
    email: 'freddie.willis@sakilacustomer.org',
    address_id: 600,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 593,
    store_id: 1,
    first_name: 'LINDA',
    last_name: 'WILLIAMS',
    email: 'linda.williams@sakilacustomer.org',
    address_id: 599,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 590,
    store_id: 1,
    first_name: 'CAROLYN',
    last_name: 'WHITE',
    email: 'carolyn.white@sakilacustomer.org',
    address_id: 596,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 588,
    store_id: 1,
    first_name: 'MARION',
    last_name: 'SNYDER',
    email: 'marion.snyder@sakilacustomer.org',
    address_id: 594,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 580,
    store_id: 1,
    first_name: 'DWIGHT',
    last_name: 'SIMPSON',
    email: 'dwight.simpson@sakilacustomer.org',
    address_id: 586,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 575,
    store_id: 1,
    first_name: 'ISAAC',
    last_name: 'OGLESBY',
    email: 'isaac.oglesby@sakilacustomer.org',
    address_id: 581,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 570,
    store_id: 1,
    first_name: 'IVAN',
    last_name: 'CROMWELL',
    email: 'ivan.cromwell@sakilacustomer.org',
    address_id: 576,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 1,
    store_id: 1,
    first_name: 'MARY',
    last_name: 'SMITH',
    email: 'mary.smith@sakilacustomer.org',
    address_id: 5,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 2,
    store_id: 1,
    first_name: 'PATRICIA',
    last_name: 'JOHNSON',
    email: 'patricia.johnson@sakilacustomer.org',
    address_id: 6,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 5,
    store_id: 1,
    first_name: 'ELIZABETH',
    last_name: 'BROWN',
    email: 'elizabeth.brown@sakilacustomer.org',
    address_id: 9,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 7,
    store_id: 1,
    first_name: 'MARIA',
    last_name: 'MILLER',
    email: 'maria.miller@sakilacustomer.org',
    address_id: 11,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 9,
    store_id: 1,
    first_name: 'MARGARET',
    last_name: 'MOORE',
    email: 'margaret.moore@sakilacustomer.org',
    address_id: 13,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 11,
    store_id: 1,
    first_name: 'KAREN',
    last_name: 'JACKSON',
    email: 'karen.jackson@sakilacustomer.org',
    address_id: 15,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 14,
    store_id: 1,
    first_name: 'BETTY',
    last_name: 'WHITE',
    email: 'betty.white@sakilacustomer.org',
    address_id: 18,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 16,
    store_id: 1,
    first_name: 'SANDRA',
    last_name: 'MARTIN',
    email: 'sandra.martin@sakilacustomer.org',
    address_id: 20,
    active: 0,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 20,
    store_id: 1,
    first_name: 'SHARON',
    last_name: 'ROBINSON',
    email: 'sharon.robinson@sakilacustomer.org',
    address_id: 24,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },

  // Store 2 Customers (for proper WHERE store_id = 1 filtering demonstration)
  {
    customer_id: 599,
    store_id: 2,
    first_name: 'AUSTIN',
    last_name: 'CINTRON',
    email: 'austin.cintron@sakilacustomer.org',
    address_id: 605,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 596,
    store_id: 2,
    first_name: 'EDUARDO',
    last_name: 'HIATT',
    email: 'eduardo.hiatt@sakilacustomer.org',
    address_id: 602,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 592,
    store_id: 2,
    first_name: 'TERRANCE',
    last_name: 'ROUSH',
    email: 'terrance.roush@sakilacustomer.org',
    address_id: 598,
    active: 0,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 591,
    store_id: 2,
    first_name: 'KENT',
    last_name: 'ARSENAULT',
    email: 'kent.arsenault@sakilacustomer.org',
    address_id: 597,
    active: 1,
    create_date: '2006-02-14 22:04:37'
  },
  {
    customer_id: 3,
    store_id: 2,
    first_name: 'LINDA',
    last_name: 'WILLIAMS',
    email: 'linda.williams2@sakilacustomer.org',
    address_id: 7,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 4,
    store_id: 2,
    first_name: 'BARBARA',
    last_name: 'JONES',
    email: 'barbara.jones@sakilacustomer.org',
    address_id: 8,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 6,
    store_id: 2,
    first_name: 'JENNIFER',
    last_name: 'DAVIS',
    email: 'jennifer.davis@sakilacustomer.org',
    address_id: 10,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 8,
    store_id: 2,
    first_name: 'SUSAN',
    last_name: 'WILSON',
    email: 'susan.wilson@sakilacustomer.org',
    address_id: 12,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  },
  {
    customer_id: 10,
    store_id: 2,
    first_name: 'DOROTHY',
    last_name: 'TAYLOR',
    email: 'dorothy.taylor@sakilacustomer.org',
    address_id: 14,
    active: 1,
    create_date: '2006-02-14 22:04:36'
  }
];

export const TABLES: Record<string, TableDefinition> = {
  film: {
    name: 'film',
    rowCount: 1000,
    description: 'Filmlerin başlık, süre, kiralama oranı ve derecelendirme gibi detaylarını içeren tablo.',
    columns: [
      { name: 'film_id', type: 'SMALLINT UNSIGNED', isPrimary: true, isNullable: false, comment: 'Benzersiz film kimliği' },
      { name: 'title', type: 'VARCHAR(128)', isNullable: false, comment: 'Film adı' },
      { name: 'description', type: 'TEXT', isNullable: true, comment: 'Film açıklaması' },
      { name: 'release_year', type: 'YEAR', isNullable: true, defaultValue: '2006', comment: 'Yayın yılı' },
      { name: 'language_id', type: 'TINYINT UNSIGNED', isNullable: false, defaultValue: '1', comment: 'Dil kimliği' },
      { name: 'rental_duration', type: 'TINYINT UNSIGNED', isNullable: false, defaultValue: '3', comment: 'Kiralama süresi (gün)' },
      { name: 'rental_rate', type: 'DECIMAL(4,2)', isNullable: false, defaultValue: '4.99', comment: 'Kiralama ücreti ($)' },
      { name: 'length', type: 'SMALLINT UNSIGNED', isNullable: true, comment: 'Film süresi (dakika)' },
      { name: 'replacement_cost', type: 'DECIMAL(5,2)', isNullable: false, defaultValue: '19.99', comment: 'Yenileme maliyeti ($)' },
      { name: 'rating', type: "ENUM('G','PG','PG-13','R','NC-17')", isNullable: true, defaultValue: "'G'", comment: 'Yaş sınırı derecesi' },
      { name: 'special_features', type: 'SET', isNullable: true, comment: 'Özel özellikler' }
    ],
    sampleData: SAKILA_FILMS
  },
  customer: {
    name: 'customer',
    rowCount: 599,
    description: 'Mağaza müşterilerinin ad, soyad, e-posta ve mağaza kimliklerini barındıran tablo.',
    columns: [
      { name: 'customer_id', type: 'SMALLINT UNSIGNED', isPrimary: true, isNullable: false, comment: 'Müşteri no' },
      { name: 'store_id', type: 'TINYINT UNSIGNED', isNullable: false, comment: 'Bağlı olduğu mağaza kimliği (1 veya 2)' },
      { name: 'first_name', type: 'VARCHAR(45)', isNullable: false, comment: 'Müşteri adı' },
      { name: 'last_name', type: 'VARCHAR(45)', isNullable: false, comment: 'Müşteri soyadı' },
      { name: 'email', type: 'VARCHAR(50)', isNullable: true, comment: 'E-posta adresi' },
      { name: 'address_id', type: 'SMALLINT UNSIGNED', isNullable: false, comment: 'Adres referansı' },
      { name: 'active', type: 'BOOLEAN', isNullable: false, defaultValue: '1', comment: 'Aktiflik durumu (1=Aktif, 0=Pasif)' },
      { name: 'create_date', type: 'DATETIME', isNullable: false, comment: 'Kayıt oluşturulma tarihi' }
    ],
    sampleData: SAKILA_CUSTOMERS
  }
};

export const ASSIGNMENT_PRESETS: QueryPreset[] = [
  {
    id: 'query-1',
    assignmentNumber: 1,
    title: "1. Soru: Film Adı 'n' ile Biten En Uzun 5 Film",
    userPrompt: "film tablosunda bulunan ve film ismi (title) 'n' karakteri ile biten en uzun (length) 5 filmi sıralayınız.",
    sqlQuery: `SELECT film_id, title, length, rating, rental_rate, replacement_cost
FROM film
WHERE title LIKE '%n'
ORDER BY length DESC
LIMIT 5;`,
    mysqlAlternative: `SELECT * FROM film WHERE title LIKE '%n' ORDER BY length DESC LIMIT 5;`,
    explanation: {
      overview: "Bu sorgu, film ismi küçük/büyük fark etmeksizin 'n' veya 'N' harfiyle biten tüm filmleri filtreler, uzunluklarına (length) göre en uzundan en kısaya doğru (DESC) dizer ve MySQL LIMIT ifadesiyle ilk 5 kaydı döndürür.",
      targetTable: "film tablosu",
      filterCondition: "WHERE title LIKE '%n' -> '%' joker karakteri herhangi bir metin dizisini temsil eder, bu nedenle '%n' son karakteri 'n' olanları seçer.",
      sortingLogic: "ORDER BY length DESC -> DESC (Descending / Azalan) en yüksek dakikadan başlayarak sıralar.",
      paginationLogic: "LIMIT 5 -> MySQL sorgu sonucunu yalnızca en üstteki 5 satırla sınırlandırır.",
      mysqlTip: "MySQL varsayılan collation'ı (utf8mb4_0900_ai_ci / utf8_general_ci) büyük/küçük harf duyarsız (Case-Insensitive) olduğu için 'n' ve 'N' harflerinin her ikisini de doğru bir şekilde yakalar."
    },
    keyTakeaway: "WHERE LIKE '%n' + ORDER BY length DESC + LIMIT 5"
  },
  {
    id: 'query-2',
    assignmentNumber: 2,
    title: "2. Soru: Film Adı 'n' ile Biten En Kısa İkinci 5 Film (6, 7, 8, 9, 10)",
    userPrompt: "film tablosunda bulunan ve film ismi (title) 'n' karakteri ile biten en kısa (length) ikinci(6,7,8,9,10) 5 filmi(6,7,8,9,10) sıralayınız.",
    sqlQuery: `SELECT film_id, title, length, rating, rental_rate, replacement_cost
FROM film
WHERE title LIKE '%n'
ORDER BY length ASC
LIMIT 5 OFFSET 5;`,
    mysqlAlternative: `SELECT * FROM film WHERE title LIKE '%n' ORDER BY length ASC LIMIT 5, 5;`,
    explanation: {
      overview: "Bu sorgu, film ismi 'n' karakteri ile biten filmleri bu kez en kısadan en uzuna (ASC) doğru dizer. İlk 5 filmi (1,2,3,4,5) atlayarak (OFFSET 5) sonraki 5 filmi (6,7,8,9,10) getirir.",
      targetTable: "film tablosu",
      filterCondition: "WHERE title LIKE '%n' -> İsim 'n' ile bitmeli.",
      sortingLogic: "ORDER BY length ASC -> ASC (Ascending / Artan) en kısa süreden en uzuna doğru sıralama yapar.",
      paginationLogic: "LIMIT 5 OFFSET 5 veya MySQL'e özel 'LIMIT 5, 5' -> İlk 5 satırı atla, sonraki 5 satırı listele.",
      mysqlTip: "MySQL'de LIMIT offset, count sözdizimi de geçerlidir. 'LIMIT 5, 5' ifadesi 'OFFSET 5 LIMIT 5' ile tamamen aynı sonucu üretir."
    },
    keyTakeaway: "WHERE LIKE '%n' + ORDER BY length ASC + LIMIT 5 OFFSET 5 (veya LIMIT 5, 5)"
  },
  {
    id: 'query-3',
    assignmentNumber: 3,
    title: "3. Soru: Store ID 1 & Last Name Azalan İlk 4 Müşteri",
    userPrompt: "customer tablosunda bulunan last_name sütununa göre azalan yapılan sıralamada store_id 1 olmak koşuluyla ilk 4 veriyi sıralayınız.",
    sqlQuery: `SELECT customer_id, store_id, first_name, last_name, email, active
FROM customer
WHERE store_id = 1
ORDER BY last_name DESC
LIMIT 4;`,
    mysqlAlternative: `SELECT * FROM customer WHERE store_id = 1 ORDER BY last_name DESC LIMIT 4;`,
    explanation: {
      overview: "Bu sorgu, customer tablosundaki müşteriler arasından sadece mağaza kimliği 1 (store_id = 1) olanları filtreler, soyadına göre Z'den A'ya doğru azalan (DESC) olarak sıralar ve en baştaki ilk 4 müşteriyi döndürür.",
      targetTable: "customer tablosu",
      filterCondition: "WHERE store_id = 1 -> Yalnızca store_id değeri 1 olan mağaza kayıtlarını alır.",
      sortingLogic: "ORDER BY last_name DESC -> Soyisimleri alfabetik olarak ters sırada (Z'den A'ya azalan) dizer.",
      paginationLogic: "LIMIT 4 -> Elde edilen filtrelenmiş ve sıralanmış listeden ilk 4 müşteriyi çeker.",
      mysqlTip: "İlişkisel veritabanlarında WHERE koşulu ORDER BY ve LIMIT'ten önce değerlendirilir. Bu yüzden önce store_id = 1 filtresi uygulanır, kalanlar sıralanır ve ilk 4'ü alınır."
    },
    keyTakeaway: "WHERE store_id = 1 + ORDER BY last_name DESC + LIMIT 4"
  }
];

export const AUTHOR_INFO = {
  name: 'Enes Öztürk',
  title: 'Veritabanı Mimarı & SQL Çözüm Uzmanı',
  course: 'MySQL & İlişkisel Veritabanı Yönetim Sistemleri (RDBMS)',
  databaseName: 'sakila_db (MySQL 8.4 LTS)',
  signatureText: 'Hazırlayan: Enes Öztürk'
};
