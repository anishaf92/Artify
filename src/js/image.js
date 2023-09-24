// image.js
import {createApi} from 'unsplash-js';

import Favourite from './favourite';
class Image {
  constructor (photo, id) {
    this.photo = photo;
    this.id = id;
    this.isFavourite = false;
    this.imageContainer = null;
    this.loveButton = null;
    this.unsplash = createApi ({
      accessKey: 'xAlTlo7GKO_FOvXXzgjDqARIhpw6v8XcZ-G0vwz9zf4',
    });
    this.popupContainer = null;
  }

  createImageElement () {
    // Create an image element
    this.element = document.createElement ('img');
    this.element.src = this.photo;
    this.element.className = 'content-image';

    // Create a container for the image
    this.imageContainer = document.createElement ('div');
    this.imageContainer.className = 'image-container';
    this.imageContainer.appendChild (this.element);

    this.imageContainer.addEventListener ('click', async event => {
      try {
        
        // Fetch product details asynchronously
        if (event.target.classList.contains ('fa-heart') !== true) {
          const productDetails = await this.fetchProductDetails ();
          // Create and display the popup with product details
          this.popupContainer = this.createPopupHTML (
            this.photo,
            productDetails
          );
          
          this.openPopup (this.photo);
        }
      } catch (error) {
        console.error ('Error fetching product details:', error);
      }

      
    });

    // Create the "love" button
    this.createLoveButton ();

    // Add the image container to the main element
    const main = document.getElementById ('main');
    main.appendChild (this.imageContainer);
  }

  createPopupHTML (imageSrc, productDetails) {
    const popupContainer = document.createElement ('div');
    popupContainer.classList.add ('popup-container');

    const popupContent = document.createElement ('div');
    popupContent.classList.add ('popup-content');

    const closeButton = document.createElement ('span');
    closeButton.classList.add ('popup-close-button');
    closeButton.innerHTML = '&times;';

    const popupDetails = document.createElement ('div');
    popupDetails.classList.add ('popup-details');

    const productImage = document.createElement ('img');
    productImage.src = productDetails.image; 
    productImage.alt = 'Product Image';

    const productDescription = document.createElement ('p');
    productDescription.textContent = productDetails.description;

    // Append elements to the popup container
    popupContent.appendChild (closeButton);
    popupDetails.appendChild (productImage);
    popupDetails.appendChild (productDescription);
    popupContent.appendChild (popupDetails);
    popupContainer.appendChild (popupContent);

    // Add a click event listener to the close button
    closeButton.addEventListener ('click', () => {
      popupContainer.style.display = 'none';
      const overlay = document.querySelector ('.overlay');
      overlay.style.display = 'none';
    });

    return popupContainer;
  }

  async fetchProductDetails () {
    return new Promise ((resolve, reject) => {
      
      setTimeout (() => {
        const productDetails = this.unsplash.photos
          .get (
            {photoId: this.id}
           
          )
          .then (result => {
            if (result.type === 'success') {
              const details = {
                image: result.response.urls.full,
                description: result.response.description,
              };
              
              return details;
            }
          });

        
        resolve (productDetails);
      }, 100); 
    });
  }
  openPopup () {
    // Create the popup container if it doesn't exist

    // Show the popup by setting its style
    if (this.popupContainer) {
      document.body.appendChild (this.popupContainer);
      this.popupContainer.style.display = 'block';
      const overlay = document.querySelector ('.overlay');
      overlay.style.display = 'block';
    }
  }

  closePopup () {
    // Hide the popup by setting its style
    if (this.popupContainer) {
      this.popupContainer.style.display = 'none';
    }
  }
  createLoveButton () {
    // Create a "love" button element
    this.loveButton = document.createElement ('button');
    this.loveButton.className = 'love-button';

    // Create a Font Awesome icon element for the heart symbol
    const loveIcon = document.createElement ('i');
    if (Favourite.isFavourite (this.photo)) {
      loveIcon.className = 'fa fa-heart red';
    } else {
      loveIcon.className = 'fa fa-heart';
    }

    // Append the Font Awesome icon to the "love" button
    this.loveButton.appendChild (loveIcon);

    // Append the "love" button to the image container
    this.imageContainer.appendChild (this.loveButton);

    // Add a click event listener to the "love" button
    this.loveButton.addEventListener ('click', () => {
      this.toggleFavourite ();
    });
  }

  toggleFavourite () {
    // Toggle the favorite state
    this.isFavourite = !this.isFavourite;

    // Handle the "love" button click event
    if (this.isFavourite) {
      Favourite.setFavourite (this.photo);
      this.loveButton.classList.add ('red');
    } else {
      Favourite.removeFavourite (this.photo);
      this.loveButton.classList.remove ('red');
    }
  }
}

export default Image;
