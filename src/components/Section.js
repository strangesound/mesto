export class Section {
  constructor({ renderer }, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  renderItems(array) {
    array.forEach(item => this._renderer(item))
  }
  
  insertItemAfter(element) {
    this._container.append(element);
  }
  insertItemBefore(element) {
    this._container.prepend(element);
  }
}