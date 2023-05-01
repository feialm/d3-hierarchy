// --------- partition data ----------

export function partition(data, width, height) {
  const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);  
  return d3.partition()
      .size([height, (root.height + 1) * width / 3])
    (root);
}

export var format = d3.format(",d");


// ---------------- Other Functions ------------------

// height/width of node
export function rectHeight(d) {
    return (d.y1 - d.y0 - Math.min(1, (d.y1 - d.y0) / 2))/4;
}
  
// height/width of node
export function rectWidth(d) {
    return (d.x1 - d.x0)*2;
  }

export function labelVisible(d, width) {
    return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
  }
