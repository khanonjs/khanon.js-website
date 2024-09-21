# Spawning sprites

Sprites are spawned using the [SpriteContrustor](https://khanonjs.com/api-docs/types/decorators_sprite.SpriteConstructor.html) regardless they have been created by a decorated class or property. When the sprite is spawned Khanon.js creates a new instance of the sprite and store it in a container from where it will be managed. Once a sprite is spawned Khanon.js will return its instance giving you the possibility to manage and manipulate it as well.

Sprites can be spawned by three different elements: [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html), [Particles](https://khanonjs.com/api-docs/modules/decorators_particle.html) and [Scenes](https://khanonjs.com/api-docs/modules/decorators_scene.html).

In the case of [Actors](https://khanonjs.com/api-docs/modules/decorators_actor.html), sprites can be used to compose their [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#body) or [nodes](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#getNode). If you want to use a sprite in an actor, use the [setBody](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) or the [addNode](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode) methods. They assign a sprite to the actor part and return the spawned [SpriteInsatnce](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html). Note in both cases of decorated class and property, the [SpriteContrustor](https://khanonjs.com/api-docs/types/decorators_sprite.SpriteConstructor.html) is used in the same way.

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

@Actor()
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

# Destroying sprites