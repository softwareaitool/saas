/* WorkerFlow - minimal JS for navigation, form UX, and small enhancements.
   No tracking, no third-party dependencies.
*/
(function(){
  const $ = (sel, root=document) => root.querySelector(sel);

  // Mobile menu
  const toggle = $('#navToggle');
  const panel  = $('#mobilePanel');
  if (toggle && panel){
    const setExpanded = (expanded) => {
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      panel.style.display = expanded ? 'block' : 'none';
    };

    setExpanded(false);

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    // Close panel on navigation
    panel.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setExpanded(false);
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setExpanded(false);
    });
  }

  // Highlight active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.setAttribute('aria-current', 'page');
      a.style.background = 'rgba(255,255,255,0.08)';
      a.style.borderColor = 'rgba(255,255,255,0.14)';
      a.style.color = 'rgba(255,255,255,0.92)';
    }
  });

  // Contact form (client-side only)
  const form = $('#contactForm');
  const status = $('#formStatus');

  if (form && status){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation (HTML5 handles most)
      const name = $('#name')?.value?.trim();
      const email = $('#email')?.value?.trim();
      const message = $('#message')?.value?.trim();

      if (!name || !email || !message){
        status.textContent = 'Please fill in all required fields.';
        status.setAttribute('role', 'status');
        return;
      }

      // Simulated submit for static sites
      status.textContent = 'Thanks. Your message is ready to be sent. This demo form does not submit data automatically.';
      status.setAttribute('role', 'status');

      // Reset without losing accessibility context
      form.reset();
      $('#name')?.focus();
    });
  }

  // Set current year in footer
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
/* Cookie strip (no storage)
   Shows on every page load; hides when user clicks any option.
*/
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  function closeBanner() {
    banner.classList.add("cookie-hidden");
  }

  banner.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cookie-choice]");
    if (!btn) return;

    // choice is available if you want to log it later:
    // const choice = btn.getAttribute("data-cookie-choice");
    closeBanner();
  });

  // Optional: allow ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBanner();
  });
});


/* WorkerFlow main script */

/* Set dynamic year */
document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* Mobile menu */
(function () {
  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("mobilePanel");

  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const isOpen = panel.style.display === "block";
    panel.style.display = isOpen ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
})();

/* =================================
   COOKIE CONSENT LOGIC
   Scroll locked until ACCEPT
   ================================= */
(function () {

  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const acceptBtn = banner.querySelector('[data-cookie-choice="accept"]');
  const rejectBtn = banner.querySelector('[data-cookie-choice="reject"]');
  const customizeBtn = banner.querySelector('[data-cookie-choice="customize"]');

  // Ensure page starts locked
  document.body.classList.add("cookie-locked");

  // ACCEPT unlocks scroll + hides banner
  acceptBtn?.addEventListener("click", function () {
    document.body.classList.remove("cookie-locked");
    banner.classList.add("cookie-hidden");
  });

  // Reject hides banner but keeps scroll locked
  rejectBtn?.addEventListener("click", function () {
    banner.classList.add("cookie-hidden");
  });

  // Customize keeps locked (you can add modal later)
  customizeBtn?.addEventListener("click", function () {
    // No unlock
  });

})();
