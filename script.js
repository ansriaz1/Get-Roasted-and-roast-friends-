const API_KEY = "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"



async function askAI(prompt){

try{

let response = await fetch("https://api.groq.com/openai/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+API_KEY
},

body:JSON.stringify({

model:"llama3-70b-8192",

messages:[
{role:"user",content:prompt}
]

})

})

let data = await response.json()

return data.choices[0].message.content

}

catch(error){

return "AI failed to generate roast 😅"

}

}



async function roast(){

let name=document.getElementById("name").value
let level=document.getElementById("level").value

let box=document.getElementById("roastResult")

box.innerText="🤖 AI generating roast..."

let prompt=`Roast a person named ${name}. Roast level ${level}. Make it funny.`

let result=await askAI(prompt)

box.innerText=result

}



async function battle(){

let a=document.getElementById("name1").value
let b=document.getElementById("name2").value

let box=document.getElementById("battleResult")

box.innerText="⚔️ AI deciding winner..."

let prompt=`Two people ${a} and ${b} are in a roast battle. Choose one loser and roast them.`

let result=await askAI(prompt)

box.innerText=result

}



async function personalityRoast(){

let p=document.getElementById("personality").value

let box=document.getElementById("personalityResult")

box.innerText="🧠 AI analyzing personality..."

let prompt=`Roast a typical ${p} in a funny way.`

let result=await askAI(prompt)

box.innerText=result

}



function generateLink(){

let name=document.getElementById("friendName").value

let link=window.location.origin+window.location.pathname+"?victim="+encodeURIComponent(name)

document.getElementById("trapLink").innerText=link

navigator.clipboard.writeText(link)

}



function makeMeme(){

let text=document.getElementById("memeText").value

let canvas=document.getElementById("memeCanvas")

let ctx=canvas.getContext("2d")

ctx.fillStyle="black"
ctx.fillRect(0,0,400,250)

ctx.fillStyle="white"
ctx.font="22px Arial"
ctx.fillText(text,40,120)

}



const params=new URLSearchParams(window.location.search)

const victim=params.get("victim")

if(victim){

let box=document.getElementById("trapResult")

box.innerText="😈 AI detected user: "+victim

setTimeout(async()=>{

let prompt=`Roast a person named ${victim}.`

let roast=await askAI(prompt)

box.innerText=roast

},2000)

  }
