# Camera overview

A camera in a video game is the point of view from where the user watch the action. There are many different types of cameras: top-down, isometric, frist person, third person, etc. Babylon.js provides a wide range of camera types and configuration parameters that you can explore in this [link](https://doc.babylonjs.com/features/featuresDeepDive/cameras). [Khanon.js Camera](https://khanonjs.com/api-docs/modules/decorators_camera.html) is a wrapper of a [Babylon camera](https://doc.babylonjs.com/typedoc/classes/BABYLON.Camera) object, providing lifecycle and bringing the possibility to modify camera parameters in real time thanks to the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onLoopUpdate) method.

Any scene or state can switch of camera at any point depending on the game state requirements.

# Using the camera interface

To create a new camera you need to create a class, apply the [Camera decorator](https://khanonjs.com/api-docs/functions/decorators_camera.Camera.html), and extend [CameraInterface](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html) to gain access to its properties and methods.

**camera.ts**
```
import * as BABYLON from '@babylonjs/core'
import {
  Camera,
  CameraInterface
} from '@khanonjs/engine'

@Camera()
export class MyCamera extends CameraInterface</* Setup object */ S = any, /* Scene object */ C = SceneInterface> {
  onInitialize(scene: BABYLON.Scene) {
    // Create a Babylon camera, configure it, and return it
    // this.setup has optional S type
    // this.scene has optional C type
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, 0), scene)
    camera.target = new BABYLON.Vector3(1, 0, 0)
    camera.inputs.clear()
    return camera
  }
}
```

Cameras are too complex to configure, so Khanon.js doesn't provide a common configuration method. The [onInitialize](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onInitialize) method is mandatory. **You must create a [Babylon Camera](https://doc.babylonjs.com/typedoc/classes/BABYLON.Camera) and return it**. Create it using the Babyon [`scene`](https://doc.babylonjs.com/typedoc/classes/BABYLON.Scene) class provided in the first argument. This camera will be used by Khanon.js.

You can access the Babyon camera from the [`babylon`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#babylon) accessor.

Use the `S` generic to set the type to the [`setup`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#setup) accessor. The data stored in the *setup* accessor is passed to the camera by the [switchCamera](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchCamera) call. In this way the caller can send parameters to the camera.

To access the scene associated to the camera use the [`scene`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#scene) accessor. `C` generic type is applied to the *scene* accessor.

# Switching of camera

Switching of camera can be done from both scenes and scene states.

Use the [switchCamera](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchCamera) scene method or the [switchCamera](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#switchCamera) scene state method to switch of camera.

# Setup of the camera

In case you need to apply a setup to the camera, it is possible through the generic `S` of [CameraInterface](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html).

The setup object needs to be passed to the [switchCamera](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#switchCamera) method. If the setup is not defined in the *CameraInterface* generic `S`, an empty object will be passed to the switch method:
```
@Camera()
export class MyCamera extends CameraInterface { // Undefined setup generic
// ...
}

// ...

myScene.switchCamera(SceneStateGoStage, {})
```
```
@Camera()
export class MyCamera extends CameraInterface<actorToFollow: ActorInterface> { // Defined setup generic interface
// ...
}

// ...

myScene.switchCamera(SceneStateGoStage, {
  actorToFollow: someActor
})
```

The camera setup is accessible from the [`setup`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#setup) accessor.

# Getting the current camera

To get the current camera use the scene method [getCamera](https://khanonjs.com/api-docs/classes/decorators_scene.SceneInterface.html#getCamera) or the scene state [getCamera](https://khanonjs.com/api-docs/classes/decorators_scene_scene_state.SceneStateInterface.html#getCamera) method.

You can use the method generic type to retrieve a desired type:
```
example() {
  const myCamera = myScene.getCamera<WonderfulCamera>()
  // 'myCamera' is type 'WonderfulCamera'
}
```

# Callbacks

In case you need to apply some configuration to the camera when it starts, use the [onStart](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onStart) method.

The [onStop](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onStop) callback is invoked when the scene switchs to another camera.

## Loop Update

Every camera implements the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to check any state or update any element.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Update camera parameters
}
```

# Notifications

Cameras can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#notify) interface method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.

# Timers

Set timeouts and intervals calling [setTimeout](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#setTimeout) and [setInterval](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#setInterval), remove them calling [clearTimeout](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#clearTimeout), [clearInterval](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#clearInterval) and [clearAllTimeouts](https://khanonjs.com/api-docs/classes/decorators_camera.CameraInterface.html#clearAllTimeouts). Interface timers will be triggered at the correct frame and will be removed on instance delete.