document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('business-card');

    if (card) {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    }
});
