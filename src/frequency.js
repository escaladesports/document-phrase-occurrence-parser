export default function(obj){
	let res = []
	for(let i in obj){
		res.push({
			path: i,
			words: obj[i]
		})
	}
	res.sort((a, b) => {
		let aTotal = 0
		let bTotal = 0
		for(let i in a.words){
			aTotal += a.words[i]
		}
		for(let i in b.words){
			bTotal += b.words[i]
		}
		if(aTotal < bTotal) return 1
		if(aTotal > bTotal) return -1
		return 0
	})
	return res
}