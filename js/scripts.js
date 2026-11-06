document.addEventListener("DOMContentLoaded", function() {
    console.log("Website Loaded");
});

// Spongebob bubble intro
(function playBubbleIntro() {
    // Homepage only
    if (!document.body.classList.contains('home-page')) return;

    const intro = document.getElementById('bubble-intro');
    const video = document.getElementById('bubble-intro-video');
    if (!intro || !video) return;

    let fallbackTimer;

    const finish = () => {
        clearTimeout(fallbackTimer);
        intro.classList.add('fade-out');
        document.body.classList.remove('intro-playing');
    };

    const play = () => {
        intro.classList.remove('fade-out');
        document.body.classList.add('intro-playing');
        video.currentTime = 0;
    }

    // Try unmuted autoplay first; silently fall back to muted if blocked.
    video.muted = false;
    video.volume = 1.0;
    video.play().catch(() => {
        video.muted = true;
        video.play().catch(finish);
    });

    clearTimeout(fallbackTimer);
    fallbackTimer = setTimeout(finish, 10000); // Fallback in case video doesn't end

    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) play();
    });

    play();
})();

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Create and append overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
});
