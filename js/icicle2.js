var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 660 - margin.left - margin.right;
var height = 900 - margin.top - margin.bottom;
var i = 0;

partition = data => {
  const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);  
  return d3.partition()
      .size([height, (root.height + 1) * width / 3])
    (root);
}

format = d3.format(",d")

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


const color = d3.scaleOrdinal()
  .domain(["0", "1", "2"])
  .range(["#2b8cbe", "#a6bddb", "#ece7f2"]);


d3.json("data2.json").then(function (data) {

  //console.log("DATA: ", data)
  const root = partition(data);
  //console.log("ROOT: ", root)

  update(root);
});
  

function update(root) {

  var nodes = root.descendants();
  console.log(nodes);

    // -----------------  Nodes -------------

  // Give nodes id
  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });
  console.log("Nodes", nodes);
  
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
    .attr("width", function (d) { return d.x1 - d.x0 - 1; })
    .attr("height", function (d) { return rectHeight(d); })
    .attr("fill", function (d) { return color(d.depth); })
    .style("cursor", "pointer")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
  
    // Labels for nodes
  const text = nodeEnter.append("text")
      .style("user-select", "none")
      .attr("pointer-events", "none")
      .attr("x", 4)
    .attr("y", 17)
   .attr("fill-opacity", function (d) { return +labelVisible(d); });
  
  text.append("tspan")
    .text(function (d) { return d.data.name; });


};

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
        counter++; // iterate through nodes
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
        counter++; // iterate through nodes
    }
  }
}

// ---------------- Other Functions ------------------

  function rectHeight(d) {
    return d.y1 - d.y0 - Math.min(1, (d.y1 - d.y0) / 2);
  }

  function labelVisible(d) {
    return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
  }
