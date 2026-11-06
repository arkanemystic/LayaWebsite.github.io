document.addEventListener("DOMContentLoaded", function() {
    console.log("Website Loaded");
});

// Spongebob bubble intro
(function playBubbleIntro() {
    // Homepage only
    if (!document.body.classList.contains('homepage')) return;

    const intro = document.getElementById('bubble-intro');
    if (!intro) return;

    // Once per browser session
    if (sessionStorage.getItem('bubbleIntroPlayed')) {
        intro.remove();
        return;
    }

    document.body.classList.add('intro-playing');
    const video = document.getElementById('bubble-intro-video');
    let finished = false;

    const finish = () => {
        if (finished) return;
        finished = true;
        intro.classList.add('fade-out');
        document.body.classList.remove('intro-playing');
        sessionStorage.setItem('bubbleIntroPlayed', '1');
        setTimeout(() => intro.remove(), 600);
    };

    // Try unmuted autoplay first; silently fall back to muted if blocked.
    video.muted = false;
    video.volume = 1.0;
    video.play().catch(() => {
        video.muted = true;
        video.play().catch(finish);
    });

    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    setTimeout(finish, 10000); // Fallback in case video doesn't end
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
