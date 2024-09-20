const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function extractData() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        await driver.get('https://products-hessengh.vercel.app/');

        // Wait for the footer to be present on the page
        await driver.sleep(3000); // Adjust wait time if needed

        // Find the footer element by its class
        let moviLlist = await driver.findElement(By.css('.movie-list'));

        // Find all div elements inside the footer
        let moviePreviews = await moviLlist.findElements(By.css('.movie-preview'));

        // Extract and print text from each div
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
        await driver.quit();
    }
})();
