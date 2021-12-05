# Apurijoho

**Purpose:** This module was created to scrape the app data provided by the official [Apple App Store](https://www.apple.com/app-store/).

**Source:** App Store by [Apple](https://www.apple.com/app-store/)

## Install

```
$ npm install apurijoho
```

## Import

You can import the module itself or deconstruct the `getApp` function, either of the following is a vaild import:
```js
const getApp = require('apurijoho');

const { getApp } = require('apurijoho');
```

## Usage
Example code can be located in the [test.js](./test.js) file.

```js
const getApp = require('./index');
(async _ => console.log(await getApp('https://apps.apple.com/us/app/github/id1477376905')))();

// Response:
{
  name: 'GitHub',
  tagline: 'Projects, ideas, & code to go',
  seller: 'GitHub',
  category: 'Developer Tools',
  description: 'There’s a lot you can do on GitHub that doesn’t require a complex development environment – like sharing feedback on a design discussion, or reviewing a few lines of code. GitHub for iOS lets you move work forward wherever you are. Stay in touch with your team, triage issues, and even merge, right from the app. We’re making these tasks easy for you to perform, no matter where you work, with a beautifully native experience.You can use GitHub for iOS to:• Browse your latest notifications• Read, react, and reply to Issues and Pull Requests• Review and merge Pull Requests• Organize Issues with labels, assignees, projects, and more• Browse your files and code• Discover new and trending repositories———Terms of Service: https://docs.github.com/en/github/site-policy/github-terms-of-servicePrivacy Policy: https://docs.github.com/en/github/site-policy/github-privacy-statement',
  price: 'Free',
  rating: '4.8',
  size: '68.1 MB',
  latestVersion: '1.42.0',
  whatsNew: `What's new:• Filter discussions by label to find what you need.• View media files in full screen to get a closer look.• Locked Issue or Pull request shows "Locked" badge in the header.• Support theme context for images in Markdown.Bug fixes:• Hide commit button in the code suggestion when the user doesn't have permission to commit.• Closed issues now appear purple, just as merged pull requests do.`,
  screenshots: [
    'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/5f/f6/23/5ff623d7-1b29-2cec-5f91-19f78798dbc7/0d601e76-462d-4c99-a03a-cf8082e699e6_iPhone_11_Pro_Max-0-Home.png/460x0w.webp',
    'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/c0/5b/2c/c05b2c16-d2dd-0124-1856-e71481ecbf5a/18504a48-10e5-4777-9264-1d134bd83651_iPhone_11_Pro_Max-1-Inbox.png/460x0w.webp',
    'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/bb/b6/c4/bbb6c444-4ac1-9be7-7637-3ac914f52775/93f99d06-3926-431e-b1b1-26b2d0da3e27_iPhone_11_Pro_Max-2-PullRequest.png/460x0w.webp',
    'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/4b/8f/25/4b8f259c-5885-7a9e-6f8a-61731b17540f/0fff8671-fc51-4916-b30c-d1e3895b5ac8_iPhone_11_Pro_Max-3-FilesChanged.png/460x0w.webp'
  ]
}
```

## Explanation

```js
{
  name: 'GitHub', // App name
  tagline: 'Projects, ideas, & code to go', // App tagline (seen below the app name)
  seller: 'GitHub', // Name of company or individual selling the app
  category: 'Developer Tools', // App store category
  description: 'There’s a lot you can do on GitHub that doesn’t require a complex development environment – like sharing feedback on a design discussion, or reviewing a few lines of code. GitHub for iOS lets you move work forward wherever you are. Stay in touch with your team, triage issues, and even merge, right from the app. We’re making these tasks easy for you to perform, no matter where you work, with a beautifully native experience.You can use GitHub for iOS to:• Browse your latest notifications• Read, react, and reply to Issues and Pull Requests• Review and merge Pull Requests• Organize Issues with labels, assignees, projects, and more• Browse your files and code• Discover new and trending repositories———Terms of Service: https://docs.github.com/en/github/site-policy/github-terms-of-servicePrivacy Policy: https://docs.github.com/en/github/site-policy/github-privacy-statement', // App store description
  price: 'Free', // Price of the app
  rating: '4.8', // Overall rating of the app
  size: '68.1 MB', // Size of the app
  latestVersion: '1.42.0', // Latest version of the app
  whatsNew: `What's new:• Filter discussions by label to find what you need.• View media files in full screen to get a closer look.• Locked Issue or Pull request shows "Locked" badge in the header.• Support theme context for images in Markdown.Bug fixes:• Hide commit button in the code suggestion when the user doesn't have permission to commit.• Closed issues now appear purple, just as merged pull requests do.`, // Changelog of the latest version
  screenshots: [
    'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/5f/f6/23/5ff623d7-1b29-2cec-5f91-19f78798dbc7/0d601e76-462d-4c99-a03a-cf8082e699e6_iPhone_11_Pro_Max-0-Home.png/460x0w.webp',
    'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/c0/5b/2c/c05b2c16-d2dd-0124-1856-e71481ecbf5a/18504a48-10e5-4777-9264-1d134bd83651_iPhone_11_Pro_Max-1-Inbox.png/460x0w.webp',
    'https://is2-ssl.mzstatic.com/image/thumb/PurpleSource114/v4/bb/b6/c4/bbb6c444-4ac1-9be7-7637-3ac914f52775/93f99d06-3926-431e-b1b1-26b2d0da3e27_iPhone_11_Pro_Max-2-PullRequest.png/460x0w.webp',
    'https://is3-ssl.mzstatic.com/image/thumb/PurpleSource124/v4/4b/8f/25/4b8f259c-5885-7a9e-6f8a-61731b17540f/0fff8671-fc51-4916-b30c-d1e3895b5ac8_iPhone_11_Pro_Max-3-FilesChanged.png/460x0w.webp'
  ] // Screenshots of the app
}
```

## Example
The following example is very oversimplied but gives a rough idea on how to implement it in your [discord.js v13](https://discord.js.org) bot:

```js
const { getApp } = require('apurijoho');

<Client>.on('messageCreate', async message => {
    
});
```
