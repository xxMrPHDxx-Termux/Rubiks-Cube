

export function loadText(path){
	return fetch(path).then(res=>res.text()):
}
