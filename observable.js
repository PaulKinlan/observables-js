  /*global $, window*/
  /*jslint browser: true, devel:true, nomen: true */

(function (exports) {
  "use strict";

  var Observable, OnAnyChange;

  OnAnyChange = function(properties, callback) {
    
    var listener, i, property;

    listener = function(val) {
      if (typeof(callback) === "function") {
        callback(val);
      }
    };

    for(i = 0; i < properties.length; i += 1) {
      property = properties[i];
      property.addChangeListener(listener);
    }
  };

  Observable = function(propertyName, _this, fn) {
    var value, changeListeners, oldValue, i;
    this.changeListeners = [];
    changeListeners = this.changeListeners;
    
    _this.__defineGetter__(propertyName, function() {
      return value;
    });
      
    _this.__defineSetter__(propertyName, function(newVal) {
      oldValue = _this[propertyName] || newVal;
      value = newVal;
      for (i = 0; i < changeListeners.length; i += 1) {
        changeListeners[i].call(_this, newVal, oldValue);
        if (typeof(fn) === 'function') {
          fn(newVal, oldValue);
        }
      }
    });
  };

  Observable.prototype.addChangeListener = function(callback) {
    this.changeListeners.push(callback);
  };

  Observable.prototype.removeChangeListener = function(callback) {
    var i = this.changeListeners.indexOf(callback);
    this.changeListeners = this.changeListeners.splice(i, 1);
  };

  exports.Observable = Observable;
  exports.OnAnyChange = OnAnyChange;
}(window));