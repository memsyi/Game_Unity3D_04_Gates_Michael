function Squish(parentObj : GameObject)
{
	Destroy(parentObj.GetComponent(Enemy));
	
	parentObj.collider.enabled = false;
	parentObj.transform.position.z -= 3;
	
	while(parentObj.transform.localScale.y > 0)
	{
		parentObj.transform.localScale.y -= 0.1;
		yield WaitForSeconds(0.01);
	}
	
	Destroy(parentObj);
}

function Throw(parentObj : GameObject)
{
	// if the object is already falling
	if(parentObj.tag == "Falling")
		return;

	parentObj.tag = "Falling";
	
	Destroy(parentObj.GetComponent(Enemy));
	
	parentObj.transform.position.z -= 3;
	
	if(parentObj.rigidbody == null)
	{
		parentObj.AddComponent(Rigidbody);
	}

	parentObj.rigidbody.velocity = Vector3(4, 1, 4);
	
	
	Spin(parentObj);
}

function SmallBounce()
{
	var player = GameObject.Find("Player"); 
	var characterMotor = player.GetComponent(CharacterMotor);
	
	var currentVelocity : Vector3 = characterMotor.movement.velocity;
	
	if(currentVelocity.y < 25)
	{
		characterMotor.SetVelocity(Vector3(currentVelocity.x, 5, currentVelocity.z));
	}
}

function Spin(obj : GameObject)
{
	obj.transform.rotation.z = 0;
	
	while(obj != null && obj.transform.rotation.z > -180)
	{
		obj.transform.rotation.z -= 0.5;
		yield WaitForSeconds(0.05);
	}
}
