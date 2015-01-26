#pragma strict

// ================================================================================ \\

var spawners : GameObject[];

var prefabGoomba : GameObject;
var prefabKoopa : GameObject;
var prefabTroopa : GameObject;

var spawnOnStart : boolean;



// ================================================================================ \\

function Start()
{	
	if(spawnOnStart)
	{
		Instantiate(prefabGoomba, transform.position, Quaternion.identity);
	}
}

// ================================================================================ \\


function SpawnEnemy(name : String, position : Vector3)
{
	name = name.ToLower();
	
	
	if(name == "goomba")
	{
		Instantiate(prefabGoomba, position, Quaternion.identity);
	}
	else if(name == "koopa")
	{
		Instantiate(prefabKoopa, position, Quaternion.identity);
	}
	else if(name == "troopa")
	{
		Instantiate(prefabTroopa, position, Quaternion.identity);
	}
}



// ================================================================================ \\