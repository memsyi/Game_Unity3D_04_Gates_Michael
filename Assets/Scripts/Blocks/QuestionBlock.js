#pragma strict

// ================================================================================ \\

var prize : GameObject;
var prizeIsCoin : boolean;
var usedTexture : Texture2D;
var parentObject : GameObject;

private var used : boolean = false;

private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;



// ================================================================================ \\

function Start()
{
	yield WaitForSeconds(1);
	gm = GameObject.Find("GameManager");
	if(gm != null)
	{
		pm = gm.GetComponent(PlayerManager);
		efx = gm.GetComponent(EnemyFX);
	}
}

function OnTriggerEnter(other : Collider)
{
	// if the thing colliding is not a player
	if(other.gameObject.tag != "Player")
	{
		// just ignore it
		return;
	}
	
	// if the block has not been used yet
	if(!used)
	{
		// set it to used
		PronounceDead();
		
		// give item
		GivePrize();
		
		
		// kill above enemies if any
		KillAbove();
	}
}

// ================================================================================ \\

// makes it so the block is dead
function PronounceDead()
{
	used = true;
	
	// turn off the gif renderer
	parentObject.GetComponent(GifDrawer).stillActive = false;
	// set the texture to used
	parentObject.renderer.material.mainTexture = usedTexture;
}


// gives the user the prize
function GivePrize()
{
	// bounce box
	Bounce();
	
	// if the prize is a quick coin
	if(prizeIsCoin)
	{
		QuickCoin();
	}
	else
	{
		// if there is no prize, ignore
		if(prize == null)
			return;
			
		// if the prize is coin object
		else if(prize.tag == "Coin")
		{
			// spawn a coin
			QuickCoin();
		}
		
		// if the prize is a powerup
		else
		{
			// spawn a powerup
			SpawnPrize();
		}
	}
}


// Spawn a coin 
function SpawnCoin()
{
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;
	
	// Spawn a still coin
	GameObject.Find("GameManager").GetComponent(ItemFactory).SpawnItem(prize, Vector3(x, y+1.5,z), 180);
}


// Spawn a 'quick' coin (spawns&destroys coin and adds to balance)
function QuickCoin()
{	
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;

	// Spawn coin and float it up
	GameObject.Find("GameManager").GetComponent(ItemFactory).SpawnItemAndFloat(prize, Vector3(x + 0.2,y+1.5,z), 0, 180, 0, 0.05, 1, true);
	
	// Update coin balance with this new coin
	GameObject.Find("GameManager").GetComponent(PlayerManager).AddCoins(1);
}

// Spawns the prize
function SpawnPrize()
{
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;
	
	
	// Spawn prize and float it up
	GameObject.Find("GameManager").GetComponent(ItemFactory).SpawnItemAndFloat(prize, Vector3(x,y+1.5,z + 1.5), 0, 0, 0, 0.05, 1.0, false);
}


// bounces the box up and down
//TODO: Make this look better
function Bounce()
{	
	// start position of the box, used for later
	var startY : float = parentObject.transform.position.y;
	
	// move the box up
	for(var v=0; v<5; v++)
	{
		parentObject.transform.position.y += 0.05F;
		yield WaitForSeconds(0.01F);
	}
	// move the box down
	for(var v2=0; v2<5; v2++)
	{
		parentObject.transform.position.y -= 0.1F;
		yield WaitForSeconds(0.01F);
	}
	
	// reset box position
	parentObject.transform.position.y = startY;
}

// kills any enemies above the block
function KillAbove()
{
	var hit : RaycastHit;
	var startPos = transform.position;
	var targetPos = Vector3(startPos.x, startPos.y + 1, startPos.z);
	
	if(Physics.Raycast(targetPos, Vector3.up, hit, 2.0))
	{
		if(hit == null)
			return;
			
		var thingHit = hit.collider.transform.parent.gameObject;
		var name : String = thingHit.name.ToLower();

		if(name.Contains("enemy"))
		{
			efx.Throw(thingHit);
			hit.transform.gameObject.GetComponent(Enemy).ShowPointsEarned();
		}
	}
}

// ================================================================================ \\