export class Section {
  constructor({renderer}, parentSelector) {
    this._renderer = renderer;
    this._parent = document.querySelector(parentSelector);
  }

  addItem(el) {
    this._parent.prepend(el);
  }

  renderData(items) {
    items.forEach(itemsEl => {
      this._renderer(itemsEl);
    });
  }
}
