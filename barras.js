d3.json("./barras.json", function(datos) {
  var margins = {
    "top": 10,
    "left": 10,
    "right": 10,
    "bottom": 10,
    "padding": 1
  },
  width = 800 - margins.left - margins.right,
  height = 800 - margins.top - margins.bottom

  var svg = d3.select('div#barras')
              .append('svg')
              .attr('width', width)
              .attr('height', height);
  
  var yScale = d3.scaleLinear()
                 .domain(d3.extent(datos, d => d.total))
                 .range([margins.bottom, height]);              

  var xScale = d3.scaleBand()
               .domain(datos.map(function (d) { return(d.nombre) }))
               .range([0, width]);
  
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale).ticks('5');

  svg.append('g')
     .call(xAxis)
     .attr('transform', 'translate(0, ' + (height - margins.padding) +')')
     .selectAll("text")
		 .style("text-anchor", "end")
     .attr("dx", "-.8em")
     .attr("transform", "rotate(-45)");

  svg.append('g').call(yAxis)

  svg.selectAll('rect')
     .data(datos)
     .enter()
     .append('rect')
     .attr('x', function(d, i) { return i * (width / datos.length); })
     .attr('y', function (d) { return height - yScale(d.total) })
     .attr('width', function (d) { return (width / datos.length) - margins.padding;})
     .attr('height', function (d) { return yScale(d.total); })
     .attr('fill', 'blue')
  
  svg.selectAll('text')
     .attr('text', function(d) { return d.nombre; })

})
