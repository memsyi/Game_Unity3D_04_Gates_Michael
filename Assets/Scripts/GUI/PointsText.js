var text : TextMesh;

function DisplayText(pos : Vector3, words : String, life : float)
{    
	text.text = words;
	text.color = Color.white;
	var go : TextMesh = Instantiate(text, Vector3(pos.x, pos.y, pos.z - 5), Quaternion.identity);
    
    Destroy(go.gameObject, 0.5);
}
