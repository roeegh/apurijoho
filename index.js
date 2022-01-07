// Module imports.
const { load } = require('cheerio');
const { default: { get } } = require('axios');

/**
 * This function parses and fetches wanted field data.
 * 
 * @name fetch
 * @param {Number} [index] The index of parsed data that is requested.
 * @param {String} [split] A string to parse data with, fallback to newline character.
 * @return {String} The requested field data.
 */

Object.prototype.fetch = function (index, split) { return this.text()?.trim()?.split(split ?? '\n')[index]?.trim() };
const verify = (data) => { for (const key in data) { if (data[key].length == 0) data[key] = 'N/A'; } };

/**
 * @async
 * @returns {Promise} An object containing app data from the App Store.
**/

async function getApp(url) {
    let time = new Date()
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await get(url+'?l=en').catch(() => reject(new Error('Invalid Appstore Link'))),
            $ = load(data), 
            ss = $('.we-screenshot-viewer__screenshots-list li').find('.we-artwork__source'),
            appInfo = {
                url,
                name: $('.app-header__title').fetch(0),
                tagline: $('.app-header__subtitle').fetch(0),
                developer: { name: $('.app-header__identity').fetch(0), url: $('.app-header__identity').find('a').attr('href') },
                ageRating: $('.badge--product-title').text(),
                category: $('.information-list__item__definition').fetch(3),
                region: url.split('/')[3].toUpperCase(),
                icon: $('.product-hero__media').find('picture').children()[0].attribs.srcset.trim().split(' ')[2] ?? $('.we-artwork--ios-app-icon').children()[0].attribs.srcset.trim().split(' ')[2],
                description: $('.section__description').fetch(5),
                price: $('.app-header__list__item--price').fetch(0).length == 0 ? '' : $('.app-header__list__item--price').fetch(0) == 'Free' ? '$0.00' : $('.app-header__list__item--price').fetch(0),
                appleArcade: $('.app-header__list__item--price').fetch(0).length == 0 ? 'Yes' : 'No',
                inAppPurchases: $('.app-header__list__item--in-app-purchase').text().length == 0 ? '' : 'Yes',
                availableOnMac: $('span:contains("Mac App Store")').text().length == 0 ? 'No' : 'Yes',
                rating: $('.we-customer-ratings__averages__display').fetch(0),
                reviews: $('.star-rating__count').text().substring(6, $('.star-rating__count').text().length - 8),
                size: $('.information-list__item__definition').fetch(1),
                version: $('.whats-new__latest__version').fetch(1, ' '),
                updates: $('.whats-new__content').fetch(8),
                screenshots: Object.keys(ss).filter(n => Number.isInteger(parseInt(n))).map(index => ss.get(index).attribs.srcset.match(/(1286|460)x0w\.webp 2x/g)?.some(e => e) ? ss.get(index).attribs.srcset.split(' ')[2] : null).filter(e => e),
                ping: new Date() - time
            };

            verify(appInfo);
            resolve(appInfo);
        } catch (_) {
            reject(new Error(_));
        }
    });
}
 
/**
 * A module to fetch app data from the official Apple App Store website.
 * @exports getApp()
**/

module.exports = getApp;
module.exports.getApp = getApp;
