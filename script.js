// Groq API key
const API_KEY = "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";

// Main function to call Groq API
async function askAI(prompt){
    try{
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+API_KEY
            },
            body: JSON.stringify({
                model:"llama3-70b-8192",
                messages:[{role:"user",content:prompt}]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    }catch(e){
        console.error(e);
        return "AI failed to roast 😅";
    }
}

// Loading animation
async function showLoading(box, steps=["Analyzing...","Generating roast...","Almost ready..."]){
    for(let step of steps){
        box.innerText = step;
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
    const prompt = `Roast a person named ${name}. Roast level: ${level}. Make it funny and short.`;
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
    const prompt = `Two people ${a} and ${b} are in a roast battle. Roast the loser in a funny way.`;
    const result = await askAI(prompt);
    box.innerText = result;
}

// Personality Roast
async function personalityRoast(){
    const p = document.getElementById("personality").value;
    const box = document.getElementById("personalityResult");
    box.innerText = "";
    await showLoading(box);
    const prompt = `Roast a typical ${p} in a funny way.`;
    const result = await askAI(prompt);
    box.innerText = result;
}

// Roast Trap Link
function generateLink(){
    const name = document.getElementById("friendName").value || "Friend";
    const link = window.location.origin + window.location.pathname + "?victim=" + encodeURIComponent(name);
    document.getElementById("trapLink").innerText = link;
    navigator.clipboard.writeText(link);
}

// Check for trap victim in URL
const params = new URLSearchParams(window.location.search);
const victim = params.get("victim");
if(victim){
    const box = document.getElementById("trapResult");
    box.innerText = "😈 AI detected user: "+victim;
    setTimeout(async()=>{
        const prompt = `Roast a person named ${victim}. Make it funny and short.`;
        const result = await askAI(prompt);
        box.innerText = result;
    },2000);
      }
