// If the windw viewport is equal or lower than the given breakpoint return true
// if (breakpoint(breaks.medium)) {
//   ...
// }

// If the windw viewport is equal or lower than the given breakpoint name return true
// if (breakpoint('medium')) {
//   ...
// }

// Rather than calling an if statment, you can check the width of a given element against a given breakpoint
// and call an anonymous function if the element width is equal or less than the given breakpoint
// $('body').breakpoint(breaks.medium, function() {
//   ...
// });

// Simple check. Checks if the current window is less than or equal to the given breakpoint
// breakpoint('medium');

// Calls function if given breakpoint if euqal or less than the window viewport
// breakpoint('medium', function() {
//   ...
// });

// You can add breakpoints manually too. So you don't have to rely on custom-props and customPropsExention for this plugin
// If the name is the same as a previously defined breakpoint. It will be overwritten
// addBreakpoint('small', 111);
// addBreakpoint({'special': 222, 'small' : 333});

(function( $ ) {

  this.breaks = new Object();

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
  }


  // If the custom properties and extension file are loaded
  // add all breakpoitns defined in the sass/css into the public/global breaks object.
  // if (CustomProps !== undefined && $.customproperty !== undefined) {
  //   addBreakpoint($.customproperty());
  // }

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
      if ( i == 0 ) {
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

    // Check is the selector or window width should be comparaed to the given size.
    // Create breakBool variable.
    if ( selector !== undefined && selector !== null ) {
      var breakBool = size >= $(selector).innerWidth();
    } else {
      // Checks the viewport width including scroller bar width - http://www.w3schools.com/js/js_window.asp
      var breakBool = size >= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    }

    if ( func !== null && breakBool) {
      // If there was a fucntion passed in with the settings call that function if the breakBool is true
      func.apply(this, settings);
    } else {
      // Otherwise just return a boolean
      return breakBool;
    }

  }

  // Incase a selector isn't used
  $.breakpoint = function() {
    var settings = Array.prototype.slice.call(arguments);
    return breakpoint.apply(null, settings);
  }

  $.fn.breakpoint = function() {
    // Put all arguments into an array
    var settings = Array.prototype.slice.call(arguments);

    // If selector is not defined, use window as a fallback
    var selector = this.selector !== undefined && this.selector !== null && this[0] !== window ? this.selector : window;

    // Add selector to settings.
    settings.push(selector);

    return breakpoint.apply(null, settings);
  }


}( jQuery ));
