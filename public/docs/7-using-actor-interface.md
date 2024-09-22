# Creating an Actor

# Decorator properties

# Composing the actor

# Attaching particles

# Callbacks

Apart the previously mentioned [onLoad](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoad), [onUnload](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onUnload), [onStart](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStart) and [onStop](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onStop) callbacks, a scene can implement the optional callbacks [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoopUpdate) and [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onCanvasResize).

## Loop Update

Every scene can implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoopUpdate) callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

Scenes can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#notify) interface method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

