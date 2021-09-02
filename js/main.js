const loadResult = (elementId, styleDisplay) => {
  const notResult = document.getElementById(elementId);
  notResult.style.display = styleDisplay;
};

// input value
document.getElementById("button").addEventListener("click", async () => {
  const inputField = document.getElementById("input-field");
  const inputText = inputField.value;
  inputField.value = "";
  loadResult("total-search", "none");
  loadResult("result", "none");

  // books
  const displayContainer = document.getElementById("books");
  displayContainer.textContent = "";

  // hidden stuff
  if (inputText === "") {
    document.getElementById("write").style.display = "block";
    return;
  }
  loadResult("spiners", "block");
  loadResult("write", "none");

  try {
    const url = `https://openlibrary.org/search.json?q=${inputText}`;
    const res = await fetch(url);
    const data = await res.json();
    //total result
    const lengthTotal = document.getElementById("total");
    lengthTotal.innerText = data.numFound;

    displayData(data.docs);
  } catch (any) {
    console.log(any);

    loadResult("spiners", "none");
    loadResult("result", "block");
  }
});
// display data
const displayData = (data) => {
  if (data.length === 0) {
    loadResult("result", "block");
    loadResult("spiners", "none");
  } else {
    loadResult("result", "none");
  }
  const length = data.length;
  console.log(length);

  // total search
  loadResult("total-search", "block");

  // Books
  const displayContainer = document.getElementById("books");
  displayContainer.textContent = "";

  // templete string
  data.slice(0, 21).forEach((string) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class=" h-100 d-flex border border-1 rounded-3 shadow ">
        <div>
          <img src="https://covers.openlibrary.org/b/id/${
            string.cover_i ? string.cover_i : " Picture not found"
          }-M.jpg" class="card-img-top p-4" alt="Book image" style = "width: 150px; height: 200px;">
        </div>
        <div class="card-body  mx-2 px-2">
            <h4 class="card-title text-primary">BookName : ${string.title}</h4>
            <h5 class="card-title">Author : ${
              string.author_name ? string.author_name[0] : "Unknown Author"
            }</h5>
            <h6 class=""> Publisher : ${
              string.publisher[0] ? string.publisher[0] : "Unknow publisher"
            }</h6>
              <p class="card-text ">First Publish Data : ${
                string.first_publish_year
                  ? string.first_publish_year
                  : "Unknown Year"
              }</p>
              

          </div>
      </div>`;
    loadResult("result", "none");
    displayContainer.appendChild(div);
    loadResult("spiners", "none");
  });
};
