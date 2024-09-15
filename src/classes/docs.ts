import {
  getStartedDocs,
  tutorialsDocs
} from '../doc-definitions'
import { Logger } from './logger/logger'

export class Docs {
  static loaded = false
  static docs = {}

  static get(docName: string): string {
    console.log('aki GET dOCUMENT')
    return Docs.docs[docName]
  }

  static loadDocs() {
    let fileNames: string[] = []
    getStartedDocs.forEach(section => {
      fileNames = [...fileNames, ...section.docs.map(doc => doc.file)]
    })
    // tutorialsDocs.forEach(section => {
    //   fileNames = [...fileNames, ...section.docs.map(doc => doc.file)]
    // })

    const promises: Promise<Response>[] = []
    fileNames.forEach(fileName => {
      promises.push(fetch(`./docs/${fileName}.md`))
    })

    Promise.all(promises)
      .then((resArray) => {
        console.log('aki resArray', resArray)
        const docNames: string[] = []
        const pResponses: Promise<string>[] = []
        resArray.forEach(res => {
          docNames.push(res.url.split('/docs/')[1].split('.md')[0])
          pResponses.push(res.text())
        })
        Promise.all(pResponses)
          .then((textArray) => {
            console.log('aki textArray', textArray)
            let i = 0
            docNames.forEach(docName => {
              Object.defineProperty(Docs.docs, docName, { enumerable: true, value: textArray[i], writable: true, configurable: true })
              i++
            })
            Docs.loaded = true
            Docs.parseMarkdownDocuments()
          })
      })
      .catch(error => Logger.error('Docs error, couldn\'t load docs:', Logger.strFromData(error)))
  }

  static parseMarkdownDocuments() {
    console.log('aki PARSE DOCUMENTS A', Docs.docs)
    Object.entries(Docs.docs)
      .forEach(([key, markdown]) => {
        Docs.docs[key] = (markdown as string)
          .replaceAll('\n## ', '\r\n&nbsp;\r\n## ')
          .replaceAll('\n# ', '\r\n&nbsp;\r\n# ')
      })
    console.log('aki PARSE DOCUMENTS B', Docs.docs)
  }
}
