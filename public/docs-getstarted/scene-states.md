# Scene state overview

[Scene states](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html) are logical controllers of the scene. A scene is always associated to a state, which will control the scene flow. They configure the scene in different ways, playing actions and spawning elements like actors or particles. Scene states can also receive notifications and act in consequence.

When a scene state starts, the [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onStart) callback is invoked, being this the point to initially configure the scene.

Scene states doesn't have to configure the scene necessarily. A scene state can be a second stage of the scene that applies a different logic, but keeps the elements created by a previous state.

Access the state of a scene from the [`state`](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#state) accessor.

# Using the scene state interface

To create a scene state you need to create a class, apply the [SceneState decorator](https://khanonjs.com/api-docs/functions/decorators_scene_scene_state.SceneState.html), and extend [SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html).

**scene-state.ts**
```
import {
  SceneState,
  SceneStateInterface
} from '@khanonjs/engine'

@SceneState()
export class SceneIntroState extends SceneStateInterface</* Setup object */ S = any, /* Scene interface */ C = SceneInterface> {
  onStart() {
    // Configure the scene here and spawn needed elements
    // this.setup has optional S type
    // this.scene has optional C type
  }

  onEnd() {
    // Apply final changes to the scene
  }
}
```

[SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html) can apply two optional generic interfaces.

Use the `S` generic to set the type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the state by the [switchState](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchState) call. In this way the caller can send parameters to the state.

To access the scene associated to a state use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

Use [`spawn`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#spawn) and [`remove`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#remove) properties to spawn and remove elements. They are a shortcut to the actual scene spawn and remove classes.

To switch of camera use the [switchCamera](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#switchCamera) method. This method has to be called in in the scene (or state) start. Every scene needs to have attached a camera in every moment.

To show and hide a GUI use [showGUI](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#showGUI) and [hideGUI](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#hideGUI). To get a GUI that is already being displayed use [getGUI](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#getGUI).

# Decorator properties

The [SceneStateProps](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html) decorator properties defines the elements this state will spawn in the scene. If you want to have a more granular control of what each state uses, instead declaring the actors, sprites, meshes and particles in the scene, you can declare them in the state. That's helpful to reuse the state between different scenes. Khanon.js is flexible and let you declare them in the place you consider better.

Use the [`actors`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#actors), [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#sprites), [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#meshes) and [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_state.SceneStateProps.html#particles) properties to declare the elements to spawn by this state.

# Switching state

Use [switchState](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#switchState) to switch to a new state. The previous state ends at this point, and the new state starts running.

# Setup of the state

In case you need to apply a setup to the state, it is possible through the generic `S` of [SceneStateInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html).

The setup object needs to be passed to [switchState](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchState) methods. If the setup is not defined in the *SceneStateInterface* generic `S`, an empty object will be passed to the switch methods:
```
@SceneState()
export class SceneStateGoStage extends SceneStateInterface { // Undefined setup generic
// ...
}

// ...

myScene.switchState(SceneStateGoStage, {})
```
```
@SceneState()
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

The [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onStart) calllback is invoked on state start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onEnd) calllback is invoked when the state ends.

## Loop Update

Every scene state implements the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

Scene states can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#notify) interface method  or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

# Timers

Set timeouts and intervals calling [setTimeout](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setTimeout) and [setInterval](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#setInterval), remove them calling [clearTimeout](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#clearTimeout), [clearInterval](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#clearInterval) and [clearAllTimeouts](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#clearAllTimeouts). Interface timers will be triggered at the correct frame and will be removed on instance delete.