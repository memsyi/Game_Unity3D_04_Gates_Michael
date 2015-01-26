// ================================================================================ \\

var top : boolean;
var points : int;
var end : Transform;

private var gm : GameObject;
private var pm : PlayerManager;
private var player : GameObject;

// ================================================================================ \\


function Start () 
{
	yield WaitForSeconds(0.5);
	
	gm = GameObject.Find("GameManager");
	
	if(gm != null)
	{
		pm = gm.GetComponent(PlayerManager);
	}
	
	player = GameObject.Find("Player");
}

function OnTriggerEnter(obj : Collider)
{
	// if not player entering
	if(obj.tag != "Player")
		return;
	
	if(pm.flagged)
		return;
		
	pm.flagged = true;
		
	if(!pm.flagTime)
	{
		pm.flagTime = true;
		
		// make mario slide down
		SlideDownFlag();
	}
	
	// Add points
	AddPoints();
	
	
	// if touched the top of the flag
	if(top)
	{
		// give an extra life
		ExtraLife();
	}
}


// ================================================================================ \\

function SlideDownFlag()
{
	// disable movement
	player.GetComponent(CharacterMotor).movement.velocity = Vector3(0,0,0);
	player.GetComponent(CharacterMotor).movement.gravity /= 5.0F;
	player.GetComponent(CharacterMotor).movement.maxForwardSpeed = 0f;
	player.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = 0f;
	player.GetComponent(CharacterMotor).movement.maxBackwardsSpeed = 0f;
	
	
	InvokeRepeating("TouchedBottom", 0, 0.001);
}

function TouchedBottom()
{
	var flagStep : GameObject = GameObject.Find("FlagStep");
	
	
	if(player == null)
	{
		CancelInvoke();
		return;
	}
		
	if(pm.health == 1)
	{
		if(Vector3.Distance(flagStep.transform.position, player.transform.position) <= 1.2)
		{
			pm.flagTime = false;
			WalkToCastle();
		}
	}
	else if(pm.health == 2)
	{		
		if(Vector3.Distance(flagStep.transform.position, player.transform.position) <= 1.5)
		{
			pm.flagTime = false;
			WalkToCastle();
		}
	}
}


function AddPoints()
{
	gm.GetComponent(PointsText).DisplayText(transform.position, "" + points, 5.0);
	pm.AddPoints(points);
}

function ExtraLife()
{
}


function WalkToCastle()
{
	GameObject.Find("PlayerGraphics").GetComponent(PlayerSprite).walkingRight = true;
	
	
	for(var v=0; v<100; v++)
	{
		if(player == null)
			return;
			
		if(player.transform.position.x >= end.transform.position.x)
		{
			gm.GetComponent(PlayerManager).EndGame();
			return;
		}
	
		player.transform.Translate(Vector3.right * Time.deltaTime * 0.5);
		yield WaitForSeconds(0.5);
	}
}

// ================================================================================ \\