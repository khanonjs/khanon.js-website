# Actor state overview

[Actor states](https://khanonjs.com/api-docs/modules/decorators_actor_actor_state.html) are logical controllers of the actor. Initially an actor starts without any state, and it is your decision if the logic of that actor is complex enough as to use states with it. Each state applies a different behaviour to the actor. States run the same logical methods than actors, but you can switch of behaviour depending on the requirements the game has at that time. Scene and actor states are used in similar ways.

This is best understood with an example. Imagine you have a stage where the actor comes into the scene, waits to the stage countdown, and gives the actor control to the player. The first state would be *ActorStateEnterStage*, where the acotr is firstly placed outside the screen, then automatically moved to the center of the screen. Once the actor has reached the waiting point, the actor state notifies to the scene that the actor is ready to start. Then the scene displays the stage start screen, and after a 3 seconds countdown, the stage starts. At this point the scene notifies to the actor the player can take the control, the actor state switchs to *ActorStatePlayerControl*, and the player starts controlling the actor thanks to input events received in the *ActorStatePlayerControl* notification methods.

As you see in that example, *ActorStateEnterStage* takes full control of the actor, moves it, and send a notification to the scene when the actor is ready to start. The second state *ActorStatePlayerControl* receives input event notifications and moves the actor across the stage. Depending on other events such actor damage, collisions, etc, the scene state decides how the stage continues.

You can create as many states as needed and reuse them between different actors.

The lifecycle callbacks for actor states are [onStart](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onStart) and [onEnd](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onEnd). Use them in case you need to apply some kind of configuration to the actor.

Access the state of an actor from the [`state`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#state) accessor.

# Using the actor state interface

To create an actor state you need to create a class, apply the [ActorState decorator](https://khanonjs.com/api-docs/functions/decorators_actor_actor_state.ActorState.html), and extend [ActorStateInterface](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html).

**actor-state.ts**
```
import {
  ActorState,
  ActorStateInterface
} from '@khanonjs/engine'

@ActorState()
export class ActorStatePlayerControl extends ActorStateInterface<</* Setup object */ S = any, /* Scene type */ C = SceneInterface, /* Actor type */ A = ActorInterface<SpriteInterface | MeshInterface>> {
  onStart() {
    // Configure the initial actor properties here
    // this.setup has optional S type
    // this.scene has optional C type
    // this.actor has optional A type
  }

  onEnd() {
    // Apply final changes to the actor
  }
}
```

[ActorStateInterface](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html) applies three optional generic interfaces.

Use the `S` generic to set the type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the state by the [switchState](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#switchState) call. In this way the caller can send parameters to the state.

To access the scene associated to the state use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

The actor associated to the state is accessible from the [`actor`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#actor) accessor. `A` generic type is applied to the *actor* accessor.

# Decorator properties

The decorator properties are defined in [ActorStateProps](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_state.ActorStateProps.html) interface.

Use the [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_state.ActorStateProps.html#sprites), [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_state.ActorStateProps.html#meshes) and [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_actor_actor_state.ActorStateProps.html#particles) properties to declare the elements to be used by this state.

# Switching of state

Use the actor [switchState](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#switchState) method to switch to a new state. The previous state ends at this point, and the new state starts running.

# Setup of the state

In case you need to apply a setup to the state, it is possible through the generic `S` of [ActorStateInterface](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html).

The setup object needs to be passed to the [switchState](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#switchState) method. If the setup is not defined in the *ActorStateInterface* generic `S`, an empty object will be passed to the switch method:
```
@ActorState()
export class ActorStateGoStage extends ActorStateInterface { // Undefined setup generic
// ...
}

// ...

myActor.switchState(ActorStateGoStage, {})
```
```
@ActorState()
export class ActorStateGoStage extends ActorStateInterface<damage: number, prevStage: string> { // Defined setup generic interface
// ...
}

// ...

myActor.switchState(ActorStateGoStage, {
  damage: 0.3,
  prevStage: 'caves'
})
```

The state setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#setup) accessor.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onStart) calllback is invoked on state start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onEnd) calllback is invoked when the state ends.

## Loop Update

Every actor state implements the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update the actor and check events.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

Actor states can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#notify) interface method  or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

# Timers

Set timeouts and intervals calling [setTimeout](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#setTimeout) and [setInterval](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#setInterval), remove them calling [clearTimeout](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#clearTimeout), [clearInterval](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#clearInterval) and [clearAllTimeouts](https://khanonjs.com/api-docs/classes/decorators_actor_actor_state.ActorStateInterface.html#clearAllTimeouts). Interface timers will be triggered at the correct frame and will be removed on instance delete.