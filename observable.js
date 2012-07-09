var OnAnyChange = function(properties, callback) {
  var callback = callback || function() {};
   
  var listener = function(val) {
    callback(val);
  };

  for(var i = 0; i < properties.length; i++) {
    var property = properties[i];
    property.addChangeListener(listener);
  }
};

var Observable = function(propertyName, _this) {
  var value;
  this.changeListeners = [];
  var  changeListeners = this.changeListeners
    
  _this.__defineGetter__(propertyName, function() {
    return value;
  });
    
  _this.__defineSetter__(propertyName, function(newVal) {
    value = newVal;
    for(var i = 0; i < changeListeners.length; i++) {
      changeListeners[i].call(_this, newVal);
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
