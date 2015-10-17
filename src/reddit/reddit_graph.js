/* The original reddit graph */

var colors = ["#c0c0c0", "d8d8f0", "9090ff", "black", "ff4800"];

var color = function () {
  return colors[Math.floor(Math.random() * colors.length)];
};


function render (svg_width, svg_height) {

  // Create the svg container that will host 
  // the visualization
  var svg = d3.select("#graph-container").append("svg")
      .attr("width", svg_width)
      .attr("height", svg_height)
      .attr("id", "svg_container");

  // Create the basic force layout 
  var force = d3.layout.force()
      .charge(-160)
      .linkDistance(100)
      //.linkStrength(0.2)
      .gravity(0.5)
      .size([svg_width, svg_height]);

  // Initialize the force layout with 
  // the nodes and edges 
  force.nodes(graph.nodes).links(graph.links).start()

 // var n = 100;
  // Use a timeout to allow the rest of the page to load first.
 // setTimeout(function () {
      // Run the layout a fixed number of times.
      // The ideal number of times scales with graph complexity.
      // Of course, don't run too long or will hang the page!
//      force.start();
//      for (var i = n * n; i > 0; --i) force.tick();
//      force.stop();

//      svg.selectAll("line")
//          .data(links)
//        .enter().append("line")
//          .attr("x1", function(d) { return d.source.x; })
//          .attr("y1", function(d) { return d.source.y; })
//          .attr("x2", function(d) { return d.target.x; })
//          .attr("y2", function(d) { return d.target.y; });
//
//      svg.selectAll("circle")
//          .data(nodes)
//        .enter().append("circle")
//          .attr("cx", function(d) { return d.x; })
//          .attr("cy", function(d) { return d.y; })
//          .attr("r", 4.5);

      // Render the edges
      var link = svg.selectAll(".link")
          .data(graph.links)
          .enter().append("line")
          .attr("class", "link")
          .attr("id", function (d) { return d.source.name + "-" + d.source.target; })
          .style("stroke-width", 1);
          //.style("stroke-width", function (d) { return Math.sqrt(d.weight); });

      // Create group for nodes
      var node_group = svg.selectAll("g.node_group")
          .data(graph.nodes)
          .enter().append("g")
          .classed("node_group", true);

      // Render the nodes
      var node = node_group.append("circle")
          .attr("class", "node")
          .attr("id", function (d) { return d.name; })
          .attr("r", 7)
          .style("fill", function (d) { return color(); })
          .call(force.drag);

      // Add hover text
     node.append("title").text(function (d) { return d.name; });

      // Add node labels
      var labels = node_group.append("text")
          .text(function (d) { return d.name; })
          .style("fill", "black");

      // Add placement
//      link.attr("x1", function(d) { return d.source.x; })
//        .attr("y1", function(d) { return d.source.y; })
//        .attr("x2", function(d) { return d.target.x; })
//        .attr("y2", function(d) { return d.target.y; });
//
//      node_group.attr("transform", function(d) {
//        return 'translate(' + [d.x, d.y] + ')';
//      });

      //loading.remove();

  //}, 10);

  // The ever-so crucial tick function !! 
  // This repositions nodes/edges at every 
  // time interval of the d3 simulation. 
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node_group.attr("transform", function(d) {
        return 'translate(' + [d.x, d.y] + ')';
    });
  });

  var highlight = "#CD5C5C"

  // Create the subreddit list
  var list = $("#subreddit-list");
  var list_item;
  for (var i = 0; i < graph.nodes.length; i++) {
    list_item = $("<li class='list-group-item' id='" + graph.nodes[i].name + "_list" + "'>"+graph.nodes[i].name+"</li>");
    list.append(list_item);

    // Hover functionality
    list_item.mouseenter(function (event) {
        d3.select("#" + $(this)[0].textContent).style("fill", highlight);
        $(this).css("background", highlight);
    }).mouseleave(function (event) {
        d3.select("#" + $(this)[0].textContent).style("fill", color());
        $(this).css("background", "white");
    });

    // Click functionality
    list_item.click(function (event) {
       var name = $(this)[0].textContent;
       var node = d3.select("#" + name);
       var neighbors = {};
       for (var i = 0; i < graph.links.length; i++) {
            if (name == graph.links[i].source.name) {
                neighbors[graph.links[i].target.name] = 0;
            }
            else if (name == graph.links[i].target.name) {
                neighbors[graph.links[i].source.name] = 0;
            }
            else {
                // Hide non-neighbor links
                console.log(d3.select("#" + graph.links[i].source + "-" + graph.links[i].target));  //.style("opacity", 0);
            }
       }
       for (var i = 0; i < graph.nodes.length; i++) {
            if (!(graph.nodes[i].name in neighbors) && !(graph.nodes[i].name == name)) {
                // Hide non-neighbor nodes
                d3.select("#" + graph.nodes[i].name).style("opacity", 0);
            }
       }
    });
  }

  console.log(graph.links.length);
  console.log(graph.nodes.length);

}