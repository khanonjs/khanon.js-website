# Camera state overview

[Camera states](https://khanonjs.com/api-docs/modules/decorators_camera_camera_state.html) are logical controllers of the camera. Initially an camera starts without any state, and it is your decision if the logic of that camera is complex enough as to use states with it. Each state applies a different behaviour to the camera. States run the same logical methods than cameras, but you can switch of behaviour depending on the requirements the game has at that time. Scene and camera states are used in similar ways.

The lifecycle callbacks for camera states are [onStart](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onStart) and [onEnd](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onEnd). Use them in case you need to apply some kind of configuration to the camera.

Access the state of an camera from the [`state`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#state) accessor.

# Using the camera state interface

To create an camera state you need to create a class, apply the [CameraState decorator](https://khanonjs.com/api-docs/functions/decorators_camera_camera_state.CameraState.html), and extend [CameraStateInterface](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html).

**camera-state.ts**
```
import {
  CameraState,
  CameraStateInterface
} from '@khanonjs/engine'

@CameraState()
export class MyCameraState extends CameraStateInterface</* Setup object */ S = any, /* Camera type */ D = CameraInterface, /* Scene type */ C = SceneInterface> {
  onStart() {
    // Configure the initial camera properties here
    // this.setup has optional S type
    // this.camera has optional A type
    // this.scene has optional C type
  }

  onEnd() {
    // Apply final changes to the camera
  }
}
```

[CameraStateInterface](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html) applies three optional generic interfaces.

Use the `S` generic to set the type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the state by the [switchState](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#switchState) call. In this way the caller can send parameters to the state.

To access the scene associated to the state use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

The camera associated to the state is accessible from the [`camera`](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#camera) accessor. `D` generic type is applied to the *camera* accessor.

# Switching of state

Use the camera [switchState](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#switchState) method to switch to a new state. The previous state ends at this point, and the new state starts running.

# Setup of the state

In case you need to apply a setup to the state, it is possible through the generic `S` of [CameraStateInterface](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html).

The setup object needs to be passed to the [switchState](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#switchState) method. If the setup is not defined in the *CameraStateInterface* generic `S`, an empty object will be passed to the switch method:
```
@CameraState()
export class MyCameraState extends CameraStateInterface { // Undefined setup generic
// ...
}

// ...

myCamera.switchState(MyCameraState, {})
```
```
@CameraState()
export class MyCameraState extends CameraStateInterface<followActor: ActorInterface> { // Defined setup generic interface
// ...
}

// ...

myCamera.switchState(CameraStateGoStage, {
  followActor: someActor
})
```

The state setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#setup) accessor.

# Callbacks

The [onStart](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onStart) calllback is invoked on state start.

The [onEnd](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onEnd) calllback is invoked when the state ends.

## Loop Update

Every camera state implements the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update the camera and check events.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

Camera states can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#notify) interface method  or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

# Timers

Set timeouts and intervals calling [setTimeout](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#setTimeout) and [setInterval](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#setInterval), remove them calling [clearTimeout](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#clearTimeout), [clearInterval](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#clearInterval) and [clearAllTimeouts](https://khanonjs.com/api-docs/classes/decorators_camera_camera_state.CameraStateInterface.html#clearAllTimeouts). Interface timers will be triggered at the correct frame and will be removed on instance delete.