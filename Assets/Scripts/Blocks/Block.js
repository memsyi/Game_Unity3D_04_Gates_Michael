// ================================================================================ \\

enum BlockType
{
	BREAKABLE,
	COIN,
	PRIZE,
	INVISIBLE_LIFE,
}

// ================================================================================ \\

private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;

var type : BlockType;
var uses : int;
var prize : GameObject;
var points : int;
var startTexture : Texture2D;
var deadTexture : Texture2D;
var explodeFX : ParticleSystem;

var gifFrames : Texture[];
var gifSpeed : int;

var explodePos : Transform;
var giftPos : Transform;

private var dead : boolean;
private var shaking : boolean;

var breakSound : AudioClip;
var nopeSound : AudioClip;
var giftSound : AudioClip;
var coinSound : AudioClip;


// ================================================================================ \\



// Use this for initialization
function Start () 
{
	gm = GameObject.Find("GameManager");
	
	if(gm != null)
	{
		pm = gm.GetComponent(PlayerManager);
		efx = gm.GetComponent(EnemyFX);
	}
	
	
	if(startTexture != null)
	{
		gameObject.renderer.material.mainTexture = startTexture;
	}
	
	
	// if it is a multiframe object
	if(gifFrames.Length > 0)
	{
		gameObject.AddComponent(GifDrawer);
		
		gameObject.GetComponent(GifDrawer).frames = gifFrames;
		gameObject.GetComponent(GifDrawer).framesPerSecond = gifSpeed;
	}	
}




// Update is called once per frame
function Update () 
{
}




// ================================================================================ \\

// when the block is triggered
function OnHit()
{

	// if a regular brick
	if(type == BlockType.BREAKABLE)
	{
		// if player is too small
		if(pm != null && pm.health < 2)
		{
			if(!shaking)
			{
				KillAbove();
				Bounce();
				
				// play bounce sound
				AudioSource.PlayClipAtPoint(nopeSound, transform.position);
			}
			return;
		}
	
		// explode and destroy
		Explode();
		return;
	}
	
	// if block is dead
	if(dead)
		return;
	
	// if a coin block (releases coin(s) when hit)
	else if(type == BlockType.COIN)
	{
		// use the block
		Use(BlockType.COIN);
	}
	
	// block releases a prize item
	else if(type == BlockType.PRIZE)
	{
		// use the block
		Use(BlockType.PRIZE);
	}
	
	
	// if block isn't shaking
	if(!shaking)
	{
		// bounce the block
		Bounce();
	}
	
	// kill enemies above
	KillAbove();
	
	// lose another use
	uses--;
	
	// kill the block if no more uses
	if(uses <= 0)
	{
		Die();
	}
	
}



// makes the block explode & destroy itself
function Explode()
{
	gameObject.SetActive(false);
	
	// instantiate effect
	effect = Instantiate(explodeFX, explodePos.position, Quaternion.identity);
	// play
	effect.Play();
	// play sound
	AudioSource.PlayClipAtPoint(breakSound, transform.position);
	
	// destroy 
	Destroy(effect.gameObject, 1);
	Destroy(gameObject, 1);
}



// uses the block type and yields whatever
function Use(type : BlockType)
{
	switch(type)
	{
		case BlockType.COIN:
			Coin();
			break;
		case BlockType.PRIZE:
			Prize();
			break;
		case BlockType.INVISIBLE_LIFE:
			InvisibleLife();
			break;
	}
}


// spawns a simple coin and adds to stats
function Coin()
{
	// Spawn coin and float it up
	gm.GetComponent(ItemFactory).SpawnItemAndFloat(prize, giftPos.position, 0, 180, 0, 0.05, 1.5, true);
	
	// Update coin balance with this new coin
	pm.AddCoins(1);
	pm.AddPoints(50);
	
	// play sound
	AudioSource.PlayClipAtPoint(coinSound, transform.position);
}


// spawns the prize item
function Prize()
{
	if(pm.health >= 2)
	{	
		gm.GetComponent(PointsText).DisplayText(transform.position, "" + 500, 5.0);
		pm.AddPoints(500);
		return;
	}
	
	// Spawn coin and float it up
	GameObject.Find("GameManager").GetComponent(ItemFactory).SpawnItemAndFloat(prize, giftPos.position, 0, 0, 0, 0.05, 1, false);
	
	// play sound
	AudioSource.PlayClipAtPoint(giftSound, transform.position);
}


//TODO: implement
function InvisibleLife()
{
}



// kill the block
function Die()
{
	Destroy(gameObject.GetComponent(GifDrawer));
	dead = true;
	gameObject.renderer.material.mainTexture = deadTexture;
}



// bounces the box up and down
function Bounce()
{	
	shaking = true;
	var startY : float = gameObject.transform.position.y;
	for(var v1=0; v1<5; v1++)
	{
		gameObject.transform.position.y += 0.1;
		yield WaitForSeconds(0.01);
	}
	for(var v2=0; v2<7; v2++)
	{
		gameObject.transform.position.y -= 0.1;
		yield WaitForSeconds(0.01);
	}
	for(var v3=0; v3<2; v3++)
	{
		gameObject.transform.position.y += 0.1;
		yield WaitForSeconds(0.01);
	}
	gameObject.transform.position.y = startY;
	yield WaitForSeconds(0.2);
	shaking = false;
}


// kills any enemies above the block
function KillAbove()
{
	var hits : RaycastHit[] = Physics.RaycastAll(transform.position, Vector3.up, 2);
	
	for (var i = 0;i < hits.Length; i++) 
	{
		var hit : RaycastHit = hits[i];
		var name : String = hit.collider.name.ToLower();
	
		if(name.Contains("enemy"))
		{
			efx.Throw(hit.collider.gameObject);
			//TODO: figure out why there is an NPE here
			if(hit == null || hit.collider == null || hit.collider.gameObject == null || hit.collider.gameObject.GetComponent(Enemy) == null)
				return;
			hit.collider.gameObject.GetComponent(Enemy).ShowPointsEarned();
			pm.AddPoints(hit.collider.gameObject.GetComponent(Enemy).points);
		}
	}
}


// ================================================================================ \\