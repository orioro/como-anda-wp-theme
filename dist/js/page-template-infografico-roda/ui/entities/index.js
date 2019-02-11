const d3 = require('d3');

const computeEntitiesLayout = require('./layout');

const aux = require('../auxiliary');

const MAX_NOME_CHAR_COUNT = 30;

module.exports = function (app, options) {
  
  // SETUP
  
  // global variables
  var twoPI = (2 * Math.PI);
  var entitiesArcStartAngle = twoPI * 5/9;
  var entitiesArcEndAngle   = twoPI * 11/9;
  
  /**
   * Generators
   */
  var drawEntityArc = d3.arc()
    .innerRadius(options.innerRadius)
    .outerRadius(options.outerRadius);
  
  var entityTextFontSize = aux.arcTextFontSize({
    min: 7,
    max: 12,
    radius: options.outerRadius,
  });
  
  var entityTextAnchor = aux.arcTextAnchor({});
  
  var entityTextTransform = aux.arcTextTransform({
    radius: options.outerRadius + 23,
  });
  
  /**
   * Draw the full entities arc
   */
  app.container.append('path')
    .attr('id', 'entities-bg-arc')
    .attr('d', drawEntityArc({
      startAngle: entitiesArcStartAngle,
      endAngle: entitiesArcEndAngle 
    }))
    .attr('fill', 'transparent');
  
  /**
   * Draw group element that wraps all state arcs
   */
  var stateArcContainer = app.container
    .append('g')
    .attr('id', 'state-arc-container');
  
  /**
   * Draw a group element that wraps all entity-arcs
   */
  var entityArcContainer = app.container
    .append('g')
    .attr('id', 'entity-arc-container');
  
  var uiCurrentLayout;
  
  function update(entities) {
    
    var entityLayout = computeEntitiesLayout(entities, {
      startAngle: entitiesArcStartAngle,
      endAngle: entitiesArcEndAngle,
      padAngle: twoPI / 600,
    });
    
    uiCurrentLayout = entityLayout;
    
    // bind data to DOM elements
    // ATTENTION: draw state arcs before entity arcs
    // so that entity arcs always appear over state arcs
    var stateArcs = stateArcContainer
      .selectAll('g.state-arc')
      .data(entityLayout.stateArcs, function stateId(d) {
        return d.data.key;
      });
    
    var entityArcs = entityArcContainer
      .selectAll('g.entity-arc')
      .data(entityLayout.entityArcs, function entityId(d) {
        return d.data._id;
      });
    
    ///////////
    // UPDATE
    stateArcs
      .select('path')
      .attr('d', drawEntityArc);
    stateArcs
      .select('text')
      .style('text-anchor', function(d) {
        var midAngle = ((d.startAngle + d.endAngle) / 2) - d.padAngle;
        return midAngle > Math.PI && midAngle <= 2 * Math.PI ? 'end' : null;
      })
      .attr('transform', function(d) {
        
        var midAngle = ((d.startAngle + d.endAngle) / 2) - d.padAngle;
        
        return 'rotate(' + (midAngle * 180 / Math.PI - 90) + ')'
            + 'translate(' + (options.innerRadius + 26) + ')'
            + (midAngle > Math.PI && midAngle <= 2 * Math.PI ? 'rotate(180)' : '');
      });
    
    entityArcs
      .select('path')
      .attr('d', drawEntityArc);
    entityArcs
      .select('text')
      .style('text-anchor', entityTextAnchor)
      .style('font-size', entityTextFontSize)
      .attr('transform', entityTextTransform)
    
    //////////
    // ENTER
    var stateEnter = stateArcs
      .enter()
      .append('g')
      .attr('class', 'state-arc');
    stateEnter
      .append('path')
      .attr('d', drawEntityArc);
    stateEnter
      .append('text')
      .text(function (d) {
        return d.data.key === 'undefined' ? '--' : d.data.key;
      })
      .style('font-size', 10)
      .style('text-anchor', function(d) {
        var midAngle = ((d.startAngle + d.endAngle) / 2) - d.padAngle;
        return midAngle > Math.PI && midAngle <= 2 * Math.PI ? 'end' : null;
      })
      .attr('transform', function(d) {
        
        var midAngle = ((d.startAngle + d.endAngle) / 2) - d.padAngle;
        
        return 'rotate(' + (midAngle * 180 / Math.PI - 90) + ')'
            + 'translate(' + (options.innerRadius + 26) + ')'
            + (midAngle > Math.PI && midAngle <= 2 * Math.PI ? 'rotate(180)' : '');
      })
      .on('click', function (d) {
        
        var estado = d.data.key;
        
        var filteredEntities = app.services.entityDataStore.applyFilter({
          'Estado:': [estado],
        });
        
        var current = app.services.entityLinkFilter.get('_id') || [];
        
        if (!d.active) {
          /**
           * Flag indicating the state toggle status is active
           */
          d.active = true;
          
          app.services.entityLinkFilter.set(
            '_id',
            current.concat(filteredEntities.map(function (entity) {
              return entity._id;
            }))
          );
        } else {
          
          d.active = false;
          
          app.services.entityLinkFilter.set(
            '_id',
            current.filter(function (_id) {
              // pass only entities not in the filteredEntities array
              var shouldExit = filteredEntities.some(function (e) {
                return e._id === _id;
              });
              
              return !shouldExit;
            })
          );
        }
      });
    
    var entityEnter = entityArcs
      .enter()
      .append('g')
      .attr('class', 'entity-arc')
      .attr('id', function (d) {
        return 'entity-' + d.data._id;
      });
    
    entityEnter
      .append('path')
      .attr('d', drawEntityArc)
      .attr('fill', 'transparent')
      .on('click', function (d) {
        // toggle the selected status of the filter
        var exists;
        var arr = app.services.entityLinkFilter.get('_id');
        if (!arr) {
          exists = false;
        } else {
          exists = arr.indexOf(d.data._id) !== -1;
        }
        
        if (exists) {
          app.services.entityLinkFilter.arrayRemove('_id', d.data._id);
        } else {
          app.services.entityLinkFilter.arrayPush('_id', d.data._id);
        }
      });
    entityEnter
      .append('text')
      .text(function (d) {
        
        var nome = d.data['Qual o nome da organização da qual faz parte?'];
        
        if (nome.length > MAX_NOME_CHAR_COUNT) {
          nome = nome.substr(0, MAX_NOME_CHAR_COUNT - 1 - 3) + '...';
        }
        
        return nome;
      })
      .on('click', function (d) {
        app.ui.entityDetails.show(d.data._id);
      })
      .style('font-size', entityTextFontSize)
      .style('text-anchor', entityTextAnchor)
      .attr('transform', entityTextTransform);
    
    ////////////
    // EXIT
    var stateExit = stateArcs.exit();
    
    // // animate arc path
    // stateExit
    //   .select('path')
    //   .transition()
    //   .duration(100)
    //   .style('opacity', 0)
    //   .attrTween('d', function (d, i) {
        
    //     var midAngle = (d.startAngle + d.endAngle) / 2
        
    //     var interpolateStart = d3.interpolate(d.startAngle, midAngle);
    //     var interpolateEnd   = d3.interpolate(d.endAngle, midAngle);
        
    //     return function (t) {
    //       var arcPath = drawEntityArc({
    //         startAngle: interpolateStart(t),
    //         endAngle: interpolateEnd(t),
    //       });
    //       return arcPath;
    //     };
    //   });
    
    // // animate arc text
    // stateExit
    //   .select('text')
    //   .transition()
    //   .duration(100)
    //   .style('opacity', 0);
    
    // wait for animation to end before removing the arc group element
    stateExit
      .remove();
    
    // entity exit
    var entityExit = entityArcs.exit();
    entityExit
      .remove();
  }
  
  return {
    update: update,
    updateActiveEntities: function (activeEntities, activeClassName) {
      activeClassName = activeClassName || 'active';
      
      entityArcContainer.selectAll('g.entity-arc').each(function (d) {
        var isActive = activeEntities.some(function (entity) {
          return d.data._type === 'entity' && entity._id === d.data._id;
        });
        
        if (isActive) {
          d3.select(this).classed(activeClassName, true);
        } else {
          d3.select(this).classed(activeClassName, false);
        }
      });
    },
    computeItemPosition: function (requestedItem) {
      var item;
      
      if (requestedItem.type === 'entity') {
        item = uiCurrentLayout.entityArcs.find(function (arc) {
          return arc.data._id === requestedItem._id;
        });
      }
      
      if (item) {
        return {
          angle: (item.startAngle + item.endAngle) / 2,
          radius: options.innerRadius
        };
      } else {
        return false;
      }
    },
    
    hideText: function () {
      stateArcContainer.classed('hide-text', true);
      entityArcContainer.classed('hide-text', true);
    },
    
    showText: function () {
      stateArcContainer.classed('hide-text', false);
      entityArcContainer.classed('hide-text', false);
    },
    
    activate: function (requestedItem) {
      entityArcContainer
        .select('#entity-' + requestedItem._id)
        .classed('active', true);
    },
    
    deactivate: function (requestedItem) {
      entityArcContainer
        .select('#entity-' + requestedItem._id)
        .classed('active', false);
    }
  };
};