# Creating a new application

Creating a new application is as simple as creating an empty class decorated by the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html). That is everything you need to run a new app. Your app class has to extend the [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) class, which contains properties and methods of your application.

To create an application place this code in the app.ts file:

**app.ts**
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

The [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) method is mandatory. This is the entrypoint of your application. Once Khanon.js has created the [Babylon Engine](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine) and the app is ready to start, the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) method is invoked and you can go to the first scene or GUI of your game.

To setup the [Babylon Engine](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine) configuration use the [engineConfiguration](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#engineConfiguration) decorator property. All the Babylon configuration properties are accessible from there.

Check the decorator [props](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html) to see what you can setup there.

This is a brief overview of how to Khanon.js works and how to start a new application. In the next sections we will go deeper and we will see how to add all needed elements to build a whole video game.