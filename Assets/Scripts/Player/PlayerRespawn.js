#pragma strict

var position : Transform;
var playerPrefab : GameObject;


function Start()
{

	// spawn player
	SpawnPlayer();
	
}




function SpawnPlayer()
{
	
	// spawn the player into the world
	var pl : GameObject = Instantiate(playerPrefab, position.position, Quaternion.identity);
	pl.name = "Player";
}