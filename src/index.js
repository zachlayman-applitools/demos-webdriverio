async function main() {
    const webdriverio = require('webdriverio');

    const browserOptions = {
        remoteHost: "http://localhost:4444",
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: [
                    'disable-infobars',
                ]
            }
        }
    };
    const driver = webdriverio.remote(browserOptions);
    let browser = driver.init();

    const { Eyes, Target } = require('@applitools/eyes.webdriverio');
    let eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    try {
        await eyes.open(browser, 'Hello World!', 'My first WebdriverIO test!', { width: 800, height: 600 });

        await browser.url('https://applitools.com/helloworld');
        await eyes.check('Main Page', Target.window());
        await browser.click('button');
        await eyes.check('Click!', Target.window());

        await eyes.close();
    } finally {
        await browser.end();
        await eyes.abortIfNotClosed();
    }

}

main();