			displayBlockCount();
			
			function displayBlockCount()
			{
				try
				{
					var countLabel = "Nodes Blocked: ";
					var countFraction = pathContents.blockCount + " / " + nodeContents.length;
					
					var blockCountElement = document.getElementById("txtBlockCount");
					blockCountElement.innerHTML = countLabel + countFraction;
				}
				catch(e)
				{
					alert("Error displaying block count");
				}
			}
