# LoopUpdate observable

The loop update core method makes reference to the game timeline progression, so called game loop commonly, it is the frame by frame update of the game. Every frame this core method is called, and it triggers all the observables added to it. That way the game physics, movements, events, and whatever relying on time is updated.

You will find an *onLoopUpdate* callback method in many of the Khanon.js elements such actors, states, actions, etc. But you can also use the KJS object to manually subscribe to the loop update method.

To manually subscribe to the loop update observable use [KJS.loopUpdateAddObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.loopUpdateAddObserver.html) method.

To unsubscribe [KJS.loopUpdateRemoveObserver](https://khanonjs.com/api-docs/functions/kjs.KJS.loopUpdateRemoveObserver.html).

The observers receive a factor time argument, meaning the frame proportion to be updated, which couild be considered the time factor velocity. It is 1 for a normal time velocity.
