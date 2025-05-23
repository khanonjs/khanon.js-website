# Canvas Resize observable

Sometimes you might want to rearrange the layers of your game depending on the browser width and height ratio. This is complex enough as not to have an automatic system, but you can do it manually through the CanvasResize observable.

As loop update, many Khanon.js elements have a callback method for CanvasResize, but you can also subscribe manually to it.

To manually subscribe to the CanvasResize observable use [KJS.canvasResizeAddObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.canvasResizeAddObserver.html) method.

To unsubscribe [KJS.canvasResizeRemoveObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.canvasResizeRemoveObserver.html).

The observers receive a [Rect](https://khanonjs.com/api-docs/interfaces/models.Rect.html) argument with the width and height of the canvas. You can use it to calculate the ratio and adapt the game layers.
