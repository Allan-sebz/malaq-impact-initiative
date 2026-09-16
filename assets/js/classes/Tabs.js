/**
 * Tabs
 * Accessible tab interface (WAI-ARIA tabs pattern) with arrow, Home and End
 * key support. Without JS the tab list is hidden and all panels are shown.
 */
export class Tabs {
  constructor(root) {
    this.tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    this.panels = this.tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  }

  init() {
    if (!this.tabs.length) return;

    this.tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => this.select(index, true));
      tab.addEventListener("keydown", (event) => this.#handleKeydown(event, index));
    });

    const selected = this.tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
    this.select(Math.max(selected, 0), false);
  }

  select(index, moveFocus) {
    this.tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      if (this.panels[i]) this.panels[i].hidden = !isSelected;
    });

    if (moveFocus) {
      const tab = this.tabs[index];
      tab.focus({ preventScroll: true });
      tab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
  }

  #handleKeydown(event, index) {
    const last = this.tabs.length - 1;
    const keyMap = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };

    if (!(event.key in keyMap)) return;
    event.preventDefault();
    this.select(keyMap[event.key], true);
  }
}
