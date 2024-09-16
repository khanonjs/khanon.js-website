# App state overview

[App States](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) makes reference to the current state of the application. This means each app state decides what to load on self start, what to unload on self end, and it decides when and how the application changes of state.

This is better explained with an example:

Once the application has started, the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) app callback is invoked. At this point, instead loading a GUI or scene, you can start the MainMenuAppState. This state loads a *MainMenuBackgroundScene*, and a *MainMenuGUI*. After those two are loaded, *MainMenuAppState* receives the [onComplete](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onComplete) [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) event, displaying both scene and GUI. The end of *MainMenuAppState* unloads both *MainMenuBackgroundScene* and *MainMenuGUI*.

# Using the app state interface

To implement an app state you need to create a class, apply the [AppState decorator](https://khanonjs.com/api-docs/functions/decorators_app_app_state.AppState.html) and extend the
[AppStateInterface](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html).

**app-state.ts**
```
import {
  AppState,
  AppStateInterface,
  KJS
} from '@khanonjs/engine'

import { MyGUI } from './my-gui'
import { MyGUIState } from './my-gui-state'
import { MyScene } from './my-scene'
import { MySceneState } from './my-scene-state'

@AppState({
  scenes: [
    MyScene
  ],
  guis: [
    MyGUI
  ]
})
export class AppStateIntro extends AppStateInterface<{ / S = setup object / }> {
  onStart() {
    KJS.Scene.start(MyScene, MySceneState, {})
    KJS.GUI.start(MyGUI, MyGUIState, {})

    // Setup object is accesible
    const setup = this.setup
  }

  onEnd() {
    // These two aren't needed because Khanon.js will unload them on the state end,
    // stopping them as well, but they serve as example.
    KJS.Scene.stop(MyScene)
    KJS.GUI.stop(MyGUI)
  }
}
```

# Decorator properties

The app state decorator properties are defined in the [AppStateProps](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html) interface.

Use the [`scenes`](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html#scenes) property to declare the scenes this state will load on the state start.

Use the [`guis`](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html#guis) property to declare the GUIs this state will load on the state start.

# Switching of state

There are two ways to switch to a new app state:

Using the app interface [switchState](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#switchState) method.

Using the global [KJS.switchAppState](https://khanonjs.com/api-docs/functions/kjs.KJS.switchAppState.html) method.

After switching to a new app state, Khanon.js will load the scenes and GUIs declared in the [AppStateProps](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html), this process is automatically done by Khanon.js. The previous state won't end until the next state has been fully loaded. Once it has been loaded, the previous state ends, unloading its scenes and GUIs. Then the next state starts.

Be sure that after you switch to a new state and before it has been loaded, the player and the logic of your game wont't do any action that could drive to switch to another state, causing a collision with the state that is already loading. Once you switch to a new state, wait until it is loaded to switch to another state.

# Setup of the state

In case you need to apply a setup to the state, it is possible tough the generic interface `S` of [AppStateInterface](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html).
Everytime the state has been started, the caller will need to pass the setup argument. If setup is not defined in the AppStateInterface generic `S` interface, an empty object will be passed from the switch methods:
```
export class AppStateIntro extends AppStateInterface { // Undefined setup generic interface
// ...
}

// ...

KJS.switchAppState(AppStateIntro, {})
```
```
export class AppStateIntro extends AppStateInterface<playerName: string, currentLevel: number> { // Defined setup generic interface
// ...
}

// ...

KJS.switchAppState(AppStateIntro, {
  playerName: 'some-name',
  currentLevel: 0
})
```

The state setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#setup) accessor. Use it in the [onStart](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onStart) callback to setup your state.

```
onStart() {
  // Setup your state
  this.setPlayerName(this.setup.playerName)
  this.goLevel(this.setup.currentLevel)
}
```

# Callbacks

onStart and onEnd
-----------------

All elements declared in the [AppStateProps](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html) will be loaded by Khanon.js, that way they are available in the [onStart](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onStart) callback. After they have been loaded, the previous state ends and is unloaded. Therefore the [onEnd](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onEnd) callback of our state will be called after the next state has been loaded and started.

## Loop Update

Every app state can define [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onLoopUpdate) callback. This callback creates an observer to the app loop update method, being called every frame. Add logic here to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#loopUpdate) accessor.

## Canvas Resize

Define the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Add some logic in case the browser ratio affects your game
  // E.g. Display a pause screen if the game cannot be displayed properly.
}
```

# Notifications

The app state can also receive notifications through [notify](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#notify) or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.