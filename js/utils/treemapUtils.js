export function getMeasurments(type, d) {
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

export function getMeasurments2(type, d) {
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
