/**
 * ResourceFilter
 * Filters the resource library by category using toggle buttons, and
 * announces the number of results for screen reader users.
 */
export class ResourceFilter {
  constructor(root) {
    this.buttons = Array.from(root.querySelectorAll("[data-filter]"));
    this.cards = Array.from(root.querySelectorAll("[data-category]"));
    this.countEl = root.querySelector("[data-filter-count]");
  }

  init() {
    if (!this.buttons.length) return;

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => this.apply(button.dataset.filter));
    });

    const requested = decodeURIComponent(window.location.hash.slice(1));
    const initial = this.buttons.some((b) => b.dataset.filter === requested) ? requested : "all";
    this.apply(initial);
  }

  apply(filter) {
    this.buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });

    let shown = 0;
    this.cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    if (this.countEl) {
      this.countEl.textContent = `Showing ${shown} ${shown === 1 ? "resource" : "resources"}`;
    }
  }
}
