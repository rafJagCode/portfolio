module.exports = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: ['.'],
		prependData: `
			@import "variables.scss";
		`,
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
  	},
};
