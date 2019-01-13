//Kamil Machno
document.addEventListener('DOMContentLoaded', appStart)

const sounds ={
    97: "boom",
    115: "clap",
    100: "hihat",
    102: "kick",
    103: "openhat",
    104: "ride",
    106: "snare",
    107: "tink",
    108: "tom",

}

// Tablice na nagrania 
let chanel1 =[]
let chanel2 =[]
let chanel3 =[]
let chanel4 =[]

//Pobrać dane z radio
let currentChannel = []

let isRecording = false
let recStart = null

//Jezeli kanał = TRUE to jest zaznaczony

let chanel1Check = false
let chanel2Check = false
let chanel3Check = false
let chanel4Check = false



function appStart(){
    window.addEventListener('keypress', playSound)

    //Listener dla zminay koloru klawiszy
    window.addEventListener("keydown", setColor)
    window.addEventListener("keyup", backColor)
 
    //Resetowanie currentChannel v1
    document.querySelector('#channels').addEventListener('change', resetChannel)

    //Sprawdzanie który kanał jest zaznaczony

    document.querySelector('#odt_utwor').addEventListener('change', chanCheck)


    //
    document.querySelector('#rec').addEventListener('click',
        (e)=>{
            isRecording = !isRecording
            recStart = Date.now()
            e.target.innerHTML = isRecording ? 'Zatrzymaj' : 'Nagrywaj'
        })
    document.querySelector('#play').addEventListener('click', playMusic)
    document.querySelector('#play_utwor').addEventListener('click', playUtwor)
}

//Odtwarzanie muzyki
function playMusic(){

    switch(radioChecked()){
        case "chanel1":
            currentChannel = chanel1.slice()
            break;
        case "chanel2":
            currentChannel = chanel2.slice()
            break;
        case "chanel3":
            currentChannel = chanel3.slice()
            break;
        case "chanel4":
            currentChannel = chanel4.slice()
            break;
    }
    //wysyłanie do zewnętrznej funkcji, która oddtwarza muzykę 
   channelPlay(currentChannel)
}

//Odtwrzanie utworu - kilku kanałów jednocześnie
function playUtwor(){
    chanCheck()
    for(i=1;i<5;i++)
    {
        if(eval("chanel"+i+"Check"))
        {
        channelPlay(eval("chanel"+i))  
        }
    }
    
}

function playSound(e){
    //console.log(e.keyCode)
    const soundName = sounds[e.keyCode]
    audioDOM = document.querySelector('#'+soundName)      //('#${soundName}')
    //alert(audioDOM)
    
    audioDOM.currentTime = 0
    audioDOM.play()

    currentChannel.push({
        sound: soundName,
        time: Date.now() - recStart
    })

    switch(radioChecked()){
        case "chanel1":
            chanel1 = currentChannel.slice()
            break;
        case "chanel2":
            chanel2 = currentChannel.slice()
            break;
        case "chanel3":
            chanel3 = currentChannel.slice()
            break;
        case "chanel4":
            chanel4 = currentChannel.slice()
            break;
    }
    
}

//Ustawianie koloru po naciśnięciu  
function setColor(e){
    //KeyDown i KeyUp ma inne zanki klawiszy - róznica 32 (małe/wielkie litery)
    const soundName = sounds[e.keyCode+32]
    let key_pres = document.querySelector("#"+soundName+"_k")
    key_pres.style.backgroundColor = "#0a572a"
}
//Powrót do poprzenidego koloru 
function backColor(e){
    const soundName = sounds[e.keyCode+32]
    let key_pres = document.querySelector("#"+soundName+"_k")
    key_pres.style.backgroundColor = "white"
}
//Pobieranie zaznaczonego channela
function radioChecked(){
    let chan = document.querySelector("input[name='channel']:checked").value
    //console.log(chan)
    return chan
    
}
//Resetowanie CurrentChannel v2
function resetChannel(){
    currentChannel = []
}
//Oddtwarzanie kanału
function channelPlay(chanel){
    chanel.forEach(sound => {
        setTimeout(
        ()=> {
            audioDOM = document.querySelector('#'+sound.sound)
            audioDOM.currentTime = 0
            audioDOM.play()
        }
    , sound.time)
    })
}

//Sprawdzanie, który kanał jest zaznaczony
function chanCheck(){
    let utworChecked = document.querySelector("#odt_utwor")
    let currentUtwor = null
    for(i=0; i < utworChecked.length; i++)
    {
        if(utworChecked[i].checked === true)
        {
            currentUtwor = utworChecked[i].value+"Check" 
            eval(currentUtwor+"=true")
            
        }
        else{
            currentUtwor = utworChecked[i].value+"Check" 
            eval(currentUtwor+"=false")
        }
           
    }
}