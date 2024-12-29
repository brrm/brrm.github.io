const svg = d3.select("#visualization");
const width = 600;
const height = 600;
const centerX = width / 2;
const centerY = height / 2;
const radius = 150;
const rankRadius = 40;  // Radius of the circular ranks

// Define initial tensor colors for each rank
const tensorColors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44'];

// Calculate positions for 4 ranks in a circle, starting from top
const ranks = Array.from({length: 4}, (_, i) => {
  const angle = (i * Math.PI / 2) - Math.PI / 2; // Start from top
  return {
    id: i,
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
    label: `Rank ${i}`,
    color: tensorColors[i]
  };
});

// Draw ranks as circles
const rankGroups = svg.selectAll("g")
.filter(".rank-group")
.data(ranks)
.join("g")
.attr("transform", d => `translate(${d.x},${d.y})`)
.classed("rank-group", true);

rankGroups.append("circle")
  .attr("class", "rank")
  .attr("r", rankRadius);

rankGroups.append("text")
  .attr("class", "rank-label")
  .attr("text-anchor", "middle")
  .attr("y", 5)
  .text(d => d.label);

// Draw connections between ranks
const connections = svg.append("g")
    .classed("connections", true)
    .attr("transform", `translate(${centerX}, ${centerY})`); // move origin to center	

var arcGenerator = d3.arc();

ranks.forEach((rank, i) => {
    const radOffset = 0.3;
    connections.append("path")
        .classed("connection", true)
        .attr("d", arcGenerator({
  startAngle: i * 0.5 * Math.PI + radOffset,
  endAngle: (i+1)* 0.5 * Math.PI - radOffset,
  innerRadius: radius,
  outerRadius: radius
}));
})