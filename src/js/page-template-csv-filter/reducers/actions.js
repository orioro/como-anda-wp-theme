import 'whatwg-fetch'
// papaparser is lighter than csv-parse
// import parse from 'csv-parse'
import Papa from 'papaparse'

export const loadCSV = csvUrl => dispatch => {
	dispatch({
		type: 'LOAD_DATA_REQUEST'
	})

	return window.fetch(csvUrl).then(response => {
		return response.text()
	})
	.then(csv => {
		return Papa.parse(csv, {
			header: true,
			delimiter: ','
		})
	})
	.then(res => {
		dispatch({
			type: 'SET_ENTRIES',
			payload: {
				entries: res.data.map((entry, index) => {
					return {
						...entry,
						_id: index,
					}
				})
			},
		})

		dispatch({
			type: 'LOAD_DATA_SUCCESS'
		})
	})
	.catch(err => {
		dispatch({
			type: 'LOAD_DATA_FAILURE'
		})
	})
}
