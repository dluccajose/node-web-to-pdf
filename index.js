const express = require('express')
const app = express()
const port = 3000
const urlConverter = require('./urlConverter')

app.get('/', async (req, res) => {
  const url = 'https://gestion.fpymevalparaiso.cl/results/101'

  const options = {
    pdfOptions: {margin: {}},
    puppeteerOptions: {
      args: [
        '--window-size=3500,768'
      ],
    },
  }

  const imageBinary = await urlConverter.urlToPDF(url, options)

  console.log(imageBinary)

  res.send('done')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})