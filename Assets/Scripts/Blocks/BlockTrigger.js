// ================================================================================ \\

function OnTriggerEnter(thing : Collider)
{
	// if not a player, ignore
	if(thing.tag !=  "Player")
		return;
		
	// trigger the block hit function
	gameObject.transform.parent.GetComponent(Block).OnHit();
}


// ================================================================================ \\