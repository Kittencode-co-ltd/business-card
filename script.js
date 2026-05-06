document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('business-card');
    if (!card) return;

    const SWIPE_THRESHOLD = 40; // px ขั้นต่ำที่ถือว่าเป็น swipe

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    function flip() {
        card.classList.toggle('is-flipped');
    }

    // ── Touch (mobile swipe) ──────────────────────────────────
    card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;

        // เช็คว่า swipe แนวนอนมากกว่าแนวตั้ง และเกิน threshold
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
            flip();
        }
    }, { passive: true });

    // ── Mouse drag (desktop swipe) ────────────────────────────
    card.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = false;
    });

    card.addEventListener('mousemove', (e) => {
        if (Math.abs(e.clientX - startX) > 5) isDragging = true;
    });

    card.addEventListener('mouseup', (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
            // drag แนวนอน → flip
            flip();
        } else if (!isDragging) {
            // click (ไม่มี drag) → flip
            flip();
        }
    });
});
