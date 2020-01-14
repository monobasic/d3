
// Inputs
var investmentStrategy;
var timeHorizont;
var investmentAmount = 30000;


var pn = new Perlin(Math.random());

function mockData(lineCount, points) {
  return d3.range(lineCount).map(function (current) {
    return d3.range(points).map(function (item, index) {
      return { x: index, y: (pn.noise(index / 100, 0, 0)) * 1000 * (current * index + 100) };
    });
  });
}

var data = mockData(3, Math.floor(d3.randomUniform(20, 50)()));
var dataFlattened = [...data[0], ...data[1], ...data[2]];

console.log(dataFlattened);


const margin = {
  left: 10,
  right: 105,
  top: 0,
  bottom: 40,
};

// var time_parse = d3.timeParse('%Y');
// var time_format = d3.timeFormat('%Y');

// // Format Dates
// data.forEach(function (e, i) {
//   data[i].date = time_parse(e.date);
// });

// Areas
// var area = d3.svg.area()
//   .x(function (d) { return scaleX(d.year); })
//   .y0(function (d) { return scaleY(d.blueValue); })
//   .y1(function (d) { return scaleY(d.redValue); });




function drawChart() {

  var currentWidth = parseInt(d3.select('#chart').style('width'), 10);

  const chartWidth = currentWidth - margin.left - margin.right;
  const chartHeight = 400 - margin.top - margin.bottom;

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


  // Remove previous chart
  d3.select("svg").remove();

  // Create SVG
  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth + margin.left + margin.right)
    .attr('height', chartHeight + margin.top + margin.bottom);

  // Axis
  var axisX = d3.axisBottom()
    .scale(scaleX)
    .tickSize(0);

  var axisY = d3.axisRight()
    .scale(scaleYInverted);

  svg.append('g')
    .call(axisX)
    .attr("class", "axis-x")
    .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + 20) + ')');

  svg.append('g')
    .call(axisY)
    .attr("class", "axis-y")
    .attr('transform', 'translate(' + (chartWidth + 30) + ',' + margin.top + ')');

  // Draw Background
  svg.append('rect')
    .attr('height', chartHeight)
    .attr('width', chartWidth)
    .attr('fill', '#ECECEC')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  // Gridlines
  // add the X gridlines
  svg.append("g")
    .attr("class", "grid-lines")
    .attr('transform', 'translate(' + (margin.left) + ',' + (chartHeight) + ')')
    .call(d3.axisBottom(scaleX)
      .tickSize(-chartHeight)
      .tickSizeOuter(0)
      .tickFormat('')
    )

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


}

drawChart();


window.addEventListener('resize', drawChart);