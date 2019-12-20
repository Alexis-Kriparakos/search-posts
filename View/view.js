import {templateUser, templatePost, templatePhoto} from '../template/template.js';
import {selectElement} from '../config/config.js';

export function displayPosts(userInfo, postInfo, photoInfo, index){
  templateUser(userInfo);
  templatePhoto(photoInfo);
  templatePost(postInfo, index);
}
export function removePosts(){
  let parentElement = selectElement("#user__content");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}