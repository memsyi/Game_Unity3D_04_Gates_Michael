#pragma strict


// ================================================================================ \\

private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;

private var dir : Direction;
private var falling : boolean;
private var still : boolean;
private var dead : boolean;
private var activated : boolean;
private var safePlayer : boolean;
private var passthrough : boolean;

var speed : float = 10.0F;
var points : int;
var soundKick : AudioClip;



// ================================================================================ \\

function Start () 
{
	gm = GameObject.Find("GameManager");
	pm = gm.GetComponent(PlayerManager);
	efx = gm.GetComponent(EnemyFX);
	
	still = true;
	
	
	dir = Direction.NONE;
	
	activated = false;
}


function Update()
{
	// check for collision areas around
	CheckCollision();
	
	// move accordingly
	Move();
	
	// check if the shell is still in the play area
	CheckInPlay();
}

function OnTriggerEnter(obj : Collider)
{
	if(dead)
		return;
		
	// cant do anything while falling
	if(falling)
		return;
		
	if(!activated)
		return;
		
	if(obj.tag == "Player")
	{
		// if the player has star power, they are going to react differently
		if(pm.hasStarPower)
		{
			// cant be used again
			dead = true;
			// throw goomba
			efx.Throw(gameObject);
			// show points
			ShowPointsEarned();
		}
		// regular player to get rekt
		else
		{
			// if the shell is still
			if(still)
			{
				still = false;
				dir = obj.collider.transform.position.x < transform.position.x ? Direction.RIGHT : Direction.LEFT;
				
				// temporarily invincible player
				safePlayer = true;
				yield WaitForSeconds(0.5);
				safePlayer = false;
			}
			// the shell is not still
			else
			{
				if(!safePlayer)
				{
					if(obj.collider.transform.position.y > transform.position.y + 0.3)
					{	
						dir = Direction.NONE;
						still = true;
						efx.SmallBounce();
					}
					else
					{
						// damage the player
						pm.OnDamage();
					}
				}
			}
		}
		
		// play sound	
		AudioSource.PlayClipAtPoint(soundKick, transform.position);
	}
	
}


// ================================================================================ \\

// Check if there are walls or floors or ceilings that the goomba needs to be aware of
function CheckCollision()
{
    var hit : RaycastHit;
	
	
	// if there is nothing below them
	if(!Physics.Raycast(transform.position, Vector3.down, hit, 0.35))
	{	
		Fall();
	}
	
	
	// if something to the left
	if(Physics.Raycast(transform.position, Vector3.left, hit, 0.3))
	{
		if(hit.collider.tag == "WallBoundary" || hit.collider.tag == "DeathBarrier")
			return;
			
		if(hit.collider.gameObject.tag == "Enemy")
		{
			if(still)
				return;
			
			// grab the parent object
			var parent1 : GameObject = hit.collider.gameObject;
			
			if(hit.collider.gameObject.transform.parent != null && hit.collider.gameObject.transform.parent.gameObject != null)
			{
				parent1 = hit.collider.gameObject.transform.parent.gameObject;
			}
			
			if(parent1.GetComponent(Enemy) == null)
				return;
			
			// kill the goomba
			parent1.GetComponent(Enemy).Kill();
			
			passthrough = true;
			yield WaitForSeconds(0.5);
			passthrough = false;
		}
		else
		{
			if(passthrough)
				return;
			// change direction to right
			dir = Direction.RIGHT;
		}
	}
	
	// if something to the right
	if(Physics.Raycast(transform.position, Vector3.right, hit, 0.3))
	{
	
		if(hit.collider.tag == "WallBoundary" || hit.collider.tag == "DeathBarrier")
			return;
			
		if(hit.collider.gameObject.tag == "Enemy")
		{
			if(still)
				return;
			
			// grab the parent object
			var parent2 : GameObject = hit.collider.gameObject;
			
			if(hit.collider.gameObject.transform.parent != null && hit.collider.gameObject.transform.parent.gameObject != null)
			{
				parent2 = hit.collider.gameObject.transform.parent.gameObject;
			}
			
			if(parent2.GetComponent(Enemy) == null)
				return;
			
			// kill the goomba
			parent2.GetComponent(Enemy).Kill();
			
			passthrough = true;
			yield WaitForSeconds(0.5);
			passthrough = false;
		}
		else
		{
			if(passthrough)
				return;
			// change direction to left
			dir = Direction.LEFT;
		}
	}
}


// Walk like a penguin
function Move()
{
	//  If right, walk right
	if(dir == Direction.RIGHT)
	{
		transform.Translate(Vector3.right * Time.deltaTime * speed);
	
		// no longer still
		still = false;
	}
	// If left, walk left
	else if(dir == Direction.LEFT)
	{
		transform.Translate(Vector3.left * Time.deltaTime * speed);
		
		// no longer still
		still = false;
	}
	// if up, walk up
	else if(dir == Direction.UP)
	{
		transform.Translate(Vector3.up * Time.deltaTime * speed);
	}
	// if down, walk down
	else if(dir == Direction.DOWN)
	{
		transform.Translate(Vector3.down * Time.deltaTime * speed);
	}
}

// forces gravity upon thy shell
function Fall()
{
	if(falling)
		return;
	
	var hit : RaycastHit;
	
	while(!Physics.Raycast(transform.position, Vector3.down, hit, 0.4))
	{	
		transform.Translate(Vector3.down * Time.deltaTime * 1.0F);
		yield WaitForSeconds(0.1);
	}
	
	falling = false;
	activated = true;
	
	if(hit.collider.tag == "DeathBarrier")
	{
		Destroy(gameObject);
	}
}

// checks if the shell is in bounds	
function CheckInPlay()
{
	// probably in a debug scene
	if(GameObject.Find("WALL_LEFT") == null)
		return;
		
	var myX : float = transform.position.x;
	var boundsX : float = gameObject.Find("WALL_LEFT").transform.position.x;
	
	
	if(myX < boundsX)
	{
		Destroy(gameObject);
	}
}

// shows user they earned some points
function ShowPointsEarned()
{
	if(gm == null)
		return;
		
	gm.GetComponent(PointsText).DisplayText(transform.position, "" + points, 5.0);
	pm.AddPoints(points);
}

// ================================================================================ \\