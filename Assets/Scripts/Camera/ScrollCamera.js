#pragma strict

var player : GameObject;
var leftBoundaryX : float;
var rightBoundaryX : float;
var underground : boolean = false;

private var startY : float;

function Start()
{
	yield WaitForSeconds(0.5);
	player = GameObject.Find("Player");
	
	startY = transform.position.y;
}


function Update () 
{
	if(GameObject.Find("GameManager") == null)
	{
		if(Time.timeScale != 1.0)
		{
			Time.timeScale = 1.0;
		}
	}

	if(player != null)
	{
		// set the boundary to current x
		leftBoundaryX = transform.position.x;
		
		if(GameObject.Find("WALL_LEFT") != null)
		{	
			if(!underground)
			{
				GameObject.Find("WALL_LEFT").transform.position.x = leftBoundaryX - 12.5;
			}
		}
		
		// as long as player in bounds, move camera to player
		if((player.transform.position.x > leftBoundaryX && player.transform.position.x <= rightBoundaryX) ||  underground)
		{
			if(underground)
			{
				// hardcoded ? oh well
				transform.position.x = 55.69202f;
				transform.position.y = 83.90115f;
			}
			else
			{
				transform.position.x = player.transform.position.x;
				transform.position.y = startY;
			}
		}
	}
}

