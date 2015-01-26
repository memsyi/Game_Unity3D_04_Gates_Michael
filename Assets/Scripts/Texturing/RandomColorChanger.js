#pragma strict



var parent : GameObject;

var colourStart: Color;
var colourEnd: Color;
var rate: float = 1; // Number of times per second new colour is chosen
var i : float = 0; // Counter to control lerp


function Start() 
{
	if(parent == null)
		return;
	colourStart = parent.renderer.material.color;
	colourEnd = new Color(Random.value, Random.value, Random.value);
}


function Update () 
{
	if(parent == null)
		return;
	// Blend towards the current target colour
	i += Time.deltaTime*rate;
	parent.renderer.material.color = Color.Lerp (colourStart, colourEnd, i);
	
	// If we've got to the current target colour, choose a new one
	if(i >= 1) 
	{
		i = 0;
		colourStart = parent.renderer.material.color;
		colourEnd = new Color(Random.value, Random.value, Random.value);
	}
}