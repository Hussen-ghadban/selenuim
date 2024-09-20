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

        // Extract and print the headings inside the .movie-preview elements
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

        // Function to take a screenshot
        async function takeScreenshot(index) {
            let screenshot = await driver.takeScreenshot();
            fs.writeFileSync(`screenshot_${index}.png`, Buffer.from(screenshot, 'base64'));
            console.log(`Screenshot ${index} taken`);
        }

        let screenshotIndex = 0;

        // Take screenshots every second
        const intervalId = setInterval(async () => {
            try {
                screenshotIndex++;
                await takeScreenshot(screenshotIndex);
            } catch (error) {
                console.error('Error taking screenshot:', error);
            }
        }, 1000);

        // Keep the browser open until manually closed
        console.log('Browser is open. Press Ctrl+C to exit and stop taking screenshots.');

        // Prevent the script from exiting to keep the browser open
        await new Promise(resolve => process.on('SIGINT', resolve));

        // Clear the interval when done
        clearInterval(intervalId);

    } finally {
        // Commented out to keep the browser open
        // await driver.quit();
    }
})();
