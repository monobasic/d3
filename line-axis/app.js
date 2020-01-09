function newData(lineCount, points) {
  return d3.range(lineCount).map(function () {
    return d3.range(points).map(function (item, index) {
      return { x: index, y: Math.random() * 100 };
    });
  });
}

var data = newData(3, 20);
var dataFlattened = [...data[0], ...data[1], ...data[2]];

const margin = {
  left: 100,
  right: 20,
  top: 20,
  bottom: 100,
};
const chartWidth = 800 - margin.left - margin.right;
const chartHeight = 400 - margin.top - margin.bottom;

// var time_parse = d3.timeParse('%Y');
// var time_format = d3.timeFormat('%Y');

// // Format Dates
// data.forEach(function (e, i) {
//   data[i].date = time_parse(e.date);
// });

// Scales
var scaleX = d3.scaleLinear()
  .domain([d3.min(dataFlattened, function (d) { return d.x; }), d3.max(dataFlattened, function (d) { return d.x; })])
  .range([0, chartWidth]);

var scaleY = d3.scaleLinear()
  .domain([d3.min(dataFlattened, function (d) { return d.y; }), d3.max(dataFlattened, function (d) { return d.y; })])
  .range([1, chartHeight]);

var scaleYInverted = d3.scaleLinear()
  .domain([d3.min(dataFlattened, function (d) { return d.y; }), d3.max(dataFlattened, function (d) { return d.y; })])
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


var lineFunc = d3.line()
  .x(function (d) { return scaleX(d.x) })
  .y(function (d) { return scaleYInverted(d.y) })

// Bind data and create line
group.append('path')
  .attr('d', lineFunc(data[0]))
  .attr('stroke', '#0093C5')
  .attr('stroke-width', 5)
  .attr('fill', 'none');

group.append('path')
  .attr('d', lineFunc(data[1]))
  .attr('stroke', '#006888')
  .attr('stroke-width', 5)
  .attr('fill', 'none');

group.append('path')
  .attr('d', lineFunc(data[2]))
  .attr('stroke', '#92B050')
  .attr('stroke-width', 5)
  .attr('fill', 'none');

// Create labels
// group
//   .selectAll('text')
//   .data(data)
//   .enter()
//   .append('text')
//   .text(function (d) {
//     return d;
//   })
//   .attr('x', function (d, i) {
//     return i * (chartWidth / data.length) +
//       (chartWidth / data.length - barPadding) / 2
//   })
//   .attr('y', function (d) {
//     return chartHeight - scaleY(d) + 15;
//   })
//   .attr('font-size', '15px')
//   .attr('fill', '#ffffff')
//   .attr('text-anchor', 'middle')



