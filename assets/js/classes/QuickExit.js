/**
 * QuickExit
 * Safety feature standard on GBV-support sites: instantly leaves the site
 * for a neutral destination, and replaces (not pushes) the history entry
 * so the back button can't return a visitor to this page.
 *
 * Triggers: clicking any [data-quick-exit] control, or pressing Escape
 * three times within 1.2s (a panic-key convention used by similar sites).
 */
export class QuickExit {
  static DESTINATION = "https://www.google.com";
  static ESCAPE_PRESSES_REQUIRED = 3;
  static ESCAPE_WINDOW_MS = 1200;

  constructor(root = document) {
    this.root = root;
    this.escapePressCount = 0;
    this.escapeTimer = null;
  }

  init() {
    this.root.querySelectorAll("[data-quick-exit]").forEach((button) => {
      button.addEventListener("click", () => this.leave());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.#handleEscapePress();
    });
  }

  leave() {
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
