# Spawning sprites

Sprites are spawned using the [SpriteContrustor](https://khanonjs.com/api-docs/types/decorators_sprite.SpriteConstructor.html) regardless they have been created by a decorated class or property. When the sprite is spawned, a new instance is created and stored in a container from where it will be managed. Once a sprite is spawned Khanon.js will return its instance giving you the possibility to manage and manipulate it as well.

Sprites can be spawned by three different elements: [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html), [Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) and [Scenes](https://khanonjs.com/api-docs/modules/decorators_scene.html).

# Using sprites in actors

In the case of [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html), sprites can be used to compose their [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) or [nodes](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#getNode). If you want to use a sprite in an actor, use the [setBody](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) or the [addNode](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode) methods. They assign a sprite to the actor component and return the spawned [SpriteInsatnce](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html). Note in both cases of decorated class and property, the [SpriteContrustor](https://khanonjs.com/api-docs/types/decorators_sprite.SpriteConstructor.html) is used in the same way. That's all, the actor will remove the sprites once they are no longer used.

**my-actor.ts**
```
import {
  Actor,
  ActorInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/body.png',
  width: 50,
  height: 100
})
export class SpriteBody extends SpriteInterface {
  // ...
}

@Actor({
  sprites: [SpriteBody] // The sprites used by this actor are defined in the decorator prop 'sprites'
})
export class MyActor extends ActorInterface<SpriteInterface> {
  @Sprite({
    url: './assets/head.png',
    width: 30,
    height: 30
  }) SpriteHead: SpriteConstructor

  @Sprite({
    url: './assets/legs.png',
    width: 50,
    height: 50
  }) SpriteLegs: SpriteConstructor

  onSpawn() {
    const spriteBody = this.setBody(SpriteBody)
    const spriteHead = this.addNode(this.SpriteHead, 'head')
    const spriteLegs = this.addNode(this.SpriteLegs, 'legs')
  }
}
```

# Using sprites in particles

[Particle](https://khanonjs.com/api-docs/modules/decorators_particle.html) sprites are assigned by the [setSprite](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setSprite) method. Like actors, the sprite will be automatically removed once it is no longer used by the particle.

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
    url: './assets/flame.png',
    width: 30,
    height: 30
  }) SpriteFlame: SpriteConstructor

  onInitialize(particle: ParticleInterface) {
    // Initialize the particle here
  }

  onStart() {
    const spriteFlame = this.setSprite(this.SpriteFlame)
  }
}
```

# Using sprites in scenes

Finally, you can arbitrarily generate sprites in the scene and manipulate them yourself. To spawn a new sprite use the [scene.spawn.sprite](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#sprite) method. This method returns the instance [SpriteInterface](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html), which you can store in a variable and start working with it.

You can also spawn *n* number of sprites using the [scene.spawn.sprite](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#sprite) *counter* property. Combine it with *alternativeOnSpawn* to configure each new sprite instance.

These sprites are removed by the scene on scene unload, but you can remove them in case you need it using [scene.remove.sprite](https://khanonjs.com/api-docs/classes/decorators_scene.SceneRemove.html#sprite) or sprite [destroy](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#destroy) methods.

[Spawn](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#spawn) and [remove](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#remove) objects are also available in scene states.

**my-scene.ts**
```
import {
  Scene,
  SceneInterface,
  Sprite,
  SpriteConstructor,
  SpriteInterface
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  birdSprite: SpriteInterface

  @Sprite({
    url: './assets/bird-spritesheet.png',
    width: 30,
    height: 30,
    numFrames: 10,
    animations: [{
      id: 'flying'
    }]
  }) SpriteBird: SpriteConstructor

  onStart() {
    this.birdSprite = this.spawn.sprite(this.SpriteBird)

    // Place the bird somewhere and play the flying animation
    this.birdSprite.position.x = 100
    this.birdSprite.position.y = 200
    this.birdSprite.playAnimation('flying')
  }

  onLoopUpdate(delta: number) {
    // Move the bird
    this.birdSprite.position.x += 1 * delta
  }
}
```