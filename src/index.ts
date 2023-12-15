import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'

(() => {
  // `example`ディレクトリのファイルをZIP化。
  const dirPath = './example/'
  const zip = new JSZip()

  const zipRecursively = (dirPath: string): void => {
    const files = fs.readdirSync(dirPath)
    files.forEach((file) => {
      const filePath = path.join(dirPath, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        zipRecursively(filePath)
      } else {
        zip.file(filePath, fs.readFileSync(filePath))
      }
    })
  }
  zipRecursively(dirPath)

  zip.generateAsync({ type: 'nodebuffer' })
    .then((content) => {
      fs.writeFileSync('./example.zip', content)
    }).catch((err) => {
      console.error(err)
    })
})();

(() => {
  // `data.zip`を解凍。
  const dirPath = './'
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
