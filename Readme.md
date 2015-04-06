I've made a POC with the nice property of uni directional data-flow from an event to the model to the view. There's negligable framework code and everything is fairly nice. The only dependency for this code is the virtual-dom library.

The only thing that's currently missing is encapsulation. I believe that this would make it a scalable software architecture as described by Gabriel Gonzales.

In order to achieve encapsulation and composition of reactive components I'm thinking at the moment of trying to accomplish this via web components, specifically custom elements and shadow dom. What I can't immediately picture is how to attach event handlers to these things when they're going to be modified by virtual-dom.

Loose Coupling
==============

One of the things missing at the moment is loose coupling. Currently the listeners are hard coded to the models, the models to the render, the render to the views. In order to be able to define a view separate of a model they need to be injecting into each other.

What does injection look like, exactly? Maybe 
