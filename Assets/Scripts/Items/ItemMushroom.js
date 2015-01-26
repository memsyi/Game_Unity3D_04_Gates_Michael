#pragma strict

// ================================================================================ \\


private var direction : Direction;

private var locked : boolean = true;

// ================================================================================ \\

function Start()
{
	yield WaitForSeconds(0.8);
	locked = false;
	
	
	// player facing left
	if(GameObject.Find("Player").transform.localScale.x < 0)
	{
		direction = Direction.LEFT;
	}
	// player facing right
	else
	{
		direction = Direction.RIGHT;
	}
}


function Update () 
{
	// not locked in place
	if(!locked)
	{
		// push the mushroom around
		Push();
	}
}


function OnTriggerEnter(obj : Collider)
{
	// if not a player
	if(obj.tag != "Player")
		return;
		
		
	// give the player star power
	GameObject.Find("GameManager").GetComponent(PlayerManager).SizeUp();
	Destroy(gameObject);
}



// ================================================================================ \\


// Push the star to the right
function Push()
{
	var hit : RaycastHit;
		
	// if there is an object to the right of it
	if(Physics.Raycast(transform.position, Vector3.right, 0.5))
	{
		rigidbody.velocity = Vector3(-2,0,0);
		direction = Direction.LEFT;
	}
	// if there is an obect to the left of it
	else if(Physics.Raycast(transform.position, Vector3.left, hit, 0.5))
	{
		// let the star pass through the invisible wall
		if(hit.collider.gameObject.tag != "WallBoundary")
		{
			rigidbody.velocity = Vector3(2,0,0);
			direction = Direction.RIGHT;
		}
	}
	// if there is something below them
	else if(Physics.Raycast(transform.position, Vector3.down, hit, 0.4))
	{		
		// pushing right
		if(direction == Direction.RIGHT)
		{
			rigidbody.velocity = Vector3(2,0.5,0);
		}
		// pushing left
		else
		{
			rigidbody.velocity = Vector3(-2,0.5,0);
		}
	}
	
	
}


// ================================================================================ \\