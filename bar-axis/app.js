const margin = {
  left: 100,
  right: 20,
  top: 20,
  bottom: 100,
};
const data = [];
const chartWidth = 800 - margin.left - margin.right;
const chartHeight = 400 - margin.top - margin.bottom;
const barPadding = 5;
const barCount = Math.floor(d3.randomUniform(4, 30)());

for (var i = 0; i < barCount; i++) {
  data.push(Math.floor(d3.randomUniform(0, 800)()));
}

// Scales
var scaleX = d3.scaleLinear()
  .domain([0, barCount])
  .range([0, chartWidth]);

var scaleY = d3.scaleLinear()
  .domain([d3.min(data), d3.max(data)])
  .range([25, chartHeight]);

var scaleYInverted = d3.scaleLinear()
  .domain([d3.min(data), d3.max(data)])
  .range([chartHeight, 0]);

// Create SVG
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chartWidth + margin.left + margin.right)
  .attr('height', chartHeight + margin.top + margin.bottom);


// Axis
var axisX = d3.axisBottom()
  .scale(scaleX);

var axisY = d3.axisLeft()
  .scale(scaleYInverted);

svg.append('g')
  .call(axisX)
  .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + 30) + ')');

svg.append('g')
  .call(axisY)
  .attr('transform', 'translate(' + (margin.left - 10) + ',' + margin.top + ')');

// Create a group for all bars (to center)
var group = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// Bind data and create bars
group
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function (d, i) {
    return i * (chartWidth / data.length);
  })
  .attr('y', function (d) {
    return chartHeight - scaleY(d);
  })
  .attr('width', chartWidth / data.length - barPadding)
  .attr('height', function (d) {
    return scaleY(d) + 'px';
  })
  .attr('fill', '#7ED26D');

// Create labels
group
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(function (d) {
    return d;
  })
  .attr('x', function (d, i) {
    return i * (chartWidth / data.length) +
      (chartWidth / data.length - barPadding) / 2
  })
  .attr('y', function (d) {
    return chartHeight - scaleY(d) + 15;
  })
  .attr('font-size', '15px')
  .attr('fill', '#ffffff')
  .attr('text-anchor', 'middle')



