(function () {
    var header = document.querySelector('[data-site-header]');
    var menuButton = document.querySelector('[data-menu-toggle]');
    var navigation = document.querySelector('[data-site-nav]');
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-capability-tab]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-capability-panel]'));

    function updateHeader() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    }

    if (menuButton && navigation) {
        menuButton.addEventListener('click', function () {
            var open = !navigation.classList.contains('open');
            navigation.classList.toggle('open', open);
            menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navigation.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                navigation.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var selected = tab.getAttribute('data-capability-tab');
            tabs.forEach(function (item) {
                item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
            });
            panels.forEach(function (panel) {
                panel.hidden = panel.getAttribute('data-capability-panel') !== selected;
            });
        });
    });

    document.querySelectorAll('[data-current-year]').forEach(function (node) {
        node.textContent = new Date().getFullYear();
    });

    window.addEventListener('scroll', updateHeader, {passive: true});
    updateHeader();
}());
