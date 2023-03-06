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
            parent: "C",
            children:[]
          }
        ]
        },
        {
          name: "D",
          parent: "A",
          children:[]
        },
      ],
    },
    {
      name: "B",
      parent:"Root",
      children: [
        {
          name: "E",
          parent: "B",
          children:[]
        },
      ]
    },
  ],
};

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


update(root);

// Update
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

  // enter new nodes at parents previous pos, grouping on DOM
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
    .style("fill", "steelblue");

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
    .attr("transform", function (d) {
      return "translate(" + d.y + ", " + d.x + ")";
    });

  
  nodeUpdate
    .select("circle.node")
    .attr("r", 10)//radius 
    .on("mouseout", mouseout)
    .on("mouseover", mouseover)
    .attr("cursor", "pointer");



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
    .attr("d", function (d) {
      var o = { x: source.x0, y: source.y };
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
    d.x0 = d.x;
    d.y0 = d.y;
  });


  function mouseover(event, d) {

    //reset all nodes color
    d3.selectAll("circle").style("fill", "green");// alla noder som inte select, green
    d3.selectAll("path").style("stroke", "#c3c3c3");// alla links som inte har koppling, grå
    
    var name_ = d.data.name;
    console.log("over node, name_ : ", name_)
    
    var myNodeSelection = d3.selectAll("circle.node").filter(d => d.data.name === name_);
    //console.log("myNodeSelection: ",myNodeSelection);
    var descendants = myNodeSelection.datum().descendants();
    console.log("descendants: ",descendants);

    node.style("fill", (d => descendants.includes(d) ? "pink" : null));
    node.select("circle").style("stroke", (d => descendants.includes(d) ? "yellow" : null));
    var length = descendants.length;
    console.log("length: ", length);
    var i = length - 1;
    console.log("descendants last: ", descendants[i].data.name);


    while (i >= 0) {
      
      d3.selectAll("#node" + d.id).style("fill", "pink");

      // LINKS FUNGERAR INTE ÄN
      console.log("descendants[i]: ", descendants[i].data.name);
      //d3.selectAll("#link" + descendants[i].data.parent.id + "-" + descendants[i].data.id).style("stroke", "pink").style("stroke-width", 4);
      d3.selectAll("#link" +  descendants[i].data.parent.id + "-" + descendants[i].data.id).style("stroke", "pink").style("stroke-width", 4);
      console.log("descendants[i].parent.name: ", descendants[i].data.parent);
      console.log("d : ", d.data.name);

      d = descendants[--i]//iterate through nodes
      console.log("i: ", i);
      
      if (i <0) {
        break;
      } else {
        
       console.log("after descendants[i]:", descendants[i].data.parent);
      }
      
    }// end while

    /*
    while(d.data.children != "null") {
      d3.selectAll("#node" + d.id).style("fill", "pink")
      if (d.children != "null") {
        // links between nodes --> highlight in pink
        d3.selectAll("#link" + d.children.id + "-" + d.id).style("stroke", "pink").style("stroke-width", 4);
      }//end if

      d = d.children;//iterate through nodes

    }*/

    /*
    if (d.data.children == "null") {
      d3.selectAll("#node" + d.id).style("fill", "pink")
    }//end if*/
    
    
  }

  function mouseout(event, d) {
    console.log("out node: ", d.data.name);

    /*
    while(d.parent) {
      d3.selectAll("#node" + d.id).style("fill", "yellow")
      if (d.parent != "null") {
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#c3c3c3").style("stroke-width", 2);;
      }//end if

      d = d.parent;//iterate through nodes 
    }

    if (d.data.parent == "null") {
      d3.selectAll("#node" + d.id).style("fill", "yellow")
    }//end if*/
  }


  // new children toogle (expand/collapse), onclik on node
  function click(event, d) {
    console.log("CLICK");
    update(d);
  }
}
