/**
 * BackToTop
 * Floating button that appears after scrolling down and returns to the top.
 */
export class BackToTop {
  static THRESHOLD_PX = 700;

  constructor(button) {
    this.button = button;
    this.ticking = false;
  }

  init() {
    if (!this.button) return;

    const update = () => {
      this.button.classList.toggle("is-visible", window.scrollY > BackToTop.THRESHOLD_PX);
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

    this.button.addEventListener("click", () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });

    update();
  }
}
