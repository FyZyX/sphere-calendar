## Prompt
_This calendar is responsive, but on touch devices, it doesn't allow the user to drag and select multiple checkboxes as on the desktop version. Using the code on that page as your base, write a script that brings the user to a menu when one of the checkboxes is tapped on a touch device. The menu should give the user the ability to select a start time, an end time, and when the user is done with the menu, the checkboxes in the calendar should be selected based on the user's inputs._

_Users should be able to repeat this process to select as many blocks of checkboxes as they want. While adding this functionality, make sure to follow progressive enhancement and that none of the existing functionalities are broken._

## Structure
### HTML
_Code can be found in `index.html`_

I've added an overlay `div` to the top of `body` element. The element's `display` is set to `none` by default. In the spirit of **progressive enhancement**, the range selection menu is simply inaccessible if

1. the user is on a non-touch device
2. the touch device is in portrait mode
2. JavaScript is disabled

To ensure we only receive expected input, the user is presented with four selection menus, one for the day of the week, one for the hour of the day, one for choosing half-hour increments, and finally one for the cycle of the day (am or pm).

Users can choose to dismiss the menu by either _cancelling_ the selection–in which case nothing is selected–or _selecting_ the range of times–in which case all intermediary cells are also selected.

### CSS
_Code can be found in `style/selectcheckboxes.css`_

I've taken care to ensure all styles will be supported through the last **4 versions** of all major browsers. In my estimation, this implementation will cover 85-90% of desktop and mobile browsers in use today.

The style of the menu is based on existing styles for consistent design and user experience. My goal was to provide an intuitive and unobtrusive experience.

### JavaScript
_Code can be found in `js/selectcheckboxs.js`_

All of my code is wrapped in a conditional block to shield it from exposure on non-touch devices. There are handlers for click events on individual time slots as well as the select and cancel buttons in the menu.

Since we are selecting time ranges, I've chosen to utilize native `Date` objects. Given that we aren't performing very complicated operations, I saw no need to leverage an existing library.

#### Implementation details

**When a user clicks a time slot, it is immediately selected**

This provides the user immediate feedback the click operation has performed an action on the calendar. My inspiration for this decision comes from Google Calendar, which implements a similar behavior.

The slot is deselected if

1. the user cancels the operation
2. the user selects a different start time in the menu

**Click events are used to maintain scrolling functionality**

I considered using touch-only events, but this caused issues with scrolling since the menu would pop up even if no time slot was selected directly. In order to preserve existing functionality, I added some simple logic to the mouse events in `dragcheckbox.js` to force an early return on touch devices.

**End times are NOT required to come after start times**

I went back and forth on this, but a different implementation would simply require a tweak to the conditional block in the `interpolateTimes()` function. Since users can drag _up or down_ in the desktop version, I figured earlier end times would simulate the dragging up behavior. For now I simply swap the start and end times so the range is selected properly.

**Range select menu is disabled in portrait mode and retains state on orientation changes**

Since the original app does not function in portrait mode, I added some logic to dismiss the overlay in the media query `@media (max-width: 479px)` found in `style/screen.css`. This has the advantage that the overlay will return to view if the user switches back to landscape mode. While this is a subtle change, it goes a long way in maintaining a cohesive feel for the user. 

## Code Format and Style
I've done my best to adhere to conventions used throughout the exiting code base. For the sake of readability, I've modularized my come as much as possible so it reflects atomic operations.

Because this is such a small project, I've left my functions in the global score (similar to `shiftcheckbox.js`) and ensured there no namespace collisions. Many of these functions perform simple utility or conversion operations, and even if they are only used once, they assist with clarifying logic and grouping similar functionality.

## Test



