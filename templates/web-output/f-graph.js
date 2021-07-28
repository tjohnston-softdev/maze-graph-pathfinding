			
			// Define graph object.
			var cytoscapeGraph = cytoscape(
			{
				container: document.getElementById("graphContainer"),
				elements: {nodes: nodeContents, edges: edgeContents},
				layout: {name: "preset"},
				style:
				[
					{
						selector: "node",
						style:
						{
							"background-color": "#7EA6E0",
							"border-color": "#000000",
							"border-width": 1,
							"label": "data(id)",
							"text-valign": "center",
							"text-halign": "center",
							"min-zoomed-font-size": 12
						
						}
					},
					{
						selector: "edge",
						style:
						{
							"line-color": "#000000",
							"width": 1
						}
					},
					{
						selector: "edge[?highlighted]",
						style: {"width": 3}
					},
					{
						selector: "node[typeFlag < 0]",
						style: {"background-color": "#67AB9F", "border-width": 2}
					},
					{
						selector: "node[typeFlag > 0]",
						style: {"background-color": "#EA6B66", "border-width": 2}
					},
					{
						selector: "node[?blocked]",
						style: {"background-color": "#777777", "border-width": 1, "label": ""}
					}
				]
			});
			
			
			// Add ID tooltips to nodes.
			function prepareNodeTooltips()
			{
				cytoscapeGraph.nodes().forEach(function (currentNode)
				{
					addNodeTooltip(currentNode);
				});
			} 
			
			
			// Add length tooltips to edges.
			function prepareEdgeTooltips()
			{
				cytoscapeGraph.edges().forEach(function (currentEdge)
				{
					addEdgeTooltip(currentEdge);
				});
			}
			
			
			// Add tooltip to current node.
			function addNodeTooltip(nodeObj)
			{
				var tipText = "Node " + nodeObj.data("id");
				var tipRef = nodeObj.popperRef();
				
				nodeObj.tippy = tippy(document.createElement("div"),
				{
					lazy: false,
					followCursor: "true",
					hideOnClick: true,
					flipOnUpdate: true,
					content: tipText,
					onShow(instance) {instance.popperInstance.reference = tipRef;}
				});
			}
			
			
			// Add tooltip to current edge.
			function addEdgeTooltip(edgeObj)
			{
				var tipRef = edgeObj.popperRef();
				
				edgeObj.tippy = tippy(document.createElement("div"),
				{
					lazy: false,
					followCursor: "true",
					hideOnClick: true,
					flipOnUpdate: true,
					content: edgeObj.data("distance"),
					onShow(instance) {instance.popperInstance.reference = tipRef;}
				});
			}
			
			
			// Display graph viewport.
			function displayGraph()
			{
				try
				{
					document.getElementById("graphInfo").style.display = "block";
					document.getElementById("graphContainer").style.display = "block";
					document.getElementById("loadContainer").style.display = "none";
				}
				catch(e)
				{
					alert("Error displaying graph.");
				}
			}
			
			
			// Set viewport to start node.
			function setInitialView()
			{
				var startNode = cytoscapeGraph.nodes("[typeFlag < 0]");
				var posOffset = {x: 300, y: 50};
				cytoscapeGraph.center(startNode);
				cytoscapeGraph.panBy(posOffset);
			}
			
			
			function exportGraphImage()
			{
				var imgOpts = {full: true, output: "blob", bg: "#FFFFFF"};
				var binaryData = cytoscapeGraph.png(imgOpts);
				var preparedURL = URL.createObjectURL(binaryData);
				window.open(preparedURL, '_blank').focus();
			}
			
			// Event: Graph loaded.
			cytoscapeGraph.ready(function()
			{
				displayGraph();
				prepareEdgeTooltips();
				prepareNodeTooltips();
				setInitialView();
			});
			
			
			// Event: Mouse enter node.
			cytoscapeGraph.nodes().bind("mouseover", function(event)
			{
				var zoomLevel = cytoscapeGraph.zoom();
				
				// Only show tooltip if zoomed out far enough.
				if (zoomLevel < 0.5)
				{
					event.target.tippy.show();
				}
			});
			
			// Event: Mouse exit node.
			cytoscapeGraph.nodes().bind("mouseout", function(event)
			{
				// Hide tooltip
				event.target.tippy.hide();
			});
			
			// Event: Mouse enter edge.
			cytoscapeGraph.edges().bind("mouseover", function(event)
			{
				// Show edge length tooltip.
				event.target.tippy.show();
			});
			
			// Event: Mouse exit edge.
			cytoscapeGraph.edges().bind("mouseout", function(event)
			{
				// Hide tooltip
				event.target.tippy.hide();
			});
			
