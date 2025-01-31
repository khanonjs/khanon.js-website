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
  myParticleOnInitialize(particle: ParticleInterface) {
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

Declare the sprites to use by this particle in the [`sprites`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#sprites) property.

[`offset`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#offset) is the position offset from the origin of the element where the particle has been attached.

[`capacity`](https://khanonjs.com/api-docs/interfaces/decorators_particle.ParticleProps.html#capacity) is the maximum number of particles to be emitted.

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