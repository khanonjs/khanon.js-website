# Scene handler

Use the [Scene](https://khanonjs.com/api-docs/modules/kjs.KJS.Scene.html) handler to [load](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.load.html), [unload](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.unload.html), [start](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.start.html) or [stop](https://khanonjs.com/api-docs/functions/kjs.KJS.Scene.stop.html) a scene.
```
import { KJS } from '@khanonjs/engine'

example() {
  KJS.Scene.load(MyScene)
  KJS.Scene.unload(MyScene)
  KJS.Scene.start(MyScene)
  KJS.Scene.stop(MyScene)
}
```
