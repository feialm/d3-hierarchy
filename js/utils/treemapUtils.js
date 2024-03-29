export function getMeasurments(type, d) {
  var d1, d0;
  if (type == "height") {
    d1 = d.y1;
    d0 = d.y0;
  } else {
    d1 = d.x1;
    d0 = d.x0;
  }
  return d1 - d0;
}

export function getMeasurments2(type, d) {
  var d0;
  if (type == "y") {
    d0 = d.y0;
  } else {
    d0 = d.x0;
  }
  return d0;
}


export function upperCaseLabel(textLabel, d) {
  if (d.depth === 0) {
    textLabel = textLabel.toUpperCase();
  }
  if (d.depth === 1) {
    textLabel = textLabel.toUpperCase();
  }
  return textLabel;
}


// ------ functions to align and set layout of labels for stockholm.json-data --------
export function y(d) {
   if (d.data.colname == null) {
        return d.y0 + 6;
      }
      if (d.data.colname == "level2") {
        return d.y0 + 15;
      }
      if (d.data.colname == "level3") {
        return d.y0 + 22;
      }
      if (d.data.colname == "level4") {
        return d.y0 + 27;
      }
      if (d.data.colname == "level5") {
        return d.y0 + 33;
      }
}

export function font(d) {
    if (d.children) {
      if (d.data.colname == null) {
        return "14px sans-serif";
      }
      if (d.data.colname == "level2") {
        return "13px sans-serif";
      }
      if (d.data.colname == "level3") {
        return "12px sans-serif";
      }
      if (d.data.colname == "level4") {
        return "11px sans-serif";
      }
      if (d.data.colname == "level5") {
        return "10px sans-serif";
      }
    } else {
      return "10px sans-serif"
    }
}

export function fontWeight(d) {
  if (d.data.colname == null) {
      return "600";
    }
    if (d.data.colname == "level2") {
      return "500";
    }
    if (d.data.colname == "level3") {
      return "normal";
    }
    return "normal";
}



/* ------ functions to align and set layout of labels for
--------  2dShapes.json and introduction.json  --------*/
export function y2(d) {
   if (d.data.colname == null) {
        return d.y0 + 12;
      }
      if (d.data.colname == "level2") {
        return d.y0 + 26;
      }
      if (d.data.colname == "level3") {
        return d.y0 + 38;
      }
}

export function font2(d) {
    if (d.children) {
      if (d.data.colname == null) {
        return "18px sans-serif";
      }
      if (d.data.colname == "level2") {
        return "16px sans-serif";
      }
    } else {
      return "16px sans-serif"
    }
}


