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
        document.getElementById('search-result').textContent = '';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;

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
                    <h5 id="titleBook" class="card-title">Title: ${book.title}</h5>
                    <p class="card-text">Author Name:${book.author_name}</p>
                    <p class="card-text">Publisher: ${book.publisher}</p>
                    <p class="card-text">Published: ${book.first_publish_year}</p>
                </div>
                <div class = "card-footer">
                    <button class="btn btn-outline-dark" onclick="loadTeamDetail('${book.title}')">Load More <i class="fas fa-arrow-right"></i></button> 
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }

}

/* 
// // Fetch team detail
const loadTeamDetail = () => {
    //const authorUrl = `https://openlibrary.org/authors/${author_key}.json`;
    // fetch(`http://openlibrary.org/search.json?title=${}`)
    //     .then(res => res.json())
    //     .then(res => displayTeamDetail(res)); 
      const bookTitle =  document.getElementById('titleBook');
      const bookTitleText = bookTitle.innerText;
      console.log(bookTitleText);

}
// // Display team detail at the top
const displayTeamDetail = (teamDetail) => {
    const book = teamDetail.docs[0];
    window.scrollTo(0, 40);
    const teamShow = document.getElementById('team-details');
    teamShow.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card', 'bg-dark', 'text-warning', 'text-center');
    div.innerHTML = `
    <img src="${book.strStadiumThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Team: ${book.alternate_names}</h5>
        <p class="card-text">Home: ${book.strStadium}</p> 
        <p><small class="card-text">Team Description: ${book.strDescriptionEN ? book.strDescriptionEN.slice(0, 100) : "N/a"}</small></p>
        <a href="https://${book.strYoutube}" target="_blank" class="btn btn-primary">Watch Videos</a>
    </div>
    `;
    teamShow.appendChild(div);
} */