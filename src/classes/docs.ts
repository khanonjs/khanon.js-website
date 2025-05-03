import {
  getStartedDocs,
  tutorialsDocs
} from '../doc-definitions'
import { Logger } from './logger/logger'

export class Docs {
  static loaded = false
  static docs = {}

  static get(docName: string): string {
    return Docs.docs[docName]
  }

  static loadDocs() {
    let docsFiles: string[] = []
    let tutorialsFiles: string[] = []
    const promises: Promise<Response>[] = []
    getStartedDocs.forEach(section => {
      docsFiles = [...docsFiles, ...section.docs.map(doc => doc.file)]
    })
    tutorialsDocs.forEach(section => {
      tutorialsFiles = [...tutorialsFiles, ...section.docs.map(doc => doc.file)]
    })
    docsFiles.forEach(fileName => {
      promises.push(fetch(`/docs-getstarted/${fileName}.md`))
    })
    tutorialsFiles.forEach(fileName => {
      promises.push(fetch(`/docs-tutorials/${fileName}.md`))
    })

    Promise.all(promises)
      .then((resArray) => {
        const docNames: string[] = []
        const pResponses: Promise<string>[] = []
        resArray.forEach(res => {
          const parts = res.url.split('/')
          docNames.push(parts[4].split('.md')[0])
          pResponses.push(res.text())
        })
        Promise.all(pResponses)
          .then((textArray) => {
            let i = 0
            docNames.forEach(docName => {
              Object.defineProperty(Docs.docs, docName, { enumerable: true, value: textArray[i], writable: true, configurable: true })
              i++
            })
            Docs.loaded = true
            Docs.parseMarkdownDocuments()
            console.log('Docs loaded')
          })
      })
      .catch(error => Logger.error('Docs error, couldn\'t load docs:', Logger.strFromData(error)))
  }

  static parseMarkdownDocuments() {
    Object.entries(Docs.docs)
      .forEach(([key, markdown]) => {
        Docs.docs[key] = (markdown as string)
          .replaceAll('\n## ', '&nbsp;\n## ')
          .replaceAll('\n# ', '&nbsp;\n# ')
      })
  }
}
