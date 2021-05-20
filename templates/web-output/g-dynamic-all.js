			
			// Initialize path.
			callPathHighlight();
			displayPathCount();
			
			
			// Path number changed.
			function callPathHighlight()
			{
				try
				{
					highlightChosenPath();
				}
				catch(e)
				{
					alert("Error displaying selected path");
				}
			}
			
			
			// Only called at start.
			function displayPathCount()
			{
				try
				{
					var numberElement = document.getElementById("numPathID");
					var countElement = document.getElementById("lblPathCount");
					var countTxt = "";
					
					// Path number picker.
					numberElement.min = 1;
					numberElement.max = pathContents.completedPaths.length;
					numberElement.step = 1;
					numberElement.value = 1;
					
					// Fraction
					countTxt = "of " + pathContents.completedPaths.length;
					
					if (pathContents.overflow === true)
					{
						// Too many paths.
						countTxt += "+";
					}
					
					countElement.innerHTML = countTxt;
				}
				catch(e)
				{
					alert("Error displaying path count");
				}
			}
			
			
			function highlightChosenPath()
			{
				var pathLabel = "Current Path: ";
				var distLabel = "Total Distance: ";
				
				var numberElement = document.getElementById("numPathID");
				var pathElement = document.getElementById("txtCurrentPath");
				var distanceElement = document.getElementById("txtCurrentDistance");
				
				var retrievedPathObject = readPathObject(numberElement.value);
				var edgesHighlighted = false;
				var overallSuccessful = false;
				
				pathElement.innerHTML = "";
				distanceElement.innerHTML = "";
				resetEdgeHighlights();
				
				if (retrievedPathObject !== null)
				{
					// Highlight path edges.
					edgesHighlighted = navigateChosenPath(retrievedPathObject);
				}
				
				if (edgesHighlighted === true)
				{
					// Display current path.
					pathElement.innerHTML = pathLabel + retrievedPathObject.sequence.join(", ");
					distanceElement.innerHTML = distLabel + retrievedPathObject.totalDistance;
					cytoscapeGraph.json({elements: {nodes: nodeContents, edges: edgeContents}});
					overallSuccessful = true;
				}
				
				
				return overallSuccessful;
			}
			
			
			function readPathObject(pNumber)
			{
				var castNumber = Number(pNumber);
				var readRes = null;
				
				if (castNumber >= 1 && castNumber <= pathContents.completedPaths.length)
				{
					// Reads path object. Number converted to index.
					readRes = pathContents.completedPaths[castNumber - 1];
				}
				else
				{
					throw new Error("Path does not exist");
				}
				
				return readRes;
			}
			
			
			// Removes highlights from edges.
			function resetEdgeHighlights()
			{
				var edgeIndex = 0;
				var currentEdgeObject = {};
				
				for (edgeIndex = 0; edgeIndex < edgeContents.length; edgeIndex = edgeIndex + 1)
				{
					currentEdgeObject = edgeContents[edgeIndex];
					currentEdgeObject.data.highlighted = false;
				}
				
			}
			
			
			// Highlights edges between nodes on chosen path.
			function navigateChosenPath(pObject)
			{
				var orderIndex = 0;
				var orderCutoff = pObject.sequence.length - 1;
				
				var currentPosition = -1;
				var currentNext = -1;
				var currentMatch = false;
				
				var pathRes = true;
				
				
				// This loop visits elements in the pattern: (0,1), (1,2), ... (n-2, n-1)
				while (orderIndex >= 0 && orderIndex < orderCutoff && pathRes === true)
				{
					currentPosition = pObject.sequence[orderIndex];
					currentNext = pObject.sequence[orderIndex + 1];
					currentMatch = highlightEdge(currentPosition, currentNext);
					
					if (currentMatch !== true)
					{
						pathRes = false;
						throw new Error("Missing graph edge on chosen path");
					}
					
					orderIndex = orderIndex + 1;
				}
				
				return pathRes;
			}
			
			
			// Checks if there is a particular edge between nodes.
			function highlightEdge(originID, destinationID)
			{
				var edgeIndex = 0;
				var currentEdgeObject = {};
				var currentOrigin = -1;
				var currentDestination = -1;
				var currentMatch = false;
				
				var connectionFound = false;
				
				// Loops through edges until connection is found.
				while (edgeIndex >= 0 && edgeIndex < edgeContents.length && connectionFound !== true)
				{
					currentEdgeObject = edgeContents[edgeIndex];
					currentOrigin = Number(currentEdgeObject.data.source);
					currentDestination = Number(currentEdgeObject.data.target);
					currentMatch = false;
					
					if (currentOrigin === originID && currentDestination === destinationID)
					{
						// Exact match.
						currentMatch = true;
					}
					else if (currentOrigin === destinationID && currentDestination === originID)
					{
						// Inverse match.
						currentMatch = true;
					}
					else
					{
						// Keep searching.
						currentMatch = false;
					}
					
					
					if (currentMatch === true)
					{
						// Highlight edge.
						currentEdgeObject.data.highlighted = true;
						connectionFound = true;
					}
					
					
					edgeIndex = edgeIndex + 1;
				}
				
				return connectionFound;
			}
