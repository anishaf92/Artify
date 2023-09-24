// contentLoader.js

import Category from './category';
import Favourite from './favourite';
import Image from './image';

export function initializeContentLoader () {
  const main = document.getElementById ('main');
  const navbarMenu = document.querySelector ('.navbar-menu');
  
  Category.queryCategory ().then (photos => {
    photos.forEach ((photo, index) => {
      // Create an Image object for each photo
      const image = new Image (photo.urls.small, photo.id);

      // Create and display the image element along with the love button
      image.createImageElement ();
    });
  });

  navbarMenu.addEventListener ('click', event => loadAndDisplayImages (event));
}

function loadAndDisplayImages (event) {
  if (event.target.tagName === 'A') {
    const selectedMenuItem = event.target.getAttribute ('selected-id');
    const main = document.getElementById ('main');

    // Remove all child elements (previously loaded images)
    while (main.firstChild) {
      main.removeChild (main.firstChild);
    }
    
    if (selectedMenuItem != 'favourites') {
      Category.setCategory (selectedMenuItem);

      Category.queryCategory ().then (photos => {
        photos.forEach ((photo, index) => {
          // Create an Image object for each photo
          const image = new Image (photo.urls.small, photo.id);

          // Create and display the image element along with the love button
          image.createImageElement ();
        });
      });
    } else {
      createFavouritesPage ();
    }
  }
}
function createFavouritesPage () {
  const main = document.getElementById ('main');

  // Clear existing content in the main element
  main.innerHTML = '';
  
  if (Favourite.getFavourite ().length === 0) {
    const noFav = document.createElement ('div');
    noFav.classList.add ('nofav-text');
    noFav.innerText =
      'You dont have any favourite picture, you can add an item to favourites by clicking on the heart';
    main.appendChild (noFav);
  }

  // Get the list of favorite images
  const favoritePhotos = Favourite.getFavourite ();

  favoritePhotos.forEach (photo => {
    const image = new Image (photo);

    // Create and display the image element along with the love button
    image.createImageElement ();

    // Configure the love button
    if (image.isFavourite) {
      image.loveButton.classList.add ('red');
    } else {
      image.loveButton.classList.remove ('red');
    }

    // Add a click event listener to the love button
    image.loveButton.addEventListener ('click', () => {
      image.toggleFavourite ();

      Favourite.removeFavourite (image.photo);
      image.loveButton.classList.remove ('red');
      main.removeChild (image.imageContainer);
      if (Favourite.getFavourite ().length === 0) {
        const noFav = document.createElement ('div');
        noFav.classList.add ('nofav-text');
        noFav.innerText =
          'You dont have any favourite picture, you can add an item to favourites by clicking on the heart';
        main.appendChild (noFav);
      }
    });

    
  });
}

