# App overview
[App](https://khanonjs.com/api-docs/modules/decorators_app.html) class is the main handler of the application. There's one per project, usually placed in the *app.ts* file in *src* folder.
It must be decorated by the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html), and must extend the [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) to gain access to the interface properties and methods.

This app class runs the main lifecycle of the application. When the app is opened in a browser tab, it creates the [Babylon Engine](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine) and starts the core handlers. Once everything is loaded and ready to start, it invokes the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback, being this the **entrypoint of the application**.

It is possible to create [App states](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) to switch between different states of the application. For example you can create  the *LoadingState* to display a loading screen; once the web is loaded, the game can switch to the *MainMenuState* where the main menu GUI (Graphical User Interface) is displayed; if the user press the play button, switch to *PlayGameState*. Each state can be started at any point of the lifecycle and they will configure the scenes and GUIs to display.

# KJS object

[KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object is a global handler accessible from anywhere in the code. Use this global object to launch app actions.

Using this object it is possible to load and unload scenes or GUIs, send global Notifications, and execute other app actions.

# App States

[App States](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) are defined by their own class implementation. They handle each app state, configuring the scenes and GUIs to load and unload, and control how the transition between states are made.

Using the [KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object it is possible to switch to a different app state from anywhere in the code.

# Timers

Khanon.js implements its own timers. Browser native timers are inconsistent by two reasons:

- In some browsers, if the browser tab is unfocused, timer events are delayed to save resources. That can drive to inconsistencies in your application because some timers can be triggered at the wrong app frame. KJS implements its own loop update function, triggering timers always at the correct frame.

- In case you previously created a timer in a class that has been deleted, browser native timers keep running, and they will be triggered even if their context doesn't exists. That will cause errors. Khanon.js instances remove their timers at the same time the class is removed, so you don't have to care for it.

It is encouraged to use Khanon.js instance timers. You will read about them in the interfaces documentation.