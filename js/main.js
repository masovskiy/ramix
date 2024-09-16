document.addEventListener("DOMContentLoaded", function () {
    const animeGrid = document.getElementById("anime-grid");
    const searchBar = document.getElementById("search-bar");
    const genreFilter = document.getElementById("genre-filter");

    let animeList = [];

    // Загружаем данные из anime.json
    fetch("data/anime.json")
        .then(response => response.json())
        .then(data => {
            animeList = data;
            displayAnime(animeList);
        })
        .catch(error => {
            console.error("Ошибка загрузки данных:", error);
        });

    // Функция для отображения аниме
    function displayAnime(animeData) {
        animeGrid.innerHTML = "";
        animeData.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "anime-card";

            animeCard.innerHTML = `
                <a href="${anime.link}" target="_blank">
                    <img src="${anime.image}" alt="${anime.title}">
                </a>
                <h3><a href="${anime.link}" target="_blank">${anime.title}</a></h3>
                <p><strong>Год:</strong> ${anime.year}</p>
                <p><strong>Жанры:</strong> ${anime.genres.join(", ")}</p>
                <p>${anime.description}</p>
            `;

            animeGrid.appendChild(animeCard);
        });
    }

    // Фильтрация по поиску
    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.toLowerCase();
        const filteredAnime = animeList.filter(anime =>
            anime.title.toLowerCase().includes(searchText)
        );
        displayAnime(filteredAnime);
    });

    // Фильтрация по жанрам
document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const genreFilter = document.getElementById('genre-filter');
    const animeCards = document.querySelectorAll('.anime-card');

    function filterAnime() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedGenre = genreFilter.value;

        animeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const genre = card.dataset.genre;

            const matchesSearch = title.includes(searchTerm);
            const matchesGenre = selectedGenre === '' || genre === selectedGenre;

            if (matchesSearch && matchesGenre) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBar.addEventListener('input', filterAnime);
    genreFilter.addEventListener('change', filterAnime);
});
