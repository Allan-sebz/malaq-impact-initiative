/**
 * RevealOnScroll
 * Adds a subtle fade/slide-in transition to any element with [data-reveal]
 * as it enters the viewport, via IntersectionObserver. No-op fallback
 * (elements just render visible) if IntersectionObserver is unsupported.
 */
export class RevealOnScroll {
  constructor(root = document, options = { threshold: 0.15 }) {
    this.elements = Array.from(root.querySelectorAll("[data-reveal]"));
    this.options = options;
    this.observer = null;
  }

  init() {
    if (!this.elements.length) return;

    if (!("IntersectionObserver" in window)) {
      this.elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          this.observer.unobserve(entry.target);
        }
      });
    }, this.options);

    this.elements.forEach((el) => this.observer.observe(el));
  }
}
