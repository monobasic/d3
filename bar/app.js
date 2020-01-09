const data = [];

for (var i = 0; i < 20; i++) {
  data.push(Math.floor(d3.randomUniform(1, 100)()));
}

d3.select('#chart')
  .selectAll('div')
  .data(data)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', d => {
    var height = d * 3;

    return height + 'px';
  });