# Scene handler

Use the [Sound](https://khanonjs.com/api-docs/modules/kjs.KJS.Sound.html) handler to [play](https://khanonjs.com/api-docs/functions/kjs.KJS.Sound.play.html) or [stop](https://khanonjs.com/api-docs/functions/kjs.KJS.Sound.stop.html).

Use [setVolume](https://khanonjs.com/api-docs/functions/kjs.KJS.Sound.setVolume.html) to set the global volkume.
```
import { KJS } from '@khanonjs/engine'

example() {
  KJS.Sound.play(MySound)
  KJS.Sound.stop(MySound)
  KJS.Sound.setVolume(0.5)
}
```
