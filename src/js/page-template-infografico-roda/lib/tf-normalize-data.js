const normalizeData = function (entities) {
	return entities.map(entity => {

		entity['Quando sua organização surgiu?'] = entity['Quando sua organização surgiu?'] || (new Date()).getFullYear()

		return entity
	})
}

module.exports = normalizeData
