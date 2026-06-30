

// =====================================================
// CIVICAI REPORT
// =====================================================

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
// ELEMENTS
// ======================================

const infoCards=
document.querySelectorAll(".info-card");

const metaCards=
document.querySelectorAll(".meta-card");

const analysisCards=
document.querySelectorAll(

".image-card,.analysis-card"

);

const detailCards=
document.querySelectorAll(

".details-card,.department-card"

);

const recommendationCard=
document.querySelector(

".recommendation-card"

);

const confidenceValue=
document.getElementById("confidenceValue");

const progressBar=
document.querySelector(".progress-bar");

const printBtn=
document.querySelector(".print-btn");

const downloadBtn=
document.querySelector(".download-btn");

const shareBtn=
document.querySelector(".share-btn");

const copyBtn=
document.querySelector(".copy-btn");

// ======================================
// REVEAL ANIMATION
// ======================================

const revealItems=

document.querySelectorAll(

".info-card,.meta-card,.image-card,.analysis-card,.details-card,.department-card,.recommendation-card"

);

revealItems.forEach((item,index)=>{

    item.style.opacity="0";

    item.style.transform=
    "translateY(35px)";

    item.style.transition=
    `all .7s ease ${index*0.08}s`;

});

window.addEventListener("load",()=>{

    revealItems.forEach((item)=>{

        item.style.opacity="1";

        item.style.transform=
        "translateY(0)";

    });

});

// ======================================
// CARD HOVER
// ======================================

revealItems.forEach((card)=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform=
        "translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=
        "translateY(0)";

    });

});



// =====================================================
// CONFIDENCE METER
// =====================================================

if(confidenceValue){

    const target = parseInt(

        confidenceValue.dataset.value ||

        confidenceValue.innerText ||

        95

    );

    let current = 0;

    confidenceValue.innerText = "0%";

    const counter = setInterval(()=>{

        current++;

        confidenceValue.innerText =

        current + "%";

        if(progressBar){

            progressBar.style.width =

            current + "%";

        }

        if(current >= target){

            clearInterval(counter);

        }

    },25);

}

// =====================================================
// AI ANALYSIS TYPING
// =====================================================

const analysisText =

document.querySelector(".analysis-text");

if(analysisText){

    const original =

    analysisText.innerText;

    analysisText.innerText="";

    let index = 0;

    const typing = setInterval(()=>{

        analysisText.innerText +=

        original.charAt(index);

        index++;

        if(index >= original.length){

            clearInterval(typing);

        }

    },10);

}

// =====================================================
// PROGRESS BAR GLOW
// =====================================================

if(progressBar){

    let glow = true;

    setInterval(()=>{

        progressBar.style.boxShadow =

        glow

        ?

        "0 0 25px rgba(37,99,235,.45)"

        :

        "0 0 10px rgba(37,99,235,.18)";

        glow = !glow;

    },800);

}

// =====================================================
// IMAGE HOVER
// =====================================================

const reportImage =

document.querySelector(".image-card img");

if(reportImage){

    reportImage.addEventListener("mouseenter",()=>{

        reportImage.style.transform =

        "scale(1.04)";

    });

    reportImage.addEventListener("mouseleave",()=>{

        reportImage.style.transform =

        "scale(1)";

    });

}

// =====================================================
// HEADER ANIMATION
// =====================================================

const reportHeader =

document.querySelector(".report-header");

if(reportHeader){

    reportHeader.animate(

    [

        {

            opacity:0,

            transform:"translateY(-25px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],

    {

        duration:800,

        fill:"forwards"

    });

}




// =====================================================
// SEVERITY BADGE ANIMATION
// =====================================================

const severityBadge =

document.querySelector(".severity-badge");

if(severityBadge){

    severityBadge.animate(

    [

        {

            transform:"scale(.75)",

            opacity:0

        },

        {

            transform:"scale(1.1)",

            opacity:1

        },

        {

            transform:"scale(1)"

        }

    ],

    {

        duration:850,

        easing:"ease-out",

        fill:"forwards"

    });

}

// =====================================================
// DEPARTMENT ITEMS
// =====================================================

const departmentItems =

document.querySelectorAll(

".department-item"

);

departmentItems.forEach((item,index)=>{

    item.style.opacity="0";

    item.style.transform=

    "translateX(-30px)";

    item.style.transition=

    `all .6s ease ${index*0.15}s`;

});

window.addEventListener("load",()=>{

    departmentItems.forEach((item)=>{

        item.style.opacity="1";

        item.style.transform=

        "translateX(0)";

    });

});

// =====================================================
// RECOMMENDATION CARDS
// =====================================================

const planCards =

document.querySelectorAll(

".plan-card"

);

planCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(30px)";

    card.style.transition=

    `all .6s ease ${index*0.15}s`;

});

window.addEventListener("load",()=>{

    planCards.forEach((card)=>{

        card.style.opacity="1";

        card.style.transform=

        "translateY(0)";

    });

});

// =====================================================
// PLAN CARD HOVER
// =====================================================

planCards.forEach((card)=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform=

        "translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=

        "translateY(0px)";

    });

});

// =====================================================
// OFFICIAL NOTE
// =====================================================

const officialNote =

document.querySelector(

".official-note"

);

if(officialNote){

    officialNote.animate(

    [

        {

            opacity:0,

            transform:"translateY(25px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

    ],

    {

        duration:900,

        delay:500,

        fill:"forwards"

    });

}

// =====================================================
// AI ICON PULSE
// =====================================================

const aiIcons =

document.querySelectorAll(

".plan-icon"

);

aiIcons.forEach((icon)=>{

    let pulse=true;

    setInterval(()=>{

        icon.style.transform=

        pulse

        ?

        "scale(1.08)"

        :

        "scale(1)";

        pulse=!pulse;

    },850);

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c📄 AI Report Analysis Loaded",

"color:#7C3AED;font-size:16px;font-weight:bold;"

);



// =====================================================
// PRINT REPORT
// =====================================================

if(printBtn){

    printBtn.addEventListener("click",()=>{

        window.print();

    });

}

// =====================================================
// DOWNLOAD PDF
// =====================================================

if(downloadBtn){

    downloadBtn.addEventListener("click",()=>{

        downloadBtn.disabled=true;

        downloadBtn.innerHTML=

        `<i class="fa-solid fa-spinner fa-spin"></i>
        Preparing PDF...`;

        setTimeout(()=>{

            window.location.href="/download_pdf";

            downloadBtn.disabled=false;

            downloadBtn.innerHTML=

            `<i class="fa-solid fa-download"></i>
            Download PDF`;

        },1500);

    });

}

// =====================================================
// SHARE REPORT
// =====================================================

if(shareBtn){

    shareBtn.addEventListener("click",async()=>{

        const shareData={

            title:"CivicAI AI Report",

            text:"AI Generated Civic Issue Report",

            url:window.location.href

        };

        if(navigator.share){

            try{

                await navigator.share(shareData);

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            alert("Sharing is not supported on this browser.");

        }

    });

}

// =====================================================
// COPY AI ANALYSIS
// =====================================================

if(copyBtn && analysisText){

    copyBtn.addEventListener("click",async()=>{

        try{

            await navigator.clipboard.writeText(

                analysisText.innerText

            );

            copyBtn.innerHTML=

            `<i class="fa-solid fa-check"></i>
            Copied`;

            setTimeout(()=>{

                copyBtn.innerHTML=

                `<i class="fa-solid fa-copy"></i>
                Copy`;

            },1800);

        }

        catch(error){

            console.log(error);

        }

    });

}

// =====================================================
// RIPPLE EFFECT
// =====================================================

const reportButtons=

document.querySelectorAll(

".report-btn,.print-btn,.download-btn,.share-btn,.copy-btn"

);

reportButtons.forEach((btn)=>{

    btn.addEventListener("click",(e)=>{

        const ripple=

        document.createElement("span");

        const rect=

        btn.getBoundingClientRect();

        ripple.style.position="absolute";

        ripple.style.left=

        `${e.clientX-rect.left}px`;

        ripple.style.top=

        `${e.clientY-rect.top}px`;

        ripple.style.width="12px";

        ripple.style.height="12px";

        ripple.style.borderRadius="50%";

        ripple.style.background=

        "rgba(255,255,255,.45)";

        ripple.style.pointerEvents="none";

        ripple.style.transform=

        "translate(-50%,-50%) scale(0)";

        ripple.style.transition=

        "all .6s ease";

        btn.appendChild(ripple);

        requestAnimationFrame(()=>{

            ripple.style.transform=

            "translate(-50%,-50%) scale(18)";

            ripple.style.opacity="0";

        });

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

// =====================================================
// READY
// =====================================================

console.log(

"%c📥 Report Actions Ready",

"color:#22C55E;font-size:16px;font-weight:bold;"

);




// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(

        e.target.tagName==="INPUT" ||

        e.target.tagName==="TEXTAREA"

    ){

        return;

    }

    switch(e.key.toLowerCase()){

        case "u":

            window.location.href="/upload";

            break;

        case "d":

            window.location.href="/dashboard";

            break;

        case "h":

            window.location.href="/history";

            break;

        case "a":

            window.location.href="/analytics";

            break;

        case "r":

            window.location.href="/report";

            break;

    }

});

// =====================================================
// MOUSE GLOW
// =====================================================

document.addEventListener("mousemove",(e)=>{

    document.body.style.background=

    `radial-gradient(

    circle at ${e.clientX}px ${e.clientY}px,

    rgba(59,130,246,.08),

    transparent 280px),

    #070B17`;

});

// =====================================================
// BACKGROUND PARALLAX
// =====================================================

const blurBlue=

document.querySelector(".blur-blue");

const blurPurple=

document.querySelector(".blur-purple");

window.addEventListener("mousemove",(e)=>{

    const x=

    (e.clientX/window.innerWidth)*18;

    const y=

    (e.clientY/window.innerHeight)*18;

    if(blurBlue){

        blurBlue.style.transform=

        `translate(${x}px,${y}px)`;

    }

    if(blurPurple){

        blurPurple.style.transform=

        `translate(${-x}px,${-y}px)`;

    }

});

// =====================================================
// SCROLL REVEAL
// =====================================================

const reportObserver=

new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform=

            "translateY(0)";

        }

    });

},

{

threshold:.15

});

document.querySelectorAll(

".info-card,.meta-card,.image-card,.analysis-card,.details-card,.department-card,.recommendation-card"

).forEach((card)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(35px)";

    card.style.transition=

    "all .7s ease";

    reportObserver.observe(card);

});

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | Report";

});

window.addEventListener("blur",()=>{

    document.title="AI Report Ready 📄";

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c🚀 CivicAI Report Ready",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF REPORT JS
// =====================================================