			
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
			
			
			function prepareNodeTooltips()
			{
				cytoscapeGraph.nodes().forEach(function (currentNode)
				{
					addNodeTooltip(currentNode);
				});
			} 
			
			
			function prepareEdgeTooltips()
			{
				cytoscapeGraph.edges().forEach(function (currentEdge)
				{
					addEdgeTooltip(currentEdge);
				});
			}
			
			
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
			
			cytoscapeGraph.ready(function()
			{
				displayGraph();
				prepareEdgeTooltips();
				prepareNodeTooltips();
			});
			
			
			cytoscapeGraph.nodes().bind("mouseover", function(event)
			{
				event.target.tippy.show();
			});
			
			cytoscapeGraph.nodes().bind("mouseout", function(event)
			{
				event.target.tippy.hide();
			});
			
			
			cytoscapeGraph.edges().bind("mouseover", function(event)
			{
				event.target.tippy.show();
			});
			
			cytoscapeGraph.edges().bind("mouseout", function(event)
			{
				event.target.tippy.hide();
			});
			
