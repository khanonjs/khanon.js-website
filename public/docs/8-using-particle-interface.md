# Using the class decorator

To implement a particle using class decorator you need to create a class, apply the [Particle decorator](https://khanonjs.com/api-docs/functions/decorators_particle.Particle.html), and extend
[ParticleInterface](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html) to gain access to its properties and methods.

**my-particle.ts**
```
import {
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

@Particle()
export class MyParticle extends ParticleInterface {
  @Sprite({
    url: './assets/my-particle-spritesheet.png',
    width: 34,
    height: 34,
    animations: [
      { id: 0, frameStart: 0, frameEnd: 4 }
    ]
  }) spriteParticle: SpriteConstructor

  onInitialize(particle: ParticleInterface) {
    // Initialize the particle here
    particle.setSprite(this.spriteParticle)
    particle.setAnimation(0)
    particle.babylon.particleSystem.minSize = 25
    particle.babylon.particleSystem.maxSize = 25
    particle.babylon.particleSystem.updateSpeed = 0.02
    particle.babylon.particleSystem.targetStopDuration = 0.1
  }

  onStart() {
    // Invoked on particle start
  }

  onStop() {
    // Invoked on particle stop
  }

  onRelease() {
    // Invoked on particle release (dispose)
  }
}
```

Particles are complex enough as to have a common configuration system. After the decorated class has been created, Khanon.js creates a [Babylon ParticleSystem](https://doc.babylonjs.com/typedoc/classes/BABYLON.ParticleSystem) that you can access from the [`babylon.particleSystem`](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#babylon) accessor. You'll need to configure the particle system in the [onInitialize](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onInitialize) mandatory callback.

You can use animated sprites on particles. Use the [setSprite](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setSprite) method to assign a sprite to the particle. All sprite animations are played in *loop*, so the [`loop`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#loop) property is ignored. The [`delay`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#delay) property is also ignored since it is the particle system who defines the animation speed.

In the case of particles, you won't play the sprite animation from the sprite instance, instead, you need to use the particle [setAnimation](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setAnimation) method. Particle animations have specific properties that need to be setup before starting the animation, thus the sprite instance animation won't work.

The rest of properties are directly configured in the [`babylon.particleSystem`](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#babylon) accessor. Check some properties [here](https://doc.babylonjs.com/features/featuresDeepDive/particles/particle_system/tuning_gradients).

# Using the method decorator

If you don't need to use the particle lifecycle and you don't need to reuse the particle from different classes, you can create a sprite from a decorated method within the class that is going to use it. This method is equivalent to the [onInitialize](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onInitialize) callback.

To access the scene associated to the particle use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#scene) accessor.

**my-actor.ts**
```
import * as BABYLON from '@babylonjs/core'
import {
  Actor,
  ActorInterface,
  Particle,
  ParticleInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  @Sprite({
    url: './assets/my-particle-spritesheet.png',
    width: 34,
    height: 34,
    animations: [
      { id: 0, frameStart: 0, frameEnd: 4 }
    ]
  }) spriteParticle: SpriteConstructor

  @Particle()
  myParticleOnInitialize(particle: ParticleInterface, setup: any) {
    // Initialize the particle here
    particle.setSprite(this.spriteParticle)
    particle.setAnimation(0)
    particle.babylon.particleSystem.minSize = 25
    particle.babylon.particleSystem.maxSize = 25
    particle.babylon.particleSystem.updateSpeed = 0.02
    particle.babylon.particleSystem.targetStopDuration = 0.1
  }

  onSpawn() {
    this.attachParticle(this.myParticleOnInitialize, 'my-particle', new BABYLON.Vector3(10, 10, 0))
  }

  onDestroy() {
    // This is just an example, actors will remove all their particles and elements on actor destroy
    this.removeParticle('my-particle')
  }
}
```

# Decorator properties

Particle decorator properties are defined in the [ParticleProps](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html) interface.

By default, particles are hidden by 2D sprites. Khanon.js uses transparent materials to represent 2D sprites. Transparent materials are rendered after particles for performance reasons, even when they are in front and they are opaque, so we need to explicity set the particle depth order (read more [here](https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering/)). To set the sprite depth order you have two options:
- Set [`renderOverScene`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#renderOverScene) to *true* to render the particle over all elements in the scene (use it in 2D scenes). Set it to *false* in 3D scenes.
- Set [`renderingGroupId`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#renderingGroupId) to a higher value than the sprite's *renderingGroupId* over which you want to render the particle (normally the background or all the elements in the scene). Read more [here](https://doc.babylonjs.com/features/featuresDeepDive/materials/advanced/transparent_rendering/#rendering-groups).

Declare the sprites to use by this particle in the [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#sprites) property.

[`position`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#position) is the position from the origin of the element where the particle has been attached to an actor node. World position in case the particle is spawned from a scene.

[`capacity`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#capacity) is the maximum number of particles to be emitted.

# Setup of the particle

In case you need to apply a setup to the particle, it is possible through the generic `S` of [ParticleInterface](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html).

The setup object needs to be passed to the [spawn.particle](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#particle) method. If the setup is not defined in the *ParticleInterface* generic `S`, an empty object will be passed to the *spawn.particle* method:
```
@Particle()
export class MyParticle extends ParticleInterface { // Undefined setup generic
// ...
}

// ...

myScene.spawn.particle(MyParticle, {})
```
```
@Particle()
export class MyParticle extends ParticleInterface<{ particleColor: BABYLON.Color4 }> { // Defined setup generic interface
// ...
}

// ...

myScene.spawn.particle(SceneStateGoStage, {
  particleColor: new BABYLON.Color4(1, 1, 1, 1)
})
```

The action setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setup) accessor.

In case the particle is defined by a method decorator, the setup object will be sent to the second argument.
```
@Particle()
  myParticleOnInitialize(particle: ParticleInterface, setup: any) {
    // The setup object is available in the second argument
  }
```

# Starting and stopping the particle

Use [start](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#start) method to start the particle.

Use [stop](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#stop) method to stop the particle. After stopping the particle, the emitter is not removed, it stays attached to its parent until the next start.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onStart) calllback is invoked on particle start.

The [onStop](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onStop) calllback is invoked on particle stop.

The [onRemove](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onRemove) calllback is invoked when the particle is removed.

## Loop Update

Scene actions implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update the particle.
```
onLoopUpdate(delta: number) {
  // Add particle logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

Particles can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#notify) interface method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

# Timers

Set timeouts and intervals calling [setTimeout](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setTimeout) and [setInterval](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setInterval), remove them calling [clearTimeout](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#clearTimeout), [clearInterval](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#clearInterval) and [clearAllTimeouts](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#clearAllTimeouts). Interface timers will be triggered at the correct frame and will be removed on instance delete.