import * as Module from "./utils/utils.js";
import * as icicleUtils from "./utils/icicleUtils.js";

var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 660 - margin.left - margin.right;
var height = 900 - margin.top - margin.bottom;
var i = 0;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("data2.json").then(function (data) {

  //console.log("DATA: ", data)
  const root = icicleUtils.partition(data, width, height);
  //console.log("ROOT: ", root)

  update(root);
});
  

function update(root) {

  var nodes = root.descendants();
  //console.log(nodes);

    // -----------------  Nodes -------------

  // Give nodes id
  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });
  //console.log("Nodes", nodes);
  
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .join("g")
   .attr("transform", function (d) { return `translate(${d.x0},${d.y0})`;});
  
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("width", function (d) { return d.x1 - d.x0 - 1; })
    .attr("height", function (d) { return icicleUtils.rectHeight(d); })
    .attr("fill", function (d) { return Module.color(d.depth); })
    .style("cursor", "pointer")
    .on("mouseover", Module.mouseoverSiblings)
    .on("mouseout", Module.mouseoutSiblings);
  
    // Labels for nodes
  const text = nodeEnter.append("text")
      .style("user-select", "none")
      .attr("pointer-events", "none")
      .attr("x", 4)
    .attr("y", 17)
   .attr("fill-opacity", function (d) { return +icicleUtils.labelVisible(d, width); });
  
  text.append("tspan")
    .text(function (d) { return d.data.name; });
};

