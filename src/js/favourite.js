let favList = [];
class Favourite {
  getFavourite () {
    return favList;
  }
  setFavourite (image) {
    if (!favList.includes (image)) favList = [...favList, image];
    this.saveFavList ();
  }
  removeFavourite (image) {
    if (favList.includes (image)) {
      favList = favList.filter (item => item !== image);
      // Save the updated favList to local storage
      this.saveFavList ();
    }
  }

  isFavourite (image) {
    return favList.includes(image);
  }
  saveFavList () {
    // Convert the favList to a JSON string and store it in local storage
    localStorage.setItem('favList', JSON.stringify (favList));
  }

  loadFavList () {
    // Retrieve the favList from local storage and parse it as JSON
    const storedFavList = localStorage.getItem ('favList');
    if (storedFavList) {
      favList = JSON.parse (storedFavList);
    }
  }
}

export default new Favourite ();
