# App overview
The app class is the main handler of the application. There's one per project, usually placed in the app.ts file in the root of the src folder.
It must be decorated by the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html), and must extend the [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) to have access to the interface properties and methods.

This app class runs the main lifecycle of the application. When the web is opened in a browser tab, the app class creates the Babylon engine and starts the core handlers. Once everything is loaded and ready to start, it invokes the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback, being this the **entrypoint of the application**.

It is possible to create [App states](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) to switch between different states of the application. For example you can create  the LoadingState to display a loading screen; once the web is loaded, the game can switch to the MainMenuState where the main menu GUI (Graphical User Interface) is displayed; if the user press the *Play Button*, switch to *PlayingGameState*. Each state can be started at any point of the lifecycle and they will configure the scenes and GUIs to display.

# KJS object

[KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object is a global handler accesible from anywhere in the code. Use this global object to make actions on the app.

Using this object it is possible to load and unload scenes or GUIs, send global Notifications, and execute other app actions.

# App States

[App States](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) are defined by their own class implementation. They handle each app state, configuring the scenes and GUIs to load and unload, and how the transition between states are made.

Using the [KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object it is possible to switch to a different app state from anywhere in the code.