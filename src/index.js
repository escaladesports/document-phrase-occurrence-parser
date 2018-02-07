import meow from 'meow'
import fetchDocs from './fetch-docs'
import parseDocs from './parse-docs'
import frequency from './frequency'

const cli = meow(`
	Usage
	  $ dpop <options>

	Options
	  --phrases, -p    Comma separated list of phrases to search for
	  --input, -i      Input directory, defaults to current
	  --frequency, -f  Rank by frequency of all words
`, {
	flags: {
		phrases: {
			type: `string`,
			alias: `p`
		},
		input: {
			type: `string`,
			alias: `i`,
			default: process.cwd()
		},
		frequency: {
			type: `boolean`,
			alias: `f`,
			default: false
		}
	}
})

// Format input
if (!cli.flags.phrases){
	console.log('--phrases option is required')
	process.exit(0)
}
let phrases = cli.flags.phrases.split(',')
phrases = phrases.map(str => {
	return str.trim()
})
cli.flags.phrases = phrases

async function op(){
	let contents = await fetchDocs(cli.flags)
	let matches = await parseDocs(contents, cli.flags)
	matches = frequency(matches)
	matches.forEach(match => {
		console.log('')
		console.log(match.path)
		for(let i in match.words){
			console.log(`"${i}": ${match.words[i]}`)
		}
	})
}

op()
