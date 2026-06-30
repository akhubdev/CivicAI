


// =====================================================
// CIVICAI RESULT
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

const resultCards=

document.querySelectorAll(".result-card");

const confidenceNumber=

document.getElementById("confidenceValue");

const severityBadge=

document.querySelector(".severity-badge");

const downloadBtn=

document.querySelector(".download-btn");

const dashboardBtn=

document.querySelector(".dashboard-btn");

// ======================================
// CARD REVEAL
// ======================================

resultCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(35px)";

    card.style.transition=

    `all .7s ease ${index*0.15}s`;

});

window.addEventListener("load",()=>{

    resultCards.forEach((card)=>{

        card.style.opacity="1";

        card.style.transform=

        "translateY(0)";

    });

});

// ======================================
// BUTTONS
// ======================================


if(downloadBtn){

    downloadBtn.addEventListener("click",()=>{

        downloadBtn.disabled = true;

        downloadBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Preparing PDF...
        `;

        setTimeout(()=>{

            window.location.href="/download_pdf";

            downloadBtn.disabled = false;

            downloadBtn.innerHTML = ` Download PDF `;

        },1000);

    });

}


if(dashboardBtn){

    dashboardBtn.addEventListener("click",()=>{

        window.location.href="/dashboard";

    });

}


// =====================================================
// CONFIDENCE COUNTER
// =====================================================

const confidenceCircle =

document.querySelector(".confidence-circle");

if(confidenceNumber){

    const target=

    parseInt(

    confidenceNumber.dataset.value ||

    confidenceNumber.innerText ||

    95

    );

    confidenceNumber.innerText="0%";

    let current=0;

    const counter=

    setInterval(()=>{

        current++;

        confidenceNumber.innerText=

        current + "%";

        if(confidenceCircle){

            confidenceCircle.style.background=

            `conic-gradient(
            #2563EB ${current*3.6}deg,
            rgba(255,255,255,.08) 0deg)`;

        }

        if(current>=target){

            clearInterval(counter);

        }

    },25);

}

// =====================================================
// RESULT CARDS FLOAT
// =====================================================

resultCards.forEach((card,index)=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform=

        "translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=

        "translateY(0px)";

    });

});

// =====================================================
// AI TEXT TYPING EFFECT
// =====================================================

const aiText=

document.querySelector(".analysis-text");

if(aiText){

    const original=

    aiText.innerText;

    aiText.innerText="";

    let i=0;

    const typing=

    setInterval(()=>{

        aiText.innerText+=

        original.charAt(i);

        i++;

        if(i>=original.length){

            clearInterval(typing);

        }

    },10);

}

// =====================================================
// HEADER ANIMATION
// =====================================================

const resultHeader=

document.querySelector(".result-header");

if(resultHeader){

    resultHeader.animate(

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

if(severityBadge){

    severityBadge.animate(

    [

        {

            transform:"scale(.8)",

            opacity:0

        },

        {

            transform:"scale(1.08)",

            opacity:1

        },

        {

            transform:"scale(1)"

        }

    ],

    {

        duration:900,

        easing:"ease-out",

        fill:"forwards"

    });

}

// =====================================================
// AI PULSE EFFECT
// =====================================================

const aiIcon=

document.querySelector(".ai-icon");

if(aiIcon){

    let pulse=true;

    setInterval(()=>{

        aiIcon.style.transform=

        pulse ?

        "scale(1.08)"

        :

        "scale(1)";

        aiIcon.style.boxShadow=

        pulse ?

        "0 0 35px rgba(37,99,235,.45)"

        :

        "0 0 15px rgba(37,99,235,.20)";

        pulse=!pulse;

    },700);

}

// =====================================================
// RECOMMENDATION CARDS
// =====================================================

const recommendationCards=

document.querySelectorAll(".recommendation-card");

recommendationCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateX(-30px)";

    card.style.transition=

    `all .6s ease ${index*0.2}s`;

});

window.addEventListener("load",()=>{

    recommendationCards.forEach((card)=>{

        card.style.opacity="1";

        card.style.transform=

        "translateX(0)";

    });

});

// =====================================================
// STATUS ICONS
// =====================================================

const statusIcons=

document.querySelectorAll(".status-icon");

statusIcons.forEach((icon)=>{

    icon.addEventListener("mouseenter",()=>{

        icon.style.transform=

        "rotate(15deg) scale(1.15)";

    });

    icon.addEventListener("mouseleave",()=>{

        icon.style.transform=

        "rotate(0deg) scale(1)";

    });

});

// =====================================================
// HIGHLIGHT AI TEXT
// =====================================================

if(aiText){

    aiText.addEventListener("mouseenter",()=>{

        aiText.style.borderColor=

        "#3B82F6";

    });

    aiText.addEventListener("mouseleave",()=>{

        aiText.style.borderColor=

        "rgba(255,255,255,.08)";

    });

}


// =====================================================
// SHARE REPORT
// =====================================================

const shareBtn=

document.querySelector(".share-btn");

if(shareBtn){

    shareBtn.addEventListener("click",async()=>{

        const shareData={

            title:"CivicAI Report",

            text:"AI Generated Civic Issue Report",

            url:window.location.href

        };

        if(navigator.share){

            try{

                await navigator.share(shareData);

            }

            catch(err){

                console.log(err);

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

const copyBtn=

document.querySelector(".copy-btn");

if(copyBtn && aiText){

    copyBtn.addEventListener("click",async()=>{

        try{

            await navigator.clipboard.writeText(

                aiText.innerText

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
// PRINT REPORT
// =====================================================

const printBtn=

document.querySelector(".print-btn");

if(printBtn){

    printBtn.addEventListener("click",()=>{

        window.print();

    });

}

// =====================================================
// RIPPLE EFFECT
// =====================================================

const actionButtons=

document.querySelectorAll(

".download-btn,.dashboard-btn,.share-btn,.copy-btn,.print-btn"

);

actionButtons.forEach((btn)=>{

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
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | AI Result";

});

window.addEventListener("blur",()=>{

    document.title="CivicAI Report Ready 📄";

});

// =====================================================
// MOUSE GLOW
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
// RESULT SUCCESS ICON
// =====================================================

const successIcon=

document.querySelector(".success-icon");

if(successIcon){

    let pulse=true;

    setInterval(()=>{

        successIcon.style.transform=

        pulse ?

        "scale(1.08)"

        :

        "scale(1)";

        pulse=!pulse;

    },800);

}

// =====================================================
// OBSERVER ANIMATION
// =====================================================

const observer=

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

".result-card,.recommendation-card,.details-card"

).forEach((card)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(40px)";

    card.style.transition=

    "all .8s ease";

    observer.observe(card);

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c✅ CivicAI Result Loaded Successfully",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF RESULT JS
// =====================================================