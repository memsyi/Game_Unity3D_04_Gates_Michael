#pragma strict

var enemy : GameObject;
var range : float = 10.0F;
var spawnOnExist : boolean;

private var used : boolean = false;
private var inRange : boolean = false;
private var player : GameObject;


function Start()
{
	yield WaitForSeconds(0.1);
	player = GameObject.Find("Player");
	
	
	if(spawnOnExist)
	{
		Spawn();	
	}
}


function Update()
{
	if(player == null)
		return;

	if(used)
	{
		Destroy(gameObject);
		return;
	}

	if(Vector3.Distance(transform.position, player.transform.position) < range)
	{
		Spawn();
	}
}

function Spawn()
{
	Instantiate(enemy, transform.position, Quaternion.identity);
	used = true;
}