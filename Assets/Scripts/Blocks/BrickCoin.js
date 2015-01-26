#pragma strict

// ================================================================================ \\

var parent : GameObject;
var prize : GameObject;
var uses : int = 8;
var usedTexture : Texture;

private var attempts : int = 0;
private var dead : boolean = false;
private var doingStuff : boolean;

private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;



// ================================================================================ \\

function Start()
{
	yield WaitForSeconds(1);
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
	
	// if the coin is not already being processed for the current hit
	if(!doingStuff)
	{
		// give 'em a coin
		GiveCoin();
		KillAbove();
	}
}


// ================================================================================ \\

// spawns a coin
function GiveCoin()
{
	// if the brick is dead
	if(dead)
	{
		return;
	}

	// if the player used the box to its limit
	if(attempts >= uses)
	{
		PronounceDead();
		return;
	}
	
	doingStuff = true;
	
	// Bounce box
	Bounce();
	
	// if block can still be used for coins
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;
	
	// Spawn coin and float it up
	gm.GetComponent(ItemFactory).SpawnItemAndFloat(prize, Vector3(x + 1,y+1.5,z), 0, 180, 0, 0.05, 1.5, true);
	
	// Update coin balance with this new coin
	pm.AddCoins(1);
	pm.AddPoints(50);
	
	// add to attempts
	attempts++;
	
	
	yield WaitForSeconds(0.3);
	doingStuff = false;
}


// makes it so the block is dead
function PronounceDead()
{
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