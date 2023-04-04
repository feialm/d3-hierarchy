import * as Module from "./utils/utils.js";
import * as icicleUtils from "./utils/icicleUtils.js";

var i = 0;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", Module.width_b + Module.margin.right + Module.margin.left)
  .attr("height", Module.height_b + Module.margin.top + Module.margin.bottom)
  .append("g")
  .attr("transform", "translate(" + Module.margin.left + "," + Module.margin.top + ")");


d3.json("../data/stockholm.json").then(function (data) {

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
   .attr("transform", function (d) { return `translate(${d.x0},${d.y0})`;});
  
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("width", function (d) { return d.x1 - d.x0; })
    .attr("height", function (d) { return icicleUtils.rectHeight(d); })
    .attr("fill", function (d) { return Module.color(d.depth); })
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

  /*
  const cell = svg
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", function (d) { return `translate(${d.y0},${d.x0})`;});

  const rect = cell.append("rect")
    .attr("width", function (d) { return d.y1 - d.y0 - 1; })
    .attr("height", function (d) { return rectHeight(d); })
    .attr("fill-opacity", 1)
      .attr("fill", function (d) {return color(d.depth);})
      .style("cursor", "pointer")
      .on("click", clicked);

  const text = cell.append("text")
      .style("user-select", "none")
      .attr("pointer-events", "none")
      .attr("x", 4)
      .attr("y", 17)
    .attr("fill-opacity", function (d) { return +labelVisible(d); });

  text.append("tspan")
    .text(function (d) { return d.data.name; });*/
  

  /*const tspan = text.append("tspan")
      .attr("fill-opacity", d => labelVisible(d) * 0.7)
    .text(function (d) { return ` ${format(d.value)}`; });*/

  // tooltip
  // cell.append("title")
  //   .text(function (d) { return `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`; });

};