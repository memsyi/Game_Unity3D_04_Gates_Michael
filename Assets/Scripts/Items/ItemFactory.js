#pragma strict

// ================================================================================ \\


// Spawn X item into world at position with rotation
function SpawnItem(item : GameObject, position : Vector3, yRotate : float)
{
	var obj : GameObject = Instantiate(item, position, Quaternion.identity);
	// rotate on y axis
	if(yRotate != 0)
	{
		obj.transform.rotation.y = yRotate;
	}
}



// Spawn X item into world at position with rotation and float it up
// Direction 0 == up, Direction 1 == down
function SpawnItemAndFloat(item : GameObject, startPosition : Vector3, endZ : float, yRotate : float, direction : int, step : float, total: float, destroyOnFinish : boolean)
{
	var product : GameObject = Instantiate(item, startPosition, Quaternion.identity);
	// rotate on y axis
	if(yRotate != 0)
	{
		product.transform.rotation.y = yRotate;
	}
	
	
	// if item has a rigidbody
	if(product.rigidbody != null)
	{
		product.rigidbody.useGravity = false;
	}
	
	
	// float item upwards
	if(direction == 0)
	{	
		
		if(product == null || product.gameObject == null)
		{
			return;
		}
		// as long as the coin has not floated to the goal 
		while(product.transform.position.y <= startPosition.y + total)
		{
			product.transform.position.y += step; // move coin up on y axis
			yield WaitForSeconds(0.01); // wait 0.01 seconds so the thread doesn't stall and isn't instant and doesn't look so weird
		}
	}
	// float item downwards
	else if(direction == 1)
	{
		// as long as the coin has not floated to the goal
		while(product.transform.position.y >= startPosition.y - total)
		{
			product.transform.position.y -= step; // move coin down on y axis
			yield WaitForSeconds(0.01); // wait 0.01 seconds so the thread doesn't stall and isn't instant and doesn't look so weird
		}
	}
	
	
	// if item has a rigidbody
	if(item.rigidbody != null)
	{
		yield WaitForSeconds(0.2);
		// turn gravity back on
		product.rigidbody.isKinematic = false;
		product.rigidbody.useGravity = true;
	}
	
	
	// teleport to end Z
	product.transform.position.z = endZ;
	
	
	// if the item should destroy when finished floating
	if(destroyOnFinish)
	{
		Destroy(product); // destroy the object
	}
}


// ================================================================================ \\