# What is the KJS object?
[***KJS***](https://khanonjs.com/api-docs/modules/kjs.KJS.html) object makes reference to a **global handler** of the application. This global object is accessible from anywhere and it communicates with the App. It can be used to **switch the App state**; **load, unload, start or stop *Scenes* and *GUIs***; **send Notifications**; and some **other global actions**.

Once the app has been loaded and the [*onStart*](https://khanonjs.com/api-docs/classes/decorators_app.AppInterface.html#onStart) callback has been invoked, you can use *KJS* to load the first *Scene* and *GUI*. Thos two methods returns a [***LoadingProgress***](https://khanonjs.com/api-docs/classes/base_loading_progress.LoadingProgress.html) object.
```
onStart() {
  const progressScene = KJS.Scene.load(MyFirstScene)
  const progressGUI = KJS.GUI.load(MainMenuGUI)
}
```
That's the way to start the application.

# Scene namespace

Use the [***Scene***](https://khanonjs.com/api-docs/modules/kjs.KJS.Scene.html) namespace to **load, unload, start or stop** a *Scene*.
```
example() {
  KJS.Scene.load(MyScene)
  KJS.Scene.unload(MyScene)
  KJS.Scene.start(MyScene)
  KJS.Scene.stop(MyScene)
}
```

# GUI namespace

Use the [***GUI***](//8a8f) namespace to **load, unload, start or stop** a *GUI*.
```
example() {
  KJS.GUI.load(MyGUI)
  KJS.GUI.unload(MyGUI)
  KJS.GUI.start(MyGUI)
  KJS.GUI.stop(MyGUI)
}
```

# Loading progress observables

# Global actions