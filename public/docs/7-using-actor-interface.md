# Creating an Actor

To create a new actor you need to create a class, apply the [Actor decorator](https://khanonjs.com/api-docs/functions/decorators_actor.Actor.html), and extend [ActorInterface](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html) to gain access to its properties and methods. You need to set he `B` generic to the type of composition. [SpriteInterface](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html) for a 2D actor or [MeshInterface](https://khanonjs.com/api-docs/classes/decorators_mesh.MeshInterface.html) for a 3D actor.

**my-actor.ts**
```
import {
  Actor,
  ActorInterface,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  onSpawn() {
    // Invoked on actor spawn
  }

  onDestroy() {
    // Invoked on actor destroy
  }
}
```

Use [`scene`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#scene) accessor to get the scene that spawned the actor.

To destroy the actor from its instance, use the [destroy](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#destroy) method.

Set or get the enabled state of the actor using the accesor [`enabled`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#enabled). If the actor is disabled, it is not rendered, and its [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onLoopUpdate) and notifications are stopped.

# Decorator properties

The actor decorator properties are defined in the [ActorProps](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html) interface.

States and actions to be used by this actor are defined in [`states`](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#states) and [`actions`](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#actions) properties.

[Sprites](https://khanonjs.com/api-docs/modules/decorators_sprite.html), [Meshes](https://khanonjs.com/api-docs/modules/decorators_mesh.html), and [Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) to be used by this actor are defined in [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#sprites), [`meshes`](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#meshes), and [`particles`](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#particles) properties.

Actors can display as well [GUIs](https://khanonjs.com/api-docs/modules/decorators_gui.html) related to them. The GUIs this actor can display are defined in the [`guis`](https://khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#guis) property.

In case a scene is loaded from a [`.babylon`](https://doc.babylonjs.com/setup/support/.babylonFileFormat) file using the scene decorator prop [`url`](https://www.khanonjs.com/api-docs/interfaces/decorators_scene.SceneProps.html#url), scene meshes can be replaced by actors using the [`spawnByReferenceId`](https://www.khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#spawnByReferenceId) property. If [`spawnByReferenceId`](https://www.khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#spawnByReferenceId) is defined, the actor is spawned replacing every mesh in the [`.babylon`](https://doc.babylonjs.com/setup/support/.babylonFileFormat) scene whose Id starts by this reference Id (E.g. 'RefId', 'RefId.001', 'RefId.002', etc).

Use [`renderingGroupId`](https://www.khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#renderingGroupId) for the actor's body [`Babylon renderingGroupId`](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh#renderinggroupid).

Use [`enabled`](https://www.khanonjs.com/api-docs/interfaces/decorators_actor.ActorProps.html#enabled) property for the initial [`enabled`](https://www.khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#enabled) state of the actor.

# Composing the actor

The actor composition refers to how the actor appearance is built. The main piece of an actor is the [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body), to where the rest of nodes will be attached. Each body and node is an individual sprite or mesh, depending on the actor type.

You can set the body after the actor is spawned. You can do it in the [onSpawn](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onSpawn) actor callback, or from the scene state itself, where you spawn the actors. Use [setBody](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) method to assign the body sprite or mesh. You can switch of body anytime you want to change it. Use the [`body`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) accessor to get the current body.

Once the body has been assigned, you can attach nodes to it using [addNode](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode) method. Use [getNode](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#getNode) to get a node by name.

Note that an actor doesn't have an individual animation. Each body and node is a different element with different animations.

**my-actor.ts**
```
@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  @Sprite({
    url: './assets/actor-body.png',
    width: 80,
    height: 80
  }) myBody: SpriteConstructor

  @Sprite({
    url: './assets/actor-legs.png',
    width: 80,
    height: 20
  }) legs: SpriteConstructor

  @Sprite({
    url: './assets/actor-hat.png',
    width: 60,
    height: 20
  }) hat: SpriteConstructor

  onSpawn() {
    const spriteBody = this.setBody(this.myBody)
    const spriteLegs = this.addNode(this.legs, 'legs', transformMatrix)
    const spriteHat = this.addNode(this.hat, 'hat', transformMatrix)
  }
}
```

# Transform properties

*Transform* refers to the transformation matrix of the actor (position, rotation, and scale), although it covers more than that.

The actor's transform properties are equivalent to the body transform properties. Depending if the body is a sprite or a mesh the transform properties will be different.

To access the transform properties use the [`transform`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#transform) accessor or the alias [`t`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#t).

Find the [Sprite](https://khanonjs.com/api-docs/modules/decorators_sprite.html) transform properties in the [SpriteTransform](https://khanonjs.com/api-docs/interfaces/types.SpriteTransform.html) interface.

Find the [Mesh](https://khanonjs.com/api-docs/modules/decorators_mesh.html) transform properties in the [MeshTransform](https://khanonjs.com/api-docs/interfaces/types.MeshTransform.html) interface.

```
onSpawn() {
  const spriteBody = this.setBody(this.myBody)

  // These three methods are equivalent
  this.transform.position = new BABYLON.Vector3(10, 40, 20)
  this.t.position = new BABYLON.Vector3(10, 40, 20)
  spriteBody.position = new BABYLON.Vector3(10, 40, 20)
}
```

# Animating actors

*WORK IN PROGRESS...*

# Attaching particles

It is possible to create [Particle](https://khanonjs.com/api-docs/modules/decorators_particle.html) emitters and attach them to the actor's [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) or nodes.

To attach a particle to the actor's body or node use [attachParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#attachParticle). If the *nodeName* property is not defined, the particle is attached to the body; otherwise it is attached to the corresponding node name. The attached particle is identified by the *id* property.

To start a particle use [startParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#startParticle) indicating the attached particle *id*.

Use [stopParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#stopParticle) to stop the particle emitter, and [removeParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#removeParticle) to remove it from the actor.

Use [clearParticles](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#clearParticles) to remove all the particles attached to this actor.

```
onSpawn() {
  this.attachParticle(FloorParticle, 'floor-particle', new BABYLON.Vector3(0, 20, 0))
}

onLooppUpdate() {
  // Actor hits the floor
  this.startParticle('floor-particle')
}
```

# Callbacks

The [onSpawn](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onSpawn) calllback is invoked on actor spawn.

The [onDestroy](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onDestroy) calllback is invoked on actor destroy.

## Loop Update

Actors implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add the actor's logic to this method.
```
onLoopUpdate(delta: number) {
  // Move or transform the actor, add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Update actor
}
```

# Notifications

Actors can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#notify) interface method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

