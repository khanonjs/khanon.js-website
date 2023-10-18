import { Logger } from './logger/logger'

export class Docs {
  static docGetStarted: string

  static loadDocs() {
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
  }
}
