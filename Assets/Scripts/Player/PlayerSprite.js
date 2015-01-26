#pragma strict

private var texture : AnimatedTexture;
var scaleX : float;

private var gm : GameObject;
private var pm : PlayerManager;

var walkingRight : boolean;


function Start () 
{
	texture = gameObject.GetComponent(AnimatedTexture);
	scaleX = transform.localScale.x;
	
	yield WaitForSeconds(0.5);
	gm = GameObject.Find("GameManager");
	if(gm != null)
	{
		pm = gm.GetComponent(PlayerManager);
	}
}


function Update () 
{
	// if the game is paused, ignore
	if(gm == null || gm.GetComponent(GamePause) == null || gm.GetComponent(GamePause).paused)
		return;
		
	// if sling down flag
	if(pm.flagTime)
	{
		// slide row
		texture.rowNumber = 3;
		transform.localScale.x = scaleX;
		return;
	}
	
	// player moving left
	if(IsMovingLeft())	
	{
		// move to running row
		texture.rowNumber = 1;
		// facing left texture
		transform.localScale.x = -scaleX;
	}
	
	// player moving right
	else if(IsMovingRight() || walkingRight)
	{
		// move to running row
		texture.rowNumber = 1;
		// facing right texture
		transform.localScale.x = scaleX;
	}
	
	// standing still
	else
	{
		texture.rowNumber = 0;
	}
	
	// player is jumping
	if(IsJumping())
	{
		// move to running row
		texture.rowNumber = 2;
	}
	
	if(!pm.alive)
	{
		texture.rowNumber = 4;
	}
	
	
}





// if the player is moving right
function IsMovingRight()
{
	return Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow);
}


// if the player is moving left
function IsMovingLeft()
{
	return Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow);
}



// if the player is jumping 
// determined by if the player is pressing jump and if they are fairly close to the ground
function IsJumping()
{
	var key : boolean = Input.GetKey(KeyCode.Space);
	var grounded : boolean = Physics.Raycast(transform.position, Vector3.down, 1);
	
	return key && !grounded;
}










