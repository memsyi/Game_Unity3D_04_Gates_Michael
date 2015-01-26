#pragma strict

var boundaryLeft : float;
var boundaryRight : float;
var speed : float;


private var dir : Direction;


function Start()
{
	dir = Direction.RIGHT;
}

function Update () 
{
	// if moving left
	if(dir == Direction.LEFT)
	{
		transform.Translate(Vector3.left * Time.deltaTime * speed);
		
		if(transform.position.x <= boundaryLeft)
		{
			dir = Direction.RIGHT;
		}
	}
	// if moving right
	else
	{
		transform.Translate(Vector3.right * Time.deltaTime * speed);
		
		if(transform.position.x >= boundaryRight)
		{
			dir = Direction.LEFT;
		}
	}
}