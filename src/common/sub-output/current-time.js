/* 
	* This file is used to output the current date and time as a readable string.
	* Uses the format: YYYY-MM-DD hh:mm:ss
	* Example: 2020-07-16 22:05:26
*/


// Main function.
function prepareCurrentTimestampString()
{
	var tsObject = new Date();
	
	var yearNumber = tsObject.getFullYear();
	var monthNumber = getMonthNumber(tsObject);
	var dayNumber = tsObject.getDate();
	
	var hourNumber = tsObject.getHours();
	var minuteNumber = tsObject.getMinutes();
	var secondNumber = tsObject.getSeconds();
	
	var yearString = String(yearNumber);
	var monthString = formatTimeNumber(monthNumber);
	var dayString = formatTimeNumber(dayNumber);
	
	var hourString = formatTimeNumber(hourNumber);
	var minuteString = formatTimeNumber(minuteNumber);
	var secondString = formatTimeNumber(secondNumber);
	
	var dateText = [yearString, monthString, dayString].join("-");
	var timeText = [hourString, minuteString, secondString].join(":");
	
	var timestampRes = dateText + " " + timeText;
	return timestampRes;
}


// Reads month number from a date object.
function getMonthNumber(dObj)
{
	var mIndex = dObj.getMonth();
	var mNumber = mIndex + 1;
	return mNumber;
}


// Formats a timestamp component number as a formatted string with two digits.
function formatTimeNumber(origNum)
{
	var formatRes = "";
	
	if (origNum >= 10)
	{
		// If the number is already double digits, use as-is.
		formatRes = String(origNum);
	}
	else
	{
		// Otherwise, prefix with zero.
		formatRes = "0" + origNum;
	}
	
	return formatRes;
}




module.exports =
{
	prepareString: prepareCurrentTimestampString
};