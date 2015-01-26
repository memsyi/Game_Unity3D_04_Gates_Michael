#pragma strict


var destroyedObjects: String[];


private var startY : float;

function Start()
{
	startY = transform.position.y;
}


function OnTriggerEnter(obj : Collider)
{
	var tag : String = obj.gameObject.tag;
	
	
	// sometimes the rigidbody gets tired...
	if(rigidbody.IsSleeping())
	{
		rigidbody.WakeUp();
	}
		
	// if not the player, we don't care
	if(tag != "Player")
	{	
		rigidbody.detectCollisions = false;
	}
	else
	{
		rigidbody.detectCollisions = true;
	}
	
}


function Update()
{
	transform.position.y = startY;
}