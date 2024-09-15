/* eslint-disable no-undef */
import fs from 'fs'
import archiver from 'archiver'
import { httpCall, HttpProtocol } from './http-call.mjs'

// ZIP 'api-docs' folder
const fileName = 'khanonjs-web'
const zipFolder = './build'
const output = fs.createWriteStream(`${fileName}.zip`)
const archive = archiver('zip')
// 8a8f al enviar el zip, los .md de '\public\docs' están pasando el ELO de \r\n a \n, lo cual provoca errores en el parseo del markdown
output.on('close', function () {
  console.log(archive.pointer() + ' total bytes')
  console.log('archiver has been finalized and the output file descriptor has closed.')

  // Send it to the server
  let url = ''
  let secret = ''
  process.argv.forEach(arg => {
    const urlStr = 'url:'
    if (arg.indexOf(urlStr) !== -1) {
      url = arg.substring(urlStr.length, arg.length)
    }
    const secretStr = 'secret:'
    if (arg.indexOf(secretStr) !== -1) {
      secret = arg.substring(secretStr.length, arg.length)
    }
  })

  httpCall(HttpProtocol.POST, url, {
    attachments: [{
      key: fileName,
      fileName: `${fileName}.zip`,
      value: fs.readFileSync(`${fileName}.zip`)
    }]
  },
  { secret },
  (code, response) => {
    fs.rmSync(`${fileName}.zip`)
    if (code === 200) {
      console.log('Data sent successfully:', response)
    } else {
      console.log(`Error ${code}:`, response)
      process.exit(1)
    }
  },
  (error) => {
    fs.rmSync(`${fileName}.zip`)
    console.log('There was an error sending data:', error)
    process.exit(1)
  })
})

archive.on('error', function(err) {
  throw err
})

archive.pipe(output)
archive.directory(zipFolder, false)
archive.finalize()
