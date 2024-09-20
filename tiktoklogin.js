const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function tiktokLogin() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options())
        .build();

    try {
        // Step 1: Navigate to TikTok Login Page
        await driver.get('https://www.tiktok.com/login');

        // Step 2: Wait for the "Use phone/email/username" option and click it
        await driver.wait(until.elementLocated(By.xpath("//div[text()='Use phone / email / username']")), 15000);
        let phoneEmailUsernameButton = await driver.findElement(By.xpath("//div[text()='Use phone / email / username']"));
        await phoneEmailUsernameButton.click();
        console.log('Clicked "Use phone/email/username" option');

        // Step 3: Wait for the "Log in with email or username" link and click it
        await driver.wait(until.elementLocated(By.css('a[href="/login/phone-or-email/email"]')), 15000);
        let loginWithEmailOrUsernameLink = await driver.findElement(By.css('a[href="/login/phone-or-email/email"]'));
        await loginWithEmailOrUsernameLink.click();
        console.log('Clicked "Log in with email or username" link');

        // Step 4: Wait for the email/username input
        await driver.wait(until.elementLocated(By.name('username')), 15000);
        let usernameInput = await driver.findElement(By.name('username'));

        
        // Step 5: Wait for the password input using the 'type="password"' selector
        await driver.wait(until.elementLocated(By.css('input[type="password"]')), 15000);
        let passwordInput = await driver.findElement(By.css('input[type="password"]'));

        // Replace 'xxx' and 'ppp' with your actual email/username and password
        let email = 'xxx;   // Replace with your case-sensitive email/username
        let password = 'ppp'; // Replace with your case-sensitive password

        // Step 6: Fill in the email/username and password
        await usernameInput.sendKeys(email);
        await passwordInput.sendKeys(password);
        console.log('Filled in email/username and password');

        // Step 7: Submit the form
        // await passwordInput.sendKeys(Key.RETURN);
        // console.log('Submitted the login form');

        let submitButton = await driver.findElement(By.css('button[type="submit"]'));
await submitButton.click();


    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Keep the browser open until manually closed
        console.log('Browser is open. Press Ctrl+C to exit.');
        await new Promise(resolve => process.on('SIGINT', resolve));
    }
})();
