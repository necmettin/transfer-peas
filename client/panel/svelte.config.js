import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "index.html"
		})
	},
	trailingSlash: 'always',
	prerender: {
		default: true
	}
};

export default config;