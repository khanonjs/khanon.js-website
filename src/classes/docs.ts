import { Logger } from './logger/logger'

export class Docs {
  static loaded = false
  static #doc = {}

  static get(docName: string): string {
    return Docs.#doc[docName]
  }

  static loadDocs() {
    const fileNames = [
      'getstarted',
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
