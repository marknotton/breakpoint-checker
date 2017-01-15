(function( $ ) {

  this.breaks = {};

  // A global function to add more breakpoints to the break object. This will also update any previous
  // breaks that exist in the break object.
  this.addBreakpoint = function() {
    var settings = Array.prototype.slice.call(arguments);

    if (settings.length > 1) {
      if ( typeof(settings[0]) === 'string' && typeof(settings[1]) === 'number' ) {
        breaks[settings[0]] = settings[1];
      }
    } else if ($.isArray(settings) ) {
      $.each(settings[0], function(key, value ) {

        if(key.indexOf('breakpoint') != -1){
          // Remove the 'breakpoint-' string
          breakpointName = key.replace("breakpoint-", "");
        } else {
          breakpointName = key;
        }

        // Turn each breakpoint into a number
        breakpointValue = parseInt(value, 10);

        // Append it to the breaks object
        breaks[breakpointName] = breakpointValue;
      });
    }
  };


  // If the custom properties and extension file are loaded
  // add all breakpoitns defined in the sass/css into the public/global breaks object.
  if (CustomProps !== undefined && $.customproperty !== undefined) {
    addBreakpoint($.customproperty());
  }

  // Breakpoint check
  this.breakpoint = function() {

    var settings = Array.prototype.slice.call(arguments);

    // Default settings
    var size = null;
    var selector = null;
    var func = null;

    // Check settings
    $.each(settings, function(i, value){
      // First argument should always be a number, or break reference
      if ( i === 0 ) {
        if (typeof(value) === 'number' ) {
          size = value;
        } else if (typeof(value) === 'string' ) {
          size = breaks[value];
        }
      } else {
        if (typeof(value) === 'function' ) {
          func = value;
        } else if (typeof(value) === 'string' ) {
          selector = value;
        }
      }
    });

    var breakBool;

    // Check is the selector or window width should be comparaed to the given size.
    // Create breakBool variable.
    if ( selector !== undefined && selector !== null ) {
      breakBool = size >= $(selector).innerWidth();
    } else {
      // Checks the viewport width including scroller bar width - http://www.w3schools.com/js/js_window.asp
      breakBool = size >= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    }

    if ( func !== null && breakBool) {
      // If there was a fucntion passed in with the settings call that function if the breakBool is true
      func.apply(this, settings);
    } else {
      // Otherwise just return a boolean
      return breakBool;
    }

  };

  // Incase a selector isn't used
  $.breakpoint = function() {
    var settings = Array.prototype.slice.call(arguments);
    return breakpoint.apply(null, settings);
  };

  $.fn.breakpoint = function() {
    // Put all arguments into an array
    var settings = Array.prototype.slice.call(arguments);

    // If selector is not defined, use window as a fallback
    // var selector = this;
    var selector = this !== undefined && this !== null && this[0] !== window ? this : window;

    // Add selector to settings.
    settings.push(selector);

    return breakpoint.apply(null, settings);
  };


}( jQuery ));
