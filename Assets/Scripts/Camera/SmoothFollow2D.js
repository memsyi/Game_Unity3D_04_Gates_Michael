//author http://answers.unity3d.com/questions/29183/2d-camera-smooth-follow.html

var dampTime : float = 0.15f;
var velocity : Vector3 = Vector3.zero;
var target : Transform;

// Update is called once per frame
function Update () 
{
	if(target == null)
	{
		var player : GameObject = GameObject.Find("Player");
		if(player != null)
		{
			target = player.transform;
		}
	}

	if (target)
	{
		var point : Vector3 = camera.WorldToViewportPoint(target.position);
		var delta : Vector3 = target.position - camera.ViewportToWorldPoint(new Vector3(0.5f, 0.5f, point.z)); //(new Vector3(0.5, 0.5, point.z));
		var destination : Vector3 = transform.position + delta;
		transform.position = Vector3.SmoothDamp(transform.position, destination, velocity, dampTime);
	}
}