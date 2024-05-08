const myLibrary = [];
const libraryDiv = document.querySelector(".library");
const addButton = document.querySelector("#add-button");
const modal = document.querySelector("#modal");
const selectMenu = document.querySelector("#type");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const bookLabels = ["Author:", "Number of Pages:", "Read:"];
const movieLabels = ["Director:", "Length (minutes):", "Seen:"];
const tvSeriesLabels = ["Director:", "Episodes:", "Seen:"];
const submitButton = document.querySelector("#submit-button");
const newMediaForm = document.querySelector("#new-media-form");

//Media Object (meant to be parent object)
function Media(title) {
  this.title = title;
  this.card = document.createElement("div");
  this.header = document.createElement("h3");
  this.person = document.createElement("p");
  this.info = document.createElement("div");
  this.toggle = document.createElement("button");
}

//Book object (inherits from media)
function Book(author, title, pages, read) {
  Media.call(this, title);
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggle.addEventListener("click", () => {
    this.read = this.read ? false:true;
    this.toggle.innerHTML = this.read ? "Read":"Not Read";
  })
}

//Movie object (inherits from media)
function Movie(director, title, length, seen) {
  Media.call(this, title);
  this.director = director;
  this.length = length;
  this.seen = seen;
  this.toggle.addEventListener("click", () => {
    this.seen = this.seen ? false:true;
    this.toggle.innerHTML = this.seen ? "Seen": "Not Seen";
  })
}

//TVSeries object (inherits from media)
function TVSeries(director, title, episodes, seen) {
  Media.call(this, title);
  this.director = director;
  this.episodes = episodes;
  this.seen = seen;
  this.toggle.addEventListener("click", () => {
    this.seen = this.seen ? false:true;
    this.toggle.innerHTML = this.seen ? "Seen": "Not Seen";
  })
}

//inserts card for new book
Book.prototype.insert = function () {
  //add class info
  this.card.classList.add("card");
  this.info.classList.add("info");
  this.card.setAttribute("id", myLibrary.length - 1);
  //create elements
  let image = document.createElement("img");
  let pages = document.createElement("p");
  //add content
  this.header.innerHTML = this.title;
  this.person.innerHTML = `Author: ${this.author}`;
  pages.innerHTML = `Number of Pages: ${this.pages}`;
  this.toggle.innerHTML = this.read ? `Read` : `Not Read`;
  image.src = "images/green.jpg";
  //append elements
  this.card.appendChild(this.header);
  this.card.appendChild(image);
  this.info.appendChild(this.person);
  this.info.appendChild(pages);
  this.info.appendChild(this.toggle);
  this.card.appendChild(this.info);
  libraryDiv.appendChild(this.card);
};
//inserts card for new movie
Movie.prototype.insert = function () {
  //add class info
  this.card.classList.add("card");
  this.info.classList.add("info");
  this.card.setAttribute("id", myLibrary.length - 1);
  //create elements
  let image = document.createElement("img");
  let length = document.createElement("p");
  //add content
  this.header.innerHTML = this.title;
  this.person.innerHTML = `Director: ${this.director}`;
  length.innerHTML = `Length (minutes): ${this.length}`;
  this.toggle.innerHTML = this.seen ? `Seen` : `Not Seen`;
  image.src = "images/red.jpg";
  //append elements
  this.card.appendChild(this.header);
  this.card.appendChild(image);
  this.info.appendChild(this.person);
  this.info.appendChild(length);
  this.info.appendChild(this.toggle);
  this.card.appendChild(this.info);
  libraryDiv.appendChild(this.card);
};
//inserts card for new tv series
TVSeries.prototype.insert = function () {
  //add class info
  this.card.classList.add("card");
  this.info.classList.add("info");
  this.card.setAttribute("id", myLibrary.length - 1);
  //create elements
  let image = document.createElement("img");
  let episodes = document.createElement("p");
  image.src = "images/pastel.jpg";
  //add content
  this.header.innerHTML = this.title;
  this.person.innerHTML = `Director: ${this.director}`;
  episodes.innerHTML = `Number of Episodes: ${this.episodes}`;
  this.toggle.innerHTML = this.seen ? `Seen` : `Not Seen`;
  //append elements
  this.card.appendChild(this.header);
  this.card.appendChild(image);
  this.info.appendChild(this.person);
  this.info.appendChild(episodes);
  this.info.appendChild(this.toggle);
  this.card.appendChild(this.info);
  libraryDiv.appendChild(this.card);
};
// Link prototypes
Object.setPrototypeOf(Book.prototype, Media.prototype);
Object.setPrototypeOf(Movie.prototype, Media.prototype);
Object.setPrototypeOf(TVSeries.prototype, Media.prototype);

//Adds item to library array
function addItemToLibrary(type, author, title, pages, read) {
  let item;
  switch (
    type //create object
  ) {
    case "Book":
      item = new Book(author, title, pages, read);
      break;
    case "Movie":
      item = new Movie(author, title, pages, read);
      break;
    case "TVSeries":
      item = new TVSeries(author, title, pages, read);
      break;
  }
  myLibrary.push(item); //add to array
  item.insert(); //add to dom
}

addItemToLibrary(
  "Book",
  "George R.R. Martin",
  "A Song of Ice and Fire",
  786,
  false
);
addItemToLibrary("Book", "Ray Bradbury", "Fahrenheit 451", 212, true);
addItemToLibrary("Book", "Rick Riordan", "Percy Jackson", 230, true);

addItemToLibrary("Movie", "Christopher Nolan", "Inception", 145, true);
addItemToLibrary("TVSeries", "Vince Gilligan", "Breaking Bad", 55, true);

myLibrary.forEach((book) => {
  console.log(book);
});

//Shows modal when add button is clicked
addButton.addEventListener("click", () => {
  modal.showModal();
});

//changes form form labels when the media type is changed in the modal form
selectMenu.addEventListener("change", () => {
  let labelArray;
  switch(selectMenu.value) {    //fetch correct labels
    case "Book":
      labelArray = bookLabels;
      break;
    case "Movie":
      labelArray = movieLabels;
      break;
    case "TVSeries":
      labelArray = tvSeriesLabels;
      break;
  }
  //update labels
  for(let i = 0; i < 3; i++) {
    labels[i + 2].innerHTML = labelArray[i];
  }
})

// parse form input and creates new media element with given inputs
newMediaForm.addEventListener("submit", () => {
  addItemToLibrary(selectMenu.value, inputs[1].value, inputs[0].value, parseInt(inputs[2].value), inputs[3].checked);
})

//Clears form input any time the modal is closed
modal.addEventListener("close", () => {
  newMediaForm.reset();
})  