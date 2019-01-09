const d3 = require('d3');

const displayQuestions = require('./data/display-questions');
const tfParseData = require('./lib/tf-parse-data-v2');
const questionsParser = require('./lib/questions-parser');

window.addEventListener('DOMContentLoaded', function () {
  
  var app     = window.app = {};
  var options = {};
  
  app.config = JSON.parse(jQuery('#ca-infografico-roda-config').html())

  // load data
  d3.json(app.config.typeform_data_url, function (err, TF_DATA) {
    
    // parse the data
    options.displayQuestions = questionsParser(displayQuestions).parse();
    options.entities = tfParseData(TF_DATA);
    
    console.log('options', options);
    /**
     * Initialize services
     */
    require('./services/init')(app, options);
    
    /**
     * Initialize the ui
     */
    require('./ui/init')(app, options);
    
    /**
     * Initialize intro
     */
    require('./ui/intro')(app, options);
  })
  
});