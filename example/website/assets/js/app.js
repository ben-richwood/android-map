//////////////////////////////////////////////////////////////////////
// Main script
// Fct: capture submit value, parse it, and launch dedicated fct
//////////////////////////////////////////////////////////////////

////////////////////////////////////
// VARIABLES
///////////////////////////////////
const form = document.querySelector('form#CLI_form'),
inputCLI = document.getElementById("inter"),
historyPanel = document.querySelector('#lastCmd'),
lastLogs = document.querySelector('#lastLogs'),
projets = document.querySelector("#projets"),
art = document.querySelector("#art"),
blissProject = document.querySelector("#blissProjets"),
immanquables = document.querySelector("#immanquables"),
pwdEntryDiv = document.querySelector('body.ctOS .passwordBox'),
pwdEntryForm = document.querySelector('div.passwordBox form'),
pwdEntryInput = document.querySelector('div.passwordBox form input'),
navigatorEl = document.querySelector('.navigator'),
navigatorItems = ['appCodeName', 'appName', 'language', 'product', 'oscpu', 'platform', 'userAgent'];

let redirectMode,
regExFlag,
flag,
// masterPassword = false,
masterPassword = true,
counterHistory = 0;

// let tileHieght = window.innerWidth / 8,
// allTiles = document.querySelector('.container-fluid');
// allTiles.style.gridAutoRows = tileHieght + 'px';

////////////////////////////////////
// MAIN
///////////////////////////////////
init();
// Focus on the CLI_form
inputCLI.focus();
// Capture the form submit and prevent redirection
if (form.attachEvent) {
		form.attachEvent("submit", processForm);
		pwdEntryForm.attachEvent("submit", pwdField);
} else {
		form.addEventListener("submit", processForm, {once:false, passive:false});
		pwdEntryForm.addEventListener("submit", pwdField, {once:false, passive:false});
}

////////////////////////////////////
// Fct: processForm
// Get input from form#CLI_form
// input: form DOM element
///////////////////////////////////
function processForm(e) {
	if (e.preventDefault) e.preventDefault();
  // console.log("e.inputCLI: ", inputCLI.value );
	if (masterPassword === true ) { parsing(inputCLI.value.toLowerCase()); }
  // Clear input field
  inputCLI.value = "";
	// It must return false to prevent the default form behavior
	return false;
}

////////////////////////////////////
// Fct: pwdField
// Get input from div.passwordBox
// input: form DOM element
///////////////////////////////////
function pwdField(e) {
	if (e.preventDefault) e.preventDefault();
	masterPassword = pwdEntryInput.value === 'qwertyui' ? true : false;
	pwdEntryInput.value = "";
	pwdEntryDiv.style.display = 'none';
	return false;
}

////////////////////////////////////
// Fct: init
// (Re)initialize variables
// input: submitEvent
///////////////////////////////////
function init(){
  flag = '';
  regExFlag = '';
  redirectMode = "_blank";
	let temp = '';
	navigatorItems.map(itm => temp += `${window.navigator[itm]}<br>` );
	navigatorEl.innerHTML = temp;
}

///////////////////////////////////////////////////////
// pasing the input value from form#CLI_form
// input: submitEvent
//////////////////////////////////////////////////////
function parsing(e) {
  // flag detection - detect if there is "-" and the letter behind it
  regExFlag = /\-/g;
  var n = e.search(regExFlag);
  if (n != -1){
    console.log('flag: ', flag);
    flag = e[n+1];
    if (flag === 't'){
      console.log("flag detected");
      // watch for the following word
    }
  }
  // get independant words
  words  = e.split(" ");
  switch (words[0]) {
		case "open":
		case "launch":
			if (words[1] == "project" || words[1] == "projects"){
				// Launch the project page
				logMsg("launching the project page....");
				setTimeout( function(){window.open('http://projets.richebois.fr/', redirectMode)}, 1200);
			} else if (words[1] == "bliss") {
				logMsg("launching bliss helper....");
				setTimeout( function(){window.open('http://projets.richebois.fr/Bliss', redirectMode)}, 1200);
			} else if (words[1] == "hydron"){
				// Launch the hydron page page
        logMsg("launching hydron project....");
        window.open('http://projets.richebois.fr/Hydron', redirectMode);
			} else {
				logMsg("Argument or flags is required");
			}
			break;
    case "projects":
    case "project":
    case "projets":
    case "projet":
			projets.className = "displayedTiles";
			projets.getElementsByTagName('h2')[0].className = "tiles titleAnim";
			logMsg("Running projects....", "To open the project page, type 'open projects' ");
      break;
    case "roadmap":
    case "segment":
      // Launch the roadmap page
			logMsg("launching roadmap....");
      break;
    case "immanquable":
    case "immanquables":
			immanquables.className = "displayedTiles";
			immanquables.getElementsByTagName('h2')[0].className = "tiles titleAnim";
			if (words[1] == "-f" || words[1] == "--film" || words[1] == "--films"){
				logMsg("Immanquable films....");
			} else if (words[1] == "-l" || words[1] == "--lecture" || words[1] == "--lectures"){
				logMsg("Immanquable lectures....");
			} else if (words[1] == "-j" || words[1] == "--jeu" || words[1] == "--jeux"){
				logMsg("Immanquable films....");
			} else if (words[1] == null){
				logMsg("Immanquable....");
			} else {
				logMsg("This flag doesn't exist. Please refer to the manual");
			}
			break;
    case "map":
    case "carte":
				window.open('./map.php', redirectMode);
        // Launch the mapbox page
				logMsg("launching map....");
        break;
  	case "dashboard":
        // Launch the mapbox page
        logMsg("launching dashboard....");
        break;
    case "boostnote":
    case "snippet":
        // Launch the mapbox page
        logMsg("launching boostnote....");
        break;
    case "inspiration":
    case "favorites":
    case "favoris":
        // Launch the mapbox page
        logMsg("launching favoris....");
        break;
    case "bliss":
        logMsg("To open the Bliss helper, type 'open "+words[0]+"'....");
				blissProject.className = "displayedTiles";
				blissProject.getElementsByTagName('h2')[0].className = "tiles titleAnim";
        break;
		case "hydron":
				break;
		case "password":
				pwdEntryDiv.style.display = 'block';
				pwdEntryInput.focus();
				break;
		case "commit":
        // Launch the mapbox page
        logMsg("launching last commit on bitbucket....");
        break;
			case "art":
				art.className = "displayedTiles";
				art.getElementsByTagName('h2')[0].className = "tiles titleAnim";
				logMsg("Current artistic projects....");
				break;
    default:
	      logMsg("Command not found");
  }
	history(e);
  init();
}

////////////////////////////////////////////////
// Adding the last input value to history line
// input: submitInput
////////////////////////////////////////////
function history(e) {
	if (counterHistory > 12) {
		historyPanel.innerHTML = '';
		counterHistory = 0;
	}
	var btn = document.createElement("a"); // Create a <button> element
	var t = document.createTextNode('~ '+e); // Create a text node
	btn.appendChild(t); // Append the text to <button>
	btn.className += "linkHistory";
	btn.setAttribute('onclick', 'parsing("'+e.toString()+'")');
	historyPanel.appendChild(btn);
	counterHistory++;
}

////////////////////////////////////////////////
// Display action into log box
// input: submitInput
////////////////////////////////////////////
function logMsg(... args) {
	// for (var i = 1 ; i < arguments.length ; i++) {
		// var t = document.createTextNode(e[i]); // Create a text node
		for (let i = 0, j = args.length, t, command, textLog = ''; i < j; i++) {
			command = document.createElement("li"); // Create a <button> element
			textLog = i === 0 ? '> '+args[i] : args[i];
			t = document.createTextNode(textLog); // Create a text node
			command.appendChild(t); // Append the text to <button>
			lastLogs.appendChild(command);
		}
	// }
}

document.querySelector('.closePwdBox').addEventListener("click", function(){
	pwdEntryDiv.style.display = 'none';
}, {once:false, passive:false});
