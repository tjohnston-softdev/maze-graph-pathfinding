			
			var cytoscapeGraph = cytoscape(
			{
				container: document.getElementById("graphContainer"),
				elements: {nodes: nodeContents, edges: edgeContents},
				style:
				[
					{
						selector: "node",
						style:
						{
							"shape": "circle",
							"background-color": "#7EA6E0",
							"border-color": "#000000",
							"border-width": 1,
							"label": "data(id)",
							"text-valign": "center",
							"text-halign": "center"
						
						}
					},
					{
						selector: "edge",
						style:
						{
							"line-color": "#000000",
							"line-width": 1
						}
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
						selector: "node[blocked]",
						style: {"background-color": "#777777", "border-width": 1}
					}
				]
			});
