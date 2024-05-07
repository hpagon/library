const myLibrary = [];

//Media Object (meant to be parent object)
function Media(title) {
    this.title = title;
}

//Book object (inherits from media)
function Book(author, title, pages, read) {
  Media.calls(this, title);
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Movie object (inherits from media)
function Movie(director, title, length, seen) {
    Media.calls(this, title);
    this.length = length;
    this.seen = seen;
}

//TVSeries object (inherits from media)
function TVSeries(director, title, episodes, seen) {
    Media.calls(this, title);
    this.episodes = episodes;
    this.seen = seen;
}

//Adds item to library array
function addItemToLibrary(author, title, pages, read) {
  let newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
}

addItemToLibrary("George R.R. Martin", "A Song of Ice and Fire", 786, false);
addItemToLibrary("Ray Bradbury", "Fahrenheit 451", 212, true);
addItemToLibrary("Rick Riordan", "Percy Jackson", 230, true);

myLibrary.forEach(book => {
    console.log(book);
})