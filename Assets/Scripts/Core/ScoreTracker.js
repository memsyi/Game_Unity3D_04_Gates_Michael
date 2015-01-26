// ================================================================================ \\

function Update () 
{
	UpdateScore();
}


// ================================================================================ \\

function UpdateScore()
{
	
	var text : String = "000000";
	var currentScore = GameObject.Find("GameManager").GetComponent(PlayerManager).points;	

	for(var v=0; v<6; v++)
	{
		if((currentScore / 100000) < 1)
		{
			text = "0" + currentScore;
		}
		if((currentScore / 10000) < 1)
		{
			text = "00" + currentScore;
		}
		if((currentScore / 1000) < 1)
		{
			text = "000" + currentScore;
		}
		if((currentScore / 100) < 1)
		{
			text = "0000" + currentScore;
		}
		if((currentScore / 10) < 1)
		{
			text = "00000" + currentScore;
		}
	}

	GetComponent(UILabel).text = text;
}

// ================================================================================ \\