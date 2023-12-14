import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'

(() => {
  const dirPath = './files/'
  const zip = new JSZip()

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
})();

(() => {
  const dirPath = './data/'
  const zipFile = fs.readFileSync('./data.zip')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  JSZip.loadAsync(zipFile).then((zip) => {
    zip.forEach((relativePath, file) => {
      if (file.dir) {
        fs.mkdirSync(path.join(dirPath, relativePath))
      } else {
        file.async('nodebuffer')
          .then((content) => {
            fs.writeFileSync(path.join(dirPath, relativePath), content)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    })
  }).catch((err) => {
    console.error(err)
  })
})()
