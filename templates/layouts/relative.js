			var layoutObject = cytoscapeGraph.layout(
			{
				name: "cose",
				fit: true,
				animate: true,
				animationThreshold: 500,
				ready: function()
				{
					cytoscapeGraph.center();
				},
				stop: function()
				{
					var startPos = cytoscapeGraph.getElementById(1).position();
					var zoomSettings = {level: 1.0, position: startPos};
					cytoscapeGraph.zoom(zoomSettings);
					displayGraph();
				}
			});
			
			layoutObject.run();
