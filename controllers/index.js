const urlConverter = require('../urlConverter')
const crypto = require('crypto')

function index(req, res, next) {
    return res.render('home');
}

async function convert(req, res, next) {
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
          '--window-size=1366,768',
          '--no-sandbox', 
          '--disable-setuid-sandbox',
        ],
      },
    }
  
    await urlConverter.urlToPDF(url, options)
  
    res.render('pdf_generated',  {
      pdfUrl: `${process.env.URL}/${fileName}`, 
      title: 'Conversion lista - Descargar PDF'
    })
}

module.exports = {
    index,
    convert
}