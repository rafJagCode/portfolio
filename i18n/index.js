var pl = require('./translation.pl.json');
var en = require('./translation.en.json');

const i18n = {
	translations: {
		'pl': pl,
		'en': en,
	},
	defaultLang: 'pl'
}

module.exports = i18n;