import {createApi} from 'unsplash-js';

class Category {
  constructor () {
    this.unsplash = createApi ({
      accessKey: 'xAlTlo7GKO_FOvXXzgjDqARIhpw6v8XcZ-G0vwz9zf4',
    });
    this.categoryName = 'random';
  }

  setCategory (name) {
    this.categoryName = name;
  }

  queryCategory () {
    return new Promise ((resolve, reject) => {
      this.unsplash.search
        .getPhotos ({
          query: this.categoryName,
          page: 1,
          perPage: 12,
          orientation: 'portrait',
        })
        .then (result => {
          if (result.type === 'success') {
            const photos = result.response.results;
            const getUrls = photos.map (i => {
              return i;
            });
            resolve (getUrls);
          } else {
            reject ('Failed to fetch photos');
          }
        })
        .catch (error => {
          reject (error);
        });
    });
  }
}

export default new Category ();
