import * as Module from "../utils/utils.js";
import * as icicleUtils from "../utils/icicleUtils.js";

var i = 0;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", Module.width_b + Module.margin.right + Module.margin.left)
  .attr("height", Module.height_b + Module.margin.top + Module.margin.bottom)
  .append("g")
  .attr("transform", "translate(" + Module.margin.left + "," + Module.margin.top + ")");


d3.json("../../data/introduction.json").then(function (data) {

  //console.log("DATA: ", data)
  const root = icicleUtils.partition(data, Module.width_b, Module.height_b);
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
   .attr("transform", function (d) { return `translate(${d.x0/1.5},${d.y0/2})`;});
  
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("width", function (d) { return icicleUtils.rectWidth(d); })
    .attr("height", function (d) { return icicleUtils.rectHeight(d); })
    .attr("fill", function (d) { return Module.color(d.depth); })
    .attr("stroke", "white").attr('stroke-width', '0.4')
    .style("cursor", "pointer")
    .on("mouseover", Module.mouseoverAncestor)
    .on("mouseout", Module.mouseoutAncestor)
    .on("mousemove", Module.mousemove)
    .attr("cursor", "pointer");
  

  
    // Labels for nodes
  const text = nodeEnter.append("text")
      .style("user-select", "none")
      .attr("pointer-events", "none")
      .attr("x", 4)
    .attr("y", 17)
   .attr("fill-opacity", function (d) { return +icicleUtils.labelVisible(d, Module.width_b); });
  
  text.append("tspan")
    .text(function (d) { return d.data.name; });
};

