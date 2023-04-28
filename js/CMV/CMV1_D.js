import * as Module from "../utils/utils.js";
import * as nodeLink from "../utils/node-linkUtils.js";


// append svg-object to container in html-file
// g --> group, appends group element to svg
// move g to top-left-margin
var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", Module.width_a + Module.margin.right + Module.margin.left)
  .attr("height", Module.height_a + Module.margin.top + Module.margin.bottom)
  .append("g")
  .attr("transform", "translate(" + Module.margin.left + "," + (Module.margin.top+20)+ ")");

var i = 0;
var root;


d3.json("../../data/introduction.json").then(function (data) {

// using parent-child relationships to
// assigns data to hierarchy, parent, child, height, depth
root = d3.hierarchy(data, function (d) {
  return d.children;
});

root.x0 = Module.height_a / 2;
root.y0 = 0;

//console.log("ROOT: ", root);

  update(root);
});


function update(source) {
  // declare tree and its layout --> size
  var treemap = d3.tree().size([Module.height_a, Module.width_a]);

  // assign x,y pos for nodes
  var treeData = treemap(root);

  // tree layout
  // nodes
  var nodes = treeData.descendants();

  // normalize, fixed depth
  nodes.forEach(function (d) {
    d.y = d.depth * 180;
  });


  //----------------- Nodes -----------------------

  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  // enter new nodes at parents previous pos
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + source.x0 + ", " + source.y0 + ")";
    })
    .on("click", Module.click);

  // node attribute/style
  nodeEnter
    .append("circle")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("fill","#045a8d")
    .attr("r", 3);//radius

  // Labels for nodes
  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("y", -13)
    .attr("text-anchor", "end")
    .text(function (d) {
      if (d.parent == null) {
        return d.data.name;
      }
      return d.children || d._children ? Module.splitString(d) : "";//hämtar namnet på noden
    });

  
  // Update node
  var nodeUpdate = nodeEnter.merge(node);

  // update node attributes
  nodeUpdate
    .attr("transform", function (d) {
      return "translate(" + d.x*2 + ", " + d.y/1.5 + ")";
    });

  
  nodeUpdate
    .select("circle.node")
    .on("mouseout", nodeLink.mouseoutDescendants)
    .on("mouseover", nodeLink.mouseoverDescendants)
    .on("mousemove", Module.mousemove)
    .attr("cursor", "pointer");


  //----------------- Links -----------------------

  var links = treeData.descendants().slice(1);
  
  // Updates links
  var link = svg.selectAll("path.link").data(links, function (d) {
    return d.id;
  });

  var linkEnter = link
    .enter()
    .insert("line", "g")
    .attr("class", "link")
    .attr("id", function (d) {
      return ("link" + d.parent.id + "-" + d.id);//TEST
    });


  // update link
  var linkUpdate = linkEnter.merge(link);

  // transition back to parent element position
  linkUpdate
    .attr("x1", function (d) { return d.x*2; })
    .attr("y1", function (d) { return d.y/1.5; })
    .attr("x2", function (d) { return d.parent.x*2; })
    .attr("y2", function (d) { return d.parent.y/1.5; });
  
}

