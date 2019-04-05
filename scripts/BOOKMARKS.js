'use strict';
/* global $, STORE, API */


const BOOKMARKS = (function(){

  function generateError(message){
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  // create HTML for a bookmark object while using the keys to get values
  function generateBookmarkElement(bookmark){
    return `
      <div class="panel panel-default js-bookmark-element" data-item-id="${bookmark.id}">
        <div class="panel-heading" role="tab">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${bookmark.id}" aria-expanded="true" aria-controls="${bookmark.id}">
              ${bookmark.title}
              <span class="bookmark-rating">${stars(bookmark.rating)}</span>
            </a>
          </h4>
        </div>
        <div id="${bookmark.id}" class="panel-collapse collapse" role="tabpanel">
          <div class="panel-body">
            <p data-id="${bookmark.id}">${bookmark.description}</p>
            <p><a data-id="${bookmark.id}" target="_blank" href="${bookmark.url}">Visit Site</a></p>
            <button type="button" class="btn btn-danger js-bookmark-delete" data-id="${bookmark.id}">Delete</button>
          </div>
        </div>
      </div>
    `;
  }

  // create the above html for each bookmark object
  // generate bookmark element with html, values filled in for all items
  function generateBookmarksListString(bookmarksList){
    const bookmarks = bookmarksList.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function stars(numStar){
    const starHTML = '<span class="glyphicon glyphicon-star"></span>';

    let currentString = '';
    for (let i = 0; i < numStar; i++){
      currentString += starHTML;
    }
    return currentString;
  }

  function renderError(){
    if (STORE.error) {
      const el = generateError(STORE.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }

  function closeError(){
    $('.error-container').on('click', '#cancel-error', () => {
      STORE.setError(null);
      renderError();
    });
  }

  function render(){
    renderError();
    let bookmarks = STORE.bookmarks.filter(bookmark => {
      return bookmark.rating >= STORE.minimumRating;
    });
    
    // populate the 'ul' with html generated data
    $('.js-bookmarks-list').html(generateBookmarksListString(bookmarks));
  }

  function getItemIdFromElement(bookmark){
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('item-id');
  }

  // check form values and create an request filling in the request parameters
  // listen for form submission, handle what to do when user submits form
  function handleNewBookmarkSubmit(){
    $('#js-add-bookmark-form').submit(function(event){
      event.preventDefault();
      const values = {};
      values.title = $('.js-bookmark-title').val();
      values.url = $('.js-bookmark-url').val();
      values.description = $('.js-bookmark-description').val();
      values.rating = $('.js-bookmark-rating').val();
      // $('#js-add-bookmark-form').trigger('reset');
      API.addBookmark(values)
        .then((newBookmark) => {
          STORE.addBookmark(newBookmark);
          render();
        })
        .catch((err) => {
          STORE.setError(err.message);
          renderError();
        });
    });
  }

  // delete from store
  function handleBookmarkDeleteClicked(){
    $('.js-bookmarks-list').on('click', '.js-bookmark-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);

      API.deleteBookmark(id)
        .then(() => {
          STORE.findAndDelete(id);
          render();
        })
        .catch((err) => {
          console.log(err);
          STORE.setError(err.message);
          renderError();
        });
    });
  }

  // filter using minimum rating dropdown
  function handleMinimumRatingFilter(){
    $('.js-bookmark-rating-filter').on('change', event => {
      let rating = $(event.target).val();
      STORE.minimumRating = rating;
      render();
    });
  }

  function bindEventListeners(){
    closeError();
    handleNewBookmarkSubmit();
    handleBookmarkDeleteClicked();
    handleMinimumRatingFilter();
  }

  return {
    bindEventListeners,
    render
  };

}());