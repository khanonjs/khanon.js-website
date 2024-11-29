# App state overview

[App states](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) are logical controllers of the application. Each app state decides what to load on start, what to unload on end, and it decides when and how the application changes of state. They control the flow of the application.

This is better explained with an example:

Once the application has started, the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) app callback is invoked. At this point, instead loading a GUI or scene, you can start the *MainMenuAppState*. This state loads the scene *MainMenuBackgroundScene* and the GUI *MainMenuGUI*. After those two elements are loaded the [onStart](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onStart) callback is invoked. This is the point to start the desired scene or GUI.

# Using the app state interface

To implement an app state you need to create a class, apply the [AppState decorator](https://khanonjs.com/api-docs/functions/decorators_app_app_state.AppState.html), and extend
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
export class AppStateIntro extends AppStateInterface</* Setup object */ S = any> {
  onStart() {
    // Scenes and GUIs have been loaded at this point and can start
    KJS.Scene.start(MyScene, MySceneState, {})
    KJS.GUI.start(MyGUI, MyGUIState, {})
    // this.setup has optional S type
  }

  onEnd() {
    // Invoked on the state end. Scenes and GUIs are automatically unloaded.
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

After switching to a new app state, the scenes and GUIs of previous state end and are unloaded. After it, the scenes and GUIs declared in the [AppStateProps](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html) of the new state are loaded. Once the loading of the new state has been completed, the new state starts invoking [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback. This is the point where you can start the new scene or GUI.

# Setup of the state

In case you need to apply a setup to the state, it is possible through the generic `S` of [AppStateInterface](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html).

The setup object needs to be passed to both [switchState](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#switchState) and [KJS.switchAppState](https://khanonjs.com/api-docs/functions/kjs.KJS.switchAppState.html) methods. If the setup is not defined in the *AppStateInterface* generic `S`, an empty object will be passed to the switch methods:
```
@AppState()
export class AppStateIntro extends AppStateInterface { // Undefined setup generic
// ...
}

// ...

KJS.switchAppState(AppStateIntro, {})
```
```
@AppState()
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

App states implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Add some logic in case the browser ratio affects your game
  // E.g. Display a pause screen if the game cannot be displayed properly.
}
```

# Notifications

App states can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#notify) interface method  or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.