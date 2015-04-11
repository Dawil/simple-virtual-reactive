'use strict';

function App(config) {
  this.config = config;
  this.element = undefined;
  this.vtree = undefined;
}
App.prototype.render = function(eventType) {
  // use raf
  var newVtree = this.config.view.call(this, eventType);
  var diff = vd.diff(this.vtree, newVtree);
  this.element = vd.patch(this.element, diff);
  this.vtree = newVtree;
};
App.prototype.run = function(parentElement) {
  this.vtree = this.config.view.call(this, 'run');
  this.element = vd.create( this.vtree );
  parentElement.appendChild(  this.element );

  for (var i in this.config.router) {
    parentElement.addEventListener(i, this.config.router[i].bind(this));
  }
};
App.prototype.dispatch = function(eventType, event) {
  this.config.model[eventType].call(this,event);
  this.render(eventType);
};
