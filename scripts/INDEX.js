'use strict';
/* global $, BOOKMARKS, API, STORE*/


$(document).ready(function(){
  BOOKMARKS.bindEventListeners();

  API.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => STORE.addBookmark(bookmark));
      BOOKMARKS.render();
    })
    .catch(err => console.log(err.message));
});