import {URL, selectElement} from '../config/config.js';


export function templateUser(userInfo){
  let markup = (`
  <div class="content content__post--border">
    <div class="content__userinfo">
      <div class="userinfo__avatar userinfo--centered">
        <img src=${URL.USER_PROFILE_IMG} width="100px" alt="">
      </div>
      <div class="userinfo__item1 userinfo--centered">
        <ul class=" userinfo__list">
          <li class="userinfo__list--blue">${userInfo.username}</li>
          <li class="userinfo__list--grey">${userInfo.address.city}</li>
          <li class="userinfo__list--grey">${userInfo.company.name}</li>
        </ul>
      </div>         
      <div class="userinfo__item2 userinfo--centered">
        <ul class=" userinfo__list">
          <li class="userinfo__list--blue userinfo__li--wide">${userInfo.email}</li>
          <li class="userinfo__list--grey userinfo__li--wide"><a href="${URL.GOOGLE_MAPS}${userInfo.address.geo.lat},${userInfo.address.geo.lng}">google mass link</a></li>
          <li class="userinfo__list--grey userinfo__li--wide">${userInfo.website}</li>
        </ul>
      </div>
    </div>`)
selectElement("#user__content").insertAdjacentHTML("afterBegin", markup);
}
export function templatePost(postInfo, index){
  let markup = (`
         <div class="content__post content__post--border content--centered">
            <p ><span class="post__text--blue">${postInfo[index].title}</span></p>
            <p><span class="post__text--grey">${postInfo[index].body}</span></p>
          </div>
          <button class="BtnComments">Show comments...</button>
        </div>
  `)
  selectElement(".content").insertAdjacentHTML("beforeEnd", markup);
}
export function templatePhoto(photoInfo){
  let markup = (`
           <div class="content__picture content--centered">
               <img  src="${photoInfo.url}" alt=""> 
           </div>
  `)
  selectElement(".content").insertAdjacentHTML("beforeEnd", markup);
}

