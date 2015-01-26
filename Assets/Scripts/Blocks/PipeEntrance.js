// ================================================================================ \\

private var inUse : boolean;
private var player : GameObject;
var teleportPos : Transform;
var direction : Direction;
var destDirection : Direction;
var underground : boolean;
var sound : AudioClip;

// ================================================================================ \\

function Start () 
{
	yield WaitForSeconds(0.5);
	player = GameObject.Find("Player");
}


function Update () 
{
	// if player doesn't exist, ignore
	if(player == null)
		return;
	
	// if the player is not in range
	if(Vector3.Distance(transform.position, player.transform.position) > 1.5)
		return;
	
	// if they are pressing left right up or down	
	//TODO: support for up and left pipes
	if((Input.GetAxis("Vertical") && direction == Direction.DOWN) || (Input.GetAxis("Horizontal") && direction == Direction.RIGHT))
	{
		if(inUse)
		{
			return;
		}
		
		// if the player is not standing still
		if(Vector3.Distance(player.GetComponent(CharacterMotor).movement.velocity, Vector3(0,0,0)) > 0)
		{
			return;
		} 
		
		inUse = true;
		
		// move the player through the pipe
		Move();
		
	}
}

// ================================================================================ \\



// moves the player through the pipe
function Move()
{
	var startX = player.transform.position.x;
	var startY = player.transform.position.y;
	player.GetComponent(CharacterMotor).enabled = false;
	
	
	// if pipe going down
	if(direction == Direction.DOWN)
	{
		while(true)
		{
			// if player is below start position minus their height minus a little extra
			if(player.transform.position.y <= (startY - player.transform.localScale.y - 0.5f))
			{
				yield WaitForSeconds(1);
				Teleport();
				break;
			}
			
			player.transform.position.y -= 0.2f;
			yield WaitForSeconds(0.2);
		}
	}	
	else if(direction == Direction.RIGHT)
	{
		while(true)
		{
			// if player is below start position minus their height minus a little extra
			if(player.transform.position.x >= (startX + player.transform.localScale.x + 0.5f))
			{
				yield WaitForSeconds(1);
				Teleport();
				break;
			}
			
			player.transform.position.x += 0.2f;
			yield WaitForSeconds(0.2);
		}
	}
	
}

// teleports the player to the pipe's destination
function Teleport()
{
	if(teleportPos != null)
	{
		player.transform.position = teleportPos.position;
	}
	
	GameObject.Find("MainCamera").GetComponent(ScrollCamera).underground = underground;
	
	if(!underground)
	{
		var startY = player.transform.position.y;
		var startX = player.transform.position.x;
		
		if(destDirection == Direction.UP)
		{		
			while(true)
			{
				// if player is below start position minus their height minus a little extra
				if(player.transform.position.y >= (startY + player.transform.localScale.y + 1.8f))
				{
					break;
				}
				
				player.transform.position.y += 0.2f;
				yield WaitForSeconds(0.2);
			}
		}
	}
	
	player.GetComponent(CharacterMotor).enabled = true;
}





// ================================================================================ \\