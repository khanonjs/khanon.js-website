import { Logger } from './logger/logger'

export class Docs {
  static loaded = true // 8a8f
  static docGetStarted: string
  static docTutorials: string

  static loadDocs() {
    // 8a8f load array of markdowns
    if (!Docs.docGetStarted) {
      const mdUrl = './docs/getstarted.md'
      fetch(mdUrl)
        .then((res) => {
          res.text()
            .then((text) => {
              Docs.docGetStarted = text
            })
            .catch(error => Logger.info(`GetStarted page error, couldn't load '${mdUrl}':`, Logger.strFromData(error))
            )
        })
        .catch(error => Logger.info(`GetStarted page error, couldn't load '${mdUrl}':`, Logger.strFromData(error))
        )
    }

    if (!Docs.docTutorials) {
      const mdUrl = './docs/tutorials.md'
      fetch(mdUrl)
        .then((res) => {
          res.text()
            .then((text) => {
              Docs.docTutorials = text
            })
            .catch(error => Logger.info(`GetStarted page error, couldn't load '${mdUrl}':`, Logger.strFromData(error))
            )
        })
        .catch(error => Logger.info(`GetStarted page error, couldn't load '${mdUrl}':`, Logger.strFromData(error))
        )
    }
  }
}
