import meow from 'meow'
import readDocs from './read-docs'

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

async function parseDocs(){
	const contents = await readDocs(cli.flags)
	console.log(contents)
}

parseDocs()
