# Scene state overview

[Scene states](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) are logical controllers of the scene. A scene is always associated to a state, which will control the scene flow. They configure the scene in different ways, playing actions and spawning elements like actors or particles. [Scene states](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) can also receive notifications and act in consequence.

When a scene state starts, the [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onStart) callback is invoked, being this the point to initially configure the scene.

Scene states doesn't have to configure the scene necessarily. A scene state can be a second stage of the scene that applies a different logic, but keeps the elements created by a previous state.

# Using the scene state interface

To create a scene state you need to create a class, apply the [SceneState decorator](https://khanonjs.com/api-docs/functions/decorators_scene_scene_state.SceneState.html) and extend [SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html).

**scene-state.ts**
```
import {
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

@SceneState()
export class SceneIntroState extends SceneStateInterface<S = {/* setup object */}, C = {/* scene interface */}> {
  onStart() {
    // Configure the scene here and spawn needed elements
    // this.setup has S type
    // this.scene has C type
  }

  onEnd() {
    // Apply final changes to the scene
  }
}
```

[SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html) can apply two optional generic interfaces.

`S` is the generic type for the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setup) object. This object is passed to the state by the [switchState](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchState) method. In this way the caller can send parameters to the state.

`C` is the scene interface in case you want to have access to custom scene properties. This type is applied to the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#scene) accessor.

To access the scene associated to a state use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#scene) accessor.

Use [`spawn`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#spawn) and [`remove`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#remove) properties to spawn and remove elements. They are a shortcut to the actual scene spawn and remove classes.

You can set the camera using the [setCamera](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setCamera) method.

# Decorator properties

The [SceneStateProps](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html) decorator properties defines what this state can spawn in the scene. If you want to have a more granular control of what each state uses, instead declaring the actors, sprites, meshes and particles in the scene, you can declare them in the state. That's helpful to reuse the state between different scenes. Khanon.js is flexible and let you declare them in the place you consider is better.

Use the [`actors`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#actors), [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#sprites), [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#meshes) and [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#particles) properties to declare the elements to spawn by this state.

# Switching of state

Use the scene [switchState](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchState) method to switch to a new state. The previous state ends at this point and the new state starts running.

# Setup of the state

In case you need to apply a setup to the state, it is possible through the generic `S` of [SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html).

The setup object needs to be passed in both [switchState](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchState) method. If the setup is not defined in the [SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html) generic `S`, an empty object will be passed to the switch methods:
```
export class SceneStateGoStage extends SceneStateInterface { // Undefined setup generic
// ...
}

// ...

myScene.switchState(SceneStateGoStage, {})
```
```
export class SceneStateGoStage extends SceneStateInterface<level: number, playerLife: number> { // Defined setup generic interface
// ...
}

// ...

myScene.switchState(SceneStateGoStage, {
  level: 1,
  playerLife: 0.8
})
```

The state setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setup) accessor.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onStart) calllback is invoked on the state start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onEnd) calllback is invoked when the state ends.

## Loop Update

Every scene state can define [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onLoopUpdate) callback. This callback creates an observer to the app loop update method, being called every frame. Add logic here to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#loopUpdate) accessor.

## Canvas Resize

Define the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Add some logic in case the browser ratio affects your game
  // E.g. Display a pause screen if the game cannot be displayed properly.
}
```

# Notifications

The scene state can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#notify) interface method  or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.