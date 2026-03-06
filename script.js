let lastRoast=""
let leaderboard=[]

function scan(){

let steps=[
"Scanning brain...",
"Analyzing IQ...",
"Checking cringe levels...",
"Searching embarrassing memories...",
"Generating roast..."
]

let i=0

document.getElementById("scan").innerText=steps[i]

let interval=setInterval(()=>{

i++

if(i>=steps.length){
clearInterval(interval)
}

else{
document.getElementById("scan").innerText=steps[i]
}

},700)

}


async function askAI(prompt){

let response=await fetch("https://api.groq.com/openai/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer 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 "
},

body:JSON.stringify({

model:"llama3-70b-8192",

messages:[{role:"user",content:prompt}]

})

})

let data=await response.json()

return data.choices[0].message.content

}



function randomScore(){

let score=Math.floor(Math.random()*100)

return score

}



function showRoast(text,name){

let score=randomScore()

lastRoast=text

document.getElementById("roast").innerText=text

document.getElementById("score").innerText="Emotional Damage: "+score+"%"

leaderboard.push(name)

updateBoard()

}



async function roast(){

let name=document.getElementById("name").value
let level=document.getElementById("level").value

scan()

let prompt=`Roast ${name}. Roast level ${level}. Make it funny.`

let text=await askAI(prompt)

showRoast(text,name)

}



async function battle(){

let a=document.getElementById("name1").value
let b=document.getElementById("name2").value

scan()

let prompt=`Two people ${a} and ${b} are in a roast battle. Choose one loser and roast them.`

let text=await askAI(prompt)

showRoast(text,a+" vs "+b)

}



async function personalityRoast(){

let p=document.getElementById("personality").value

scan()

let prompt=`Roast a typical ${p}.`

let text=await askAI(prompt)

showRoast(text,p)

}



function updateBoard(){

let list=document.getElementById("leaderboard")

list.innerHTML=""

leaderboard.slice(-5).forEach(n=>{

let li=document.createElement("li")

li.innerText=n

list.appendChild(li)

})

}



function speak(){

let msg=new SpeechSynthesisUtterance(lastRoast)

speechSynthesis.speak(msg)

}



function share(){

navigator.clipboard.writeText(lastRoast)

alert("Roast copied 😈")

}



function generateLink(){

let name=document.getElementById("friendName").value

let link=window.location.origin+window.location.pathname+"?victim="+encodeURIComponent(name)

document.getElementById("link").innerText=link

navigator.clipboard.writeText(link)

}



function makeMeme(){

let text=document.getElementById("memeText").value

let canvas=document.getElementById("memeCanvas")

let ctx=canvas.getContext("2d")

ctx.fillStyle="black"
ctx.fillRect(0,0,400,250)

ctx.fillStyle="white"
ctx.font="20px Arial"
ctx.fillText(text,40,120)

}



const params=new URLSearchParams(window.location.search)

const victim=params.get("victim")

if(victim){

document.getElementById("scan").innerText="AI detected user: "+victim

setTimeout(async()=>{

let prompt=`Roast a person named ${victim}.`

let roast=await askAI(prompt)

showRoast(roast,victim)

},2000)

}
