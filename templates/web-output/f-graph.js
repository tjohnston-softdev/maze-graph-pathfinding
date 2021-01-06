			
			// Reads graph widget.
			var container = document.getElementById("graphContainer");
			
			
			// Prepares graph data.
			var data =
			{
				"nodes": nodeContents,
				"edges": edgeContents
			};
			
			
			// This avoids node overlap as much as possible, especially for relative graphs.
			var options =
			{
				physics:
				{
					enabled: true,
					barnesHut: {avoidOverlap: 1}
				}
			};
			
			// Create graph.
			var network = new vis.Network(container, data, options);
			
