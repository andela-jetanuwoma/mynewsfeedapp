[![Build Status](https://travis-ci.org/andela-jetanuwoma/mynewsfeedapp.svg?branch=develop)](https://travis-ci.org/andela-jetanuwoma/mynewsfeedapp)
[![Coverage Status](https://coveralls.io/repos/github/andela-jetanuwoma/mynewsfeedapp/badge.svg?branch=implement-feedback)](https://coveralls.io/github/andela-jetanuwoma/mynewsfeedapp?branch=implement-feedback)
# News Headlines

## Description

This news feed application helps you get news from various news from over 70 news sources
It also enables you save your favorites news sources for easy checkout

## Table of Contents

  1. [Technology](#technology)
  1. [Installation and setup](#installation-and-setup).
  1. [contribute](#contribute)
## Technology

This project uses a host of modern technologies. The core ones are:

- ECMAScript 6: Also known as ES2015, this is the newest version of Javascript with next-generation features like arrow functions, generators, enhanced object literals, 
spread operators and more. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.

- [NodeJS](https://nodejs.org): NodeJS is a server-side JavaScript runtime engine built 
on Chrome's V8 JavaScript engine. It is lightweight, efficient and greatly used in building web apps. Please visit [this link](https://nodejs.org) for more details.

- [React](https://facebook.github.io/react/) and [ReactDOM](https://facebook.github.io/react/docs/react-dom.html): 
These were developed by Facebook and are used for building web pages that are structured as a collection of components. These components are kept as independent as possible. See [this link](https://facebook.github.io/react/).

- [The Flux architecture](https://facebook.github.io/flux/): This is a design architecture for building stable web apps with, among other things, a unidirectional flow of data. See [this link](https://facebook.github.io/flux/) 
for details.


## Installation and setup

Here are the steps you need to follow to run this project on your computer:
- **Install NodeJS**: You may visit [this link](https://nodejs.org/en/download/) for complete 
instructions on installing NodeJS on your computer.

- **Open a terminal/command prompt** on your computer and `cd` into your preferred path/location.

- **Clone this repo**: Enter this command in the terminal:

``` bash
git clone  https://github.com/andela-jetanuwoma/mynewsfeedapp.git
```

- **Install dependencies** : Do so by running the following command:

``` bash
npm install
```
Note: `npm` is a component of NodeJS that serves as its package manager. So, it comes along with installing NodeJS.

- **Build the project**: This will compile all the project's source code into HTML, CSS and JS files. In 
the terminal/command prompt, enter the following command:

``` bash
npm run build
```

- **Run the project**: This will run the project on your computer so that you can browse it yourself. In the 
terminal/command prompt, enter the following command:

``` bash
npm start
```

- **Open a web browser of your choice and visit `http://localhost:3000`**

## Documentaion
This project is well documented and its very useful if you want to contribute or just want to know how it is being built

The documentation is generated with JSDOC3 and grunt

To get the documentation in Web format
- **Install Grunt Globally**: To install grunt on you computer open
terminal/command prompt, enter the following command:

 ``` bash
npm install grunt -g
```
- **Generate the documentation**: From your terminal/command prompt, 
enter the following command:
 ``` bash
grunt jsdoc
```

Then go to the root directory open the doc/index.html in any of your favourite browser

----
## Contribute

If you are interested in contributing to development of News Headlines, that's really great!

Follow the instructions below to contribute.

- Fork the repository

- Make your change

- Commit your change to your forked repository 

- Provide a detailed commit description 

- Create a pull request

----
