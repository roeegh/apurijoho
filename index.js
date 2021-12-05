// Module imports.
const { load } = require('cheerio');
const { default: { get } } = require('axios');

/**
 * @async
 * @returns {Promise} An object containing app data from the App Store.
**/

async function getApp(url) {
    return new Promise(async (resolve, reject) => {
        const { data } = await get(url), $ = load(data);

        try {
            const appInfo = {
                name: $('.app-header__title').text().trim().split('\n')[0],
                tagline: $('.app-header__subtitle').text().trim().split('\n')[0],
                seller: $('.app-header__identity').text().trim().split('\n')[0],
                category: $('.information-list__item__definition').text().trim().split('\n')[3].trim(),
                description: $('.section__description').text().trim().split('\n')[5].trim(),
                price: $('.app-header__list__item--price').text(),
                rating: $('.we-customer-ratings__averages__display').text(),
                size: $('.information-list__item__definition').text().trim().split('\n')[1].trim(),
                latestVersion: $('.whats-new__latest__version').text().trim().split(' ')[1],
                whatsNew: $('.whats-new__content').text().trim().split('\n')[8].trim(),
                screenshots: []
            };

            $('.we-screenshot-viewer__screenshots-list li').find('.we-artwork__source').each((i, elm) => {
                (elm.attribs.srcset.endsWith('1286x0w.webp 2x') || elm.attribs.srcset.endsWith('460x0w.webp 2x')) ? appInfo.screenshots.push(elm.attribs.srcset.split(' ')[2]) : null
            });

            resolve(appInfo);
        } catch (_) {
            reject({ error: 'An error occurred while retrieving app data. If the issue persists, please contact the developer.' });
        }
    });
}

/**
 * A module to fetch app data from the official Apple App Store website.
 * @exports getApp()
**/

module.exports = getApp;
module.exports.getFact = getApp;