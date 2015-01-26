	#pragma strict

// ================================================================================ \\

var logo : Texture2D;
var paused : boolean = false;
private var timeScale : float;
private var showOptions : boolean;

private var ui : GameObject;

var sound : AudioClip;

// ================================================================================ \\

function Start()
{
	timeScale = Time.timeScale;
	
	yield WaitForSeconds(0.1);
	ui = GameObject.Find("UI");
}

function Update () 
{
	// pause or resume game
	if(Input.GetKeyUp(KeyCode.Return))
	{
		// paused
		if(paused)
		{
			// unpause the game
			Unpause();
		}
		// not paused
		else
		{
			// pause the game
			Pause();
		}
	}
	
	// show options menu
	else if(Input.GetKeyUp(KeyCode.O))
	{
		showOptions = true;
	}
	
	// quit to main menu
	else if(Input.GetKeyUp(KeyCode.Q))
	{
		Application.LoadLevel("StartMenu");
	}
	
	// toggle sounds
	else if(Input.GetKeyUp(KeyCode.S))
	{
		ToggleSounds();
	}
	
	// toggle debug
	else if(Input.GetKeyUp(KeyCode.D))
	{
		ToggleDebug();
	}
	
	// back to pause menu
	else if(Input.GetKeyUp(KeyCode.Backspace))
	{
		OnBack();
	}
}

function OnGUI()
{
	if(paused)
	{
		GUI.DrawTexture(Rect((Screen.width / 2) - 176, (Screen.height / 2) - 300, 352, 194), logo, ScaleMode.ScaleToFit, true, 0.0F);
		
		// show the regular menu
		if(!showOptions)
		{
			// resume
			if(GUI.Button(Rect((Screen.width / 2) - 75, (Screen.height / 2) - 50, 150, 50), "Resume (Enter)"))
				OnResume();
			// options
			if(GUI.Button(Rect((Screen.width / 2) - 75, (Screen.height / 2) - 50 + 75, 150, 50), "Options (O)"))
				OnOptions();
			// quit
			if(GUI.Button(Rect((Screen.width / 2) - 75, (Screen.height / 2) - 50 + 150, 150, 50), "Quit (Q)"))
			{
				Unpause();
				OnQuit();
			}
		}
		// show the options menu
		else
		{
			// toggle sounds
			if(GUI.Button(Rect((Screen.width / 2) - 75, (Screen.height / 2) - 50, 150, 50), "Toggle Sounds (S)"))
				ToggleSounds();
			// toggle debug
			if(GUI.Button(Rect((Screen.width / 2) - 75, (Screen.height / 2) - 50 + 75, 150, 50), "Toggle Debug (D)"))
				ToggleDebug();
			// back to pause menu
			if(GUI.Button(Rect((Screen.width / 2) - 75, (Screen.height / 2) - 50 + 150, 150, 50), "Back (Backspace)"))
				OnBack();
		}
					
	}
}

// ================================================================================ \\

// pause the game
function Pause()
{
	Time.timeScale = 0.0F;
	paused = true;
	
	NGUITools.SetActive(ui, false);    
	  
	AudioSource.PlayClipAtPoint(sound, transform.position);  
}

// unpause the game
function Unpause()
{
	Time.timeScale = timeScale;
	paused = false;	
	
	NGUITools.SetActive(ui, true);   
	
	AudioSource.PlayClipAtPoint(sound, transform.position); 
}



// resume the game
function OnResume()
{
	Unpause();
}

// when they open options menu
function OnOptions()
{
	// show options 
	showOptions = true;
}

// when they quit the game
function OnQuit()
{
	// back to main menu
	Application.LoadLevel("StartMenu");
}

// when they go back from menu
function OnBack()
{
	// don't show any special menus
	showOptions = false;
}


// toggle sounds on/off
function ToggleSounds()
{
	//TODO: this does nothing
}

// toggle debug mode
function ToggleDebug()
{
	//TODO: this does nothing
}


// ================================================================================ \\