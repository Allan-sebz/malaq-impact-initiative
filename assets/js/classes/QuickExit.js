/**
 * QuickExit
 * Safety feature standard on GBV-support sites: hides the page instantly,
 * then leaves for a neutral destination using location.replace so the
 * back button cannot return to this site.
 *
 * Triggers: any [data-quick-exit] control (delegated, so it works for
 * header markup injected later) or pressing Escape three times quickly.
 */
export class QuickExit {
  static DESTINATION = "https://www.google.com";
  static ESCAPE_PRESSES_REQUIRED = 3;
  static ESCAPE_WINDOW_MS = 1200;

  constructor() {
    this.escapePressCount = 0;
    this.escapeTimer = null;
  }

  init() {
    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-quick-exit]")) return;
      event.preventDefault();
      this.leave();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.#handleEscapePress();
    });
  }

  leave() {
    document.documentElement.classList.add("is-exiting");
    window.location.replace(QuickExit.DESTINATION);
  }

  #handleEscapePress() {
    this.escapePressCount += 1;
    clearTimeout(this.escapeTimer);

    if (this.escapePressCount >= QuickExit.ESCAPE_PRESSES_REQUIRED) {
      this.leave();
      return;
    }

    this.escapeTimer = setTimeout(() => {
      this.escapePressCount = 0;
    }, QuickExit.ESCAPE_WINDOW_MS);
  }
}
