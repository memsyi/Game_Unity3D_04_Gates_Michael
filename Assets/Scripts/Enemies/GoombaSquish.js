// ================================================================================ \\

private var parent : GameObject;
private var dead : boolean = false;


private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;

var squishSound : AudioClip;
var kickSound : AudioClip;

// ================================================================================ \\


function Start()
{
	parent = gameObject.transform.parent.gameObject;
	
	gm = GameObject.Find("GameManager");
	
	if(gm != null)
	{
		pm = gm.GetComponent(PlayerManager);
		efx = gm.GetComponent(EnemyFX);
	}
}


function Update()
{
	if(dead)
	{
		Destroy(parent.gameObject, 1);
	}
}


// ================================================================================ \\

function OnTriggerEnter(obj : Collider)
{
	// if it's not a player touching it, who cares
	if(obj.gameObject.tag != "Player")
		return;	
		
	if(!pm.alive)
	{
		return;
	}
	
	// if the player has star power
	if(pm.hasStarPower)
	{
		// throw the goomba so it is instant
		efx.Throw(gameObject.transform.parent.gameObject);
		
		AudioSource.PlayClipAtPoint(kickSound, transform.position);
	}
	else
	{
		// squish goomba
		efx.Squish(parent.gameObject);
		efx.SmallBounce();
		
		AudioSource.PlayClipAtPoint(squishSound, transform.position);
	}
	
	// if goomba
	if(parent.name.ToLower().Contains("goomba"))
	{		
		// if goomba can show text
		if(parent.GetComponent(Enemy) != null)
		{
			// show some text
			parent.GetComponent(Enemy).ShowPointsEarned();
		}
	}
}

// ================================================================================ \\