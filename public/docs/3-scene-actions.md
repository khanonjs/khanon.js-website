# Scene action overview

[Scene actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are modifiers of the scene. They add effects and act on the scene to generate events and behaviours.

For example, an action could be rendering rain over the scene. When this action starts playing, it starts creating some dynamic textures representing rain that will be rendered until the action stops; another action could be modify the camera POV; or applying a post-processing map to make the scene pass from the day to the night. Any number of dinstinct actions can be playing at the same time, and they can be temporal or permanent.

Actions can be implemented in decorated classes or decorated methods.

When an action is implemented in a decorated class it can be used by any scene compatible with it; while if it has been implemented in a decorated method, it can be used only from the same class where it has been implemented.

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

Use the `S` generic to apply a type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the action by the [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction) call. In this way the caller can send parameters to the action.

To access the scene associated to an action use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

# Using the method decorator

If you don't need to use the action lifecycle and you just want to make use of the action frame by frame using [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onLoopUpdate), you can create the action in a method class. To do so, you just need to create a method, which will be equivalent to the *onLoopUpdate* callback, and decorate it with the [SceneAction decorator](https://khanonjs.com/api-docs/functions/decorators_scene_scene_action.SceneAction.html). [SceneActionProps](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html) are the same for decorated classes and methods.

Decorated methods can be defined within [Scenes](https://khanonjs.com/api-docs/modules/decorators_scene.html) and [SceneStates](https://khanonjs.com/api-docs/modules/decorators_scene_scene_state.html). They are used to reduce the amount of files and classes in the project in case they have a simple logic.

**my-scene.ts**
```
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  myAction: SceneActionInterface

  @SceneAction()
  someAction(delta: number) {
    // Equivalent to the action onLoopUpdate
  }


  onStart() {
    this.myAction = this.playAction(this.someAction, {})
  }

  onStop() {
    // This is just an example, the action will stop automatically on scene stop
    this.stopAction(this.myAction, {})
    this.myAction = undefined
  }
}
```

# Decorator properties

The decorator properties are the same for both class and method decorated actions. They are defined in the [SceneActionProps](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html) interface.

Scene actions can be grouped using the [`group`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#group) decorator property. In that way all actions that belong to a group can be started, stopped or removed all together.

The [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#preserve) property is used to make the action be preserved or not after stopping it. If preserve is *true*, the action is preserved after action stop. This means it keeps the instance and therefore its state and properties. It will continue with those values after action play. If preserve is *false*, the action instance is removed after action stop, and it will create a new instance on the next [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction).

Use [`overrides`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#overrides) property to override any other action that you want to stop when this action starts playing. For example, if you have an action that displays daylight effects at the scene, and another action that displays night effects at the scene, they both would override each other to avoid colliding themselves since they are not compatible. The override array can declare action classes or action methods names.

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

# Playing, stopping and removing actions

You can play and stop an action from within the same action instance using [play](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#play) and [stop](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#stop) methods.

To play an action from the scene instance use the [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction) or [playActionGroup](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playActionGroup) methods.

To stop an action from the scene instance use the [stopAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stopAction) or [stopActionGroup](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stopActionGroup) or [stopActionAll](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#stopActionAll) methods. If the decorator property [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#preserve) is *true*, the action insatnce will be preserved. If the decorator property [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#preserve) is *false*, the action is removed being stop methods equivalent to remove methods.

To remove an action from the scene instance use the [removeAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#removeAction) or [removeActionGroup](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#removeActionGroup) or [removeActionAll](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#removeActionAll) methods.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onStart) calllback is invoked on action start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onEnd) calllback is invoked on action stop.

The [onRemove](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onRemove) calllback is invoked when the action is removed.

## Loop Update

Scene actions can implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#onLoopUpdate) callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update any element.
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