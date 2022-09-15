/**
 * Retorna el id de la cançó i l'idioma.
 * Components on s'executa: "numeros.vue"
 * 
 * @param {*} context 
 * @param {string} payload.llibre - llibre triat
 * @param {number} payload.numero - numero teclejat
 * @return {id}  - Id de la cançó
 */
export function actObtenirIdCansoIdioma (context, payload) {
	console.log("payload", payload);

	const arrKeys = context.getters.getArrKeysCansoner	// array de keys del cansoner
	const objCansoner = context.state.objCansoner
	let objIdCansoIdiomaTrobats = {idCanso: null, idioma: null}
	
	arrKeys.forEach( (key) => {
		
		const arrIdiomes = Object.keys( objCansoner[key] )	// array d'idiomes que te la cançó
		// console.log(arrIdiomes);
		const arrIdiomesTrobats = arrIdiomes.filter ( (idioma) => {
			// console.log(objCansoner[key][idioma]);
			return objCansoner[key][idioma].cansoner.numero === parseInt(payload.numero) && 
				  	 objCansoner[key][idioma].cansoner.nom === payload.llibre
		})
		
		// if ( arrIdiomesTrobats.length > 0 ) {
		// 	console.log("CANÇÓ TROBADA:")
		// 	console.log(objCansoner[key])
		// }

		switch (arrIdiomesTrobats.length){
			case 0:  // no s'ha trobat la cançó
				break
			case 1: // s'ha trobat la cançó en un unic llibre i per tant, en un unic idioma
				objIdCansoIdiomaTrobats = { idCanso: key, idioma: arrIdiomesTrobats[0] }
				break
			case 2: // s'ha trobat la cançó en 2 llibres i, per tant en 2 idiomes. L'usuari haurà de triar quin idioma vol
				objIdCansoIdiomaTrobats = { idCanso: key, idioma: "escollir idioma"}
		}
	})

	return objIdCansoIdiomaTrobats


	
}









// ======================

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


