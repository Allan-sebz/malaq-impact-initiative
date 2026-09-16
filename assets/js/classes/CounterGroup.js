/**
 * CounterGroup
 * Counts [data-count] numbers up from zero when they scroll into view.
 * The final value is already in the HTML, so no-JS and reduced-motion
 * visitors simply see the number.
 */
export class CounterGroup {
  static DURATION_MS = 1600;

  constructor(root = document) {
    this.elements = Array.from(root.querySelectorAll("[data-count]"));
  }

  init() {
    if (!this.elements.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          this.#animate(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    this.elements.forEach((el) => {
      el.textContent = this.#format(el, 0);
      observer.observe(el);
    });
  }

  #animate(el) {
    const target = Number(el.dataset.count);
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / CounterGroup.DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = this.#format(el, Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  #format(el, value) {
    const pad = Number(el.dataset.pad || 0);
    return String(value).padStart(pad, "0") + (el.dataset.suffix || "");
  }
}
