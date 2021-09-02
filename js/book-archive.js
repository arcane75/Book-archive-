document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

// SearchBook Function
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    // Handle empty search request
    if (searchText === '') {
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Book Details
        document.getElementById('book-details').textContent = '';
        // Clear Search Result
        document.getElementById('search-result').textContent = '';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

        //console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
}

// Error Function
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';
}

// Display Search Result
const displaySearchResult = books => {
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    // clear data
    searchResult.textContent = '';

    const bookList = books.docs;
    //console.log(bookList);

    //Check if it is null or not
    if (bookList === null) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${bookList.length}`;
        // Retrieve each book and display in a card
        bookList.forEach(book => {
            //console.log(book.title);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
            
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-50 h-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 id="titleBook" class="card-title">Title: ${book.title}</h5>
                    <p class="card-text">Author Name: ${book.author_name}</p>
                    <p class="card-text">ISBN No: ${book.isbn[0]}</p>
                    <p class="card-text">Language: ${book.language}</p>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                    <p class="card-text">First Published: ${book.first_publish_year}</p>
                </div>

            </div>
            `;
            //Append info to the
            searchResult.appendChild(div);
        });

    }

}
