let regBreak = /\n/g

function getFrequency(phrase, string){
	string = string.toLowerCase()
	phrase = phrase.toLowerCase()
	string = string.replace(regBreak, ' ')
	return string.split(phrase).length - 1
}

export default function(docs, options){
	let ranking = {}
	for (let i in docs){
		let path = i
		let contents = docs[i]
		ranking[path] = {}
		options.phrases.forEach(phrase => {
			ranking[path][phrase] = getFrequency(phrase, contents)
		})
	}
	return ranking
}