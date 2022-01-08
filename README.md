# Apurijoho

**Purpose:** This module was created to scrape the app data provided by the official [Apple App Store](https://www.apple.com/app-store/).

**Source:** App Store by [Apple](https://www.apple.com/app-store/)

## Install

```
$ npm install @aahlw/apurijoho
```

## Import

You can import the module itself or deconstruct the `getApp` function, either of the following is a vaild import:

```js
const getApp = require('@aahlw/apurijoho');

const { getApp } = require('@aahlw/apurijoho');
```

## Usage

Example code can be located in the [test.js](./test.js) file.

```js
const getApp = require('@aahlw/apurijoho');
(async _ => console.log(await getApp('https://apps.apple.com/us/app/github/id1477376905')))();

// Response:
{
  url: 'https://apps.apple.com/us/app/github/id1477376905',
  name: 'GitHub',
  tagline: 'Projects, ideas, & code to go',
  developer: {
    name: 'GitHub',
    url: 'https://apps.apple.com/us/developer/github/id429758986'
  },
  ageRating: '4+',
  category: 'Developer Tools',
  region: 'US',
  icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/2a/ce/e9/2acee911-c479-b23c-ca1d-7b0d2fcb35de/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/460x0w.webp',
  description: 'There’s a lot you can do on GitHub that doesn’t require a complex development environment – like sharing feedback on a design discussion, or reviewing a few lines of code. GitHub for iOS lets you move work forward wherever you are. Stay in touch with your team, triage issues, and even merge, right from the app. We’re making these tasks easy for you to perform, no matter where you work, with a beautifully native experience.You can use GitHub for iOS to:• Browse your latest notifications• Read, react, and reply to Issues and Pull Requests• Review and merge Pull Requests• Organize Issues with labels, assignees, projects, and more• Browse your files and code• Discover new and trending repositories———Terms of Service: https://docs.github.com/en/github/site-policy/github-terms-of-servicePrivacy Policy: https://docs.github.com/en/github/site-policy/github-privacy-statement',
  price: '$0.00',
  appleArcade: 'No',
  inAppPurchases: 'Yes',
  availableOnMac: 'No',
  rating: '4.8',
  reviews: '9.7K',
  size: '67.5 MB',
  version: '1.45.0',
  updates: "What's New:• Edit categories and labels on discussionsBug Fixes:• Fix a crash that could occur when browsing issues and pull requests.",
  screenshots: [
    'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/5f/f6/23/5ff623d7-1b29-2cec-5f91-19f78798dbc7/0d601e76-462d-4c99-a03a-cf8082e699e6_iPhone_11_Pro_Max-0-Home.png/460x0w.webp',
    'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/c0/5b/2c/c05b2c16-d2dd-0124-1856-e71481ecbf5a/18504a48-10e5-4777-9264-1d134bd83651_iPhone_11_Pro_Max-1-Inbox.png/460x0w.webp',
    'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/bb/b6/c4/bbb6c444-4ac1-9be7-7637-3ac914f52775/93f99d06-3926-431e-b1b1-26b2d0da3e27_iPhone_11_Pro_Max-2-PullRequest.png/460x0w.webp',
    'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/4b/8f/25/4b8f259c-5885-7a9e-6f8a-61731b17540f/0fff8671-fc51-4916-b30c-d1e3895b5ac8_iPhone_11_Pro_Max-3-FilesChanged.png/460x0w.webp'
  ],
  ping: 502
}
```

## Explanation

```js
{
  url: // App URL, provided by you.
  name: // App name.
  tagline: // App tagline (Found below the app name).
  developer: {
    name: // Name of company or individual that developed the app.
    url: // URL of the developer's App store page.
  },
  ageRating: '4+', // Age rating of the app.
  category: 'Developer Tools', // App store category.
  region: 'US', // App store region.
  icon: 'https://...', // App icon URL.
  description: 'There’s a lot...', // App store description.
  price: '$0.00', // Price of the app.
  appleArcade: 'No', // Whether the app is available on Apple Arcade.
  inAppPurchases: 'Yes', // Whether the app supports in-app purchases.
  availableOnMac: 'No', // Whether the app is available on Mac.
  rating: '4.8', // Rating of the app.
  reviews: '9.7K', // Number of reviews of the app.
  size: '67.5 MB', // Size of the app.
  version: '1.45.0', // Latest version of the app.
  updates: "What's New...", // Changelog of the latest version.
  screenshots: ['https://...'], // Array of screenshots for the app.
  ping: 502 // Scrape and parse process time (MS).
}
```

## Example

The following example is very oversimplied but gives a rough idea on how to implement it in your [discord.js v13](https://discord.js.org) bot:

```js
const { getApp } = require('apurijoho');

<Client>.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() === '!app') {

        // Check if the correct URL is provided.
        let url = message.content.match(/http[s]?:\/\/apps.apple.com\/.*\/app\/.*\/id\d*/g);
        if (!url?.length) return message.channel.send('No URL Found!');

        // Request data.
        let data = await getApp(url[0]);
        if (!data) return message.channel.send('An error occured, try again later.');

        // Send response.
        return message.channel.send({
            embeds: [{
                color: 0x43B581,
                title: data.name,
                url: data.url,
                description: data.description,
                image: { url: data.screenshots[0] },
                footer: { text: `${data.ping}ms` },
                author: { name: data.developer },
                timestamp: new Date(),
                fields: [
                  { name: 'Tagline', value: data.tagline },
                  { name: 'Category', value: data.category },
                  { name: 'Price', value: data.price },
                  { name: 'Rating', value: `${data.rating}/5` },
                  { name: 'Size', value: data.size },
                  { name: 'Version', value: data.version },
                  { name: 'Updates', value: data.updates },
                ]
              }]
        });
    }
});
```
