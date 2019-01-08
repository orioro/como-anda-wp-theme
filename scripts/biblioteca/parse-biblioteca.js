const assert = require('assert')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const parse = promisify(require('csv-parse'))
const stringify = promisify(require('csv-stringify'))

const TRABALHOS_ACADEMICOS_PATH = path.join(__dirname, 'source/biblioteca--trabalhos-academicos.csv')
const PUBLICACOES_PATH =  path.join(__dirname, 'source/biblioteca--guias-manuais-cartilhas.csv')

const arrayAddUnique = (arr, item) => {
	return arr.indexOf(item) === -1 ? [...arr, item] : arr
}

Promise.all([
	parse(
		fs.readFileSync(TRABALHOS_ACADEMICOS_PATH),
		{
			columns: true,
			delimiter: ','
		}
	),
	parse(
		fs.readFileSync(PUBLICACOES_PATH),
		{
			columns: true,
			delimiter: ','
		}
	)
])
.then(([trabalhosAcademicos, publicacoes]) => {

	trabalhosAcademicos = trabalhosAcademicos.map(t => {
		return {
			...t,
			_tipo: 'Trabalho acadêmico',
		}
	})

	publicacoes = publicacoes.map(p => {
		return {
			...p,
			_tipo: 'Publicação',
		}
	})

	const trabalhosAcademicosProperties = Object.keys(trabalhosAcademicos[0])
	const publicacoesProperties = Object.keys(publicacoes[0])

	const properties = publicacoesProperties.reduce((acc, prop) => {
		return arrayAddUnique(acc, prop)
	}, trabalhosAcademicosProperties)

	const allItems = trabalhosAcademicos.concat(publicacoes).map(item => {
		return properties.reduce((acc, property) => {
			return {
				...acc,
				[property]: item[property]
			}
		}, {})
	})

	assert.equal(trabalhosAcademicos.length + publicacoes.length, allItems.length)
	// console.log(trabalhosAcademicosProperties.length, publicacoesProperties.length, properties.length)
	// console.log(JSON.stringify(allItems, null, '  '))
	
	return allItems
})
.then(merged => {
	return stringify(merged, {
		header: true,
		columns: Object.keys(merged[0])
	})
})
.then(csv => {
	console.log(csv)
})



