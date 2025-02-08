# Using the class decorator

To implement a GUI using class decorator you need to create a class, apply the [GUI decorator](https://khanonjs.com/api-docs/functions/decorators_gui.GUI.html), and extend [GUIInterface](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html) to gain access to its properties and methods. Note that for Babylon GUI elements we need to import the modules from [`@babylonjs/gui`](https://www.npmjs.com/package/babylonjs-gui).

The GUI class decorator doesn't provide props at the moment. This will change in the future.

To initialize and build your GUI, you need to implement the mandatory callback [onInitialize](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onInitialize), which pass the [Babylon AdvancedDynamicTexture](https://doc.babylonjs.com/typedoc/classes/BABYLON.GUI.AdvancedDynamicTexture) argument that is used as the container of all the GUI elements to add. Use it to build your GUI.

Read this [section](https://doc.babylonjs.com/features/featuresDeepDive/gui/gui) to see how to build a Babylon's GUI.

**my-gui**
```
import * as BABYLON_GUI from '@babylonjs/gui'
import {
  GUI,
  GUIInterface,
  Logger,
  Rect
} from '@khanonjs/engine'

@GUI()
export class MyGUI extends GUIInterface {
  onInitialize(container: BABYLON_GUI.AdvancedDynamicTexture) {
    // 'container' is equivalent to 'this.babylon.gui'
    const button1 = BABYLON_GUI.Button.CreateSimpleButton('but1', 'Click Me')
    button1.width = '150px'
    button1.height = '40px'
    button1.color = 'white'
    button1.cornerRadius = 20
    button1.background = 'green'
    button1.onPointerUpObservable.add(function() {
      alert('Button click!')
    })
    container.addControl(button1)
  }
}
```

The accessor [`babylon.gui`](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#babylon) provides access to the [Babylon AdvancedDynamicTexture](https://doc.babylonjs.com/typedoc/classes/BABYLON.GUI.AdvancedDynamicTexture) container used to store all the GUI elements.

# Callbacks

The [onInitialize](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onInitialize) calllback is invoked on GUI initialize. Use this mandatory callback to build your GUI.

The [onDestroy](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onDestroy) calllback is invoked on gui destroy.

## Loop Update

GUIs implement the [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onLoopUpdate) optional callback. This callback creates an observer to the app loop update, being called every frame. Add logic to this callback to update anything in the GUI.
```
onLoopUpdate(delta: number) {
  // Add logic here
}
```

The [onLoopUpdate](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onLoopUpdate) callback can be enabled or disabled using the [`loopUpdate`](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#loopUpdate) accessor.

## Canvas Resize

Implement the callback [onCanvasResize](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#onCanvasResize) to receive any new canvas resize.
```
onCanvasResize(size: Rect) {
  // Rearrange layers
}
```

# Notifications

GUIs can also receive notifications through the [notify](https://khanonjs.com/api-docs/classes/decorators_gui.GUIInterface.html#notify) interface method or the global [KJS.Notify.send](https://khanonjs.com/api-docs/functions/kjs.KJS.Notify.send.html) method. Read more about notifications in the Notifications section.
