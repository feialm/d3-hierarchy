var treeData = {
  name: "Root",
  parent: "null",
  children: [
    {
      name: "A",
      parent:"Root",
      children: [
        {
        name: "C",
        parent:"A",
        children: [
          {
            name: "F",
            parent:"C"
          }
        ]
        },
        {
        name: "D",
        parent:"A"
        },
      ],
    },
    {
      name: "B",
      parent:"Root",
      children: [
        {
        name: "E",
        parent:"B"
        },
      ]
    },
  ],
};

console.log("LADDA DATA", treeData);


var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// append svg-object to container in html-file
// g --> group, appends group element to svg
// move g to top-left-margin
var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var i = 0;
var duration = 210;
var root;

// declare tree and its layout --> size
var treemap = d3.tree().size([height, width]);

// using parent-child relationships to
// assigns data to hierarchy, parent, child, height, depth
root = d3.hierarchy(treeData, function (d) {
  return d.children;
});

root.x0 = height / 2;
root.y0 = 0;

console.log("ROOT: ", root);

// collapse nodes after the second level
// lek med det här och se om man kan ändra detta
//root.children.forEach(collapse);


update(root);

/*
// Collapse the node and all it's children
// lek med det här och se om man kan ändra detta
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}*/


function update(source) {

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
      return "translate(" + source.y0 + ", " + source.x0 + ")";
    })
    .on("click", click);

  // node attribute/style
  nodeEnter
    .append("circle")
    .attr("class", "node")
    .attr("id", function(d){return "node" + d.id})//TEST
    .attr("r", 0)
    .style("fill", function (d) {
      return d._children ? "red" : "steelblue";//collapsed/expanded
    });

  // Labels for nodes
  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("x", function (d) {
      return d.children || d._children ? -13 : 13;
    })
    .attr("text-anchor", function (d) {
      return d.children || d._children ? "end" : "start";
      // place of text depending on if node has children or not (leaf node)
    })
    .text(function (d) {
      return d.data.name;//hämtar namnet på noden
    });

  
  // Update node
  var nodeUpdate = nodeEnter.merge(node);

  // update node attributes
  nodeUpdate
    .transition()
    .duration(duration)
    .attr("transform", function (d) {
      return "translate(" + d.y + ", " + d.x + ")";
    });

  
  nodeUpdate
    .select("circle.node")
    .attr("r", 10)//radius 
    .style("stroke", function(d){
    return d._children ? "red" : "steelblue";//change stroke color depening on expand/collapse tree
    })
    .on("mouseout", mouseout)
    .on("mouseover", mouseover)
    .attr("cursor", "pointer");

  nodeExit = node
    .exit()
    .transition()
    .duration(duration)// animering speed nodes
    .attr("transform", function (d) {
      return "translate(" + source.y + "," + source.x + ")";
    })
    .remove();//remove node
  

  // size of nodes in animation before removed
  // on exit
  nodeExit.select("circle").attr("r", 1e-6);
  nodeExit.select("text").style("fill-opacity", 1e-6);

// ---------- testar links - node highlight grejs här -------
  /*
  var thisNode = node;
  d3.selectAll(".link")
    .style("stroke", function (d) {
      return d.source === thisNode || d.target === thisNode ? "yellow" : "green";
    });*/

  //----------------- Links -----------------------

  // links
  // curved diagonal path from parent to child nodes
  // om dy byter plats på x och y --> vertical tree
  function diagonal(s, d) {
    path = `M ${s.y} ${s.x}
      C ${(s.y + d.y) / 2} ${s.x}
        ${(s.y + d.y) / 2} ${d.x}
        ${d.y} ${d.x}`;
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
    .style("stroke", function(d){
      return d.children ? "green" : "purple";
    })
    .attr("d", function (d) {
      var o = { x: source.x0, y: source.y };
      return diagonal(o, o);
    });
  
  // update link
  var linkUpdate = linkEnter.merge(link);

  // transition back to parent element position
  linkUpdate
    .transition()
    .duration(duration)//animation speed links/edges
    .attr("d", function (d) {
      return diagonal(d, d.parent);
    });

  
  // remove links
  var linkExit = link
    .exit()
    .transition()
    .duration(duration)//animation speed links/edges
    .attr("d", function (d) {
    var o = { x: source.x0, y: source.y0 };
    return diagonal(o, o);
    })
    .remove();

  
  // Stores old position for transition
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });


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
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#c3c3c3").style("stroke-width", 2);;
      }//end if

      d = d.parent;//iterate through nodes 
    }

    if (d.data.parent == "null") {
      d3.selectAll("#node" + d.id).style("fill", "yellow")
    }//end if
  }


  // new children toogle, onclik on node
  function click(event, d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }
}
