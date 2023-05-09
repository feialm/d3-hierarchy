import * as Module from "./utils.js";

export function mouseoverAncestor(event, d) {
////console.log("over node: ", d.data.name);
//reset all nodes color
d3.selectAll("circle").style("fill", "#c3c3c3");// alla noder som inte select, grå
d3.selectAll("path").style("stroke", "#c3c3c3");// alla links som inte har koppling, grå

while(d.parent) {
    d3.selectAll("#node" + d.id).style("fill", "#ff7f00")
    if (d.parent != "null") {
    // links between nodes --> highlight
    d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#ff7f00").style("stroke-width", 3);
    }//end if

    d = d.parent;//iterate through nodes  
}

if (d.data.parent == "null") {
    d3.selectAll("#node" + d.id).style("fill", "#ff7f00")
}//end if
}


export function getAscendants(d) {
  const name_ = d.data.name;
  var myNodeSelection = d3.selectAll("circle.node").filter(d => d.data.name === name_);
  return myNodeSelection.datum().descendants().reverse();
}


export function mouseoverDescendants(event, d) {
  //console.log("over node: ", d.data.name);

  //reset all nodes color
  d3.selectAll("circle").style("fill", "#c3c3c3");// alla noder som inte select, green
  d3.selectAll("path").style("stroke", "#c3c3c3");// alla links som inte har koppling, grå 

  var ascendants = getAscendants(d);

  //node.style("fill", (d => ascendants.includes(d) ? "#ff7f00" : null));
  //node.select("circle").style("stroke", (d => ascendants.includes(d) ? "yellow" : null));

  const length = ascendants.length;
  var j = 0;
  d = ascendants[0];

    while (j < length) {  
      d3.selectAll("#node" + d.id).style("fill", "#ff7f00");
      if (d.data.parent != " null" && j <length-1) {
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#ff7f00").style("stroke-width", 3);
      }
      d = ascendants[++j]//iterate through nodes
    }// end while
}


function getSiblings(d) {
    return {first: d.parent.children.length, second: d.parent.children };
}


export function mouseoverSiblings(event, d) {
   
  ////console.log("over node: ", d.data.name);
  d3.selectAll("circle").style("fill", "#c3c3c3");
  var counter = 0;

  if (d.parent === null) {
     d3.selectAll("#node" + d.id).style("fill", "#ff7f00");
  } else {
    var lengthSibling = getSiblings(d).first;
    var arraySibling = getSiblings(d).second;

    while (counter < lengthSibling) {
      d = arraySibling[counter];
      d3.selectAll("#node" + d.id).style("fill", "#ff7f00");
        counter++; // iterate through nodes
    }
  }
}


export function colorNodes(node1, node2) {
  //console.log("out node: ", d.data.name);
  d3.selectAll("line").style("stroke", "#c3c3c3").style("stroke-width", 2);
  d3.selectAll("circle").style("fill", function (d) {
      if (d.data.name === node1 || d.data.name === node2) {
        return "#fdb863";
      } else {
        return "#045a8d";
      }
  });
}


export function colorNodes2(event, d) {
  //console.log("out node: ", d.data.name);
  d3.selectAll("line").style("stroke", "#c3c3c3").style("stroke-width", 2);
  d3.selectAll("circle").style("fill", "#045a8d");
}



// ------ functions to align and set layout of labels for stockholm.json-data --------

export function tranformSthlmData(d) {
   //console.log("STATUS:",sthlmNode, "NODE:", d.data.name, "\nPARENT:", d.data.parent, "\nLevel:", d.depth)
      if (d.data.name == "Stockholm" || d.depth == 3 || d.depth == 4 ) {
        return "translate(" + d.x*1.75 + ", " + d.y/1.5 + ")";
      }
      if (d.data.name == "Inre staden") {
        return "translate(" + d.x*2.2 + ", " + d.y/1.5 + ")";
      }
      if (d.data.name == "Söderort") {
        return "translate(" + d.x*1.8 + ", " + d.y/1.5 + ")";
      }
      if (d.data.name == "Västerort") {
        return "translate(" + d.x*1.45 + ", " + d.y/1.5 + ")";
      }
      if ((Module.sameName(d.data.parent) && d.depth == 2) ||
        (Module.sameName(d.data.name) && d.depth == 1)) {
        return "translate(" + d.x*1.5 + ", " + d.y / 1.5 + ")";
      }
      return "translate(" + d.x * 2.1+ ", " + d.y / 1.5 + ")";
}


export function x1(d) {
        if (d.data.name == "Stockholm" || d.depth == 4 || d.depth == 3) {
        return d.x*1.75;
      }
      if (d.data.name == "Inre staden") {
        return d.x*2.2;
      }
      if (d.data.name == "Söderort") {
        return d.x*1.8;
      }
      if (d.data.name == "Västerort") {
        return d.x*1.45;
      }
      if ((Module.sameName(d.data.name) && d.depth == 1) || (Module.sameName(d.data.parent) && d.depth == 2)) {
        return d.x*1.5;
      }
      return d.x*2.1;
}


export function x2(d) {
      if (d.data.parent == "Stockholm" || d.depth == 4) {
        return d.parent.x*1.75;
      }
      if (d.data.parent == "Inre staden") {
        return d.parent.x*2.2;
      }
      if (d.data.parent == "Söderort") {
        return d.parent.x*1.8;
      }
      if (d.data.parent == "Västerort") {
        return d.parent.x*1.45;
      }
      if (Module.sameName(d.data.parent) && d.depth == 2) {
        return d.parent.x*1.5;
      }
      return d.parent.x * 2.1;
}

