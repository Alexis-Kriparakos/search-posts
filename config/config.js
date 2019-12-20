export const URL = {
  GET_POSTS : "https://jsonplaceholder.typicode.com/posts?userId=",
  GET_USERS : "https://jsonplaceholder.typicode.com/users/",
  GET_PHOTOS : "https://jsonplaceholder.typicode.com/photos/",
  GOOGLE_MAPS : "https://maps.google.com/?ll=",
  USER_PROFILE_IMG : "https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png"
};

export const CONTROLS = {
  USER_SEARCHBAR_VALUE : "#userSearchBar",
  COMMENTS_DISPLAY_BTN : ".BtnComments"
}
export const selectElement = (queryText) => document.querySelector(queryText);

export let userInput = selectElement(CONTROLS.USER_SEARCHBAR_VALUE);