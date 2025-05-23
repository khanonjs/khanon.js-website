# Loading Progress observables

Calling the load method of any class or namespace returns a [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object. This object has three observables that you need to subscribe to receive loading progress events.

[onProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onProgress) emits an event on each loading progress update. It goes fom 0 to 1, where 0 is the beggining of the loading process, and 1 is loading complete.

[onError](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onError) emits an event in case the loading progress has thrown an error. You can handle it and retry the loading or just display an error message and stop the application.

[onComplete](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#onComplete) emits an event when the loading process has been completed. Here is where you can continue going to the first scene and/or GUI.

You can also create a single [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object created from more than one LoadingProgress objects using the [fromNodes](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html#fromNodes) method, in that way you don't need to subscribe to many different observables in case you want to continue after all of them have completed their loading process:

**app.ts**
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
