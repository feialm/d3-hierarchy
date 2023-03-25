/*var treeData ={children:
[{name:"boss1",children:
[
{name:"mister_a",value:28,colname:"level3"},
{name:"mister_b",value:19,colname:"level3"},
{name:"mister_c",value:18,colname:"level3"}
]
,colname:"level2"},
{name:"boss2",children:
[
{name:"mister_d",value:14,colname:"level3"},
{name:"mister_e",value:11,colname:"level3"},
{name:"mister_f",value:15,colname:"level3"}
],
colname:"level2"},
{name:"boss3",children:
[
{name:"mister_g",value:10,colname:"level3"},
{name:"mister_h",value:13,colname:"level3"},
{name:"mister_j",value:25,colname:"level3"}

]
,colname:"level2"}],name:"CEO"}*/


var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var i = 0;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var root;

// prepare a color scale
const color = d3.scaleOrdinal()
  .domain(["level1", "level2", "level3"])
  .range(["#FEDD74", "#D18975", "#8FD175"]);
  

d3.json("data2.json").then(function (data) {

  console.log("Data: ", data);

  root = d3.hierarchy(data).sum(function (d) {
    return d.value;
  });

  console.log("Root: ", root);

  update(root);

});


function update(root){ 

  var tree = d3.treemap().size([width, height])
    .padding(2)(root);
  
  var nodes = tree.descendants();
  console.log("Nodes", nodes);


  // -----------------  Nodes -------------

  // Give nodes id
  var node = svg.selectAll("g.node").data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });

  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    //.on("mouseout", mouseout)
    .on("mouseover", mouseover)
  
  console.log("nodeEnter: ", nodeEnter);
  
  // Node attribute/style
  nodeEnter
    .append("rect")
    .attr("class", "node")
    .attr("id", function (d) { return "node" + d.id })//TEST
    .attr("x", function (d) {
      if (d.data.colname == null) {
        return d.x0;
      }
      if (d.data.colname == "level2") {
        return d.x0+2;
      }
      if (d.data.colname == "level3") {
        return d.x0+5;
      }
    })
    .attr("y", function (d) {
      if (d.data.colname == null) {
        return d.y0;
      }
      if (d.data.colname == "level2") {
        return d.y0+10;
      }
      if (d.data.colname == "level3") {
        return d.y0 + 20;
      }
    })
    .attr("width", function (d) {
      if (d.data.colname == null) {
        return d.x1 - d.x0;
      }
      if (d.data.colname == "level2") {
        return (d.x1 - d.x0)/1.1;
      }
      if (d.data.colname == "level3") {
        return (d.x1 - d.x0)/1.5;
      }
    })
    .attr("height", function (d) {
      if (d.data.colname == null) {
        return d.y1 - d.y0;
      }
      if (d.data.colname == "level2") {
        return (d.y1 - d.y0)/1.1;
      }
      if(d.data.colname == "level3") {
        return (d.y1 - d.y0)/1.5;
      }
    })
    .style("fill", function(d){return color(d.data.colname)})
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
  
  

  /*
  // nu fungerar lite saker här när man skriver function(event,d) istället
  // kolla skillnaden på root.leaves() och tree.leaves()
  svg.selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr("id",function(d){return "node" + d.id})
      .attr("x", function(d) { return d.x0;})
      .attr("y", function(d) {return d.y0;})
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .style("fill", function(d){ return color(d.parent.data.name)})
      //.on("click", click)
    .on("mouseout", mouseout)
    .on("mouseover", mouseover)
    
    
  svg
      .selectAll("text")
      .data(root.leaves())
      .join("text")
        .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
        .text(function(d){ return d.data.name })
        .attr("font-size", "15px")
        .attr("fill", "white")*/

}

/*
function click(event, d) {
  svg.select("rect").style("fill", "red")
  console.log("CLICK", d.data.name);
}*/


function mouseover(event, d) {
    svg.select("rect").style("fill", "red")
    console.log("over node: ", d.data);   
  }

function mouseout(event, d) {
    //svg.select("rect").style("fill", function(d){ return color(d.parent.data.name)})
    console.log("out node: ", d.data);
}
  

