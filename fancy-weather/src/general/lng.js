export function getLanguage() {
	return [ 'Eng', 'Rus', 'Blr' ].indexOf(localStorage.getItem('lang'));
}
