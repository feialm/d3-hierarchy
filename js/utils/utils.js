
// variables used in, e.g, svg, d3 object
export var margin = { top: 20, right: 90, bottom: 20, left: 90 };
// a is currently for node-link
export var width_a = 1560 - margin.left - margin.right;
export var height_a = 1000 - margin.top - margin.bottom;
// b is currently for icicle
export var width_b = 660 - margin.left - margin.right;
export var height_b = 1000 - margin.top - margin.bottom;
// c is currently for treemap
export var width_c = 1260 - margin.left - margin.right;
export var height_c = 800 - margin.top - margin.bottom;
// d is currently for node-link2
export var width_d = 960 - margin.left - margin.right;
export var height_d = 500 - margin.top - margin.bottom;


// prepare a color scale

export const color = d3.scaleOrdinal()
  .domain(["4","3", "2", "1", "0"])
  .range(["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"]);


export function mousemove(event, d) {

  d3.selectAll("#node" + d.id).append("title")
    .text(d.data.name + "\nLevel: " + (d.depth+1));
}

export function mouseoverAncestor(event, d) {
  
  console.log("over node: ", d.data.name);
  d3.selectAll("rect").style("fill", "#c3c3c3");
 
  while (d.parent) {
    d3.selectAll("#node" + d.id).style("fill", "#ff7f00");
    if (d.parent != "null") {
      d = d.parent; // iterate through nodes
    } else { break; }
  }

  if (d.data.parent == "null") {
    d3.selectAll("#node" + d.id).style("fill", "#ff7f00");
  }//end if

}

export function mouseoutAncestor(event, d) {
  //console.log("out node: ", d.data.name);
  d3.selectAll("rect").style("fill", function (d) { return color(d.depth); });

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
  d3.selectAll("rect").style("fill", "#c3c3c3");
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

export function mouseoutSiblings(event, d) {

  //console.log("out node: ", d.data.name);
  d3.selectAll("rect").style("fill", function (d) { return color(d.depth); });
  var counter = 0;

  if (d.parent === null) {
     d3.selectAll("#node" + d.id).style("fill", function (d) { return color(d.depth); });
  } else {
    var lengthSibling = getSiblings(d).first;
    var arraySibling = getSiblings(d).second;

    while (counter < lengthSibling) {
      d = arraySibling[counter];
      d3.selectAll("#node" + d.id).style("fill", function (d) { return color(d.depth); });
        counter++; // iterate through nodes
    }
  }
}