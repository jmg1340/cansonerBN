/**
 * Obtenció de array de claus o keys de les propietats del objecte cansoner
 * @param {*} state 
 * @returns {Object} - array de keys
 */
export function getArrKeysCansoner ( state ) {
	return Object.keys(state.objCansoner)
}




/** 
	Retorna {} on cada propietat es el numero de la canso del state.llibre i cada valor 
	es un altre {} amb el ID de la canso i l'idioma
*/
export function getObjCansonsLlibre ( state ) {

	let obj = {}

	for (let idCanso in state.objCansoner) {
		Object.keys(state.objCansoner[idCanso]).forEach( function(idioma, index, array) {
			if ( state.objCansoner[idCanso][idioma].cansoner.nom == state.llibre ) {
				
				// Al haver cançons que tenen mateix mateix numero i mateix cansoner, la següent expressio
				// ja no em serveix, ja que no poden haver propietats duplicades. Nomes agafaria una de les 2 cançons (la última)
				
				// obj[state.objCansoner[idCanso][idioma].cansoner.numero] = {idCanso, idioma}
			
				let propietat = state.objCansoner[idCanso][idioma].cansoner.numero + "_" + idioma
				obj[propietat] = {idCanso, idioma}


			}
		})	
	}

	return obj

}
