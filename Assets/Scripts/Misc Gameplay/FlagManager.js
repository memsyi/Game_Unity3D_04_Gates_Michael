var pointsEarned : int;
var dead : boolean;



// sets the points earned
function SetPointsEarned(amt : int)
{
	if(dead)
		return;
		
	this.pointsEarned = amt;
}



