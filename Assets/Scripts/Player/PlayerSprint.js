#pragma strict


// ================================================================================ \\

private var sprinting : boolean;
private var walkSpeed : float;
private var runSpeed : float;
private var specialRunSpeed : float;
private var player : GameObject;
private var gm : GameObject;

// ================================================================================ \\

function Start () 
{
	// wait for player to spawn
	yield WaitForSeconds(1);
	// init vars
	player = GameObject.Find("Player");
	gm = GameObject.Find("GameManager");
	
	
	// if in a test scene
	if(gm != null)
	{
		runSpeed = gm.GetComponent(PlayerManager).defaultRunSpeed;
		specialRunSpeed = gm.GetComponent(PlayerManager).specialRunSpeed;
		walkSpeed = gm.GetComponent(PlayerManager).defaultWalkSpeed;
	}
}

function Update () 
{
	// if they are holding shift
	if(Input.GetKey(KeyCode.LeftShift))
	{
		// if the player is null or the gamemanager is null
		if(gm == null || player == null)
			return; // don't worry about it
			
		// if player has rainbow star power
		if(gm.GetComponent(PlayerManager).hasStarPower)
		{
			// change them to star run speed
			player.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = specialRunSpeed;
		}
		// regular player
		else
		{
			// change them to run speed
			player.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = runSpeed;
		}
	}
	// not holding shift = not sprinting
	else
	{
		// if the player is null
		if(player == null)
			return; // don't worry about it
			
		// turn back to walk speed
		player.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = walkSpeed;
	}
}

// ================================================================================ \\