const myLibrary = [];
const libraryDiv = document.querySelector(".library");
const addButton = document.querySelector("#add-button");
const modal = document.querySelector("#modal");
const selectMenu = document.querySelector("#type");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");
const bookLabels = ["Author:", "Number of Pages:", "Read:"];
const movieLabels = ["Director:", "Length (minutes):", "Seen:"];
const tvSeriesLabels = ["Creator:", "Episodes:", "Seen:"];
const submitButton = document.querySelector("#submit-button");
const newMediaForm = document.querySelector("#new-media-form");
const availableIndices = [];
const formClose = document.querySelector("dialog img");
const emptyMessage = document.querySelector("#empty-message");

//Media Object (meant to be parent object)
function Media(title) {
  this.title = title;
  this.card = document.createElement("div");
  this.header = document.createElement("h3");
  this.person = document.createElement("p");
  this.info = document.createElement("div");
  this.toggle = document.createElement("button");
  this.delete = document.createElement("img");
  this.buttons = document.createElement("div");
  this.personBolded = document.createElement("b");
  this.personDiv = document.createElement("div");
  this.lengthBolded = document.createElement("b");
  this.lengthDiv = document.createElement("div");
  this.typeBolded = document.createElement("b");
  this.typeDiv = document.createElement("div");
  this.typeP = document.createElement("p");
  //delete function
  this.delete.addEventListener("click", () => {
    delete myLibrary[this.card.id]; //delete from library array
    this.card.remove(); //remove from dom
    availableIndices.push(parseInt(this.card.id)); //add index to available index stack
    isEmpty();
  });
}

//Book object (inherits from media)
function Book(author, title, pages, read) {
  Media.call(this, title);
  this.type = "Book";
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggle.addEventListener("click", () => {
    this.read = this.read ? false : true;
    this.toggle.innerHTML = this.read ? "Read" : "Not Read";
    this.toggle.style.backgroundColor = this.read ? "green" : "#6C757D";
  });
}

//Movie object (inherits from media)
function Movie(director, title, length, seen) {
  Media.call(this, title);
  this.type = "Movie";
  this.director = director;
  this.length = length;
  this.seen = seen;
  this.toggle.addEventListener("click", () => {
    this.seen = this.seen ? false : true;
    this.toggle.innerHTML = this.seen ? "Seen" : "Not Seen";
    this.toggle.style.backgroundColor = this.seen ? "green" : "#6C757D";
  });
}

//TVSeries object (inherits from media)
function TVSeries(director, title, episodes, seen) {
  Media.call(this, title);
  this.type = "TV Series";
  this.director = director;
  this.episodes = episodes;
  this.seen = seen;
  this.toggle.addEventListener("click", () => {
    this.seen = this.seen ? false : true;
    this.toggle.innerHTML = this.seen ? "Seen" : "Not Seen";
    this.toggle.style.backgroundColor = this.seen ? "green" : "#6C757D";
  });
}

//inserts card for new book
Book.prototype.insert = function (index) {
  //add class info
  this.card.classList.add("card");
  this.info.classList.add("info");
  this.card.setAttribute("id", index);
  this.buttons.classList.add("info-buttons");
  //create elements
  let image = document.createElement("img");
  let pages = document.createElement("p");
  //add content
  this.header.innerHTML = this.title;
  this.personBolded.innerHTML = "Author: ";
  this.person.innerHTML = ` ${this.author}`;
  this.lengthBolded.innerHTML = "Number of Pages: ";
  pages.innerHTML = ` ${this.pages}`;
  this.toggle.innerHTML = this.read ? `Read` : `Not Read`;
  this.toggle.style.backgroundColor = this.read ? "green" : "#6C757D";
  image.src = "images/green.jpg";
  this.delete.src = "images/close.svg";
  this.typeBolded.innerHTML = "Type: ";
  this.typeP.innerHTML = this.type;
  //append elements
  this.card.appendChild(this.header);
  this.card.appendChild(image);
  this.typeDiv.appendChild(this.typeBolded);
  this.typeDiv.appendChild(this.typeP);
  this.info.appendChild(this.typeDiv);
  this.personDiv.appendChild(this.personBolded);
  this.personDiv.appendChild(this.person);
  this.info.appendChild(this.personDiv);
  this.lengthDiv.appendChild(this.lengthBolded);
  this.lengthDiv.appendChild(pages);
  this.info.appendChild(this.lengthDiv);
  this.buttons.appendChild(this.toggle);
  this.buttons.appendChild(this.delete);
  this.info.appendChild(this.buttons);
  this.card.appendChild(this.info);
  libraryDiv.prepend(this.card);
};
//inserts card for new movie
Movie.prototype.insert = function (index) {
  //add class info
  this.card.classList.add("card");
  this.info.classList.add("info");
  this.card.setAttribute("id", index);
  this.buttons.classList.add("info-buttons");
  //create elements
  let image = document.createElement("img");
  let length = document.createElement("p");
  //add content
  this.header.innerHTML = this.title;
  this.personBolded.innerHTML = "Director: ";
  this.person.innerHTML = ` ${this.director}`;
  this.lengthBolded.innerHTML = "Length(minutes): ";
  length.innerHTML = ` ${this.length}`;
  this.toggle.innerHTML = this.seen ? `Seen` : `Not Seen`;
  this.toggle.style.backgroundColor = this.seen ? "green" : "#6C757D";
  image.src = "images/red.jpg";
  this.delete.src = "images/close.svg";
  this.typeBolded.innerHTML = this.type + ": ";
  this.typeP.innerHTML = this.type;
  //append elements
  this.card.appendChild(this.header);
  this.card.appendChild(image);
  this.typeDiv.appendChild(this.typeBolded);
  this.typeDiv.appendChild(this.typeP);
  this.info.appendChild(this.typeDiv);
  this.personDiv.appendChild(this.personBolded);
  this.personDiv.appendChild(this.person);
  this.info.appendChild(this.personDiv);
  this.lengthDiv.appendChild(this.lengthBolded);
  this.lengthDiv.appendChild(length);
  this.info.appendChild(this.lengthDiv);
  this.buttons.appendChild(this.toggle);
  this.buttons.appendChild(this.delete);
  this.info.appendChild(this.buttons);
  this.card.appendChild(this.info);
  libraryDiv.prepend(this.card);
};
//inserts card for new tv series
TVSeries.prototype.insert = function (index) {
  //add class info
  this.card.classList.add("card");
  this.info.classList.add("info");
  this.card.setAttribute("id", index);
  this.buttons.classList.add("info-buttons");
  //create elements
  let image = document.createElement("img");
  let episodes = document.createElement("p");
  //add content
  this.header.innerHTML = this.title;
  this.personBolded.innerHTML = "Creator: ";
  this.person.innerHTML = ` ${this.director}`;
  this.lengthBolded.innerHTML = "Episodes: ";
  episodes.innerHTML = ` ${this.episodes}`;
  this.toggle.innerHTML = this.seen ? `Seen` : `Not Seen`;
  this.toggle.style.backgroundColor = this.seen ? "green" : "#6C757D";
  image.src = "images/pastel.jpg";
  this.delete.src = "images/close.svg";
  this.typeBolded.innerHTML = this.type + ": ";
  this.typeP.innerHTML = this.type;
  //append elements
  this.card.appendChild(this.header);
  this.card.appendChild(image);
  this.typeDiv.appendChild(this.typeBolded);
  this.typeDiv.appendChild(this.typeP);
  this.info.appendChild(this.typeDiv);
  this.personDiv.appendChild(this.personBolded);
  this.personDiv.appendChild(this.person);
  this.info.appendChild(this.personDiv);
  this.lengthDiv.appendChild(this.lengthBolded);
  this.lengthDiv.appendChild(episodes);
  this.info.appendChild(this.lengthDiv);
  this.buttons.appendChild(this.toggle);
  this.buttons.appendChild(this.delete);
  this.info.appendChild(this.buttons);
  this.card.appendChild(this.info);
  libraryDiv.prepend(this.card);
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
  if (availableIndices.length !== 0) {
    //insert into empty index if one exists in library array
    let index = availableIndices.pop();
    myLibrary[index] = item; //add to array
    item.insert(index); //add to dom
  } else {
    //otherwise add to end of library array
    myLibrary.push(item); //add to array
    item.insert(myLibrary.length - 1); //add to dom
  }
  isEmpty();
}

//Shows modal when add button is clicked
addButton.addEventListener("click", () => {
  modal.showModal();
});

//changes form form labels when the media type is changed in the modal form
selectMenu.addEventListener("change", () => {
  let labelArray;
  switch (
    selectMenu.value //fetch correct labels
  ) {
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
  for (let i = 0; i < 3; i++) {
    labels[i + 2].innerHTML = labelArray[i];
  }
});

// parse form input and creates new media element with given inputs
newMediaForm.addEventListener("submit", () => {
  addItemToLibrary(
    selectMenu.value,
    inputs[1].value,
    inputs[0].value,
    parseInt(inputs[2].value),
    inputs[3].checked
  );
});

//Clears form input any time the modal is closed
modal.addEventListener("close", () => {
  newMediaForm.reset();
});

//When x symbol in the modal is clicked, the modal closes
formClose.addEventListener("click", () => {
  modal.close();
});

//checks if library is empty in order to display empty message
function isEmpty() {
  if (libraryDiv.childElementCount == 0) {
    emptyMessage.style.visibility = "visible";
  } else {
    emptyMessage.style.visibility = "hidden";
  }
}

//add sample data
addItemToLibrary("Book", "Ray Bradbury", "Fahrenheit 451", 156, true);
addItemToLibrary("Book", "Rick Riordan", "Percy Jackson", 377, true);
addItemToLibrary("Movie", "Christopher Nolan", "Inception", 148, true);
addItemToLibrary("TVSeries", "Vince Gilligan", "Breaking Bad", 62, true);
addItemToLibrary(
  "Book",
  "George R. R. Martin",
  "A Game of Thrones",
  694,
  false
);
