/**
 * PartialLoader
 * Fetches shared HTML fragments (header, footer) and injects them into
 * placeholder elements, so nav/footer markup lives in one place instead
 * of being duplicated across every page.
 */
export class PartialLoader {
  /**
   * @param {Array<{selector: string, url: string}>} mounts
   */
  constructor(mounts) {
    this.mounts = mounts;
  }

  async loadAll() {
    await Promise.all(this.mounts.map((mount) => this.#loadOne(mount)));
  }

  async #loadOne({ selector, url }) {
    const target = document.querySelector(selector);
    if (!target) return;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
      target.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
      target.innerHTML = "";
    }
  }
}
