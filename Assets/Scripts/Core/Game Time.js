// ================================================================================ \\

function Start()
{
	InvokeRepeating("DecrementTime", 1, 0.333);
}

function Update () 
{	
	UpdateTime();
}


// ================================================================================ \\

function UpdateTime()
{
	var time : int = GameObject.Find("GameManager").GetComponent(PlayerManager).time;
	var text : String = "" + time;
	
	GetComponent(UILabel).text = text;
}


function DecrementTime()
{
	var time : int = GameObject.Find("GameManager").GetComponent(PlayerManager).time;
	
	GameObject.Find("GameManager").GetComponent(PlayerManager).RemoveTime(1);
}

// ================================================================================ \\