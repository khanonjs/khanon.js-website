# Overview

[Input events](https://khanonjs.com/api-docs/modules/decorators_input_event.html) are methods that receive user inputs from the screen, keyboard, mouse or pad. Once an input event is triggered, the decorated method is called. That way we can to make actions based on user inputs.

In web browsers, the usual input event to be used are screen taps, since those are compatible with any browser tab oppened at any device (computers, mobile, etc). But we can also define input events for keyboard and mouse in case the browser tab is designed to be used in a computer.

# Types of input events

There are different ways to declare an input event. Input events can be triggered on key or tap press, key or tap up, mouse or screen drag, etc. These types are defined in the [InputEventIds](https://khanonjs.com/api-docs/enums/decorators_input_event.InputEventIds.html) enumerator.
