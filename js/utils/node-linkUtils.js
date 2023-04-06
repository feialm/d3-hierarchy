
export function mouseoverAncestor(event, d) {
console.log("over node: ", d.data.name);
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

export function mouseoutAncestor(event,d){
    //console.log("out node: ", d.data.name);
     d3.selectAll("circle").style("fill", "#045a8d");

    while(d.parent) {
      if (d.parent != "null") {
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#c3c3c3").style("stroke-width", 2);
      }//end if

      d = d.parent;//iterate through nodes 
    }

    if (d.data.parent == "null") {
      d3.selectAll("#node" + d.id).style("fill", "#045a8d")
    }//end if
}



export function getAscendants(d) {
  const name_ = d.data.name;
  var myNodeSelection = d3.selectAll("circle.node").filter(d => d.data.name === name_);
  return myNodeSelection.datum().descendants().reverse();
}


export function mouseoverDescendants(event, d) {
  console.log("over node: ", d.data.name);

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

export function mouseoutDescendants(event, d) {
  //console.log("out node: ", d.data.name);
  d3.selectAll("circle").style("fill", "#045a8d");

  var ascendants = getAscendants(d);

  const length = ascendants.length;
  var j = 0;
  d = ascendants[0];

    while (j < length) {       
      d3.selectAll("#node" + d.id).style("fill", "#045a8d");
      if (d.data.parent != " null" && j <length-1) {
        d3.selectAll("#link" + d.parent.id + "-" + d.id).style("stroke", "#c3c3c3").style("stroke-width", 2);
      }
      d = ascendants[++j]//iterate through nodes
    }// end while
}



