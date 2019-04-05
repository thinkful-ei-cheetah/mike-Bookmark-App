'use strict';
/* global */


const API = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mike';

  const listApiFetch = function(...args) {
    // setup promise chain outside of scope
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        // otherwise, return the json as normal resolved Promise
        return data;
      });
  };

  // GET
  function getBookmarks(){
    console.log('get bookmarks');
    return listApiFetch(`${BASE_URL}/bookmarks`);
  }

  // POST
  function addBookmark(object){
    const newItem = JSON.stringify(object);
    console.log('add bookmarks');
    return listApiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newItem
    });
  }

  // PATCH
  function editBookmark(id, updateData){
    const newData = JSON.stringify(updateData);
    console.log('edit bookmarks');
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: newData
    });
  }

  // DELETE
  function deleteBookmark(id){
    console.log('delete bookmarks');
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    });
  }

  return {
    getBookmarks,
    addBookmark,
    editBookmark,
    deleteBookmark,
  };

}());