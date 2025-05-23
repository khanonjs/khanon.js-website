# What is the KJS object?
[KJS](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object makes reference to a global handler of the application. This global handler is accessible from anywhere and it communicates with different modules of the application. It can be used to switch the app state; load, unload, start or stop scenes and GUIs; send notifications; and some other global actions.

Once the app has been loaded and the [onStart](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback has been invoked, you can use KJS to load the first scene and GUI. Those two methods return a [LoadingProgress](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object.
```
import { KJS } from '@khanonjs/engine'
...
onStart() {
  const progressScene = KJS.Scene.load(MyFirstScene)
  const progressGUI = KJS.GUI.load(MainMenuGUI)
}
...
```
