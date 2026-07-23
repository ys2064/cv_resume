document.addEventListener('DOMContentLoaded', function () {

    /* ---- Scroll progress bar ---- */
    var bar = document.querySelector('.scroll-progress');
    function updateBar() {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var scrolled = max > 0 ? (h.scrollTop / max) : 0;
        if (bar) bar.style.width = (scrolled * 100) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();

    /* ---- Scroll-reveal for sections & project cards ---- */
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
        var revealEls = document.querySelectorAll('.card');
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) {
            el.classList.add('reveal');
            observer.observe(el);
        });

        /* stagger project cards within their section */
        document.querySelectorAll('.project-card').forEach(function (el, i) {
            el.style.transitionDelay = ((i % 5) * 70) + 'ms';
        });
    }
});
