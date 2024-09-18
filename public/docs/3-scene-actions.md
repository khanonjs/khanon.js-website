# Scene actions overview

[Scene actions](https://khanonjs.com/api-docs/modules/decorators_scene_scene_action.html) are modifiers of the scene. They add effects and act to the scene to generate certain events or behaviours.

For example, an action could be rendering rain over the scene. When this action starts playing, it gets the scene and applies some dynamic textures that will be rendered until the action stops; another action could be modify the camera POV; or applying a post-processing map to make the scene pass from the day to the night. Any number of dinstinct actions can be playing at the same time, and they can be temporal or permanent.

Actions can be implemented in decorated classes or decorated methods.

When an action is implemented in a decorated class it can be used by any scene compatible with it; while if it has been implemented in a decorated method, it can be used only from the same class where it has been implemented.

# Using the class decorator

To implement a scene action using class decorator you need to create a class, apply the [SceneAction decorator](https://khanonjs.com/api-docs/functions/decorators_scene_scene_action.SceneAction.html) and extend
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

Use the `S` generic to apply a type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setup) accessor. The data stored in the [`setup`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#setup) accessor is passed to the action by the [playAction](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#playAction) call. In this way the caller can send parameters to the action.

To access the scene associated to an action use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#scene) accessor. `C` generic type is applied to the [`scene`](https://khanonjs.com/api-docs/classes/decorators_scene_scene_action.SceneActionInterface.html#scene) accessor.

# Using the method decorator

# Decorator properties

The decorator properties are the same for both class and method decorated actions. They are defined in the [SceneActionProps](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html) interface.

Scene actions can be grouped using the [`group`](https://khanonjs.com/api-docs/interfaces/decorators_scene_scene_action.SceneActionProps.html#group) decorator property. That way all actions that belong to a group can be started, stopped or removed in a single step.

# Setup of the action

# Playing, stopping and removing actions