// ================================================================================ \\

var parent : GameObject;
var effect : ParticleSystem;


private var x : float;
private var y : float;
private var z : float;

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


// when trigger area is entered
function OnTriggerEnter(other : Collider)
{
	// if object entering is not the player
	if(other.gameObject.tag != "Player")
	{
		// ignore
		return;
	}
	
	// otherwise it is the player triggering
	
	
	x = transform.position.x;
	y = transform.position.y;
	z = transform.position.z;
	
	
	// explode the brick
	Explode();
	KillAbove();
}

// ================================================================================ \\

// explode brick
function Explode()
{
	parent.gameObject.SetActive(false);

	// instantiate effect
	effect = Instantiate(effect, Vector3(x, y + 0.8, z), Quaternion.identity);
	// play
	effect.Play();
	
	// destroy 
	Destroy(effect.gameObject, 1);
	Destroy(parent, 1);
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
			Debug.Log("#1 " + thingHit);
			Debug.Log("#2 " + thingHit.transform);
			Debug.Log("#3 " + thingHit.transform.parent);
			Debug.Log("#4 " + thingHit.transform.parent.gameObject);
			efx.Throw(thingHit.transform.parent.gameObject);
		}
	}
}

// ================================================================================ \\