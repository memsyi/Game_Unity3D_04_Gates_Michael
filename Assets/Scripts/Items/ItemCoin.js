// ================================================================================ \\

var sound : AudioClip;

function OnTriggerEnter(thing : Collider)
{
	// if not a player, ignore
	if(thing.tag !=  "Player")
		return;
		
	// give player coin
	GameObject.Find("GameManager").GetComponent(PlayerManager).AddCoins(1);	
	// play coin sound	
	AudioSource.PlayClipAtPoint(sound, transform.position);
	
	// destroy coin
	Destroy(gameObject);
}


// ================================================================================ \\