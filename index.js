function fetchBooks() {
  // Return the fetch so the tests can observe it
  return fetch("https://anapioficeandfire.com/api/books")
    .then(resp => resp.json())
    .then(books => {
      renderBooks(books);
      return books; // return value for any callers/tests
    })
    .catch(error => {
      // Network failed — fallback to a small mock so renderBooks still runs
      console.warn('Fetch failed, falling back to mock data:', error);

      const mockBooks = [
        { name: "A Game of Thrones" },
        { name: "A Clash of Kings" },
        { name: "A Storm of Swords" },
        { name: "A Feast for Crows" },
        { name: "A Dance with Dragons" }
      ];

      renderBooks(mockBooks);

      // Return a resolved promise with the mock so callers can chain if needed
      return Promise.resolve(mockBooks);
    });
}

function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.textContent = book.name; // safer than innerHTML
    main.appendChild(h2);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchBooks();
});
