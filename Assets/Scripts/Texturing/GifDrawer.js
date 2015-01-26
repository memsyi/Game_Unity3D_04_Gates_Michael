var frames : Texture[];
var framesPerSecond = 10;

var stillActive : boolean = true;

function Update() 
{
	if(stillActive)
	{
		var index : int = (Time.time * framesPerSecond) % frames.Length;
		renderer.material.mainTexture = frames[index];
	}
}
