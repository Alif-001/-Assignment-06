// get search value

const searchInput = document.getElementById("search-input");

// search button

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
  const searchValue = searchInput.value;
  console.log(searchValue);
});
