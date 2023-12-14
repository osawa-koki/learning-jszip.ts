import fs from 'fs'
import JSZip from 'jszip'

const zip = new JSZip()

zip.file('hello.txt', 'Hello World\n')
zip.file('hello2.txt', 'Hello World2\n')

zip.generateAsync({ type: 'nodebuffer' })
  .then((content) => {
    fs.writeFileSync('example.zip', content)
  }).catch((err) => {
    console.error(err)
  })
