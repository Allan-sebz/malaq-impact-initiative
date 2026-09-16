/**
 * Navigation
 * Handles the mobile nav toggle, closing on outside click / Escape,
 * and marking the current page's link as active.
 */
export class Navigation {
  constructor(root = document) {
    this.root = root;
    this.nav = root.querySelector(".nav");
    this.toggle = root.querySelector(".nav__toggle");
    this.list = root.querySelector(".nav__list");
  }

  init() {
    if (!this.nav || !this.toggle || !this.list) return;

    this.toggle.addEventListener("click", () => this.#toggleMenu());

    this.list.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => this.#closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.#closeMenu();
    });

    document.addEventListener("click", (event) => {
      const isOpen = this.nav.getAttribute("data-open") === "true";
      if (isOpen && !this.nav.contains(event.target)) this.#closeMenu();
    });

    this.#markActiveLink();
  }

  #toggleMenu() {
    const isOpen = this.nav.getAttribute("data-open") === "true";
    this.nav.setAttribute("data-open", String(!isOpen));
    this.toggle.setAttribute("aria-expanded", String(!isOpen));
  }

  #closeMenu() {
    this.nav.setAttribute("data-open", "false");
    this.toggle.setAttribute("aria-expanded", "false");
  }

  #markActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    this.list.querySelectorAll("a").forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }
}
