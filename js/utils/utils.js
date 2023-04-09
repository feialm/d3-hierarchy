
// variables used in, e.g, svg, d3 object
export var margin = { top: 20, right: 90, bottom: 20, left: 90 };
// a is currently for node-link
export var width_a = 2560 - margin.left - margin.right;
export var height_a = 1000 - margin.top - margin.bottom;
// b is currently for icicle
export var width_b = 660 - margin.left - margin.right;
export var height_b = 1000 - margin.top - margin.bottom;
// c is currently for treemap
export var width_c = 1260 - margin.left - margin.right;
export var height_c = 800 - margin.top - margin.bottom;
// d is currently for node-link2
export var width_d = 2560 - margin.left - margin.right;
export var height_d = 1000 - margin.top - margin.bottom;


// prepare a color scale

export const color = d3.scaleOrdinal()
  .domain(["4","3", "2", "1", "0"])
  .range(["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"]);


export function mousemove(event, d) {

  d3.selectAll("#node" + d.id).append("title")
    .text(d.data.name + "\nLevel: " + (d.depth+1));
}

export function mouseoverAncestor(event, d) {
  
  //console.log("over node: ", d.data.name);
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
   
  //console.log("over node: ", d.data.name);
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


// new children toogle, onclik on node
export function click(event, d) {
  console.log("CLICK ", d.data.name);
}



// cut a too long string, showing first characters + adding ... 
// to indicate there is more text
export function cutString(d, nameList,command) {
  var name = "";
   if (nameList[0].length > 8) {
          var middle = Math.floor(nameList[0].length / 2);
          var before = nameList[0].lastIndexOf('', middle);
          var after = nameList[0].indexOf('', middle + 1);

          if (middle - before < after - middle) {
            middle = before;
          } else {
            middle = after;
          }

          name = nameList[0].substr(0, middle) + "...";
        } else {
        if (command == "add") {
            name = nameList[0]+"...";
        } else {
           name = nameList[0];
        }
   }  
  return name;
};//end cutString


// split string on separator
export function splitString(d) {
      var nameList;
      let name = "";
      if (d.data.name.includes("/")) {
        nameList = d.data.name.split("/");
      }
      else if (d.data.name.includes("-")) {
        nameList = d.data.name.split("-");
      }
      else if (d.data.name.includes("(")) {
        nameList = d.data.name.split("(");
      }
      else {
        nameList = d.data.name.split(" ");    
      }
      
      if (nameList.length > 1 && !d.children) {
        name = cutString(d, nameList, "add");
      } else {
        name = cutString(d, nameList, "noAdd");
      }
      //console.log("ANDRA: ", name);
      return name;
}