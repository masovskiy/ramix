document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const genreFilter = document.getElementById('genre-filter');
    const discordLoginButton = document.getElementById('discord-login');
    const reviewForm = document.getElementById('review-form');
    const reviewText = document.getElementById('review-text');
    const reviewsList = document.getElementById('reviews-list');

    // Функция фильтрации аниме
    function filterAnime() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedGenre = genreFilter.value;

        document.querySelectorAll('#anime-grid .anime-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const genre = card.dataset.genre;

            const matchesSearch = title.includes(searchTerm);
            const matchesGenre = !selectedGenre || genre === selectedGenre;

            if (matchesSearch && matchesGenre) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Обработчики событий
    searchBar.addEventListener('input', filterAnime);
    genreFilter.addEventListener('change', filterAnime);

    // Обработка авторизации через Discord
    discordLoginButton.addEventListener('click', () => {
        // Для реальной авторизации вам понадобится серверная часть и интеграция с Discord API
        alert('Войдите через Discord, чтобы оставить отзыв.');
        // Имитация успешной авторизации
        reviewForm.style.display = 'block';
    });

    // Обработка отправки отзыва
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const reviewContent = reviewText.value.trim();

        if (reviewContent) {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `<p>${sanitize(reviewContent)}</p>`; // XSS защита

            reviewsList.appendChild(reviewElement);
            reviewText.value = '';
        }
    });

    // Функция для защиты от XSS
    function sanitize(text) {
        const element = document.createElement('div');
        element.innerText = text;
        return element.innerHTML;
    }
});
