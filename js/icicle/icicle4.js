import * as Module from "../utils/utils.js";
import * as icicleUtils from "../utils/icicleUtils.js";

Module.whatFont("small");

let node1 = "";

$(document).ready(function () {
  node1 = localStorage.getItem('node1');
});

var i = 0;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", Module.width_b + Module.margin.right + Module.margin.left)
  .attr("height", Module.height_b + Module.margin.top + Module.margin.bottom)
  .append("g")
  .attr("transform", "translate(" + Module.margin.left + "," + Module.margin.top + ")");


d3.json("../../data/2dShapes.json").then(function (data) {

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
   .attr("transform", function (d) { return `translate(${d.x0*2},${d.y0/4})`;});
  
  var textEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .join("g")
   .attr("transform", function (d) { return `translate(${d.x0*2},${d.y0/4})`;});
  
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("width", function (d) { return icicleUtils.rectWidth(d); })
    .attr("height", function (d) { return icicleUtils.rectHeight(d); })
    .attr("fill", function (d) {
      if (d.data.name === node1) {
        return "#fdb863";
      } else {
        return Module.color(d.depth);
      }
    })
    .attr("stroke", "white" ).attr('stroke-width', '0.4')
    .style("cursor", "pointer")
    .on("mouseover", Module.mouseoverSiblings)
    .on("mouseout", function () {
        return Module.colorNodes(node1);
      })
    .on("mousemove", Module.mousemove)
    .attr("cursor", "pointer");
  

  
  // Labels for nodes
  const text = textEnter.append("text")
    .attr("id", function (d) { return "text" + d.id })//TEST
    .style("user-select", "none")
    .style("font", function (d) {
      if (d.data.name === node1) {
        return "18px sans-serif";
      } else {
        return "16px sans-serif";
      }
    })
    .style("font-weight", function (d) {
      if (d.data.name === node1) {
        return "bold";
      } else {
        return "normal";
      }
    })
    .attr("pointer-events", "none")
    .attr("x", 4)
    .attr("y", 17);
    //.attr("fill-opacity", function (d) { return +icicleUtils.labelVisible(d, Module.width_b); });

  text.append("tspan")
    .text(function (d) {
      if (d.data.name === node1) {
          return d.data.name;
        } else {
          return "";
    }
    });

Module.initZoom();
};

