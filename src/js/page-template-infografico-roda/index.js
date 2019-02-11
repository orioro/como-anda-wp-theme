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
    /**
     * Initialize services
     */
    require('./services/init')(app, options);
    
    /**
     * Initialize the ui
     */
    require('./ui/init')(app, options);
    
    const yearsExtent = d3.extent(options.entities, function (d) {
      return parseInt(d['Quando sua organização surgiu?'], 10);
    });

    // select all entities and use 'byEntity' criteria for link filter
    app.services.entityLinkFilter.set(
      '_id',
      options.entities.map(function (e) {
        return e._id;
      })
    );

    app.ui.yearBrush.moveBrush(yearsExtent);

    // let startYear = yearsExtent[0];
    // let endYear   = yearsExtent[1];
    
    // let timePerYear = 5000 / (endYear - startYear);
    
    // let current = startYear;
    
    // while (current < endYear) {
      
    //   setTimeout(
    //     app.ui.yearBrush.moveBrush.bind(
    //       app.ui.yearBrush,
    //       [startYear, current]
    //     ),
    //     (current - startYear) * timePerYear
    //   );
      
    //   current += 1;
    // }

    /**
     * Initialize intro
     */
    // require('./ui/intro')(app, options);
  })
  
});