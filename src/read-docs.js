import { join } from 'path'
import glob from 'globby'
import WordExtractor from 'word-extractor'
import PdfReader from 'pdfreader'

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
		new PdfReader().parseFileItems(path, (err, item) => {
			if(err) return reject(err)
			if(!item.text){
				console.log(`No text found in ${path}`)
				return resolve('')
			}
			resolve(item.text)
		})
	})
}

export default async function(options){
	console.log(`Reading all docs...`)
	const res = await Promise.all([
		//readWordDocs(options),
		readPdfDocs(options),
	])
	console.log(`Read all docs`)
	return res[0]
	const obj = {
		...res[0],
		...res[1],
	}
	return obj
}