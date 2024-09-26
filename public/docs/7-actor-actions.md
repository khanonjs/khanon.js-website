# Actor action overview

[Actor actions](https://khanonjs.com/api-docs/modules/decorators_actor_actor_action.html) are modifiers of the actor. They add effects, act on the actor, and modify properties to execute events. Scene and actor actions are used in similar ways.

Actions can be visual or logical events, and they can be temporary or permanent. Some examples of visual actions are be showing a glow around the actor, starting a particle system over the actor temporarily, or modifying the actor scale. Logical actions could be moving the actor left, making it jump, executing a specific movement, etc.

Like in scene actions, actor actions can be implemented in decorated classes or decorated methods.

When an action is implemented in a decorated class it can be used by any actor compatible with it; while if it has been implemented in a decorated method, it can be used only from the class where it has been implemented.

# Using the class decorator

To implement an actor action using class decorator you need to create a class, apply the [ActorAction decorator](https://khanonjs.com/api-docs/functions/decorators_actor_actor_action.ActorAction.html), and extend
[ActorActionInterface](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html).

**actor-action.ts**
```
import {
  ActorAction,
  ActorActionInterface
} from '@khanonjs/engine'

@ActorAction()
export class MyActorAction extends ActorActionInterface</* Setup object */ S = any, /* Scene object */ C = SceneInterface, /* Actor object */ A = ActorInterface<SpriteInterface | MeshInterface>> {
  onStart() {
    // Invoked on action start
    // this.setup has optional S type
    // this.scene has optional C type
    // this.actor has optional A type
  }

  onStop() {
    // Invoked on action stop
  }
}

```

Class decorators add full functionalities to the action, having the capability to define callbacks and get access to self properties and methods.

Use the `S` generic to set the type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the action by the [playAction](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#playAction) call. In this way the caller can send parameters to the action.

To access the scene associated to the action use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

The actor associated to the action is accessible from the [`actor`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#actor) accessor. `A` generic type is applied to the *actor* accessor.

# Using the method decorator

If you don't need to use the action lifecycle and you just want to make use of the action frame by frame using [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onLoopUpdate), you can create the action in a method class. To do so, you just need to create a method, which will be equivalent to the *onLoopUpdate* callback, and decorate it with the [ActorAction decorator](https://khanonjs.com/api-docs/functions/decorators_actor_actor_action.ActorAction.html). [ActorActionProps](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html) are the same for decorated classes and methods.

Decorated methods can be defined within [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html) and [ActorStates](https://khanonjs.com/api-docs/modules/decorators_actor_actor_state.html). They are used to reduce the amount of project files in case they have a simple logic.

**my-actor.ts**
```
import {
  Actor,
  ActorAction,
  ActorActionInterface,
  ActorInterface,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  myAction: ActorActionInterface

  @ActorAction()
  myActorActionLoop(delta: number) {
    // Equivalent to the action onLoopUpdate
  }

  onStart() {
    this.myAction = this.playAction(this.myActorActionLoop, {})
  }

  onStop() {
    // This is just an example, the action will stop automatically on scene stop
    this.stopAction(this.myActorActionLoop)
    this.myAction = undefined
  }
}
```

# Decorator properties

The decorator properties are the same for both class and method decorated actions. They are defined in the [ActorActionProps](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html) interface.

Actor actions can be grouped using the [`group`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#group) decorator property. In that way all actions that belong to a group can be started, stopped or removed all together.

The [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#preserve) property is used to make the action be preserved or not after stopping it. If preserve is *true*, the action is preserved after action stop. This means the scene keeps the instance and therefore its properties and values. It will continue with the same instance and properties on next [playAction](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#playAction). If preserve is *false*, the action instance is removed after action stop, and a new instance will be created on next *playAction*.

Use [`overrides`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#overrides) property to override any other action that you want to stop when this action starts playing. For example, if you have an action that displays daylight effects at the actor, and another action that displays night effects at the actor, they both would override each other to avoid colliding themselves since they are not compatible. The override array can declare action classes or action method names.

[`countFrames`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#countFrames) is the number of frames this action will be executed. After those frames, the action stops.

[`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#sprites), [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#meshes) and [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#particles) are the elements of that kind will that be used within this action.

# Setup of the action

In case you need to apply a setup to the action, it is possible through the generic `S` of [ActorActionInterface](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html).

The setup object needs to be passed to the [playAction](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#playAction) method. If the setup is not defined in the *ActorActionInterface* generic `S`, an empty object will be passed to the *playAction* method:
```
@ActorAction()
export class MyAction extends ActorActionInterface { // Undefined setup generic
// ...
}

// ...

myActor.playAction(MyAction, {})
```
```
@ActorAction()
export class MyAction extends ActorActionInterface<jumpPower: number> { // Defined setup generic interface
// ...
}

// ...

myActor.playAction(MyAction, {
  jumpPower: 5
})
```

The action setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#setup) accessor.

# Playing, stopping, and removing actions

You can play and stop an action within the action instance using [play](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#play) and [stop](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#stop) methods.

To play an action from the actor instance use the [playAction](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#playAction) or [playActionGroup](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#playActionGroup) methods.

To stop an action from the actor instance use the [stopAction](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#stopAction) or [stopActionGroup](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#stopActionGroup) or [stopActionAll](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#stopActionAll) methods. If the decorator property [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#preserve) is *true*, the action insatnce will be preserved. If [`preserve`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_action.ActorActionProps.html#preserve) is *false*, the action is removed being stop methods equivalent to remove methods.

To remove an action from the actor instance use the [removeAction](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#removeAction) or [removeActionGroup](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#removeActionGroup) or [removeActionAll](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#removeActionAll) methods.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onStart) calllback is invoked on action start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onEnd) calllback is invoked on action stop.

The [onRemove](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onRemove) calllback is invoked when the action is removed.

## Loop Update

Actor actions implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_actor_actor_action.ActorActionInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```