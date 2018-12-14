const gulp = require('gulp')

require('./gulp/less')(gulp)
require('./gulp/javascript')(gulp)
require('./gulp/develop')(gulp)
require('./gulp/distribute')(gulp)
