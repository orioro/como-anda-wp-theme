const path = require('path')
const fs = require('fs')

const fetch = require('node-fetch')
const cheerio = require('cheerio')

// const str = 'http://comoanda.org.br/v2-staging/wp-content/uploads/2016/04/1-HbgKZwYNUJVFXlsDkei1dg-300x200.jpeg'
const imgRegExp = /^(.+)?-\d+?x\d+?(\..+)$/

const scrape = url => {
	return fetch(url)
		.then(res => res.text())
		.then(html => cheerio.load(html))
		.then($ => {
			const $newsItems = Array.from($('a.news-item')).map($)

			return $newsItems.map($item => {
				const imgThumbUrl = $item.find('.news-item-picture > img').attr('src')
				const imgUrlMatch = imgThumbUrl.match(imgRegExp)

				return {
					url: $item.attr('href'),
					title: $item.find('.news-item-title').text(),
					date: $item.find('.news-item-date').text(),
					content: $item.find('.news-item-excerpt').text(),
					imgThumbUrl,
					imgUrl: imgUrlMatch[1] + imgUrlMatch[2],
				}
			})
		})
}

scrape('http://comoanda.org.br/v2-staging/news/').then(items => {
	console.log(JSON.stringify(items, null, '  '))
})
