# App interface
The app decorated class must extend [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) to gain access to the app methods and properties.

It is possible to setup the Babylon engine configuration from the decorator property [`engineConfiguration`](https://khanonjs.com/api-docs/types/types.EngineConfiguration.html). Check the decorator [props](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html) to see what to configure here.

app.ts
```
import {
  App,
  AppInterface
} from '@khanonjs/engine'

@App({
  name: 'My App',
  loopUpdate: {
    fps: 165
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

# Callbacks

This interface implements the abstract callback [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart), which is called when the app is ready to start. This is the entrypoint of the application.

There can also be implemented the optional callbacks [onError](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onError) to handle a critical error and [onClose](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onClose) to handle the application close.

# Switching state

Use the [switchtState](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#startState) method to switch to a new app state.
All states have a setup object to configure the new state, which is passed in the second argument. Everytime the app switchs to another state, a new instance of the state is created.
```
onStart() {
  // Entrypoint
  this.switchState(LoadingState, {})
}
```

To get the current state use the [`state`](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#state) accesor.

# Notifications

The app can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#notify) method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.