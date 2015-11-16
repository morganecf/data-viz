/*
*   A graph of subreddits and their interconnections. Nodes represent subreddits. 
*   Edges can be toggled and are based on if: 
*   1) a user has posted or commented to both subreddits (user) -- undirected, weighted
*   2) a submission has been cross-posted to both subreddits (xpost) -- undirected, weighted 
*   3) two subreddits share similar content, according to reddit's "view similar" tool -- could be either, unweighted 
*   4) two subreddits share same domain names (ex: nfl and soccer both often link to sports.com) -- undirected, weighted
*   
*   Edges are weighted by number of co-"mentions".
*
*   Search parameters: subreddit (multiple), distance, link type, weighted/unweighted, clustering (infomap vs. community detection) 
*
*   NOTE: Mostly undirected?
*   WHAT'S CONTENT??? edge weights are very high...  
* 
*   MAKING IT TIME-SENSITIVE WOULD BE REALLY COOL
*
*   CHECK THIS OUT: https://github.com/upphiminn/d3.ForceBundle
*     this would be really beneficial when viewing larger clusters of nodes/edges
*/

/* Helper functions */

// Modified BFS - stops when distance is reached
function BFS (graph, start, distance) {
  var set = {};
  set[start] = graph[start];

  if (distance == 0) return set;

  var neighbors = graph[start];
  for (var neighbor in neighbors) {
    neighbors[neighbor].depth = 1;
    set[neighbor] = neighbors[neighbor];
  }

  if (distance == 1) return set;

  var queue = Object.keys(neighbors);
  var n, neighbors;

  while (queue.length > 0) {
    n = queue.pop();
    neighbors = graph[n];

    for (var neighbor in neighbors) {
      neighbors[neighbor].depth = set[n].depth + 1;

      if (!(neighbor in set)) {
        if (neighbors[neighbor].depth < distance) queue.push(neighbor);
        set[neighbor] = neighbors[neighbor];
      }
    }
  }
  return set;
}

// Format a subnetwork into node/edge lists 
function format (graph, subnetwork) {
  var dataset = {nodes: [], links: []};
  var mapping = {};
  var nid = 0;

  // Create node list 
  for (var node in subnetwork) {
    // Selectors can't start with numeric character - just ignore these for now 
    //if (!isNaN(parseInt(node[0]))) continue;

    dataset.nodes.push({'name': node, 'depth': subnetwork[node].depth});
    mapping[node] = nid;
    nid ++;
  } 

  // Create edge list 
  for (var node1 in subnetwork) {
    for (var node2 in subnetwork) {
      if (node2 in graph[node1]) dataset.links.push({source: mapping[node1], target: mapping[node2]});
      else if (node1 in graph[node2]) dataset.links.push({source: mapping[node2], target: mapping[node1]});
    }
  }

  return {data: dataset, mapping: mapping};
}

/* Global variables */

// Node colors 
var colors = {link: "#F3723F", user: "#3F96F3", content: "#FF4401", xpost: "#BF367F"};

// Color picker 
var color = function () {
  return colors[Math.floor(Math.random() * colors.length)];
};

// SVG container width/height
var width = $(document).width();
var height = $(document).height();

// Default param values 
var distance = 3;


/* Visualization function */
var visualization = function (subreddit, network_type, depth) {

  // Initialize the max distance 
  distance = depth;

  // Find the sub-network this node belongs in 
  var subnetwork = BFS(graph, subreddit, distance);

  // Create the d3-friendly dataset 
  var dataset = format(graph, subnetwork);
  var data = dataset.data;          // edges and nodes 
  var mapping = dataset.mapping;    // node to id mapping 

  // Create the color gradient
  var color_scale = d3.scale.linear()
    .range([colors[network_type], "#fff"])
    .domain([0, distance + 2]);

  // Svg container that will host the visualization
  var svg = d3.select("#graph-container").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", "svg_container");

  // Generate the basic force layout 
 // var force = d3.layout.force()
  var force = d3.crystal()
      .gravity(1)
      .charge(-4000)
      .linkDistance(30)
      .friction(0.5)
      //.linkStrength(0.2)
      .size([width, height]);
  
  //force.nodes(data.nodes).links(data.links).start();

  // Render edge links
  var link = svg.selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("id", function (d) { return d.source.name + "-" + d.target.name; })
    .attr("stroke-width", 1)
    .attr("stroke", "#7F4D7F");
    //.style("stroke-width", function (d) { return Math.sqrt(d.weight); });

  // Render nodes
  // var node = svg.selectAll("circle")
  //   .data(data.nodes)
  //   .enter()
  //   .append("circle")
  //   .attr("class", "node")
  //   .attr("id", function (d) { return d.name; })
  //   .attr("r", 10)
  //   .attr("fill", function (d) { 
  //     if (d.name === subreddit) return color_scale(0);
  //     return color_scale(d.depth);
  //   })
  //   .attr("stroke", "#fff")
  //   .attr("stroke-width", 2)
  //   //.attr("d", function (d) { if (d.name === subreddit) {d.x = width / 2; d.y = height / 2;} })
  //   .call(force.drag);


  // TO DO  
  // toggle depth 
  // display current node being animated

    var node = svg.selectAll(".node")
      .data(data.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("id", function (d) { return d.name; })
      .call(force.drag);

    node.append("image")
        .attr("xlink:href", function (d) {
          if (d.name == subreddit) return "reddit4-red.png";
          return "reddit4 copy.png";
        })
        .attr("x", -16)
        .attr("y", -16)
        .attr("id", function (d) { return d.name + '-img'; })
        .attr("width", 32)
        .attr("height", 32);

    node.append("text")
        .attr("dx", 18)
        .attr("dy", ".35em")
        .attr("class", "label")
        .text(function(d) { return d.name });

    force.nodes(data.nodes).links(data.links)
      .crystallize_nodes(node)
      .crystallize_links(link)
      .crystallize({ start_node: subreddit, ms: 250 });

    
    // Hover functionality for nodes 
    node.on("mouseover", function (d) {
      // Highlight the current node 
      d3.select("#" + d.name + "-img").attr("xlink:href", "reddit4-red.png");

      // Also highlight its neighbors 
      var neighbors = graph[d.name];
      for (var neighbor in neighbors) {
        if (neighbor !== subreddit) d3.select("#" + neighbor + "-img").attr("xlink:href", "reddit4-orange.png");
      }
      
    }).on("mouseout", function (d) {
      // Unhighlight current node 
      if (d.name != subreddit) d3.select("#" + d.name + "-img").attr("xlink:href", "reddit4 copy.png");

      // Unhighlight neighbors 
      var neighbors = graph[d.name];
      for (var neighbor in neighbors) {
        if (neighbor !== subreddit) d3.select("#" + neighbor + "-img").attr("xlink:href", "reddit4 copy.png");
      }
    });

    // Click functionality for nodes 
    node.on("click", function (d) {
      // how come didn't work the proper way...???
      d3.select("#" + d.name)[0][0].__data__.fixed = true;
    });

};



/*

  TO DO :
  - draw/vectorize little reddit alien holding a magnifying glass
  - drifting d3 network in intro 
  - node size proportional to activity? 
  - manually adjust margin top, node size, link dist, etc. based on # of nodes 
  - highlight layer 
  - labels: http://bl.ocks.org/MoritzStefaner/1377729
  - explanation of everything (like a blog post) 
  - GROW the graph!!! like animate the lines (https://www.jasondavies.com/collatz-graph/)
  - add layer to individual nodes (explore)
    - collapsible force layout: http://bl.ocks.org/mbostock/1093130
*/
