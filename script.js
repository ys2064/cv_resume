document.addEventListener('DOMContentLoaded', function () {

    /* ---- Scroll progress bar ---- */
    var bar = document.querySelector('.scroll-progress');
    var backToTop = document.getElementById('backToTop');

    function onScroll() {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var scrolled = max > 0 ? (h.scrollTop / max) : 0;
        if (bar) bar.style.width = (scrolled * 100) + '%';
        if (backToTop) backToTop.classList.toggle('show', h.scrollTop > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Back to top ---- */
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---- Mobile nav toggle ---- */
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
        /* close menu after clicking a link */
        navLinks.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                navLinks.classList.remove('open');
            });
        });
    }

    /* ---- Scroll-spy: highlight active nav link ---- */
    var sections = ['about', 'education', 'experience', 'projects', 'publications', 'awards']
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
    var navAnchors = {};
    if (navLinks) {
        navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
            navAnchors[a.getAttribute('href').slice(1)] = a;
        });
    }

    if ('IntersectionObserver' in window && sections.length) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    Object.keys(navAnchors).forEach(function (id) {
                        navAnchors[id].classList.toggle('active', id === entry.target.id);
                    });
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(function (s) { spy.observe(s); });
    }

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
        }, { threshold: 0, rootMargin: '0px 0px 180px 0px' });

        revealEls.forEach(function (el) {
            el.classList.add('reveal');
            observer.observe(el);
        });

        document.querySelectorAll('.project-card').forEach(function (el, i) {
            el.style.transitionDelay = ((i % 5) * 70) + 'ms';
        });
    }
});
