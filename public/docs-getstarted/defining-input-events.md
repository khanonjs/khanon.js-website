# Defining input events

Input events can be defined in actors, scenes and cameras (and their states). To define an input event, a method has to be decorated with the [InputEvent](https://khanonjs.com/api-docs/functions/decorators_input_event.InputEvent.html) decorator.

The decorated method will receive an `event` property with the event information. In the case of *keyboard* input events, the received event is [KeyboardEvent](https://developer.mozilla.org/es/docs/Web/API/KeyboardEvent), in the case of *mouse* and *tap* events the method receives a Babylon [IPointerEvent](https://doc.babylonjs.com/typedoc/interfaces/BABYLON.IPointerEvent) object.

**my-actor.ts**
```
import * as BABYLON from '@babylonjs/core'

import {
  Actor,
  ActorInterface,
  InputEventIds,
  SpriteInterface,
} from '@khanonjs/engine'

@Actor()
export class MyActor extends ActorInterface<SpriteInterface> {
  @InputEvent({ id: InputEventIds.TAP_DOWN })
  onTapScreen(event: BABYLON.IPointerEvent) {
    // Do something on tap screen
    // Get coordinates from the event object:
    //  - event.clientX
    //  - event.clientY
  }

  @InputEvent({ id: InputEventIds.KEY_UP })
  onKeyUp(event: KeyboardEvent) {
    // Do something on key up`
    // The key is:
    //  - event.key
  }


  onSpawn() {
    // Invoked on actor spawn
  }

  onDestroy() {
    // Invoked on actor destroy
  }
}
```