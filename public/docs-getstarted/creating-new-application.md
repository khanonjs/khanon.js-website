# Creating a new application

# From the CLI

The easiest way to create a new Khanon.js application is using the [CLI](https://www.npmjs.com/package/@khanonjs/cli):

`npm install @khanonjs/cli -g`

Once the CLI is installed, you can create a new project runnig this command on the console:

`khanon -c`

It will create a new folder with the project's content.

# Without CLI

To create a project manually you firstly have to create the `root`, `public` and `src` folders and add their contents as described in this [section](http://localhost:3000/getstarted/project-structure).

Then add an empty class decorated by the [App decorator](https://khanonjs.com/api-docs/functions/decorators_app.App.html) to the `src` folder. Your app class has to extend the [AppInterface](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html) class, which contains properties and methods of your application.

Place this code in the `app.ts` file:

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

The [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) method is mandatory. This is the entrypoint of your application. Once Khanon.js has created the [Babylon Engine](https://doc.babylonjs.com/typedoc/classes/BABYLON.Engine) and the app is ready to start, the *onStart* method is invoked and you can go to the first scene or GUI of your game.

To setup the Babylon Engine configuration use the [engineConfiguration](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#engineConfiguration) decorator property. All the Babylon Engine configuration properties are accessible from there.

Check [AppProps](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html) to see what you can declare in the decorator.

This is a brief overview of how to Khanon.js works and how to start a new application. In the next sections we will go deeper and we will see how to add all needed elements to build a whole video game.