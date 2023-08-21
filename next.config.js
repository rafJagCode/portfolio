module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['.'],
    prependData: `
			@import "scss/variables.scss";
		`,
  },
};
