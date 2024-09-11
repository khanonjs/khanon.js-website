# Overview
[***App States***](https://khanonjs.com/api-docs/modules/decorators_app_app_state.html) makes reference to the **current state of the application**. This means each *App State* decides what to load on self start, what to unload on self end, and it decides when and how the application changes of state.

This is better explained with an example:

Once the application has started, the [*onStart*](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) App callback is invoked. At this point, instead loading a *GUI* or *Scene*, you can start the ***MainMenuAppState***. This state loads a ***MainMenuBackgroundScene***, and a ***MainMenuGUI***. After those two are loaded, ***MainMenuAppState*** receives the [*onComplete*](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onComplete) [*LoadingProgress*](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) event, displaying both *Scene* and *GUI*. The end of ***MainMenuAppState*** will unload both ***MainMenuBackgroundScene*** and ***MainMenuGUI***.

&nbsp;
# Switching to a new App State

There are two ways to switch to a new App State:

&nbsp;
    -  Using the global [***KJS.switchAppState***](https://khanonjs.com/api-docs/functions/kjs.KJS.switchAppState.html) method.

&nbsp;
    -  Using the App interface [***switchState***](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#switchState) method.

After switching to a new App State, **Khanon.js will load the *Scenes* and *GUIs* declared in the** [***AppStateProps***](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html), this process is automatically done by Khanon.js. The previous state won't end until the next state has been fully loaded. Once it has been loaded, the previous state ends (unloading its *Scenes* and *GUIs*), and the next state starts.

&nbsp;
# Using the AppState interface

To implement an App State you need to use the [***AppStateDecorator***](https://khanonjs.com/api-docs/functions/decorators_app_app_state.AppState.html) and extend the [***AppStateInterface***](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html):
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
export class AppStateIntro extends AppStateInterface {
  onStart() {
    KJS.Scene.start(MyScene, MySceneState, {})
    KJS.GUI.start(MyGUI, MyGUIState, {})
  }

  onEnd() {
    // These two aren't needed because Khanon.js will unload them on the state end,
    // stopping them as well, but they serve as example.
    KJS.Scene.stop(MyScene)
    KJS.GUI.stop(MyGUI)
  }
}
```

All elements declared in the [*AppStateProps*](https://khanonjs.com/api-docs/interfaces/decorators_app_app_state.AppStateProps.html) will be loaded by Khanon.js, that way they are available in the [***onStart***](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onStart) callback. At that point, the previous state ends and is unloaded. Therefore the [***onEnd***](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onEnd) callback of our state will be called after a next state has been loaded and started.

## Notifications

The *AppState* can also **receive notifications** through the [***notify***](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#notify) method or the global [***KJS.Notify.send***](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the **Notifications** section.

## Loop Update

Every *AppState* can define the [***onLoopUpdate***](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onLoopUpdate). **This callback creates an observer to the app Loop Update**, being called every frame. It is possible to add here some logic to check anything needed in the game and perform any action in consequence.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

## Canvas Resize

It is possible to define the [***onCanvasResize***](https://khanonjs.com/api-docs/classes/decorators_app_app_state.AppStateInterface.html#onCanvasResize) callback to **receive any new canvas resize**.
```
onCanvasResize(size: Rect) {
  // Add some logic in case the browser ratio affects your game
  // E.g. Display a pause screen if the game cannot be displayed properly.
}
```