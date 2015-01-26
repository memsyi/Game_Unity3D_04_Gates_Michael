#pragma strict

// ================================================================================ \\

var parent : GameObject;
var prize : GameObject;
var usedTexture : Texture;

private var dead : boolean = false;

private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;




// ================================================================================ \\


function Start()
{
	gm = GameObject.Find("GameManager");
	pm = gm.GetComponent(PlayerManager);
	efx = gm.GetComponent(EnemyFX);
}


function OnTriggerEnter(obj : Collider)
{
	// if the parent is null.. though it never should be
	if(parent == null)
	{
		return;
	}
	// if not a palyer .. ignore
	if(obj.gameObject.tag != "Player")
	{
		return;
	}
	
	
	SpawnStar();
}


// ================================================================================ \\

// spawns a coin
function SpawnStar()
{
	// if the brick is dead
	if(dead)
	{
		return;
	}
	
	
	// kill all enemies above
	KillAbove();
	
	
	// Bounce box
	Bounce();
	
	
	
	// Spawn star and float it up
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;
	GameObject.Find("GameManager").GetComponent(ItemFactory).SpawnItem(prize, Vector3(x,y+1.5,z), 0);
	
	
	
	// kill the box
	PronounceDead();
}


// makes it so the block is dead
function PronounceDead()
{
	// it's dead, captain
	dead = true;
	
	// set the texture to used
	parent.renderer.material.mainTexture = usedTexture;
}




// bounces the box up and down
function Bounce()
{	
	var startY : float = parent.transform.position.y;
	
	for(var v=0; v<5; v++)
	{
		parent.transform.position.y += 0.05F;
		yield WaitForSeconds(0.01F);
	}
	for(var v2=0; v2<5; v2++)
	{
		parent.transform.position.y -= 0.1F;
		yield WaitForSeconds(0.01F);
	}
	
	parent.transform.position.y = startY;
}

// kills any enemies above the block
function KillAbove()
{
	var hit : RaycastHit;
	var startPos = transform.position;
	var targetPos = Vector3(startPos.x, startPos.y + 1, startPos.z);
	
	if(Physics.Raycast(targetPos, Vector3.up, hit, 2.0))
	{
		var thingHit = hit.collider.gameObject;
		var name : String = thingHit.name.ToLower();
		
		if(name.Contains("enemy"))
		{
			efx.Throw(hit.transform.parent.gameObject);
			hit.transform.gameObject.GetComponent(Enemy).ShowPointsEarned();
		}
	}
}

// ================================================================================ \\