#pragma strict

// ================================================================================ \\


private var direction : int = 0;

var music : AudioClip;

// ================================================================================ \\

function Start()
{
	Invoke("PushRight", 0.1);
}

function Update () 
{
	Push();
}


function OnTriggerEnter(obj : Collider)
{
	// if not a player
	if(obj.tag != "Player")
		return;
		
		
	// give the player star power
	GameObject.Find("GameManager").GetComponent(PlayerManager).GiveStarPower(music);
	Destroy(gameObject);
}



// ================================================================================ \\


// Push the star to the right
function Push()
{
	var hit : RaycastHit;
		
	// if there is an object to the right of it
	if(Physics.Raycast(transform.position, Vector3.right, 1))
	{
		rigidbody.velocity = Vector3(-4,6.5,0);
		direction = 1;
		
	}
	// if there is an obect to the left of it
	else if(Physics.Raycast(transform.position, Vector3.left, hit, 1))
	{
		// let the star pass through the invisible wall
		if(hit.collider.gameObject.tag != "WallBoundary")
		{
			rigidbody.velocity = Vector3(4,3,0);
			direction = 0;
		}
	}
	// if there is something below them
	else if(Physics.Raycast(transform.position, Vector3.down, hit, 0.5))
	{		
		// star should only bounce of floor and metallic-looking blocks
		if(hit.collider.gameObject.tag == "Floor")
		{
			// pushing right
			if(direction == 0)
				rigidbody.velocity = Vector3(4,3,0);
			// pushing left
			else
				rigidbody.velocity = Vector3(-4,3,0);
		}		
	}
	
	
}

function PushRight()
{		
	rigidbody.velocity = Vector3(4, 6.5, 0);
}


function PushLeft()
{		
	rigidbody.velocity = Vector3(-4 ,6.5, 0);
}



// ================================================================================ \\