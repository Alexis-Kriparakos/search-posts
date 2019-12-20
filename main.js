import {URL, CONTROLS, selectElement, userInput} from './config/config.js';
import {removePosts, displayPosts} from './View/view.js';

// export function renderPage(){
//   if(event.keyCode === 13){
//     event.preventDefault(); 
//     removePosts();
//     if(userInput.value){
//       Promise.all
//       ([        
//         fetch(`${URL.GET_USERS}${userInput.value}`)
//         .then(data => data.json()),
//         fetch(`${URL.GET_POSTS}${userInput.value}`)
//         .then(data => data.json()),
//       ])
//       .then(data =>{
//         let usersData, postsData;
//         [usersData, postsData] = data;     
//         postsData.forEach((post, index) => {
//           fetch(`${URL.GET_PHOTOS}${postsData[index].id}`)
//           .then(data => data.json())
//           .then((photosData) => {   
//             displayPosts(usersData, postsData, photosData, index);   
//           }) 
//         })  
//       })
//       .catch((err) => {
//             console.log(err);
//       });      
//     }
//     else{
//       removePosts();  
//     }
//   }
// }

export function renderPage(){
  if(event.keyCode === 13){
    event.preventDefault();
    removePosts();  
    if(userInput.value){      
      getAPIData();
    }
  }
}

function getAPIData(){
  fetch(`${URL.GET_USERS}${userInput.value}`)
      .then(data => data.json())
      .then(usersData => {
        fetch(`${URL.GET_POSTS}${userInput.value}`)
        .then(data => data.json())
        .then(postsData => {
          postsData.forEach((placeholder, index) => {
            fetch(`${URL.GET_PHOTOS}${postsData[index].id}`)
            .then(data => data.json())
            .then(photosData => {
              displayPosts(usersData, postsData, photosData, index);
            })
          })
        })
      })
}