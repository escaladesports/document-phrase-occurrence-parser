import { join } from 'path'
import glob from 'globby'
import WordExtractor from 'word-extractor'
import { pdfToText } from 'pdf-to-text'

async function readWordDocs(options){
	console.log(`Reading word docs...`)
	const paths = await glob([
		join(options.input, `**/*.doc`),
		join(options.input, `**/*.docx`),
	])
	const contents = await Promise.all(paths.map(path => {
		return readWord(path)
	}))
	const obj = {}
	paths.forEach((path, key) => {
		path = path.replace(options.input + '/', '')
		obj[path] = contents[key]
	})
	return obj
}

async function readPdfDocs(options){
	console.log(`Reading pdf docs...`)
	const paths = await glob([
		join(options.input, `**/*.pdf`)
	])
	const contents = await Promise.all(paths.map(path => {
		return readPdf(path)
	}))
	const obj = {}
	paths.forEach((path, key) => {
		path = path.replace(options.input + '/', '')
		obj[path] = contents[key]
	})
	return obj
}

function readWord(path){
	return new Promise((resolve, reject) => {
		let extractor = new WordExtractor()
		let extracted = extractor.extract(path)
		extracted.then(doc => {
				resolve(doc.getBody())
			})
			.catch(err => {
				reject(err)
			})
	})
}

function readPdf(path){
	return new Promise((resolve, reject) => {
		pdfToText(path, (err, data) => {
			if(err) return reject(err)
			resolve(data)
		})
	})
}

export default async function(options){
	console.log(`Reading all docs...`)
	const res = await Promise.all([
		readWordDocs(options),
		readPdfDocs(options),
	])
	console.log(`Read all docs`)
	const obj = {
		...res[0],
		...res[1],
	}
	return obj
}