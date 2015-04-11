I've made a POC with the nice property of uni directional data-flow from an event to the model to the view. There's negligable framework code and everything is fairly nice. The only dependency for this code is the virtual-dom library.

The only thing that's currently missing is encapsulation. I believe that this would make it a scalable software architecture as described by Gabriel Gonzales.

In order to achieve encapsulation and composition of reactive components I'm thinking at the moment of trying to accomplish this via web components, specifically custom elements and shadow dom. What I can't immediately picture is how to attach event handlers to these things when they're going to be modified by virtual-dom.

Loose Coupling
==============

One of the things missing at the moment is loose coupling. Currently the listeners are hard coded to the models, the models to the render, the render to the views. In order to be able to define a view separate of a model they need to be injecting into each other.

What does injection look like, exactly? Maybe 

Single State Object
===================

Having thought about it some more I think it's important to realise there can only be one view/template responsible for a piece of html. The models mutate all or some of that state, which then triggers all or some of the views to regenerate their templates, which are then patched on to the root dom element. So we have:
* Intents - they handle DOM events
* Models  - they apply logic to state based on Intents
* Views   - they render templates based on the state

The framework then needs to route intents to models, state to models, and marshal templates, applying their changes to the dom.

Optional Virtual Dom
====================

Making virtual-dom an optional dependency sounds like a great idea because then people can choose load times versus performance. Assigning innerHTML would be a viable alternative (Bloop framework).

Encapsulation
=============

My current belief is that encapsulation should occur via shadow DOM. I can thus turn the app into a custom element with a shadow root and emit events as my api.
