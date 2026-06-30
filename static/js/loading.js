


// =====================================================
// CIVICAI LOADING
// =====================================================

// ======================================
// ELEMENTS
// ======================================

const progressBar =
document.querySelector(".progress-fill");

const progressText =
document.getElementById("progressText");

const loadingSteps =
document.querySelectorAll(".step");

let progress=0;

// ======================================
// STEP TEXTS
// ======================================

const stepMessages=[

"Uploading Image...",

"Analyzing with Gemini AI...",

"Detecting Civic Issue...",

"Generating AI Report...",

"Preparing Dashboard...",

"Finishing..."

];

// ======================================
// PAGE FADE
// ======================================

document.body.style.opacity="0";

window.addEventListener("load",()=>{

    document.body.style.transition=

    "opacity .7s ease";

    document.body.style.opacity="1";

});

// ======================================
// AI ORB ROTATION
// ======================================

const centerOrb=

document.querySelector(".center-orb");

if(centerOrb){

    let angle=0;

    setInterval(()=>{

        angle+=1;

        centerOrb.style.transform=

        `rotate(${angle}deg)`;

    },35);

}



// =====================================================
// PROGRESS ANIMATION
// =====================================================

const progressInterval = setInterval(()=>{

    if(progress>=100){

        clearInterval(progressInterval);

        return;

    }

    progress++;

    if(progressBar){

        progressBar.style.width=

        progress + "%";

    }

    if(progressText){

        progressText.innerHTML=

        progress + "%";

    }

},80);

// =====================================================
// STATUS MESSAGE
// =====================================================

const statusText=

document.getElementById("statusText");

let currentStep=0;

const statusInterval=

setInterval(()=>{

    if(currentStep>=stepMessages.length){

        clearInterval(statusInterval);

        return;

    }

    if(statusText){

        statusText.innerHTML=

        stepMessages[currentStep];

    }

    currentStep++;

},1300);

// =====================================================
// CARD FLOAT
// =====================================================

const loadingCard=

document.querySelector(".loading-card");

if(loadingCard){

    let offset=0;

    let direction=1;

    setInterval(()=>{

        offset+=direction;

        loadingCard.style.transform=

        `translateY(${offset}px)`;

        if(offset>=8){

            direction=-1;

        }

        if(offset<=0){

            direction=1;

        }

    },120);

}

// =====================================================
// PROCESSING STEPS
// =====================================================

let activeStep=0;

const stepInterval=

setInterval(()=>{

    loadingSteps.forEach((step)=>{

        step.classList.remove("active");

    });

    if(activeStep<loadingSteps.length){

        loadingSteps[activeStep]

        .classList.add("active");

        activeStep++;

    }

    else{

        clearInterval(stepInterval);

    }

},1600);

// =====================================================
// AI ORB GLOW
// =====================================================

if(centerOrb){

    let glow=true;

    setInterval(()=>{

        centerOrb.style.boxShadow=

        glow ?

        "0 0 60px rgba(37,99,235,.65),0 0 90px rgba(124,58,237,.45)"

        :

        "0 0 35px rgba(37,99,235,.35),0 0 55px rgba(124,58,237,.20)";

        glow=!glow;

    },900);

}

// =====================================================
// LIVE STATUS DOT
// =====================================================

const liveDot=

document.querySelector(".live-dot");

if(liveDot){

    let visible=true;

    setInterval(()=>{

        liveDot.style.opacity=

        visible ? "1" : ".35";

        visible=!visible;

    },650);

}

// =====================================================
// STEP ICON ANIMATION
// =====================================================

loadingSteps.forEach((step)=>{

    step.addEventListener("mouseenter",()=>{

        step.style.transform=

        "translateX(10px)";

    });

    step.addEventListener("mouseleave",()=>{

        step.style.transform=

        "translateX(0px)";

    });

});

// =====================================================
// CONSOLE STATUS
// =====================================================

console.log(

"%c🤖 AI Processing Started",

"color:#22C55E;font-size:16px;font-weight:bold;"

);





// =====================================================
// AUTO REDIRECT
// =====================================================

setTimeout(()=>{

    window.location.href="/result";

},8500);

// =====================================================
// KEYBOARD PROTECTION
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(

        e.key==="F5" ||

        (e.ctrlKey && e.key==="r") ||

        (e.ctrlKey && e.key==="R")

    ){

        e.preventDefault();

    }

});

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title=

    "CivicAI | AI Processing";

});

window.addEventListener("blur",()=>{

    document.title=

    "AI is Working... 🤖";

});

// =====================================================
// FINAL EFFECT
// =====================================================

document.addEventListener("mousemove",(e)=>{

    document.body.style.background=

    `radial-gradient(

    circle at ${e.clientX}px ${e.clientY}px,

    rgba(37,99,235,.08),

    transparent 260px),

    #070B17`;

});

// =====================================================
// LOADING COMPLETE
// =====================================================

setTimeout(()=>{

    console.log(

    "%c✅ AI Analysis Completed",

    "color:#3B82F6;font-size:16px;font-weight:bold;"

    );

},8400);

// =====================================================
// END OF LOADING JS
// =====================================================