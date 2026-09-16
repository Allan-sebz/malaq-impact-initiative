/**
 * ScrollSpy
 * Highlights the table-of-contents link for the section currently in view.
 */
export class ScrollSpy {
  constructor(nav) {
    this.links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    this.sections = this.links.map((link) => document.getElementById(link.getAttribute("href").slice(1)));
  }

  init() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.#setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    this.sections.forEach((section) => section && observer.observe(section));
  }

  #setCurrent(id) {
    this.links.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }
}
