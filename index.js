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

Object.prototype.fetch = function (index, split) { return this.text()?.trim()?.split(split ?? '\n')[index]?.trim() }

/**
 * @async
 * @returns {Promise} An object containing app data from the App Store.
**/

async function getApp(url) {
    let time = new Date()
    return new Promise(async (resolve, reject) => {
        const { data } = await get(url), $ = load(data), ss = $('.we-screenshot-viewer__screenshots-list li').find('.we-artwork__source');

        try {
            const appInfo = {
                url,
                name: $('.app-header__title').fetch(0),
                tagline: $('.app-header__subtitle').fetch(0),
                developer: $('.app-header__identity').fetch(0),
                ageRating: $('.badge--product-title').text(),
                category: $('.information-list__item__definition').fetch(3),
                icon: $('.we-artwork--ios-app-icon').children()[0].attribs.srcset.trim().split(' ')[2],
                description: $('.section__description').fetch(5),
                price: $('.app-header__list__item--price').fetch(0),
                rating: parseFloat($('.we-customer-ratings__averages__display').fetch(0)),
                reviews: $('.star-rating__count').text().substring(6, $('.star-rating__count').text().length - 8),
                size: $('.information-list__item__definition').fetch(1),
                version: $('.whats-new__latest__version').fetch(1, ' '),
                updates: $('.whats-new__content').fetch(8),
                screenshots: Object.keys(ss).filter(n => Number.isInteger(parseInt(n))).map(index => ss.get(index).attribs.srcset.match(/(1286|460)x0w\.webp 2x/g)?.some(e => e) ? ss.get(index).attribs.srcset.split(' ')[2] : null).filter(e => e),
                ping: new Date() - time
            };

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
module.exports.getApp = getApp;