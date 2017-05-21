# Breakpoint Checker

Query window viewport or element widths with specific breakpoints

## Installation

### [NPM](https://www.npmjs.com/package/breakpoint-checker)
```
npm i breakpoint-checker
```

### [Yarn](https://yarnpkg.com/en/package/breakpoint-checker)
```
yarn add breakpoint-checker
```

### Bower
```
bower install breakpoint-checker --save
```

## Usage

If the window viewport is equal or lower than the given breakpoint return true
```
if (breakpoint(breaks.medium)) {
  ...
}
```

If the windw viewport is equal or lower than the given breakpoint name return true
```
if (breakpoint('medium')) {
  ...
}
```

Rather than calling an if statment, you can check the width of a given element against a given breakpoint
and call an anonymous function if the element width is equal or less than the given breakpoint
```
$('body').breakpoint(breaks.medium, function() {
  ...
});
```

Simple check. Checks if the current window is less than or equal to the given breakpoint
```
breakpoint('medium');
```

Calls function if given breakpoint if euqal or less than the window viewport
```
breakpoint('medium', function() {
  ...
});
```

You can add breakpoints manually too. So you don't have to rely on custom-props and customPropsExention for this plugin
If the name is the same as a previously defined breakpoint. It will be overwritten
```
addBreakpoint('small', 111);
addBreakpoint({'special': 222, 'small' : 333});
```
