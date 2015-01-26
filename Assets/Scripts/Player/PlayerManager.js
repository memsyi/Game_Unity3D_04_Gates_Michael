#pragma strict

// ================================================================================ \\

var smallPlayerPrefab : GameObject;
var largePlayerPrefab : GameObject;
var firePlayerPrefab : GameObject;

var spawnPosition : Transform;
var currentPlayer : GameObject;

var points : int = 0;
var lives : int = 3;	
var coins : int = 0;
var time : int = -1;

var defaultWalkSpeed : float = 6; 
var defaultRunSpeed : float = 9; 
var specialWalkSpeed : float = 8;
var specialRunSpeed : float = 12;

var alive : boolean;
var health : int;
var hasFireFlower : boolean;
var hasStarPower : boolean;

var flagTime : boolean;

var soundGrow : AudioClip;
var soundShrink : AudioClip;
var fireball : AudioClip;
var soundDeath : AudioClip;

var flagged : boolean;

var invincible : boolean;

private var defaultColor : Color;
private var gm : GameObject;


// ================================================================================ \\



function Start()
{
	// Smallest mario
	health = 1;
	
	// set alive
	alive = true;	
	
	// game manager
	gm = GameObject.Find("GameManager");
	
	// spawn player
	SpawnPlayer();
}


// ************************************** DEBUGGING PURPOSES **************************************

function Update()
{

	var v3 = Input.mousePosition;
	v3.z = 10.25;
	v3 = Camera.main.ScreenToWorldPoint(v3);
}


// ================================================================================ \\


// Spawn the player into the world
function SpawnPlayer()
{
	// no spawn position set
	if(spawnPosition == null)
	{
		Debug.Log("No spawn position available!");
		return;
	}
	
	// spawn the player into the world
	currentPlayer = Instantiate(smallPlayerPrefab, spawnPosition.position, Quaternion.identity);
	// set player name to 'Player' beacuse it's easier
	currentPlayer.name = "Player";
	// set the default color
	defaultColor = currentPlayer.transform.FindChild("PlayerGraphics").gameObject.renderer.material.color;
	
	// player is alive
	alive = true;
}


// When the player is damaged
function OnDamage()
{	
	// if invincible
	if(invincible)
		return;
		
	// if they have a larger sized mario
	if(health >= 2)
	{
		// size down mario
		SizeDown();
	}
	// smallest mario (?)
	else
	{
		// kill the player
		KillPlayer();
	}
}



// Kill the player
function KillPlayer()
{
	currentPlayer.GetComponent(CharacterMotor).enabled = false;
	
	
	// play the death animation
	PlayDeathAnimation();
	
	
	// Remove 1 life from player
	RemoveLives(1);
	
	
	// player is not alive
	alive = false;
	
	
	// kill audio
	if(gm.GetComponent(AudioManager) != null)
	{
		gm.GetComponent(AudioManager).stopAllAudio();
	}
	
	
	if(soundDeath != null)
	{
		// play death sounds
		AudioSource.PlayClipAtPoint(soundDeath, transform.position);
	}	
	
	yield WaitForSeconds(3);
	
	Application.LoadLevel("GameOver");
}


// Player the death animation
function PlayDeathAnimation()
{
	var times : int = 0;
	while(true)
	{
		if(times > 35)
		{
			break;
		}
		currentPlayer.transform.position.y += 0.05;
		times++;
		yield WaitForSeconds(0.005);
	}
	times = 0;
	while(true)
	{
		if(times > 100)
		{
			break;
		}
		currentPlayer.transform.position.y -= 0.05;
		times++;
		yield WaitForSeconds(0.005);
	}
}


// Player received star
function GiveStarPower(sound : AudioClip)
{
	// make it rainbow-like
	currentPlayer.gameObject.AddComponent(RandomColorChanger);
	currentPlayer.gameObject.GetComponent(RandomColorChanger).rate = 15;
	currentPlayer.gameObject.GetComponent(RandomColorChanger).parent = currentPlayer.gameObject.transform.FindChild("PlayerGraphics").gameObject;
	
	// change max walk speed
	currentPlayer.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = specialWalkSpeed;
	
	// activate star power boolean
	hasStarPower = true;
	
	// kill audio
	gm.GetComponent(AudioManager).stopAllAudio();
	
	// play sound
	AudioSource.PlayClipAtPoint(sound, transform.position);
	
	Invoke("RemoveStarPower", 10);
}


// Player lost star
function RemoveStarPower()
{
	// get rid of star color
	Destroy(currentPlayer.gameObject.GetComponent(RandomColorChanger)); // remove changing color script
	currentPlayer.transform.FindChild("PlayerGraphics").gameObject.renderer.material.color = defaultColor; // set old color
	
	// get rid of fast running
	currentPlayer.GetComponent(CharacterMotor).movement.maxSidewaysSpeed = defaultWalkSpeed;
	
	// deactivate star power boolean
	hasStarPower = false;
}


//TODO: 
function SizeUp()
{	 
	if(health >= 2)
	{
		gm.GetComponent(PointsText).DisplayText(transform.position, "" + 500, 5.0);
		AddPoints(points);
		return;
	}
	
	health = 2;
	
	currentPlayer.transform.localScale.x *= 1.5;
	currentPlayer.transform.localScale.y *= 1.5;
	currentPlayer.transform.position.y += 1.5;
	
	AudioSource.PlayClipAtPoint(soundGrow, currentPlayer.transform.position);
}

//TODO: 
function SizeDown()
{
	invincible = true;
	health = 1;
	
	currentPlayer.transform.localScale.x /= 1.5;
	currentPlayer.transform.localScale.y /= 1.5;
	
	yield WaitForSeconds(1);
	invincible = false;
	
	// play shrink sound (none)
	//AudioSource.PlayClipAtPoint(soundGrow, currentPlayer.transform.position);
}


function EndGame()
{
	Destroy(currentPlayer);
	
	yield WaitForSeconds(1);
	Application.LoadLevel("Winner");
}



// ================================================================================ \\


// add coins to user
function AddCoins(amt : int){ this.coins += amt; }
// add lives to user
function AddLives(amt : int){ this.lives += amt; }
// add points to user
function AddPoints(amt : int){ this.points += amt; }
// add time to user
function AddTime(amt : int){ this.time += amt; }

// remove coins from user
function RemoveCoins(amt : int){ this.coins = this.coins - amt > 0 ? this.coins - amt : 0; }
// remove lives from user
function RemoveLives(amt : int){ this.lives = this.lives - amt > 0 ? this.lives - amt : 0; }
// remove points from user
function RemovePoints(amt : int){ this.points = this.points - amt > 0 ? this.points - amt : 0; }
// remove time from user
function RemoveTime(amt : int){ this.time = this.time - amt > 0 ? this.time - amt : 0; }

// set coins for user
function SetCoins(amt : int){ this.coins = amt; }
// set lives for user
function SetLives(amt : int){ this.lives = amt; }
// set points for user
function SetPoints(amt : int){ this.points = amt; }
// set time for user
function SetTime(amt : int){ this.time = amt; }

// ================================================================================ \\