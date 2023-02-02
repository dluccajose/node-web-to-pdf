var express = require('express');
const crypto = require('crypto');
var router = express.Router();
const urlConverter = require('../urlConverter')

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('home');
});

router.post('/pdf', async function (req, res) {
  const url = req.body.url;
  const storagePath = '/storage/public/'
  const fileName = crypto.randomUUID() + '.pdf';

  const options = {
    pdfOptions: {
      margin: {},
      path: "." + storagePath + fileName,
    },
    puppeteerOptions: {
      args: [
        '--window-size=3500,768',
        '--no-sandbox', 
        '--disable-setuid-sandbox',
      ],
    },
  }

  await urlConverter.urlToPDF(url, options)

  res.render('pdf_generated',  {pdfUrl: `${process.env.URL}/${fileName}`, title: 'Conversion lista - Descargar PDF'})
})

module.exports = router;
