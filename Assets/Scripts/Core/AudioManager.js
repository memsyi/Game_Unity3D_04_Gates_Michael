
function stopAllAudio()
{
	var gos : GameObject[] = FindObjectsOfType (GameObject);
	
	for (i=0;i<gos.length;i++) 
	{
	    if(gos[i].audio != null)
	    {
	    	Destroy(gos[i].audio);
	    }
	}
}