export function mutModificarLlibre (state, llibre) {
	state.llibre = llibre
}

export function mutModificarIdCanso (state, idCanso) {
	console.log("MUT idCanso: " + idCanso)
	state.idCanso = idCanso
}

export function mutModificarIdioma (state, idioma) {
	console.log("MUT idioma: " + idioma)
	state.idioma = idioma
}

export function mutActivarOpcionsCanso (state, true_false) {
	state.activarOpcionsCanso = true_false
}





export function mutSubstituirFavorits (state, arr) {
	state.favorites = arr
}

export function mutAfegirFavorits (state, obj) {
	state.favorites.push( obj )
}

export function mutTreureFavorits (state, index) {
	state.favorites.splice(index, 1)
}


