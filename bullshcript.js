const lateshowscene = BS.BanterScene.GetInstance();

let websiteurl = "https://vdo.ninja/?view=banterlateshow&bitrate=20000&codec=vp9&stereo"; /* ?autoplay=1&controls=0 For YouTube Live */
// https://screen.sdq.st:8443/?room=banterlateshow
// https://cannabanter.firer.at/embed.html?420

let otherwebsiteurl = "https://banterlateshow.com/"; // Fire Tablet Homepage

async function somerandomStartActions() {
	const waitingForUnity = async () => { while (!lateshowscene.unityLoaded) { await new Promise(resolve => setTimeout(resolve, 500)); } };
	await waitingForUnity(); console.log("SCRIPT: Unity-Loaded");
	setTimeout(() => { 

// TOGGLES ON GITHUB NO LONGER IN USE!
		
		/* PLEASE ENABLE ONLY ONE OF THESE AT A TIME */
		/* UNCOMMENTED THIS TO ENABLE THE YOUTUBE PLAYER */
			//  enableVideoPlayer();
		/* UNCOMMENTED THIS TO ENABLE KARAOKE PLAYER */
			//  enableKaraokePlayer();
		/* UNCOMMENTED THIS TO ENABLE SCREEN CAST / YOUTUBE LIVE */
			//  enableScreenStuff();

	}, 1000);
	enableScreenThingy();
};

/////////////// RENDER SCRIPT LOADER STUFF ///////////////
async function injectRenderScript(theScriptsURL, TheScriptsName = "UnNamed", attributes = {}, appendTo = document.body) {
  const scriptUrl = theScriptsURL;
  try { // 1. "Warm-up" request: Ping the server to wake it up.
    console.log("Waking up the server...");
    await fetch(scriptUrl, { method: 'HEAD', mode: 'no-cors' }); // We use { method: 'HEAD' } to be more efficient.
    console.log("Server is awake! Injecting script..."); // We only need to know the server is awake, not download the whole script yet.
    const script = document.createElement("script"); // 2. Inject the script now that the server is ready.
    script.id = `${TheScriptsName}`;
    script.setAttribute("src", scriptUrl); // Set the src attribute
    Object.entries(attributes).forEach(([key, value]) => { script.setAttribute(key, value); }); // Set all custom attributes
    appendTo.appendChild(script);
    script.onload = () => { console.log(`${TheScriptsName} script loaded successfully!`); }; // Set up event handlers
    script.onerror = () => { console.error(`Failed to load the ${TheScriptsName} script.`); };
  } catch (error) { // The fetch itself might fail, though 'no-cors' mode often prevents this.
    console.error("The warm-up request failed. The script might not load.", error); // The real check is the script's onerror handler.
  }
}

// Player Toggle's by FireRat
let ytplayerdisabled = true;
let karaokeplayerdisabled = true;
let screenstuffDisabled = true;
let screenPortableDisabled = true;

async function enableVideoPlayer() {	
	// If Browser already exists, DESTROY IT!
	var browser = await BS.BanterScene.GetInstance().Find('MainParentObject2');
	if (browser) { console.log("Browser2 Found, Removing it!"); cleanupFireScreenV2(2); screenstuffDisabled = true; }
	// If Karaoke Player exists, Destroy it!
	let delayYT = false;
	if (window.karaokePlayerInstance) { delayYT = true; karaokeplayerdisabled = true; console.log("Karaoke Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
  	if (ytplayerdisabled){
		setTimeout(() => {  
			console.log("yt player enabling");
			ytplayerdisabled = false;
			const youtubeAttributes = {
				"scale": "1 1 1",
				"mip-maps": "0",
				"rotation": "0 0 0",
				"position": "0 -3 0",
				"hand-controls": "false",
				"button-position": "0 3.05 -1.1",
				"volume": "3",
				"button-rotation": "0 0 0",
				"button-scale": "1 1 1",
				"spatial": "false",
				// "spatial-min-distance": "1",
				// "spatial-max-distance": "1000",
				"playlist": "PLC7QdSXG8EDYIqWudXaAsJqMlbZvOaC-_",
				// "data-playlist-icon-url": "https://vanquish3r.github.io/cannabanter/images/Playlist.png",
				// "data-vol-up-icon-url": "https://vanquish3r.github.io/cannabanter/images/Vol_Up.png",
				// "data-vol-down-icon-url": "https://vanquish3r.github.io/cannabanter/images/Vol_Dn.png",
				// "data-mute-icon-url": "https://vanquish3r.github.io/cannabanter/images/Vol_Mute_Off.png",
				// "data-skip-forward-icon-url": "https://vanquish3r.github.io/cannabanter/images/Sync_FW.png",
				// "data-skip-backward-icon-url": "https://vanquish3r.github.io/cannabanter/images/Sync_Bk.png",
				"announce": "false",
				"instance": "banterlateshow",
				"announce-events": "false",
				"announce-four-twenty": "false"
			};
			injectRenderScript(
				"https://vidya.firer.at/playlist.js", // firer.at / sdq.st / best-v-player.glitch.me
				"bls-videoplayer", youtubeAttributes, document.querySelector("a-scene")
			);
		}, delayYT ? 2000 : 0);
	} else {console.log("enable yt player called");}
};

async function enableScreenStuff() {	
	// If Karaoke Player exists, Destroy it!
	if (window.karaokePlayerInstance) { karaokeplayerdisabled = true; console.log("Karaoke Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	// If YouTube Player exists, Destroy it!
	if (window.playlistPlayerInstance) { ytplayerdisabled = true; console.log("YouTube Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	setTimeout(() => {
		if (screenstuffDisabled){
		screenstuffDisabled = false;
		const firescreenAttributes = {
			"scale": "1 1 1",
			"mipmaps": "0",
			"rotation": "0 0 0",
			"screen-rotation": "0 0 0",
			"screen-scale": "0.515 0.515 1",
			"position": "0 -3 0",
			"lock-position": "true",
			"hand-controls": "false",
			"pixelsperunit": "1600",
			"castmode": "true",
			"backdrop": "false",
			"disable-rotation": "true",
			"announce": "false",
			"announce-events": "false",
			"announce-420": "false",
			"volume": "0.25",
			"width": "1920",
			"height": "1080",
			"screen-position": "0 0 0",
			"website": websiteurl
		};
		const firescreen = document.createElement("script");
		firescreen.id = "bls-firescreen";
		firescreen.setAttribute("src", "https://firer.at/scripts/firescreenv2.js");
		Object.entries(firescreenAttributes).forEach(([key, value]) => { firescreen.setAttribute(key, value); });
		document.querySelector("a-scene").appendChild(firescreen);
		}
	}, 2500);
	console.log("Screen Stuff enabled: " + screenstuffDisabled);
};

async function enableKaraokePlayer() {	// If Browser already exists, DESTROY IT!
	var browser = await BS.BanterScene.GetInstance().Find('MainParentObject2');
	if (browser) { console.log("Browser2 Found, Removing it!"); cleanupFireScreenV2(2); screenstuffDisabled = true; }
	// If YouTube Player exists, Destroy it!
	let delayYT = false;
	if (window.playlistPlayerInstance) { delayYT = true; ytplayerdisabled = true; console.log("YouTube Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	if (karaokeplayerdisabled){ karaokeplayerdisabled = false;
		setTimeout(() => {  
			console.log("karaoke player enabling");
			const karaokeAttributes = {
				"scale": "1 1 1",
				"mip-maps": "0",
				"rotation": "0 0 0",
				"position": "0 -3 0",
				"hand-controls": "true",
				"button-position": "0 3.05 -1.1",
				"volume": "10",
				"button-rotation": "0 0 0",
				"button-scale": "1.3 1.3 1.3",
				"singer-button-position": "0 -10 0",
				"singer-button-rotation": "0 180 0",
				// "singer-button-scale": "1.5 1.5 1.5",
				"spatial": "false",
				// "spatial-min-distance": "1",
				// "spatial-max-distance": "1000",
				// "data-playlist-icon-url": "https://vanquish3r.github.io/cannabanter/images/Playlist.png",
				// "data-vol-up-icon-url": "https://vanquish3r.github.io/cannabanter/images/Vol_Up.png",
				// "data-vol-down-icon-url": "https://vanquish3r.github.io/cannabanter/images/Vol_Dn.png",
				// "data-mute-icon-url": "https://vanquish3r.github.io/cannabanter/images/Vol_Mute_Off.png",
				// "data-skip-forward-icon-url": "https://vanquish3r.github.io/cannabanter/images/Sync_FW.png",
				// "data-skip-backward-icon-url": "https://vanquish3r.github.io/cannabanter/images/Sync_Bk.png",
				"playlist": "",
				"announce": "false",
				"announce-events": "false",
				"announce-four-twenty": "false"
			};
			injectRenderScript(
				"https://vidya.firer.at/karaoke.js", // firer.at / sdq.st / best-v-player.glitch.me
				"bls-karaokeplayer", karaokeAttributes, document.querySelector("a-scene")
			);
		}, delayYT ? 2000 : 0);
	} else {console.log("enable karaoke player called");}
};

async function enableScreenThingy() {
  if (screenPortableDisabled){ screenPortableDisabled = false;
	console.log("Adding Fire Tablet");
	const firescreenAttributes = {
		"scale": "0.7 0.7 1",
		"mipmaps": "0",
		"rotation": "0 0 0",
		"position": "4.2 0.609 -15.2",
		"pixelsperunit": "1200",
		"width": "1280",
		"height": "720",
		"announce": "false",
		"announce-events": "false",
		"announce-420": "false",
		"volume": "0.25",
		"backdrop": "true",
		"hand-controls": "true",
		"custom-button01-url": "https://banterlateshow.com/0-0-shownotes-0-0.txt",
		"custom-button01-text": "BLS Show Notes",
		"custom-button02-url": "https://banterlateshow.com/darwinawards.html",
		"custom-button02-text": "Darwin Awards",
		"custom-button03-url": "https://banterlateshow.glitch.me/cag-shownotes.txt",
		"custom-button03-text": "GLITCH Show Notes",	   
		"custom-button04-url": "https://banterlateshow.com",
		"custom-button04-text": "Banter Late Show",
		"website": otherwebsiteurl
	};
	const firescreen = document.createElement("script");
	firescreen.id = "bls-firetablet";
	firescreen.setAttribute("src", "https://firer.at/scripts/firescreenv2.js");
	Object.entries(firescreenAttributes).forEach(([key, value]) => { firescreen.setAttribute(key, value); });
	document.querySelector("a-scene").appendChild(firescreen);
  }
    console.log("Fire Tablet enabled");
}

setTimeout(() => { somerandomStartActions(); }, 1000);
