import * as Module from "./utils/utils.js";
import * as treemapUtils from "./utils/treemapUtils.js";

var i = 0;
var root;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", Module.width_c + Module.margin.right + Module.margin.left)
  .attr("height", Module.height_c + Module.margin.top + Module.margin.bottom)
  .append("g")
  .attr("transform", "translate(" + Module.margin.left + "," + Module.margin.top + ")");


d3.json("../data/stockholm.json").then(function (data) {

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
    .attr("class", "node")
    .on("mouseout", Module.mouseoutAncestor)
    .on("mouseover", Module.mouseoverAncestor)
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
    .style("fill", function (d) { return Module.color(d.depth); });

  
  
  // Labels for nodes
  nodeEnter
    .append("text")
    .attr("dy", "0.35em")
    .attr("x", function (d) {return d.x0+8;})
    .attr("y", function (d) {
      if (d.data.colname == null) {
        return d.y0+5;
      }
      if (d.data.colname == "level2") {
        return d.y0+15;
      }
      if(d.data.colname == "level3") {
        return d.y0+20;
      }
      if(d.data.colname == "level4") {
        return d.y0+25;
      }
      if(d.data.colname == "level5") {
        return d.y0+27;
      }
    })
    .text(function (d) {
      return d.data.name;
    })
  
}
