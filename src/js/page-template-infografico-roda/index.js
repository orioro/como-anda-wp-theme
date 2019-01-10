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

    // open criteria
    setTimeout(() => {
      app.ui.questions.openQuestion(
        'Qual a abordagem da sua organização sobre o tema da mobilidade a pé?');
    }, 1000)

    setTimeout(() => {
      app.ui.questions.openQuestion(
        'Qual é a área de atuação da sua organização?');
    }, 2000)

    setTimeout(() => {
      // deselect one by one all options for
      // 'Qual a abordagem da sua organização sobre o tema da mobilidade a pé?'
      
      var question = 'Qual a abordagem da sua organização sobre o tema da mobilidade a pé?';
      
      var current = app.services.questionLinkFilter.get(question);
      
      // invert order of removal
      current = current.concat([]);
      current.reverse();
      
      current.forEach(function (opt, index) {
        app.services.questionLinkFilter.arrayRemove(question, opt);
      });

      app.services.entityLinkFilter.set('_id', [
        'Cidade Ativa'.replace(/\W+/g, '-').toLowerCase(),
        'Corrida Amiga'.replace(/\W+/g, '-').toLowerCase(),
      ]);
    }, 3000)


    

    /**
     * Initialize intro
     */
    // require('./ui/intro')(app, options);
  })
  
});