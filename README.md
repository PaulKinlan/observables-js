Observables-JS
==============

A simple Observer pattern for *your* object model. 

Instant Gratification
---------------------

    var model = {
      "location": { "lat": 0, "lng": 0  } ,
      "heading": 123,
      "target": { "lat": 0, "lng": 0 }
    }

    var _locationObserver = new Observable("location", model);
    var _headingObserver = new Observable("heading", model);
    var _targetObserver = new Observable("target", model);

    _locationObserver.addChangeListener(function(newVal, oldVal) {
      // Wheeee.  We get notifications of changes
    });

    _locationObserver = { "lat": 1, "lng": 2 }; 

Why?
----

I have two major frustrations:
1.   If you want use an "MVC" framework,  most of them require that you use
     their object model.  This frustrates me.  I just want to know when data has changed.
2.   Listening to changes from multiple async updates and performing actions on these
     is hard 

API
---

Observable - *constructor* 
    new Observable([*required*] propertyName, [*required*] objectToObserve);

Observable - addChangeListener 
    observer.addChangeListener([*required*] function(oldValue, newValue))

Gates
-----

Handling logic based on the state of several independant asynchronus events is 
cumbersome and complex.  The observer pattern allows you to build the systems 
that are gated on certain conditions being met in your model.

*   OnAnyChange - Fired when any single of the observers notices a change in the
    data 

    OnAnyChange([_locationObserver, _headingObserver, _targetObserver], function() {
        // Any one of the three observers have changed.
    });

Under the hood
--------------

To listen to changes to the object, the Observable object changes the
observed object by setting up a 'getter' and 'setter'  for the property name
and caching the value of the actual value.

*Note* tests still need to be don if the property is already a getter or setter.  
