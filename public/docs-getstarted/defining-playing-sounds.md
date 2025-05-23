# Defining and playing sounds

To define a sound you just need to decorate a class property with the [Sound](https://khanonjs.com/api-docs/functions/decorators_sound.Sound.html) decorator.

This can be done only in scene and actor classes, and their respective actions and states.

To play a sound, you just need to use the [KJS.Sound.play](https://khanonjs.com/api-docs/functions/kjs.KJS.Sound.play.html) method. Use [KJS.Sound.stop](https://khanonjs.com/api-docs/functions/kjs.KJS.Sound.stop.html) to stop it.

**my-actor.ts**
```
import * as BABYLON from '@babylonjs/core'

import {
  Actor,
  ActorInterface,
  KJS,
  SpriteInterface,
  SoundConstructor
} from '@khanonjs/engine'

@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  @Sound({
    url: './assets/sound-start.ogg',
    spatialEnabled: true
  }) soundSpawn: SoundConstructor


  onSpawn() {
    KJS.Sound.play(this.soundSpawn)
  }
}
```

**my-scene.ts**
```
import {
  Scene,
  SceneInterface
} from '@khanonjs/engine'

@Scene()
export class MyScene extends SceneInterface {
  @Sound({
    url: './assets/background-music.mp3',
    stream: true
  }) backgroundMusic: SoundConstructor

  onStart() {
    KJS.Sound.play(this.backgroundMusic)
  }

  onStop() {
    KJS.Sound.stop(this.backgroundMusic)
  }
}
```

# Decorator properties

The sound file is declared in [`url`](https://khanonjs.com/api-docs/interfaces/decorators_sound.SoundProps.html#url) property. Use an array in case you want to specify various formats. Read more [here](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic#using-browser-specific-audio-codecs).

Enable the spatial audio using [`spatialEnabled`](https://khanonjs.com/api-docs/interfaces/decorators_sound.SoundProps.html#spatialEnabled). Read more [here](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic#spatial-audio). The spatial attachment type can be defined in [`attachmentType`](https://khanonjs.com/api-docs/interfaces/decorators_sound.SoundProps.html#attachmentType) property. Set [`useBoundingBox`](https://khanonjs.com/api-docs/interfaces/decorators_sound.SoundProps.html#useBoundingBox) to *true* to use the actor's mesh bounding box.

To stream the sound preventing to load it in memory set [`stream`](https://khanonjs.com/api-docs/interfaces/decorators_sound.SoundProps.html#stream) to *true*.

