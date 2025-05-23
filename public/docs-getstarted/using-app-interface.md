# App interface
To implement a new app you need to create a class, apply the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html), and extend the [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) to gain access to the app methods and properties.

**app.ts**
```
import {
  App,
  AppInterface
} from '@khanonjs/engine'

@App({
  name: 'My App',
  loopUpdate: {
    fps: 60
  }
})
export class MyApp extends AppInterface {
  onStart() {
    // Entrypoint
  }

  onClose() {
    // App close
  }

  onError(error?: string) {
    // Critical error
  }
}
```

# Decorator properties

You need to define the decorator properties to apply the app decorator. The app decorator properties are defined in the [AppProps](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html) interface.

Define the name of your application in the [`name`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#name) property.

Khanon.js creates [Babylon Engine](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine) object on app initialization. You can configure the Babylon Engine from the decorator property [`engineConfiguration`](https://khanonjs.com/api-docs/types/types.EngineConfiguration.html).

The audio engine settings are defined in the [`audioEngine`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#audioEngine) property. Read more about it in Babylon's doc [browser autoplay considerations](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic/#browser-autoplay-considerations).

Use [`htmlCanvasContainerId`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#htmlCanvasContainerId) property to define a different `id` for the HTML container of the [HTML canvas element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement). The `id` by default is `khanonjs`. Khanon.js creates a HTML canvas element inside the container that Babylon will use to render the scenes. This container use to be a [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) element.

The [`loopUpdate`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#loopUpdate) property is used to setup the loop update method. The [`fps`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppPropLoopUpdate.html#fps) property makes reference to the times the loop update will refresh per second. For example a [`fps`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppPropLoopUpdate.html#fps) value of 60 means the loop update method will refresh 60 times per second, meaning Khanon.js will create a [setInterval](https://developer.mozilla.org/es/docs/Web/API/setInterval) function that will refresh every `1000/60` milliseconds.

The [`debugLog`](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#debugLog) property defines if debug logs are enabled or disabled.

# Switching state

Use [switchtState](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#startState) or the global [KJS.switchAppState](https://khanonjs.com/api-docs/functions/kjs.KJS.switchAppState.html) method to switch to a new app state.

All states have a setup object that you can use to configure the new state. This object is is passed in the second argument of [switchtState](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#startState). Everytime the app switchs to another state, a new instance of the state is created and the previous state ends.
```
import {
  App,
  AppInterface
} from '@khanonjs/engine'

@App({ name: 'My App' })
export class MyApp extends AppInterface {
  onStart() {
    // Entrypoint
    this.switchState(LoadingState, {})
  }
}
```

**This is the proper way to start the application.**

To get the current state use the [`state`](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#state) accesor.

# Callbacks

App interface implements the abstract callback [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart), which is called when the app is ready to start. This is the **entrypoint of the application** and it is mandatory.

Implement the optional callback [onError](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onError) to handle a critical error.

You can also implement the [onClose](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onClose) callback to handle the application close.

# Notifications

The app can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#notify) interface method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.