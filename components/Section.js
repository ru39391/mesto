export class Section {
  constructor({items, renderer}, parentSelector) {
    this._items = items;
    this._renderer = renderer;
    this._parent = document.querySelector(parentSelector);
  }

  addItem(el) {
    this._parent.prepend(el);
  }

  renderData() {
    this._items.forEach(itemsEl => {
      this._renderer(itemsEl);
    });
  }
}
