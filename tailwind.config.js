/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./wp-templates/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				'tcci-orange-o50': 'rgba(240, 80, 34, .5)',
				'tcci-orange-o70': 'rgba(240, 80, 34, .7)',
				'tcci-orange': 'rgba(240, 80, 34, 1)',
				'tcci-light-orange': 'rgba(255, 244, 240)',
				'tcci-blue': '#002c47',
				'tcci-purple': '#b191c3',
				'tcci-purple-o70': 'rgba(177, 145, 195, .7)',
				'tcci-grey': '#ebebeb',
				'tcci-light-green': 'rgba(246, 255, 250, 0.5)',
				'tcci-light-red': 'rgba(255, 244, 244, 0.5)',
				'tcci-light-yellow': 'rgba(255, 251, 235, 0.5)',
				'tcci-black': 'rgb(26, 26, 26)',
				'tcci-origin-purple': '#9013fe',
				'tcci-origin-yellow': '#f5a623',
				'tcci-origin-cyan': '#50e3c2',
				'tcci-origin-red': '#d0021b',
			},
			screens: {
				hsm: {raw: '(max-height: 667px)'},
				'md769': '769px',
			},
			gridTemplateColumns: {
				'auto-fill-100': 'repeat(auto-fill, minmax(25rem, 1fr))',
				'auto-fill-80': 'repeat(auto-fill, minmax(20rem, 1fr))',
				'auto-fill-64': 'repeat(auto-fill, minmax(16rem, 1fr))',
				'auto-fill-48': 'repeat(auto-fill, minmax(12rem, 1fr))',
				'auto-fill-20': 'repeat(auto-fill, minmax(10.25rem, 1fr))'
			},
			backgroundImage: {
				'white-to-transparent': 'linear-gradient(75deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 33.33%,rgba(255,255,255,0) 66.67%, rgba(255,255,255,0) 100%)',
				'y-halation': 'linear-gradient(rgba(26,26,26,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(26,26,26,1) 100%)',
				'x-halation': 'linear-gradient(90deg, rgba(26,26,26,1) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(26,26,26,1) 100%)',
				'documentarie-header': 'linear-gradient(to bottom, rgba(0,0,0,.4), rgba(0,0,0,.4)), url(https://admin.cheninstitute.org/wp-content/uploads/2019/03/headerbgstill.jpg)',
			},
			keyframes: {
				textShowAndHide: {
					'0%': {
						'background-position-x': '100%'
					},
					'100%': {
						'background-position-x': '0%'
					}
				},
				bgHide: {
					'0%': {
						'background-color': 'rgba(0,0,0,1)'
					},
					'100%': {
						'background-color': 'rgba(0,0,0,0)'
					}
				}
			},
			backgroundSize: {
				'100%-90%': '100% 90%'
			},
			listStyleType: {
				underscore: '"- "',
				dash: '"- "',
				'long-dash': '"一  "'
			},
			fontFamily: {
				din: ['"din"', '"Source Sans Pro"', '"Helvetica Neue"', '"Helvetica"', '"Arial"', '"sans-serif"'],
				bebasNeue: ['"bebas-neue"', '"sans-serif"',"Helvetica Neue",'Helvetica','sans-serif !important'],
				Iowan: ["Iowan Old Style", 'sans-serif', 'Arial', "Helvetica Neue", 'Helvetica'],
			}
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp')
	],
}
