# Using the class decorator

To implement a sprite using class decorator you need to create a class, apply the [Sprite decorator](https://khanonjs.com/api-docs/functions/decorators_sprite.Sprite.html), and extend
[SpriteInterface](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html) to gain access to its properties and methods.

**my-sprite.ts**
```
import {
  Sprite,
  SpriteInterface
} from '@khanonjs/engine'

@Sprite({
  url: './assets/image.png',
  width: 100,
  height: 100
})
export class MySprite extends SpriteInterface {
  onSpawn() {
    // Invoked on sprite spawn
  }

  onDestroy() {
    // Invoked on sprite destroy
  }
}
```

The [`url`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#url) decorator property is optional. In case it is defined, the sprite loads an image file from the path defined in it. In case *url* is not defined, a blank texture is assigned to the sprite.

You need to define the [`width`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#width) and [`height`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#height) in the decorator props. In case the sprite is animated, [`width`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#width) and [`height`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#height) are equivalent to the frame size; otherwise they represent the image size.

Sprites can be used by an actor [body](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#setBody) or [node](https://khanonjs.com/api-docs/classes/decorators_actor.ActorInterface.html#addNode), a scene map, the [scene](https://khanonjs.com/api-docs/classes/decorators_scene.SceneSpawn.html#sprite) itself or a [particle](https://khanonjs.com/api-docs/classes/decorators_particle.ParticleInterface.html#setSprite). Every time a sprite is assigned to one of these objects, a new instance of the sprite is spawned. Sprites can implement the lifecycle callbacks [onSpawn](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onSpawn) and [onDestroy](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onDestroy).  8a8f

Use the [`babylon`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#babylon) accessor to access the Babylon objects. It contains the [Babylon Mesh](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh) from which the sprite is built and where the sprite's image is rendered. You can also access the [Babylon Scene](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) associated to the sprite.

To get the scene where the sprite has been spawned use [`scene`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#scene) accessor. Note this is not the Babylon scene, instead it is the Khanon.js scene.

Other accessors are [`position`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#position), [`rotation`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#rotation), [`scale`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#scale), [`visibility`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#visibility), and other trasnform properties. These are shortcuts to [Babylon Mesh](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh) transform properties with some adaptations to a 2D element.

Use [`setEnabled`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#setEnabled) to enable or disable the sprite.

# Using the property decorator

If you don't need to use the sprite lifecycle and you don't need to reuse it from different classes, you can create a sprite from a decorated property within the class that is going to use it. A sprite defined in a class property is evaluated to a [SpriteConstructor](https://khanonjs.com/api-docs/types/decorators_sprite.SpriteConstructor.html) on app start. Property sprites can be created in scenes, scene actions, scene states, actors, actor actions, actor states, and particles.

**sprite-property.ts**
```
import {
  Scene,
  SceneInterface,
  Sprite,
  SpriteConstructor
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  @Sprite({
    width: 100,
    height: 100
  }) mySprite: SpriteConstructor

  onStart() {
    const sprite = this.spawn.sprite(this.mySprite)
    sprite.position.x = 50
    sprite.position.y = 100
  }
}
```

# Decorator properties

Sprite decorator properties are defined in the [SpriteProps](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html) interface.

Use [`url`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#url) to define the path to the image file to load for this sprite. If [`url`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#url) is not defined, a blank texture is created and a exclusive [Babylon Mesh](https://doc.babylonjs.com/typedoc/classes/BABYLON.Mesh) is assigned to the sprite.

[`width`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#width) and [`height`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#height) represent the image size in case it is not animated. In case the image is a spritesheet to generate animated sprites, width and height represent the frame size.

Use [`numFrames`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#numFrames) and [`animations`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#animations) to define animations. Defining and using animations is explained below.

To configure the [Babylon Texture](https://doc.babylonjs.com/typedoc/classes/BABYLON.Texture) generated for this sprite, use [`noMipmap`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#noMipmap), [`invertY`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#invertY), [`samplingMode`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#samplingMode), [`format`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#format). These are Babylon related properties.

If the property [`cached`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#cached) is *true*, the image is kept in memory and it is not removed on scene change. In this way, if two or more scenes are sharing the same sprite, Khanon.js won't remove it and the loading process will be faster. To remove all cached images use the [`KJS.clearCache`](https://khanonjs.com/api-docs/functions/kjs.KJS.clearCache.html) method.

# Animated sprites

If the image is a spritesheet to generate animated sprites, you need to indicate the number of frames in the [`numFrames`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#numFrames) decorator property. **At the moment the only supported format of spritesheets is equal size for every frame along the spritesheet, no matter how many columns and rows it has.**

Decorator properties [`width`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#width) and [`height`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#height) represent the frame size.

The animations are defined in the [`animations`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#animations) decorator property. It is an array of [SpriteAnimation](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html) objects. Each animation has a unique [`id`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#id), and optionals [`frameStart`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#frameStart), [`frameEnd`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#frameEnd), [`delay`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#delay) and [`loop`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#loop). Animations can be added manually as well using [addAnimation](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#addAnimation).

[`keyFrames`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#keyFrames) is used to generate events when the animation reach one or more frames. Subscribe to the key frame events trought the [subscribeToKeyframe](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#subscribeToKeyframe) method. Use [clearKeyframeSubscriptions](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#clearKeyframeSubscriptions) to clear all key frame subscriptions.

To play an animation call the [playAnimation](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#playAnimation) method indicating the [`id`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimation.html#id). You can define the [`options`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteAnimationOptions.html), and receive a callback for each animaton end in the [`completed`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#playAnimation) parameter.

Call [stopAnimation](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#stopAnimation) to stop the animation.

**animated-sprite.ts**
```
@Sprite({
  url: './assets/character-spritesheet.png',
  width: 50,
  height: 80,
  numFrames: 20,
  animations: [{
    id: 'actor-walk', frameStart: 0, frameEnd: 9, delay: 100, loop: true,
    keyFrames: [{
      id: 'floor-contact-walk',
      frames: [2, 4, 6, 8]
    }]
  }, {
    id: 'actor-run', frameStart: 10, frameEnd: 19, delay: 100, loop: true,
    keyFrames: [{
      id: 'floor-contact-run',
      frames: [13, 16]
    }]
  }]
})
export class MySprite extends SpriteInterface {
  onSpawn() {
    this.subscribeToKeyframe('floor-contact-walk', () => {
      // Play a low sound on walk floor contact
    })
    this.subscribeToKeyframe('floor-contact-run', () => {
      // Play a loud sound on run floor contact
    })
    this.playAnimation('actor-run', undefined, () => {
      // Play character breath sound on animation complete
    })
  }
}
```

To set a fixed frame use [setFrame](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#setFrame).

# Custom sprites, drawing texts and manipulating the texture

If you want to manipulate a sprite texture and draw directly in it, you might create a blank texture sprite leaving the [`url`](https://khanonjs.com/api-docs/interfaces/decorators_sprite.SpriteProps.html#url) decorator prop undefined.

That means the sprite generates a new texture per sprite spawn, allowing you to draw in each one of them without interferences.

Draw texts using the [drawText](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#drawText) method.

**blank-sprite.ts**
```
@Sprite({
  width: 100,
  height: 100
})
export class MySprite extends SpriteInterface {
  onSpawn() {
    this.drawText('Hello Khanon.js!', {
      fontName: 'my-css-font-name',
      fontSize: 20,
      textColor: '#ffffff'
    })
  }
}
```

# Callbacks

The [onSpawn](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onSpawn) calllback is invoked on sprite spawn.

The [onDestroy](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onDestroy) calllback is invoked on sprite destroy.

## Loop Update

Sprites implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update anything in the sprite.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_sprite.SpriteInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```