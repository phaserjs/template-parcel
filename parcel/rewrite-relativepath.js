// Used to rewrite the index.html file to use relative paths for assets
const { Reporter } = require('@parcel/plugin');
const fs = require('fs');

module.exports = new Reporter({
    async report({ event, options }) {
        if (event.type === "buildSuccess") {
            let bundles = event.bundleGraph.getBundles();
            const index = bundles.find(bundle => bundle.name === 'index.html');
            if(index) {
                let htmlContent = fs.readFileSync(index.filePath, 'utf8');
                if(htmlContent.includes('_relativeroute_')) {
                    htmlContent = htmlContent.replace(/_relativeroute_/g, '.');
                    fs.writeFileSync(index.filePath, htmlContent);
                }
            }
            const line = "---------------------------------------------------------";
            const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
            process.stdout.write(`${line}\n${msg}\n${line}\n`);
            process.stdout.write(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!\n`);
        }
    }
});
