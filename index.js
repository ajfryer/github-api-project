/*
The user must be able to search for a GitHub user handle.
The search must trigger a call to GitHub's API.
The repos associated with that handle must be displayed on the page.
You must display the repo name and link to the repo URL.
The user must be able to make multiple searches and see only the results for the current search.
*/

'use strict';

const baseURL = `https://api.github.com/`;


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  console.log(responseJson.length);
  console.log(responseJson[0]);
  console.log(responseJson[0].url);
  $('#js-error-message').empty();
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  
  const url = `${baseURL}users/${query}/repos`;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#results-list').empty();
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
