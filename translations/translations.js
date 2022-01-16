const defaultTranslation = 'pl';
const availableTranslations= ['pl', 'en'];
const translations =  {
	pl: {
		"NAVLINK_HOME": "Home",
		"NAVLINK_PROJECTS": "Moje Projekty",
		"NAVLINK_TECHNOLOGIES": "Technologie",
		"NAVLINK_CONTACT": "Kontakt",
		"HOME_CLOUD_HELLO": "Witaj!",
		"HOME_NAME": "Nazywam się ",
		"HOME_I_AM": "Jestem ",
		"HOME_PROFESSION": "Web Developerem",
	},
	en: {
		"NAVLINK_HOME": "Home",
		"NAVLINK_PROJECTS": "My Projects",
		"NAVLINK_TECHNOLOGIES": "Technologies",
		"NAVLINK_CONTACT": "Contact",
		"HOME_CLOUD_HELLO": "Hi!",
		"HOME_NAME": "My name is ",
		"HOME_I_AM": "I'am a ",
		"HOME_PROFESSION": "Web Developer",
	}
}

export { defaultTranslation, availableTranslations };
export default translations;