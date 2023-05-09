import * as Module from "../utils/utils.js";
import * as treemapUtils from "../utils/treemapUtils.js";

let node1, node2 = "";

$(document).ready(function () {
  node1 = localStorage.getItem('node1');
  node2 = localStorage.getItem('node2');
  //console.log("node1: ", node1, "node2: ", node2);
});

var i = 0;
var root;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", Module.width_c + Module.margin.right + Module.margin.left)
  .attr("height", Module.height_c + Module.margin.top + Module.margin.bottom)
  .append("g")
  .attr("transform", "translate(" + Module.margin.left + "," + Module.margin.top + ")");


d3.json("../../data/stockholm.json").then(function (data) {

  //console.log("Data: ", data);

  root = d3.hierarchy(data).sum(function (d) {
    return d.value;
  });

  //console.log("Root: ", root);
  update(root);
});


function update(root){ 

  var tree = d3.treemap().size([Module.width_c, Module.height_c])
    .padding(2)(root);
  
  var nodes = tree.descendants();
  //console.log("Nodes", nodes);


  // -----------------  Nodes -------------

  // Give nodes id
  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  var nodeEnter = node
    .enter()
    .append("g")
    .on("mouseout", function () {
        return Module.colorNodes(node1, node2);
      })
    .on("mouseover", Module.mouseoverDescendants)
    .on("mousemove", Module.mousemove)
    .attr("cursor", "pointer");
  
  //console.log("nodeEnter: ", nodeEnter);
  
  // Node attribute/style
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("x", function (d) { return treemapUtils.getMeasurments2("x", d); })
    .attr("y", function (d) { return treemapUtils.getMeasurments2("y", d); })
    .attr("width", function (d) { return treemapUtils.getMeasurments("width", d); })
    .attr("height", function (d) { return treemapUtils.getMeasurments("height", d); })
    .style("fill", function (d) {
      if (d.data.name === node1 || d.data.name === node2) {
        return "#fdb863";
      } else {
        return Module.color(d.depth);
      } })
    .attr("stroke", "white").attr('stroke-width', '0.4');
  
  
  // text labels on node
  node
    .enter()
    .append("text")
    .attr("class", "node")
    .attr("x", function (d) { return d.x0 + 8; })
    .attr("y", treemapUtils.y)
    .attr("dy", "0.35em")
    .style("font", treemapUtils.font)
    .style("font-weight", treemapUtils.fontWeight)
    .text(function (d) {
      return Module.splitString(d)
    });
  
  
Module.initZoom();
}



