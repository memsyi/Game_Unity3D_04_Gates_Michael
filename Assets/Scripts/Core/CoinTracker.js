// ================================================================================ \\


private var gm : GameObject;
private var pm : PlayerManager;

// ================================================================================ \\

function Start()
{
	gm = GameObject.Find("GameManager");
	pm = gm.GetComponent(PlayerManager);
}


function Update () 
{
	if(Input.GetKeyUp(KeyCode.Equals))
	{
		pm.coins = 99;
	}
	
	UpdateScore();
}



// ================================================================================ \\

function UpdateScore()
{
	
	var text : String = "";
	var currentCoins : int = pm.coins;	

	if(currentCoins >= 100)
	{
		pm.coins = 0;
		
		gm.GetComponent(PointsText).DisplayText(transform.localPosition, "1-UP", 5.0);
	}

	text = currentCoins < 10 ? "0" + currentCoins : "" + currentCoins;
	

	GetComponent(UILabel).text = text;
}

// ================================================================================ \\