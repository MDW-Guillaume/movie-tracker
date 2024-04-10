import Dexie from 'dexie';

export const db = new Dexie('movie-tracker-database');
db.version(1).stores({
  comments: '++id, movie_id, content',
  favorites: '++id, movie_id',
});