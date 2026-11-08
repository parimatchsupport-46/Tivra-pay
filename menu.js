/* ===== TIVRA Pay - Menu Drawer =====
   Handles the right-side menu drawer used on all public pages.
   Independent of script.js / chat.js so existing functionality stays untouched. */

(function () {
    'use strict';

    const menuBtn = document.getElementById('menuBtn');
    const drawer = document.getElementById('menuDrawer');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('menuClose');

    if (!menuBtn || !drawer || !overlay) return;

    let lastFocused = null;

    function isOpen() {
        return drawer.classList.contains('open');
    }

    function openMenu() {
        lastFocused = document.activeElement;
        drawer.classList.add('open');
        overlay.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('is-locked');
        if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-locked');
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    menuBtn.addEventListener('click', function () {
        if (isOpen()) closeMenu();
        else openMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
        if (!isOpen()) return;

        if (e.key === 'Escape') {
            closeMenu();
            return;
        }

        /* Simple focus trap inside the drawer */
        if (e.key === 'Tab') {
            const focusables = drawer.querySelectorAll('a[href], button:not([disabled])');
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    /* Highlight the current page inside the drawer */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    drawer.querySelectorAll('.drawer-link').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
})();
