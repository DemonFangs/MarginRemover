// ==UserScript==
// @name         Manganelo-No-margin
// @namespace    https://github.com/DemonFangs/MarginRemover
// @version      0.1
// @description  A simple TamperMonkey script to remove margins between pages for some webtoons for specific webpages.
// @copyright    2019+, DemonFangs
// @grant        none
// @match *://*manganelo.com/chapter/*/*
// @match *://*mangakakalot.com/chapter/*/*
// ==/UserScript==

var excludeTitles = ['Skip Beat'];

var notExcluded = function () {
    var regex = new RegExp(excludeTitles.reduce(function(prev, curr){ return prev + (curr.includes(' ') ? '(' + curr + ')' : curr) }, '').toLocaleLowerCase());
    return !regex.test(document.title.toLocaleLowerCase());
}

var conditions = [
    {
        title: 'manganelo',
        elementValuePair: [
            ['.container-chapter-reader img', 'margin: 0 auto'],
            ['.container-chapter-reader div', ''],
        ],
    },
    {
        title: 'mangakakalot',
        elementValuePair: [
            ['.vung-doc img', 'margin: 0 auto'],
        ],
    },
];

var removeTopMargins = function(title, pairs) {
    if (location.href.includes(title) && notExcluded()) {
        pairs.forEach(function(pair){
            var query = pair[0];
            var value = pair[1];
            Array.from(document.querySelectorAll(query)).forEach(function(element) { element.style = value; })
        });
    }
}

var executeScript = function() {
    conditions.forEach(function(condition){ removeTopMargins(condition.title, condition.elementValuePair) });
}

console.log('Manganelo-No-margin script: ', location.href);
console.log('Title excluded?: ', !notExcluded());
executeScript();