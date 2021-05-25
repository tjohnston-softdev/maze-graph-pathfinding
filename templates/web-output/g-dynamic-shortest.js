			displayShortestPath();
			
			function displayShortestPath()
			{
				try
				{
					var pathLabel = "Shortest Path: ";
					var distLabel = "Total Distance: ";
					
					var shortestPathElement = document.getElementById("txtShortestPath");
					var distanceElement = document.getElementById("txtDistance");
					
					shortestPathElement.innerHTML = pathLabel + pathContents.sequence.join(", ");
					distanceElement.innerHTML = distLabel + pathContents.totalDistance;
				}
				catch(e)
				{
					alert("Error displaying shortest path");
				}
			}
			
