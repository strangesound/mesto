export class Section {
    constructor({ data: items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    renderItems() {
      this._renderedItems.forEach(item => this._renderer(item))
    }
  
    insertItemAfter(element) {
      this._container.append(element);
    }
    insertItemBefore(element) {
      this._container.prepend(element);
    }
  }