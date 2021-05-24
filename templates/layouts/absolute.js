			var layoutObject = cytoscapeGraph.layout(
			{
				name: "preset",
				stop: function()
				{
					displayGraph();
				}
			});
			
			layoutObject.run();
