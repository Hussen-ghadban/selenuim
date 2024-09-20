const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

(async function inspectPage() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        await driver.get('https://products-hessengh.vercel.app/');

        // Wait for the page to load and elements to be present
        await driver.wait(until.elementLocated(By.css('.movie-preview')), 10000);

        // Take a screenshot of the page
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync('screenshot.png', Buffer.from(screenshot, 'base64'));

        // Extract outer HTML of elements with the class 'movie-preview'
        let moviePreviews = await driver.findElements(By.css('.movie-preview'));
        
        for (let i = 0; i < moviePreviews.length; i++) {
            let moviePreview = moviePreviews[i];
            
            // Find the <a> tag inside the current 'movie-preview' div
            let link = await moviePreview.findElement(By.css('a'));

            // Find the <h3> heading inside the <a> tag
            let heading = await link.findElement(By.css('h3'));

            // Get and print the text content of the <h3> tag
            let headingText = await heading.getText();
            console.log(`Heading ${i + 1}:`, headingText);
        }
    } finally {
        // Keep the browser open until you manually close it
        // Remove or comment out the line below to keep the browser open
        // await driver.quit();
    }
})();
