const assert = require('assert')
const path = require('path')
const fs = require('fs')
const { parseString } = require('xml2js')

const scrapedData = require('./data/news-scraped.json')
const str = fs.readFileSync(path.join(__dirname, 'data/comoanda.wordpress.2019-01-07-attachment-news.xml'), 'utf8')

parseString(str, (err, res) => {
	if (err) {
		console.warn(err)
		return
	}

	const newsItems = res.rss.channel[0].item
		.filter(item => item['wp:post_type'][0] === 'news')
		.map(item => {
			const meta = ['link', 'excerpt', 'image'].reduce((acc, targetMetaKey) => {
				const meta = item['wp:postmeta'].find(m => m['wp:meta_key'][0] === targetMetaKey)

				return meta ? {
					...acc,
					[targetMetaKey]: meta['wp:meta_value'][0]
				} : acc
			}, {})

			return {
				title: item.title[0],
				link: item.link[0],
				pubDate: item.pubDate[0],
				creator: item['dc:creator'][0],
				// guid: item.guid[0]['_'],
				post_id: item['wp:post_id'][0],
				post_date: item['wp:post_date'][0],
				post_name: item['wp:post_name'][0],
				status: item['wp:status'][0],

				...meta
			}
		})
		.map(item => {
			const correspondingScrapedItem = scrapedData.find(i => i.url === item.link)

			if (!correspondingScrapedItem) {
				throw new Error('Missing correspondingScrapedItem')
			}

			return {
				...item,
				imgUrl: correspondingScrapedItem.imgUrl.replace('http://comoanda.org.br/v2-staging', 'http://localhost:8888/como-anda-v2'),
			}
		})

	console.log(JSON.stringify(newsItems, null, '  '))
})
