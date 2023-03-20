/*var treeData ={children:
[{name:"boss1",children:
[
{name:"mister_a",group:"A","value":28,colename:"level3"},
{name:"mister_b",group:"A","value":19,colename:"level3"},
{name:"mister_c",group:"C","value":18,colename:"level3"},
{name:"mister_d",group:"C","value":19,colename:"level3"}
]
,colename:"level2"},
{name:"boss2",children:
[
{name:"mister_e",group:"C","value":14,colename:"level3"},
{name:"mister_f",group:"A","value":11,colename:"level3"},
{name:"mister_g",group:"B","value":15,colename:"level3"},
{name:"mister_h",group:"B","value":16,colename:"level3"}
],
colename:"level2"},
{name:"boss3",children:
[
{name:"mister_i",group:"B","value":10,colename:"level3"},
{name:"mister_j",group:"A","value":13,colename:"level3"},
{name:"mister_k",group:"A","value":13,colename:"level3"},
{name:"mister_l",group:"D","value":25,colename:"level3"},
{name:"mister_m",group:"D","value":16,colename:"level3"},
{name:"mister_n",group:"D","value":28,colename:"level3"}
]
,colename:"level2"}],name:"CEO"}*/


var margin = { top: 20, right: 90, bottom: 20, left: 90 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3
  .select(".container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data2.json").then(function (data) {

  console.log(data);

  const root = d3.hierarchy(data).sum(function(d){
    return d.value;
  });

  var tree = d3.treemap().size([width, height])
    .padding(2)(root);


  // prepare a color scale
  const color = d3.scaleOrdinal()
    .domain(["boss1", "boss3", "boss3"])
    .range([ "#402D54", "#D18975", "#8FD175"])
  

  // nu fungerarl ite saker här när man skriver function(event,d) istället
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
    .on("click", function(event,d) {return console.log("CLICK", d.data.name); })
  
  
svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name })
      .attr("font-size", "15px")
      .attr("fill", "white")

})
