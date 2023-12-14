import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'

const zip = new JSZip()

const dirPath = './example/'

const files = fs.readdirSync(dirPath)

files.forEach((file) => {
  zip.file(file, fs.readFileSync(path.join(dirPath, file)))
})

zip.generateAsync({ type: 'nodebuffer' })
  .then((content) => {
    fs.writeFileSync('./example.zip', content)
  }).catch((err) => {
    console.error(err)
  })
