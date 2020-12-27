export function actMostrarCanso (context, payload) {
	/**
		Localitzar el IdCanço i idioma corresponent al numero de la canso
		del llibre triat
	*/


	/* 1) modifiquem el state.llibre amb el valor del payload */
	context.commit("mutModificarLlibre", payload.llibre)

	

	/* 2) A partir de getObjCansonsLlibre (getters) modifiquem el
			state.idCansoner i state.idioma segons el numero de canso
			del cansoner
	*/
	console.log("getObjCansonsLlibre")
	console.log(context.getters.getObjCansonsLlibre)
	context.commit("mutModificarIdCanso", context.getters.getObjCansonsLlibre[payload.numero_idioma].idCanso)
	context.commit("mutModificarIdioma", context.getters.getObjCansonsLlibre[payload.numero_idioma].idioma)


}


export function actModificarLlibre (context, llibre) {
	context.commit("mutModificarLlibre", llibre)
}




export function actActivarOpcionsCanso (context, true_false ) {
	context.commit("mutActivarOpcionsCanso", true_false)
}





export function actSubstituirFavorits (context, arr ) {
	context.commit("mutSubstituirFavorits", arr)
}

export function actAfegirFavorits (context, obj ) {
	context.commit("mutAfegirFavorits", obj)
}

export function actTreureFavorits (context, index ) {
	context.commit("mutTreureFavorits", index)
}


