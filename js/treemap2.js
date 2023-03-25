var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var i = 0;
var root;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// prepare a color scale
const color = d3.scaleOrdinal()
  .domain(["level1", "level2", "level3"])
  .range(["#2b8cbe", "#a6bddb", "#ece7f2"]);
  

d3.json("data2.json").then(function (data) {

  //console.log("Data: ", data);

  root = d3.hierarchy(data).sum(function (d) {
    return d.value;
  });

  //console.log("Root: ", root);
  update(root);
});


function update(root){ 

  var tree = d3.treemap().size([width, height])
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
    .on("mouseout", mouseout)
    .on("mouseover", mouseover)
  
  //console.log("nodeEnter: ", nodeEnter);
  
  // Node attribute/style
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("x", function (d) { return getMeasurments2("x", d); })
    .attr("y", function (d) { return getMeasurments2("y", d);})
    .attr("width", function (d) { return getMeasurments("width", d);})
    .attr("height", function (d) { return getMeasurments("height", d); })
    .style("fill", function (d) { return color(d.data.colname); })
    .style("stroke", "orange");
  
  
  // Labels for nodes
  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("x", function (d) {return d.x0+8;})
    .attr("y", function (d) {
      if (d.data.colname == null) {
        return d.y0+5;
      }
      if (d.data.colname == "level2") {
        return d.y0+15;
      }
      if(d.data.colname == "level3") {
        return d.y0+30;
      }
    })
    .text(function (d) {
      return d.data.name;
    })
  
}

// ---------------- Brushing and Linking Functions ------------------

function getSiblings(d) {
    return {first: d.parent.children.length, second: d.parent.children };
}


function mouseover(event, d) {
   
  console.log("over node: ", d.data.name);
  var counter = 0;

  if (d.parent === null) {
     d3.selectAll("#node" + d.id).style("fill", "red");
  } else {
    var lengthSibling = getSiblings(d).first;
    var arraySibling = getSiblings(d).second;

    while (counter < lengthSibling) {
      d = arraySibling[counter];
      d3.selectAll("#node" + d.id).style("fill", "red");
        counter++; // iterate thorugh nodes
    }
  }
}

function mouseout(event, d) {

  console.log("out node: ", d.data.name);
  var counter = 0;

  if (d.parent === null) {
     d3.selectAll("#node" + d.id).style("fill", function (d) { return color(d.data.colname); });
  } else {
    var lengthSibling = getSiblings(d).first;
    var arraySibling = getSiblings(d).second;

    while (counter < lengthSibling) {
      d = arraySibling[counter];
      d3.selectAll("#node" + d.id).style("fill", function (d) { return color(d.data.colname); });
        counter++; // iterate thorugh nodes
    }
  }
}



// ---------------- Other Functions ------------------

function getMeasurments(type, d) {
  var d1, d0;
  if (type == "height") {
    d1 = d.y1;
    d0 = d.y0;
  } else {
    d1 = d.x1;
    d0 = d.x0;
  }
  if (d.data.colname == null) {
    return d1 - d0;
  }
  if (d.data.colname == "level2") {
    return (d1 - d0)/1.1;
  }
  if(d.data.colname == "level3") {
    return (d1 - d0)/1.5;
  }
  return null;//if error
}

function getMeasurments2(type, d) {
  var d0;
  if (type == "y") {
    d0 = d.y0;
  } else {
    d0 = d.x0;
  }
  if (d.data.colname == null) {
    return d0;
  }
  if (d.data.colname == "level2") {
    if (type == "y") { return d0 + 10;}
    return d0+2;
  }
  if (d.data.colname == "level3") {
    if (type == "y") { return d0 + 20;}
    return d0+5;
  }
  return null;//if error
}

