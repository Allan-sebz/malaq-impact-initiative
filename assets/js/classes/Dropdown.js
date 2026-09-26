/**
 * Dropdown
 * Desktop navigation submenu. Opens on hover for mouse users and on click
 * or keyboard for everyone else; closes on Escape, outside click or when
 * focus leaves the menu.
 */
export class Dropdown {
  static CLOSE_DELAY_MS = 160;

  constructor(item) {
    this.item = item;
    this.trigger = item.querySelector(".nav__trigger");
    this.menu = item.querySelector(".nav__menu");
    this.closeTimer = null;
  }

  init() {
    if (!this.trigger || !this.menu) return;

    this.setOpen(false);

    this.trigger.addEventListener("click", () => this.setOpen(this.item.dataset.open !== "true"));

    this.item.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(this.closeTimer);
      this.setOpen(true);
    });

    this.item.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      this.closeTimer = setTimeout(() => this.setOpen(false), Dropdown.CLOSE_DELAY_MS);
    });

    this.item.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || this.item.dataset.open !== "true") return;
      this.setOpen(false);
      this.trigger.focus();
    });

    this.item.addEventListener("focusout", (event) => {
      if (!this.item.contains(event.relatedTarget)) this.setOpen(false);
    });

    document.addEventListener("click", (event) => {
      if (!this.item.contains(event.target)) this.setOpen(false);
    });
  }

  setOpen(open) {
    this.item.dataset.open = String(open);
    this.trigger.setAttribute("aria-expanded", String(open));
  }
}
