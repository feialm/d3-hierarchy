import * as Module from "./utils/utils.js";

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


d3.json("../data/stockholm.json").then(function (data) {

// using parent-child relationships to
// assigns data to hierarchy, parent, child, height, depth
root = d3.hierarchy(data, function (d) {
  return d.children;
});

root.x0 = Module.height_a / 2;
root.y0 = 0;

console.log("ROOT: ", root);

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
    .on("click", click);

  // node attribute/style
  nodeEnter
    .append("circle")
    .attr("class", "node")
    .attr("id", function(d){return "node" + d.id})//TEST
    .attr("r", 0)
    .style("fill", "steelblue");

  // Labels for nodes
  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("transform", function (d) {
      return d.children || d._children ? "rotate(0)" : "translate(0,15) rotate(90)";
    })
    .attr("y", function (d) {
      return d.children || d._children ? -13 : 20;
    })
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
      // place of text depending on if node has children or not (leaf node)
    })
    .text(function (d) {
      return d.children || d._children ? d.data.name : "";//hämtar namnet på noden
    });

  
  // Update node
  var nodeUpdate = nodeEnter.merge(node);

  // update node attributes
  nodeUpdate
    .attr("transform", function (d) {
      return "translate(" + d.x*1.5 + ", " + d.y/1.5 + ")";
    });

  
  nodeUpdate
    .select("circle.node")
    .attr("r", 10)//radius 
    .style("stroke", "steelblue")
    .on("mouseout", mouseout)
    .on("mouseover", mouseover)
    .on("mousemove", Module.mousemove)
    .attr("cursor", "pointer");



  //----------------- Links -----------------------

  // links
  // curved diagonal path from parent to child nodes
  // om dy byter plats på x och y --> vertical tree
  function diagonal(s, d) {

    let sx = s.x*1.5; let sy = s.y / 1.5;
    let dy = d.y / 1.5; let dx = d.x*1.5;

    let path = `M ${sx} ${sy}
      C ${(sx + dx) / 2} ${sy}
        ${(sx + dx) / 2} ${dy}
        ${dx} ${dy}`;
    return path;
  }


  var links = treeData.descendants().slice(1);
  
  // Updates links
  var link = svg.selectAll("path.link").data(links, function (d) {
    return d.id;
  });

  var linkEnter = link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .attr("id", function(d){
      return("link" + d.parent.id + "-" + d.id);//TEST
    })
    .attr("d", function (d) {
      var o = { x: source.y0/1.5, y: source.x/1.5 };
      return diagonal(o, o);
    });
  
  // update link
  var linkUpdate = linkEnter.merge(link);

  // transition back to parent element position
  linkUpdate
    .attr("d", function (d) {
      return diagonal(d, d.parent);
    });

  
  // Stores old position for transition
  nodes.forEach(function (d) {
    d.x0 = d.x/1.5;
    d.y0 = d.y/1.5;
  });

//------------- Functions --------------


  function mouseover(event, d) {
    console.log("over node: ", d.data.name);
    //reset all nodes color
    d3.selectAll("circle").style("fill", "green");// alla noder som inte select, green
    d3.selectAll("path").style("stroke", "#c3c3c3");// alla links som inte har koppling, grå
    
    while(d.parent) {
      d3.selectAll("#node" + d.id).style("fill", "red")
      if (d.parent != "null") {
        // links between nodes --> highlight in red
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "red").style("stroke-width", 4);
      }//end if

      d = d.parent;//iterate through nodes  
    }

    if (d.data.parent == "null") {
      d3.selectAll("#node" + d.id).style("fill", "red")
    }//end if
  }

  function mouseout(event,d){
    console.log("out node: ", d.data.name);

    while(d.parent) {
      d3.selectAll("#node" + d.id).style("fill", "yellow")
      if (d.parent != "null") {
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#c3c3c3").style("stroke-width", 2);
      }//end if

      d = d.parent;//iterate through nodes 
    }

    if (d.data.parent == "null") {
      d3.selectAll("#node" + d.id).style("fill", "yellow")
    }//end if
  }


  // new children toogle, onclik on node
  function click(event, d) {
    console.log("CLICK ", d.data.name);
    update(d);
  }
}
