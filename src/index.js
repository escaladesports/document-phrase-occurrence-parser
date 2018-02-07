import meow from 'meow'
import fetchDocs from './fetch-docs'
import parseDocs from './parse-docs'

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
	const contents = await fetchDocs(cli.flags)
	const matches = await parseDocs(contents, cli.flags)
	console.log(matches)
}

op()
