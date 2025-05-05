# Spawning particles

[Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) can be spawned from [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html) and from [Scenes](https://khanonjs.com/api-docs/modules/decorators_scene.html).

To spawn a particle from an actor, firstly you need to attach the particle emitter to the actor [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) or node. Everytrime the a particle is emitted, it will be done from the actor position where the emitter was attached.

You can also spawn particles from the scene itself, positioning the emitter at the scene position you decide.

# Using particles in actors

To attach a particle to the actor body use the [attachParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#attachParticle) method. You can define a *nodeName* in the third argument in case you want to attach the particle to a node instead.

To start the particle use the [startParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#startParticle) method, and to stop it use [stopParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#stopParticle).

To remove the particle from the actor use [removeParticle](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#removeParticle).

**my-actor.ts**
```
onLoopUpdate(delta: number) {
  // Some event happened that drove the actor to start the particle
  this.startParticle('my-particle')

  // Some other event happened that made the particle stop
  this.stopParticle('my-particle')

  // The actor doesn't need to use the particle anymore
  this.removeParticle('my-particle')
}
```

# Using particles in scenes

To create a particle in the scene use the [Scene spawn](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#spawn) or the [SceneState spawn](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#spawn) objects calling the [spawn.particle](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#particle) method.

To remove the particle from scene use the [Scene remove](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#remove) or the [SceneState remove](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#remove) objects calling the [remove.particle](https://khanonjs.com/api-docs/classes/decorators_scene.SceneRemove.html#particle) method. Use [remove.particleAll](https://khanonjs.com/api-docs/classes/decorators_scene.SceneRemove.html#particleAll) to remove all particles from the scene.