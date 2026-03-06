const API_KEY = "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";

// Utility function to call Groq API
async function askAI(prompt){
    const box = document.createElement('div');
    try{
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+API_KEY
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [{role:"user", content:prompt}]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch(e){
        return "AI failed to roast 😅";
    }
}

// Loading animation helper
async function showLoading(resultBox, steps=["Analyzing...","Generating roast...","Almost ready..."]){
    for(let step of steps){
        resultBox.innerText = step;
        await new Promise(r=>setTimeout(r,700));
    }
}

// Roast Yourself
async function roast(){
    const name = document.getElementById("name").value || "User";
    const level = document.getElementById("level").value;
    const box = document.getElementById("roastResult");
    box.innerText = "";
    await showLoading(box);
    let prompt = `Roast a person named ${name}. Roast level: ${level}. Make it funny and short.`;
    const result = await askAI(prompt);
    box.innerText = result;
}

// Roast Battle
async function battle(){
    const a = document.getElementById("name1").value || "Person1";
    const b = document.getElementById("name2").value || "Person2";
    const box = document.getElementById("battleResult");
    box.innerText = "";
    await showLoading(box, ["Checking skills...","Choosing loser...","Generating brutal roast..."]);
    let prompt = `Two people ${a} and ${b} are in a roast battle. Roast the loser in a funny way.`;
    const result = await askAI(prompt);
    box.innerText = result;
}

// Personality Roast
async function personalityRoast(){
    const p = document.getElementById("personality").value;
    const box = document.getElementById("personalityResult");
    box.innerText = "";
    await showLoading(box);
    let prompt = `Roast a typical ${p} in a funny way.`;
    const result = await askAI(prompt);
    box.innerText = result;
}

// Roast Trap
function generateLink(){
    const name = document.getElementById("friendName").value || "Friend";
    const link = window.location.origin + window.location.pathname + "?victim=" + encodeURIComponent(name);
    document.getElementById("trapLink").innerText = link;
    navigator.clipboard.writeText(link);
}

// Check URL params for Roast Trap
const params = new URLSearchParams(window.location.search);
const victim = params.get("victim");
if(victim){
    const box = document.getElementById("trapResult");
    box.innerText = "😈 AI detected user: "+victim;
    setTimeout(async ()=>{
        let prompt = `Roast a person named ${victim}. Make it funny and short.`;
        const result = await askAI(prompt);
        box.innerText = result;
    },2000);
}

// Meme Generator
function makeMeme(){
    const text = document.getElementById("memeText").value || "Funny meme";
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";
    ctx.font="24px Arial";
    ctx.fillText(text,40,120);
}
