// ================================================================================ \\

enum EnemyType
{
	GOOMBA,
	KOOPA,
	TROOPA,	
}


enum Direction
{
	UP,
	DOWN,
	LEFT,
	RIGHT,
	
	UP_RIGHT,
	DOWN_RIGHT,
	
	UP_LEFT,
	DOWN_LEFT,
	
	FORWARD,
	
	BACKWARD,
	
	NONE,
}

// ================================================================================ \\

var type : EnemyType;
var speed : float;
var dead : boolean;
var startDirection : Direction;
var points : int;
var squishSound : AudioClip;
var kickSound : AudioClip;

private var dir : Direction;
private var falling : boolean;
private var scaleX : float;

private var gm : GameObject;
private var pm : PlayerManager;
private var efx : EnemyFX;





// ================================================================================ \\


function Start()
{
	// set a default direction
	dir = startDirection;
	
	gm = GameObject.Find("GameManager");
	if(gm != null)
	{
		pm = gm.GetComponent(PlayerManager);
		efx = gm.GetComponent(EnemyFX);
	}
	
	scaleX = transform.localScale.x;
	
	
	if(startDirection == Direction.RIGHT)
	{
		transform.localScale.x = scaleX;
	}
	else if(startDirection == Direction.LEFT)
	{
		transform.localScale.x = -scaleX;
	}
}


function Update()
{
	// check for collision areas around
	CheckCollision();
	
	// move accordingly
	Walk();
	
	
	// check if the goomba is still in the play area
	CheckInPlay();
}

// ================================================================================ \\

// Check if there are walls or floors or ceilings that the goomba needs to be aware of
function CheckCollision()
{
    var hit : RaycastHit;
	
	
	// if there is nothing below them
	if(!Physics.Raycast(transform.position, Vector3.down, hit, 0.5))
	{	
		Fall();
	}
	
	
	// if something to the left
	if(Physics.Raycast(transform.position, Vector3.left, hit, 0.4))
	{
		if(hit.collider.tag == "WallBoundary" || hit.collider.tag == "DeathBarrier")
			return;
		// change direction to right
		dir = Direction.RIGHT;
		transform.localScale.x = scaleX;
	}
	// if something to the right
	if(Physics.Raycast(transform.position, Vector3.right, hit, 0.4))
	{
		if(hit.collider.tag == "WallBoundary" || hit.collider.tag == "DeathBarrier")
			return;
		// change direction to left
		dir = Direction.LEFT;
		transform.localScale.x = -scaleX;
	}
}


// Walk like a penguin
function Walk()
{
	//  If right, walk right
	if(dir == Direction.RIGHT)
	{
		transform.Translate(Vector3.right * Time.deltaTime * speed);
	}
	// If left, walk left
	else if(dir == Direction.LEFT)
	{
		transform.Translate(Vector3.left * Time.deltaTime * speed);
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

function Fall()
{
	if(falling)
		return;
	
	var hit : RaycastHit;
	
	while(!Physics.Raycast(transform.position, Vector3.down, hit, 0.5))
	{	
		transform.Translate(Vector3.down * Time.deltaTime * 1.0F);
		yield WaitForSeconds(0.1);
	}
	
	falling = false;
	
	
	if(hit.collider.tag == "DeathBarrier")
	{
		Destroy(gameObject);
	}
	
}


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



function ShowPointsEarned()
{
	if(gm == null)
		return;
		
	gm.GetComponent(PointsText).DisplayText(transform.position, "" + points, 5.0);
	pm.AddPoints(points);
}


function OnTouch()
{	
	if(gm == null)
		return;
		
	if(dead)	
		return;
		
	if(!pm.alive)
		return;
		
	// if the player has star power, they are going to react differently
	if(pm.hasStarPower)
	{
		// throw goomba
		efx.Throw(gameObject);
		ShowPointsEarned();
	}
	// regular player to get rekt
	else
	{
		// damage the player
		pm.OnDamage();
	}
}

// kill the enmy
function Kill()
{	
	if(gm == null)
		return;
		
	if(dead)	
		return;		
		
	// throw goomba
	efx.Throw(gameObject);
	ShowPointsEarned();
}


// ================================================================================ \\