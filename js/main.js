document.addEventListener("DOMContentLoaded", function () {
    fetch("data/anime.json")
        .then(response => response.json())
        .then(animeList => {
            const animeGrid = document.getElementById("anime-grid");

            animeList.forEach(anime => {
                const animeCard = document.createElement("div");
                animeCard.className = "anime-card";

                animeCard.innerHTML = `
                    <img src="${anime.image}" alt="${anime.title}">
                    <h3>${anime.title}</h3>
                    <p>${anime.description}</p>
                `;

                animeGrid.appendChild(animeCard);
            });
        })
        .catch(error => {
            console.error("Ошибка загрузки данных:", error);
        });
});
