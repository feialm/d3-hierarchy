var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
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
   .attr("transform", function (d) { return `translate(${d.y0},${d.x0})`;});
  
    nodeEnter
      .append("rect")
      .attr("class", "node")
      .attr("id", function (d) { return "node" + d.id })//TEST
      //.attr("x", function (d) { return d.x1 - d.x0; })
      //.attr("y", function (d) { return d.y1 - d.y0;})
      .attr("width", function (d) { return d.y1 - d.y0 - 1; })
      .attr("height", function (d) { return rectHeight(d); })
      .attr("fill", function (d) {return color(d.depth);})
      .style("cursor", "pointer")
      .on("click", clicked);
  
    // Labels for nodes
  const text = nodeEnter.append("text")
      .style("user-select", "none")
      .attr("pointer-events", "none")
      .attr("x", 4)
    .attr("y", 17)
   .attr("fill-opacity", function (d) { return +labelVisible(d); });
  
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

  function clicked(event, d) {
    console.log("Clicked", d.data)
    d3.selectAll("#node" + d.id).style("fill", "red");
  }

};

  function rectHeight(d) {
    return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
  }

  function labelVisible(d) {
    return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
  }
