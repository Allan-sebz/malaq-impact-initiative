/**
 * RevealOnScroll
 * Fades and lifts [data-reveal] elements into view as they enter the
 * viewport. Everything is shown immediately when motion is reduced or
 * IntersectionObserver is unavailable.
 */
export class RevealOnScroll {
  constructor(root = document) {
    this.elements = Array.from(root.querySelectorAll("[data-reveal]"));
  }

  init() {
    if (!this.elements.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      this.elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          this.#reveal(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    this.elements.forEach((el) => observer.observe(el));
  }

  // Once the entrance has played, drop the reveal hooks so the element's own
  // hover transitions are no longer overridden or delayed.
  #reveal(el) {
    el.classList.add("is-visible");
    setTimeout(() => {
      el.removeAttribute("data-reveal");
      el.removeAttribute("data-reveal-delay");
      el.classList.remove("is-visible");
    }, RevealOnScroll.CLEANUP_MS);
  }

  static CLEANUP_MS = 1400;
}
