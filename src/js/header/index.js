import $ from 'jquery'

$(() => {
	const $mainHeader = $('#main-header')
	const $window = $(window)
	const $scroller = $('body, html')

	const handleScroll = e => {
		if ($window.scrollTop() > 10) {
			
		}

	}

	$scroller.on('scroll', e => {
		console.log($window.scrollTop())
	})
})
