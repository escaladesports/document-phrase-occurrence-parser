import { join } from 'path'
import glob from 'globby'
import { fromFileWithPath } from 'textract'

function extractPromise(path) {
	return new Promise((resolve, reject) => {
		fromFileWithPath(path, (err, text) => {
			if (err) return reject(err)
			resolve(text)
		})
	})
}

export default async function(options){
	console.log(`Reading all docs...`)
	const paths = await glob([
		join(options.input, `**/*.doc`),
		join(options.input, `**/*.docx`),
		join(options.input, `**/*.pdf`),
	])
	const res = await Promise.all(paths.map(path => {
		return extractPromise(path)
	}))
	const obj = {}
	paths.forEach((path, key) => {
		obj[path.replace(options.input + '/', '')] = res[key]
	})
	console.log(`Read all docs`)
	return obj
}