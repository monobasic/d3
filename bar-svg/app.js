const data = [];
const chartWidth = 800;
const chartHeight = 400;
const barPadding = 5;
const barCount = Math.floor(d3.randomUniform(10, 30)());

for (var i = 0; i < barCount; i++) {
  data.push(Math.floor(d3.randomUniform(1, 100)()));
}

// Create SVG
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight);


// Bind data and create bars
svg
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function (d, i) {
    return i * (chartWidth / data.length);
  })
  .attr('y', function (d) {
    return chartHeight - d;
  })
  .attr('width', chartWidth / data.length - barPadding)
  .attr('height', function (d) {
    return d + 'px';
  })

