// ================================================================================ \\

function OnTriggerEnter(obj : Collider)
{
	if(obj.gameObject.tag == "Player")
	{
		// kill the player for being in the void
		GameObject.Find("GameManager").GetComponent(PlayerManager).KillPlayer();
	}
	else
	{
		Destroy(obj.gameObject);
	}
}

// ================================================================================ \\