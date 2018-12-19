import React from 'react'
import { render } from 'react-dom'
import Filter from '../lib/components/Filter'

const generateOptions = (quantity, prefix = '') => {
	return new Array(quantity).fill(0).map((item, index) => {
		return {
			id: `${prefix}--option-${index}`,
			label: `${prefix}--option-${index}`,
			value: false,
		}
	})
}

const makeOptionFromString = str => {
	return {
		id: str,
		label: str,
		value: false
	}
}

const FILTER_PARAMETERS = [
	{
		id: 'param-1',
		label: 'Param 1',
		allSelected: true,
		optionLists: [
			{
				id: 'param-1--list-1',
				heading: 'Param 1 first list',
				options: [
					{
						id: 'param-1--list-1--option-1',
						label: 'Param 1 - option 1',
						value: false,
					},
					{
						id: 'param-1--list-1--option-2',
						label: 'Param 1 - option 2',
						value: false,
					},
				],
			}
		]
	},
	{
		id: 'param-2',
		label: 'Param 2',
		allSelected: true,
		optionLists: [
			{
				id: 'param-2--list-1',
				heading: 'Param 2 first list',
				options: generateOptions(7),
			},
			{
				id: 'param-2--list-2',
				heading: 'Param 2 first list',
				options: generateOptions(7),
			}
		]
	},
	{
		id: 'param-3',
		label: 'Param 3',
		allSelected: true,
		optionLists: [
			{
				id: 'list-1',
				options: [
					'Acessibilidade',
					'Acesso ao lote',
					'Arborização',
					'Atividades comerciais (usos externos de restaurante, ambulantes)',
					'Conduta',
					'Esquina',
					'Execução e Manutenção das calçadas',
				].map(makeOptionFromString)
			},
			{
				id: 'list-2',
				options: [
					'Governança',
					'Inclinação da calçada',
					'Interferências e Mobiliário Urbano',
					'Largura da calçada',
					'Moderação de tráfego',
					'Modo de transporte não motorizado',
					'Obras e instalação de infraestrutura',
				].map(makeOptionFromString)
			}
		]
	},
]

document.addEventListener('DOMContentLoaded', e => {
	render(
		<Filter
			parameters={FILTER_PARAMETERS}
			onParameterSelectAll={parameterId => {
				console.log('onParameterSelectAll', parameterId)
			}}
			onParameterDeselectAll={parameterId => {
				console.log('onParameterDeselectAll', parameterId)
			}}
			onParameterChangeOption={(parameterId, listId, optionId, value) => {
				console.log('onParameterChangeOption', parameterId, listId, optionId, value)
			}}
		/>,
		document.getElementById('react-app-root')
	)
})

