// ================================================================================ \\

private var parent : GameObject;
private var dead : boolean = false;


private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;

var shellPrefab : GameObject;

// ================================================================================ \\


function Start()
{
	parent = gameObject.transform.parent.gameObject;
	
	gm = GameObject.Find("GameManager");
	pm = gm.GetComponent(PlayerManager);
	efx = gm.GetComponent(EnemyFX);
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
		return;
	
	// if the player has star power
	if(pm.hasStarPower)
	{
		// throw the koopa so it is instant
		efx.Throw(gameObject.transform.parent.gameObject);
	}
	else
	{
		// squish koopa
		efx.SmallBounce();
		Squish();
	}
	
	// if koopa
	if(parent.name.ToLower().Contains("koopa"))
	{		
		// if koopa can show text
		if(parent.GetComponent(Enemy) != null)
		{
			// show some text
			parent.GetComponent(Enemy).ShowPointsEarned();
		}
	}
}

function Squish()
{
	Destroy(transform.parent.gameObject);
	Instantiate(shellPrefab, transform.position, Quaternion.identity);
}

// ================================================================================ \\