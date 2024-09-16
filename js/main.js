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
                <img src="${anime.image}" alt="${anime.title}">
                <h3>${anime.title}</h3>
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
    genreFilter.addEventListener("change", function () {
        const selectedGenre = genreFilter.value;

        if (selectedGenre === "all") {
            displayAnime(animeList);
        } else {
            const filteredAnime = animeList.filter(anime =>
                anime.genres.includes(selectedGenre)
            );
            displayAnime(filteredAnime);
        }
    });
});
