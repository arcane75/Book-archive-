document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
document.getElementById('team-details').textContent = ''
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    // Handle empty search request
    if (searchText == '') {
        // please write something to display
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Team Details
        document.getElementById('team-details').textContent = '';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
      
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('team-numbers').textContent = '';
    document.getElementById('team-details').textContent = '';

}

// Display Search Result
const displaySearchResult = books => {
    // console.log(teams);
    document.getElementById('team-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const bookList = books.docs;
    console.log(bookList);
    if (bookList == null) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('team-numbers').innerText = `Books Found ${bookList.length}`;
        // Retrieve each book and display in a card
        bookList.forEach(book => {
            console.log(book.title);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
            
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-50 h-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Title: ${book.title}</h5>
                    <p class="card-text">Author Name:${book.author_name[0]}</p>
                    <p class="card-text">Publisher: ${book.publisher[0]}</p>
                    <p class="card-text">Published: ${book.publish_date[0]}</p>
                </div>
                <div class = "card-footer">
                    <button class="btn btn-outline-dark" onclick="loadTeamDetail('${book.idTeam}')">Load More <i class="fas fa-arrow-right"></i></button> 
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }

}