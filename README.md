Build a Bookmarks App
Project Overview
Using everything you've learned over the Fundamentals section of the course, you will build the frontend for an API-powered Bookmarks application that lets the user store and rate their custom web bookmarks.

As a user:
1) I can add bookmarks to my bookmark list. Bookmarks contain:
   title
   url link
   description
   rating (1-5)

2) I can see a list of my bookmarks when I first open the app

3) All bookmarks in the list default to a "condensed" view showing only title and rating
   I can click on a bookmark to display the "detailed" view

4) Detailed view expands to additionally display description and a "Visit Site" link
   I can remove bookmarks from my bookmark list

5) I receive appropriate feedback when I cannot submit a bookmark

6) Check all validations in the API documentation (e.g. title and url field required)
   I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

Deployment:
You can access new website from https://thinkful-ei-cheetah.github.io/mike-Bookmark-App/

Build With:
Bootstrap - The web framework used
API - https://thinkful-list-api.herokuapp.com/

Technical Requirements
Use fetch for AJAX calls and jQuery for DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use responsive design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices
