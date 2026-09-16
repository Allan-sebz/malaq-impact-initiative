/**
 * Navigation
 * Sticky header state on scroll, the mobile menu (open/close, focus
 * handling, scroll lock) and active-link marking for both nav variants.
 */
export class Navigation {
  static DESKTOP_QUERY = "(min-width: 1180px)";

  constructor(root = document) {
    this.header = root.querySelector(".site-header");
    this.toggle = root.querySelector(".nav-toggle");
    this.menu = root.querySelector(".mobile-menu");
    this.isOpen = false;
    this.ticking = false;
  }

  init() {
    if (!this.header) return;

    this.#markActiveLinks();
    this.#watchScroll();

    if (!this.toggle || !this.menu) return;

    this.toggle.addEventListener("click", () => this.setOpen(!this.isOpen));

    this.menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => this.setOpen(false));
    });

    document.addEventListener("keydown", (event) => this.#handleKeydown(event));

    window.matchMedia(Navigation.DESKTOP_QUERY).addEventListener("change", (event) => {
      if (event.matches) this.setOpen(false);
    });
  }

  setOpen(open) {
    this.isOpen = open;
    this.header.dataset.menuOpen = String(open);
    this.toggle.setAttribute("aria-expanded", String(open));
    this.toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("has-menu-open", open);

    if (open) {
      this.menu.scrollTop = 0;
      this.menu.querySelector("a")?.focus({ preventScroll: true });
    }
  }

  #handleKeydown(event) {
    if (!this.isOpen) return;

    if (event.key === "Escape") {
      this.setOpen(false);
      this.toggle.focus();
      return;
    }

    if (event.key === "Tab") this.#trapFocus(event);
  }

  #trapFocus(event) {
    const focusable = [this.toggle, ...this.menu.querySelectorAll("a, button")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  #watchScroll() {
    const update = () => {
      this.header.classList.toggle("is-scrolled", window.scrollY > 8);
      this.ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (this.ticking) return;
        this.ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  #markActiveLinks() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    this.header.querySelectorAll(".nav__link, .mobile-menu__link").forEach((link) => {
      if (link.getAttribute("href") === currentPage) link.setAttribute("aria-current", "page");
    });
  }
}
