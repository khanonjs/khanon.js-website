# Overview

Sounds are defined using the [Sound](https://khanonjs.com/api-docs/modules/decorators_sound.html) decorator as a property of type [SoundConstructor](https://khanonjs.com/api-docs/types/decorators_sound.SoundConstructor.html).

Sounds are defined in scenes and actors (including their actions and states), and can be played only within the class where they have been defined.

# Engine configuration

The sound engine configuration is applied from the app decorator [AppProps](https://khanonjs.com/api-docs/interfaces/decorators_app.AppProps.html#audioEngine) object. Read more about it in Babylon's doc [browser autoplay considerations](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic/#browser-autoplay-considerations).

Browsers basically need the user to tap the screen to start reproducing the audio engine (to avoid annoying situations). Bear in mind if you are using sounds in your app, you need to ask the user to tap the screen before Babylon starts playing. Do this displaying a HTML layer over the Khanon.js canvas, and hide it after the app has started. The app will remain frozen unless the user tap the screen.

# Sound URLs

To load a sound we need to declare the file Url. Babylon.js brings the possibility to use an array of urls, from where it will select the appropiate format for the browser's device. Read more about it in Babylon's doc [using browser-specific audio codecs](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic#using-browser-specific-audio-codecs).

# Streaming sounds

Sounds can be loaded in memory or, in case you don't want to load the file in memory, played by stream. Streamed sounds are meant to be environmental backgrounds and music, whose files are longer. Read more in Babylon's doc [streaming a sound](https://doc.babylonjs.com/features/featuresDeepDive/audio/playingSoundsMusic#streaming-a-sound).

# Spatial sounds

Spatial sounds are reproduced according to a mesh's world matrix attached to them. These can be defined only within actors, using the actor's body position and rotation. Khanon.js attachs automatically the body of the actor to the sounds enabling [spatialEnabled](https://khanonjs.com/api-docs/interfaces/decorators_sound.SoundProps.html#spatialEnabled).