const myLibrary = [];
const libraryDiv = document.querySelector(".library");

//Media Object (meant to be parent object)
function Media(title) {
    this.title = title;
    this.card = document.createElement("div");
    this.header = document.createElement("h3");
    this.info = document.createElement("div");
}

//Book object (inherits from media)
function Book(author, title, pages, read) {
  Media.call(this, title);
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Movie object (inherits from media)
function Movie(director, title, length, seen) {
    Media.call(this, title);
    this.director = director;
    this.length = length;
    this.seen = seen;
}

//TVSeries object (inherits from media)
function TVSeries(director, title, episodes, seen) {
    Media.call(this, title);
    this.director = director;
    this.episodes = episodes;
    this.seen = seen;
}

//inserts card for new book
Book.prototype.insert = function () {
    //add class info
    this.card.classList.add("card");
    this.info.classList.add("info");
    this.card.setAttribute("id", myLibrary.length - 1)
    //create elements
    let image = document.createElement("img");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let read = document.createElement("p");
    //add content
    this.header.innerHTML = this.title;
    author.innerHTML = `Author: ${this.author}`;
    pages.innerHTML = `Number of Pages: ${this.pages}`;
    read.innerHTML = this.read ? `Read`:`Not Read`;
    //append elements
    this.card.appendChild(this.header);
    this.card.appendChild(image);
    this.info.appendChild(author);
    this.info.appendChild(pages);
    this.info.appendChild(read);
    this.card.appendChild(this.info);
    libraryDiv.appendChild(this.card);
}

// Link prototypes
Object.setPrototypeOf(Book.prototype, Media.prototype);
Object.setPrototypeOf(Movie.prototype, Media.prototype);
Object.setPrototypeOf(TVSeries.prototype, Media.prototype);

//Adds item to library array
function addItemToLibrary(type, author, title, pages, read) {
    let item;
    switch(type) {          //create object
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
    myLibrary.push(item);       //add to array
    item.insert();              //add to dom
}

addItemToLibrary("Book", "George R.R. Martin", "A Song of Ice and Fire", 786, false);
addItemToLibrary("Book", "Ray Bradbury", "Fahrenheit 451", 212, true);
addItemToLibrary("Book", "Rick Riordan", "Percy Jackson", 230, true);

myLibrary.forEach(book => {
    console.log(book);
})