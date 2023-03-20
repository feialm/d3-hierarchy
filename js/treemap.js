var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("flare.json").then(function (data) {

  console.log(data);

  const root = d3.hierarchy(data).sum(function(d){
    return d.size;
  });

  var tree = d3.treemap().size([width, height])
    .padding(2)(root);

  const color = d3.scaleOrdinal()
    .domain([0, 1000])
    .range(["#402D54", "#08306b"])
  

  var nodeEnter = svg.selectAll("rect")
    .data(tree.leaves())
    .join("rect")
    .attr("id",function(d){return "node" + d.id})
    .attr("x", function(d) { return d.x0;})
    .attr("y", function(d) {return d.y0;})
    .attr("width", function(d) { return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .style("fill", "#08306b")
    .on("click", function(d) {return console.log("CLICK", d.data.name); })
  
  
  nodeEnter
    .selectAll("text")
    .data(tree.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name })
      .attr("font-size", "15px")
      .attr("fill", "white")

})
