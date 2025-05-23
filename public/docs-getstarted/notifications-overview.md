# Notifications overview

The [Notifications](https://khanonjs.com/api-docs/modules/decorators_notification.html) system is a way to build communications between different elements of the game.

When an event occurs, it can send a notification message to other elements. There can be many types of events: input events, physics events, state events, actor events, timer events, etc.

Communications can be sent globally, or to specific elements. When a notification is sent from the global handler [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html), all elements listening to that message will received it.

The notification receiver method is implemented in each element listening to it.