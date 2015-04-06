'use strict';

function Renderer(rootNode) {
  this.rootNode = rootNode;
  this.vtree = undefined;
  this.render = function(vtree) {
    if (this.vtree === undefined) {
      var element = vd.create(vtree);
      this.rootNode.appendChild( element );
      this.rootNode = element;
      this.vtree = vtree;
    } else {
      var diff = vd.diff(this.vtree, vtree);
      this.rootNode = vd.patch(this.rootNode, diff);
      requestAnimationFrame(function() {
        this.vtree = vtree;
      }.bind(this));
    }
  }.bind(this);
}

function route() {
  for (var i = 0; i < arguments.length; i+=2) {
    var component = arguments[i];
    var routing = arguments[i+1];
    for (var eventType in routing) {
      var destinations = Array.isArray(routing[eventType])
        ? routing[eventType] : [routing[eventType]];
      for (var d in destinations) {
        component.addEventListener(eventType,
            destinations[d][eventType]);
      }
    }
  }
}

function Emitter(constructor) {
  this.listeners = {};
  constructor.apply(this,
      Array.prototype.slice.call(arguments).slice(1))
}
Emitter.prototype.addEventListener = function(eventType, listener) {
  if (this.listeners[eventType] === undefined) {
    this.listeners[eventType] = [];
  }
  this.listeners[eventType].push(listener);
  return this;
};
Emitter.prototype.removeEventListener = function(eventType, listener) {
  for (var i = 0; i < this.listeners[eventType].length; i++) {
    if (this.listeners[eventType][i] === listener) {
      this.listeners[eventType] = this.listeners[eventType].splice(i, 1);
    }
  }
  return this;
};
Emitter.prototype.dispatchEvent = function(eventType, event) {
  for (var i in this.listeners[eventType]) {
    this.listeners[eventType][i](event);
  }
  return this;
};
