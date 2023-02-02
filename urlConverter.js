const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function urlToImage(url, options, path) {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        args: [
            
            '--window-size=1366,768'
        ],
    });
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    })

    await sleep(3000);
    
    const imageBinary = await page.screenshot({ path: 'example.png', fullPage: true });
    
    await browser.close();
    
    return imageBinary
}

async function urlToPDF(url, {
    puppeteerOptions,
    pdfOptions,
    sleepTime = 0,
    emulateMediaType = 'screen' 
} = {}) 
{
    const puppeteerDefaultOptions = {
        defaultViewport: null,
        args: [
            '--window-size=1366,768'
        ],
    }

    const defaultPdfOptions = {
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    }

    puppeteerOptions = {
        ...puppeteerDefaultOptions,
        ...puppeteerOptions
    }

    pdfOptions = {
        ...defaultPdfOptions,
        ...pdfOptions
    }

    const browser = await puppeteer.launch(puppeteerOptions);

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    })

    if (emulateMediaType) {
        await page.emulateMediaType(emulateMediaType);
    }

    if (sleepTime) {
        await sleep(sleepTime);
    }

    const pdf = await page.pdf(pdfOptions);
        
    await browser.close();
    
    return pdf
}


module.exports = {
    urlToImage,
    urlToPDF
}