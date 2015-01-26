#pragma strict


// ================================================================================ \\

private var parent : GameObject;
private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;

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


function OnTriggerEnter(obj : Collider)
{
	// if it's not a player touching it, who cares
	if(obj.gameObject.tag != "Player")
		return;
		
	// not sure why, but sometimes is null
	if(parent.GetComponent(Enemy) == null)
		return;
		
	// if parent dead, ignore
	if(parent.GetComponent(Enemy).dead)
		return;
	
	parent.GetComponent(Enemy).OnTouch();
}


// ================================================================================ \\