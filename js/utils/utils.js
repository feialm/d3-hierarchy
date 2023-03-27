// prepare a color scale
export const color = d3.scaleOrdinal()
  .domain(["0", "1", "2"])
  .range(["#2b8cbe", "#a6bddb", "#ece7f2"]);


export function mouseoverAncestor(event, d) {
  
    console.log("over node: ", d.data.name);

  while (d.parent) {
    d3.selectAll("#node" + d.id).style("fill", "red");
    if (d.parent != "null") {
      d = d.parent; // iterate through nodes
    } else { break; }
  }

  if (d.data.parent == "null") {
    d3.selectAll("#node" + d.id).style("fill", "red")
  }//end if

}

export function mouseoutAncestor(event, d) {
    console.log("out node: ", d.data.name);

    while(d.parent) {
      d3.selectAll("#node" + d.id).style("fill", function (d) { return color(d.depth); });
      if (d.parent != "null") {
        d = d.parent;//iterate through nodes 
      } else { break; }
    }

   if (d.data.parent == "null") {
     d3.selectAll("#node" + d.id).style("fill", function (d) { return color(d.depth); });
    }//end if
}


function getSiblings(d) {
    return {first: d.parent.children.length, second: d.parent.children };
}


export function mouseoverSiblings(event, d) {
   
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

export function mouseoutSiblings(event, d) {

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