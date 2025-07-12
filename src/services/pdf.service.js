import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const generatePdfFromHTML = async (htmlContent) => {
    let browser = null;
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 412,
            height: 915,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
        })
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            width: '412px',
            printBackground: true,
            margin: {
                top: '15px',
                right: '15px',
                bottom: '15px',
                left: '15px',
            },
        });

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF with Puppeteer:', error);
        throw new Error('Could not generate PDF due to a broswer issue.');
    } finally {
        if(browser) {
            await browser.close();
        }
    }
}