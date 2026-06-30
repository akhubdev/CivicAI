

// =====================================================
// CIVICAI SETTINGS
// =====================================================

// ======================================
// PAGE FADE
// ======================================

document.body.style.opacity = "0";

window.addEventListener("load",()=>{

    document.body.style.transition=

    "opacity .7s ease";

    document.body.style.opacity="1";

});

// ======================================
// ELEMENTS
// ======================================

const settingsCards=

document.querySelectorAll(

".settings-card"

);

const saveButton=

document.querySelector(

".save-btn"

);

const toggles=

document.querySelectorAll(

'.switch input'

);

const selects=

document.querySelectorAll(

'select'

);

// ======================================
// CARD REVEAL
// ======================================

settingsCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(35px)";

    card.style.transition=

    `all .7s ease ${index*0.08}s`;

});

window.addEventListener("load",()=>{

    settingsCards.forEach((card)=>{

        card.style.opacity="1";

        card.style.transform=

        "translateY(0)";

    });

});

// ======================================
// CARD HOVER
// ======================================

settingsCards.forEach((card)=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform=

        "translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=

        "translateY(0)";

    });

});

// ======================================
// READY
// ======================================

console.log(

"%c⚙️ CivicAI Settings Loaded",

"color:#3B82F6;font-size:16px;font-weight:bold;"

);


// =====================================================
// SAVE BUTTON
// =====================================================

if(saveButton){

    saveButton.addEventListener("click",()=>{

        saveButton.disabled=true;

        saveButton.innerHTML=

        `<i class="fa-solid fa-spinner fa-spin"></i>
        Saving...`;

        setTimeout(()=>{

            saveButton.innerHTML=

            `<i class="fa-solid fa-check"></i>
            Saved`;

            showToast(

            "Settings saved successfully."

            );

            setTimeout(()=>{

                saveButton.innerHTML=

                `<i class="fa-solid fa-floppy-disk"></i>
                Save Changes`;

                saveButton.disabled=false;

            },1800);

        },1500);

    });

}

// =====================================================
// TOGGLE EVENTS
// =====================================================

toggles.forEach((toggle)=>{

    toggle.addEventListener("change",()=>{

        const status=

        toggle.checked

        ?

        "Enabled"

        :

        "Disabled";

        const label=

        toggle.closest(".toggle-row")

        ?.querySelector("span")

        ?.innerText || "Setting";

        showToast(

        `${label}: ${status}`

        );

    });

});

// =====================================================
// LANGUAGE PREVIEW
// =====================================================

selects.forEach((select)=>{

    select.addEventListener("change",()=>{

        showToast(

        `${select.value} selected`

        );

    });

});

// =====================================================
// TOAST
// =====================================================

function showToast(message){

    const toast=

    document.createElement("div");

    toast.className="settings-toast";

    toast.innerHTML=`

    <i class="fa-solid fa-circle-check"></i>

    <span>${message}</span>

    `;

    Object.assign(toast.style,{

        position:"fixed",

        right:"30px",

        bottom:"30px",

        padding:"16px 22px",

        background:"#2563EB",

        color:"#fff",

        borderRadius:"14px",

        display:"flex",

        alignItems:"center",

        gap:"12px",

        boxShadow:"0 15px 40px rgba(37,99,235,.35)",

        opacity:"0",

        transform:"translateY(25px)",

        transition:".35s",

        zIndex:"9999"

    });

    document.body.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.style.opacity="1";

        toast.style.transform="translateY(0)";

    });

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform="translateY(25px)";

        setTimeout(()=>{

            toast.remove();

        },350);

    },3000);

}

// =====================================================
// WELCOME TOAST
// =====================================================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showToast(

        "Welcome to CivicAI Settings."

        );

    },1000);

});


// =====================================================
// MOUSE GLOW EFFECT
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

    (e.clientX/window.innerWidth)*15;

    const y=

    (e.clientY/window.innerHeight)*15;

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

const settingsObserver=

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

settingsCards.forEach((card)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(35px)";

    card.style.transition=

    "all .7s ease";

    settingsObserver.observe(card);

});

// =====================================================
// SETTINGS CARD FLOAT
// =====================================================

settingsCards.forEach((card,index)=>{

    let direction=1;

    setInterval(()=>{

        if(document.hidden) return;

        card.style.transform=

        `translateY(${direction*2}px)`;

        direction*=-1;

    },2200+(index*150));

});

// =====================================================
// SAVE BUTTON RIPPLE
// =====================================================

if(saveButton){

    saveButton.addEventListener("click",(e)=>{

        const ripple=

        document.createElement("span");

        const rect=

        saveButton.getBoundingClientRect();

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

        saveButton.appendChild(ripple);

        requestAnimationFrame(()=>{

            ripple.style.transform=

            "translate(-50%,-50%) scale(18)";

            ripple.style.opacity="0";

        });

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

}

// =====================================================
// READY
// =====================================================

console.log(

"%c⚙️ Premium Settings Loaded",

"color:#22C55E;font-size:16px;font-weight:bold;"

);



// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(

        e.target.tagName==="INPUT" ||

        e.target.tagName==="TEXTAREA" ||

        e.target.tagName==="SELECT"

    ){

        return;

    }

    switch(e.key.toLowerCase()){

        case "h":

            window.location.href="/home";
            break;

        case "u":

            window.location.href="/upload";
            break;

        case "d":

            window.location.href="/dashboard";
            break;

        case "a":

            window.location.href="/analytics";
            break;

        case "p":

            window.location.href="/profile";
            break;

        case "s":

            window.location.href="/settings";
            break;

    }

});

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | Settings";

});

window.addEventListener("blur",()=>{

    document.title="⚙️ Settings Open";

});

// =====================================================
// BUTTON MICRO ANIMATION
// =====================================================

document.querySelectorAll(

".primary-btn,.secondary-btn,.warning-btn,.danger-btn,.save-btn"

).forEach((button)=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform=

        "translateY(-3px) scale(1.02)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform=

        "translateY(0) scale(1)";

    });

});

// =====================================================
// AUTO SAVE INDICATOR (UI ONLY)
// =====================================================

let autoSaveTimer;

document.querySelectorAll(

"select,.switch input"

).forEach((element)=>{

    element.addEventListener("change",()=>{

        clearTimeout(autoSaveTimer);

        autoSaveTimer=

        setTimeout(()=>{

            console.log(

            "⚙️ Auto Save Triggered"

            );

        },1500);

    });

});

// =====================================================
// FINAL READY
// =====================================================

console.log(

"%c🚀 CivicAI Settings Ready",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF SETTINGS JS
// =====================================================