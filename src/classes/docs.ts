import { Logger } from './logger/logger'

export class Docs {
  static loaded = false
  static #doc = {}

  static get(docName: string): string {
    return Docs.#doc[docName]
  }

  static loadDocs() {
    const fileNames = [
      '0-what-is-khanon-js',
      '0-installing-khanon-js',
      '0-before-starting',
      '0-whats-coming-up',
      '1-starting-new-project',
      '1-installing-dependencies',
      '1-creating-new-application',
      '1-deploying-to-server',
      '2-overview',
      '2-using-app-instance',
      '2-using-kjs-object',
      '2-app-states',
      '3-overview',
      '3-creating-new-scene',
      '3-using-scene-interface',
      '3-scene-states',
      '3-defining-the-camera',
      '3-scene-actions',
      '4-overview',
      '4-sprite-class-decorator',
      '4-sprite-property-decorator',
      '4-using-sprite-interface',
      '4-spawning-destroying-sprites',
      '5-overview',
      '5-mesh-class-decorator',
      '5-mesh-property-decorator',
      '5-using-mesh-interface',
      '5-spawning-destroying-meshes',
      '6-overview',
      '6-sprite-maps',
      '6-mesh-maps',
      '7-overview',
      '7-creating-new-actor',
      '7-using-actor-interface',
      '7-actor-states',
      '7-actor-actions',
      '7-spawning-destroying-actors',
      '8-overview',
      '8-creating-particles',
      '8-using-particle-interface',
      '8-spawning-particles',
      '9-overview',
      '9-receiving-notifications',
      '9-sending-notifications',
      'getstarted-0',
      'getstarted-1',
      'getstarted-2',
      'getstarted-3',
      'getstarted-4',
      'getstarted-5',
      'getstarted-6',
      'tutorials'
    ]

    const promises: Promise<Response>[] = []
    fileNames.forEach(fileName => {
      promises.push(fetch(`./docs/${fileName}.md`))
    })

    Promise.all(promises)
      .then((resArray) => {
        const docNames: string[] = []
        const pResponses: Promise<string>[] = []
        resArray.forEach(res => {
          docNames.push(res.url.split('/docs/')[1].split('.md')[0])
          pResponses.push(res.text())
        })
        Promise.all(pResponses)
          .then((textArray) => {
            let i = 0
            docNames.forEach(docName => {
              Object.defineProperty(Docs.#doc, docName, { enumerable: true, value: textArray[i], writable: true, configurable: true })
              i++
            })
            Docs.loaded = true
          })
      })
      .catch(error => Logger.error('Docs error, couldn\'t load docs:', Logger.strFromData(error)))
  }
}
