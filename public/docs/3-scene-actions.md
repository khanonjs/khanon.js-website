# Scene action overview

[Scene actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are modifiers of the scene. They add effects and act on the scene to generate visual events and modifications.

For example, an action could be rendering rain over the scene. When this action starts playing, it starts creating some dynamic textures representing rain that will be rendered until the action stops; another action could be modify the camera POV; or applying a post-processing map to make the scene pass from the day to the night. Any number of dinstinct actions can be playing at the same time, and they can be temporal or permanent.

Scene actions are implemented in decorated classes.

When an action is implemented in a decorated class it can be used by any scene compatible with its requirements from the setup object.

# Using the class decorator

To implement a scene action using class decorator you need to create a class, apply the [SceneAction decorator](https://khanonjs.com/api-docs/functions/decorators_scene_scene_action.SceneAction.html), and extend
[SceneActionInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html).

**scene-action.ts**
```
import {
  SceneAction,
  SceneActionInterface
} from '@khanonjs/engine'

@SceneAction()
export class MySceneAction extends SceneActionInterface</* Setup object */ S = any, /* Scene interface */ C = SceneInterface> {
  onStart() {
    // Invoked on action start
    // this.setup has optional S type
    // this.scene has optional C type
  }

  onStop() {
    // Invoked on action stop
  }
}
```

Class decorators add full functionalities to the action, having the capability to define callbacks and get access to self properties and methods.

Use the `S` generic to set the type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the action by the [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction) call. In this way the caller can send parameters to the action.

To access the scene associated to an action use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

# Decorator properties

They are defined in the [SceneActionProps](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html) interface.

Scene actions can be grouped using the [`group`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#group) decorator property. In that way all actions that belong to a group can be started, stopped or removed all together.

The [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#preserve) property is used to make the action be preserved or not after stopping it. If preserve is *true*, the action is preserved after action stop. This means the scene keeps the instance and therefore its properties and values. It will continue with the same instance and properties on next [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction). If preserve is *false*, the action instance is removed after action stop, and a new instance will be created on next *playAction*.

Use [`overrides`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#overrides) property to override any other action that you want to stop when this action starts playing. For example, if you have an action that displays daylight effects in the scene, and another action that displays night effects in it, these two actions would override each other. To avoid colliding they both can override each other.

[`countFrames`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#countFrames) is the number of frames this action will be executed. After those frames, the action stops.

[`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#sprites), [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#meshes) and [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#particles) are the elements of that kind will that be used within this action.

# Setup of the action

In case you need to apply a setup to the action, it is possible through the generic `S` of [SceneActionInterface](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html).

The setup object needs to be passed to the [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction) method. If the setup is not defined in the *SceneActionInterface* generic `S`, an empty object will be passed to the *playAction* method:
```
@SceneAction()
export class MyAction extends SceneActionInterface { // Undefined setup generic
// ...
}

// ...

myScene.playAction(MyAction, {})
```
```
@SceneAction()
export class MyAction extends SceneActionInterface<earthquakeIntensity: number> { // Defined setup generic interface
// ...
}

// ...

myScene.playAction(MyAction, {
  earthquakeIntensity: 1
})
```

The action setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setup) accessor.

# Playing, stopping, and removing actions

You can play and stop an action within the action instance using [play](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#play) and [stop](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#stop) methods.

To play an action from the scene instance use the [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction) or [playActionGroup](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playActionGroup) methods.

To stop an action from the scene instance use the [stopAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stopAction) or [stopActionGroup](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stopActionGroup) or [stopActionAll](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stopActionAll) methods. If the decorator property [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#preserve) is *true*, the action insatnce will be preserved. If [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#preserve) is *false*, the action is removed being stop methods equivalent to remove methods.

To remove an action from the scene instance use the [removeAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#removeAction) or [removeActionGroup](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#removeActionGroup) or [removeActionAll](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#removeActionAll) methods.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onStart) calllback is invoked on action start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onEnd) calllback is invoked on action stop.

The [onRemove](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onRemove) calllback is invoked when the action is removed.

## Loop Update

Scene actions implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Timers

Set timeouts and intervals calling [setTimeout](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setTimeout) and [setInterval](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setInterval), remove them calling [clearTimeout](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#clearTimeout), [clearInterval](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#clearInterval) and [clearAllTimeouts](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#clearAllTimeouts). Interface timers will be triggered at the correct frame and will be removed on instance delete.