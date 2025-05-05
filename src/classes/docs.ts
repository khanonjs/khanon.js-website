import {
  getStartedDocs,
  tutorialsDocs
} from '../doc-definitions'
import { Logger } from './logger/logger'

export class Docs {
  static loaded = false
  static docs = {}
  private static docsFiles: string[] = []
  private static tutorialsFiles: string[] = []

  static get(docName: string): string {
    return Docs.docs[docName]
  }

  static loadDocs() {
    const promises: Promise<Response>[] = []
    getStartedDocs.forEach(section => {
      Docs.docsFiles = [...Docs.docsFiles, ...section.docs.map(doc => doc.file)]
    })
    tutorialsDocs.forEach(section => {
      Docs.tutorialsFiles = [...Docs.tutorialsFiles, ...section.docs.map(doc => doc.file)]
    })
    Docs.docsFiles.forEach(fileName => {
      promises.push(fetch(`/docs-getstarted/${fileName}.md`))
    })
    Docs.tutorialsFiles.forEach(fileName => {
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

        // Add hastag links to the markdown
        let index: number = 0
        let pos: number = 0
        do {
          index = (Docs.docs[key] as string).indexOf('# ', pos)
          pos = index + 1
          if (index !== -1 && Docs.docs[key][index - 1] !== '#') {
            const nextLine = (Docs.docs[key] as string).indexOf('\r\n', pos)
            const hashtagName = (Docs.docs[key] as string).substring(pos + 1, nextLine)
              .replaceAll(' ', '-')
              .replaceAll('.', '')
              .replaceAll('?', '')
              .replaceAll('!', '')
              .toLowerCase()
            Docs.docs[key] = Docs.docs[key].slice(0, nextLine) + ` [ #](${`/${Docs.docsFiles.find(doc => doc === key) ? 'getstarted' : 'tutorials'}/${key}#${hashtagName}`})` + Docs.docs[key].slice(nextLine)
            pos++
          }
        } while (index > -1)
      })
  }
}
