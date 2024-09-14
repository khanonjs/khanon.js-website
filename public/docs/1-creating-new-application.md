# Creating a new application

Creating a new application is as simple as creating an empty class decorated by the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html). That is everything you need to run a new app. Your app class has to extend the [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) class, which contains properties and methods of your application.

To create an application place this code in the app.ts file:
```
import {
  App,
  AppInterface
} from '@khanonjs/engine'

@App({
  name: 'My project'
})
export class MyApp extends AppInterface {
  onStart() {
    // Entrypoint of your app
  }
}
```

The [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) method is mandatory. This is the entrypoint of your application. Once Khanon.js has created the Babylon.js engine and the app is ready to start, the onStart method is invoked and you can go to the first scene or GUI of your game.

To setup the Babylon.js engine configuration use the [engineConfiguration](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#engineConfiguration) decorator property. All the Babylon configuration properties are accessible from there.

Check the [App decorator properties](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html) to see what you can setup there.