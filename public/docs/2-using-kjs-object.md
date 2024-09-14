# What is the KJS object?
[KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object makes reference to a global handler of the application. This global object is accessible from anywhere and it communicates with the app. It can be used to switch the app state; load, unload, start or stop scenes and GUIs; send Notifications; and some other global actions.

Once the app has been loaded and the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback has been invoked, you can use KJS to load the first scene and GUI. Those two methods return a [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object.
```
onStart() {
  const progressScene = KJS.Scene.load(MyFirstScene)
  const progressGUI = KJS.GUI.load(MainMenuGUI)
}
```

# Scene namespace

Use the [Scene](https://khanonjs.com/api-docs/modules/kjs.KJS.Scene.html) namespace to load, unload, start or stop a scene.
```
example() {
  KJS.Scene.load(MyScene)
  KJS.Scene.unload(MyScene)
  KJS.Scene.start(MyScene)
  KJS.Scene.stop(MyScene)
}
```

# GUI namespace

Use the [GUI](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html) namespace to load, unload, start or stop a GUI.
```
example() {
  KJS.GUI.load(MyGUI)
  KJS.GUI.unload(MyGUI)
  KJS.GUI.start(MyGUI)
  KJS.GUI.stop(MyGUI)
}
```

# Notify namespace

Use the [Notify](https://khanonjs.com/api-docs/modules/kjs.KJS.Notify.html) namespace to send messages globally. Read more int he Notifications section
```
example() {
  KJS.Notify.send(message, receivers, ...args)
}
```

# Loading progress observables

Calling the load method of any class or namespace returns a [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object. This object has three observables that you need to subscribe to receive loading progress events.

[onProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onProgress) emits an event on each loading progress update. It goes fom 0 to 1, where 0 is the beggining of the loading process, and 1 is loading complete.

[onError](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onError) emits an event in case the loading progress has thrown an error. You can handle it and retry the loading or just display an error message and stop the application.

[onComplete](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onComplete) emits an event when the loading process has been completed. Here is where you can continue going to the first scene and/or GUI.

You can also create a single [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object created from more than one [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) objects using the [fromNodes](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#fromNodes) method, in that way you don't need to subscribe to many different observables in case you want to continue after all of them have completed their loading process:

app.ts
```
import {
  App,
  AppInterface,
  KJS,
  LoadingProgress
} from '@khanonjs/engine'

@App({
  name: 'My App'
})
export class MyApp extends AppInterface {
  onStart() {
    const progressScene = KJS.Scene.load(MyFirstScene)
    const progressGUI = KJS.GUI.load(MainMenuGUI)

    const totalProgress = new LoadingProgress().fromNodes(progressNodes)

    totalProgress.onComplete.add(() => {
      KJS.Scene.start(SceneIntro, SceneIntroState, {})
      KJS.GUI.start(MainMenuGUI)
    })
    totalProgress.onProgress.add((progress: number) => {
      // Print the progress in some HTML element
    })
    totalProgress.onError.add((error) => {
      // Error loading, retry or end the app.
      // To end the app:
      KJS.throw(error)
    })
  }
}
```
That's the way to start the application and go to the first game screen.

# Loop Update observable

The loop update core method makes reference to the game timeline progression, so called game loop commonly, it is the frame by frame update of the game. Every frame this core method is called, and it triggers all the observables added to it. That way the game physics, movements, events, and whatever relying on time is updated.

You will find an *onLoopUpdate* callback method in many of the Khanon.js elements such actors, states, actions, etc. But you can also use the KJS object to manually subscribe to the loop update method.

To manually subscribe to the loop update observable use [KJS.loopUpdateAddObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.loopUpdateAddObserver.html) method.

To unsubscribe [KJS.loopUpdateRemoveObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.loopUpdateRemoveObserver.html).

The observers receive a factor time argument, meaning the frame proportion to be updated, which couild be considered the time factor velocity. It is 1 for a normal time velocity.

# Canvas Resize observable

Sometimes you might want to rearrange the layers of your game depending on the browser width and height ratio. This is complex enough as not to have an automatic system, but you can do it manually through the CanvasResize observable.

As loop update, many Khanon.js elements have a callback method for CanvasResize, but you can also subscribe manually to it.

To manually subscribe to the CanvasResize observable use [KJS.canvasResizeAddObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.canvasResizeAddObserver.html) method.

To unsubscribe [KJS.canvasResizeRemoveObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.canvasResizeRemoveObserver.html).

The observers receive a [Rect](https://khanonjs.com/api-docs/interfaces/models.Rect.html) argument with the width and height of the canvas. You can use it to calculate the ratio and adapt the game layers.

# Global actions

The [KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object has some useful methods to perform global actions:

&nbsp;
    -  [KJS.throw](https://khanonjs.com/api-docs/functions/kjs.KJS.throw.html) stops the app and throws an error. Call it after a critical error that doesn't let the app to continue.

&nbsp;
    -  [KJS.switchAppState](https://khanonjs.com/api-docs/functions/kjs.KJS.switchAppState.html) switchs to a new app state.

&nbsp;
    -  [KJS.clearCache](https://khanonjs.com/api-docs/functions/kjs.KJS.clearCache.html) clears the app cache.

&nbsp;
    -  [KJS.setTimeout](https://khanonjs.com/api-docs/functions/kjs.KJS.setTimeout.html), [KJS.setInterval](https://khanonjs.com/api-docs/functions/kjs.KJS.setInterval.html) are similar to the Javascript native methods. The difference with them is that KJS methods are attached to the KJS loop update method. This prevents some inconsistencies in case the browser tab is unfocused. This happens because when the browser tab is unfocused, the browser applies a delay to the native [setTimeout](https://developer.mozilla.org/es/docs/Web/API/setTimeout) and [setInterval](https://developer.mozilla.org/es/docs/Web/API/setInterval), what could drive to trigger the timeout methods unsynchronized with loop update. Use KJS timeout methods in case you want to synchronize them with KJS loop update.

&nbsp;
    -  [KJS.clearTimeout](https://khanonjs.com/api-docs/functions/kjs.KJS.clearTimeout.html), [KJS.clearInterval](https://khanonjs.com/api-docs/functions/kjs.KJS.clearInterval.html) to clear a KJS timeout or interval.
