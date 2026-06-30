

// =====================================================
// CIVICAI HOME
// =====================================================

// ======================================
// HERO BUTTONS
// ======================================

const uploadBtn =
document.querySelector(".primary-btn");

const dashboardBtn =
document.querySelector(".secondary-btn");

if(uploadBtn){

    uploadBtn.addEventListener("click",()=>{

        window.location.href="/upload";

    });

}

if(dashboardBtn){

    dashboardBtn.addEventListener("click",()=>{

        window.location.href="/dashboard";

    });

}

// ======================================
// SIDEBAR NAVIGATION
// ======================================

const menuItems =
document.querySelectorAll(".sidebar-menu a");

menuItems.forEach((item)=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(nav=>{

            nav.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// ======================================
// LOGOUT
// ======================================

const logoutBtn =
document.querySelector(".logout-btn");

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        const confirmLogout =
        confirm("Do you want to logout?");

        if(confirmLogout){

            window.location.href="/";

        }

    });

}

// ======================================
// PAGE FADE
// ======================================

document.body.style.opacity="0";

window.addEventListener("load",()=>{

    document.body.style.transition=
    "opacity .7s ease";

    document.body.style.opacity="1";

});


// =====================================================
// AI ORB ANIMATION
// =====================================================

const orb =
document.querySelector(".center-orb");

if(orb){

    let angle=0;

    setInterval(()=>{

        angle+=1;

        orb.style.transform=
        `rotate(${angle}deg)`;

    },40);

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
        visible ? "1":"0.35";

        visible=!visible;

    },700);

}

// =====================================================
// HERO BUTTON HOVER EFFECT
// =====================================================

const heroButtons=
document.querySelectorAll(
".primary-btn,.secondary-btn"
);

heroButtons.forEach((btn)=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform=
        "translateY(-4px) scale(1.02)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform=
        "translateY(0) scale(1)";

    });

});

// =====================================================
// SCROLL REVEAL
// =====================================================

const revealItems=
document.querySelectorAll(
".hero-section,.how-section,.step-card"
);

const reveal=()=>{

    revealItems.forEach((item)=>{

        const top=item.getBoundingClientRect().top;

        if(top<window.innerHeight-100){

            item.style.opacity="1";

            item.style.transform=
            "translateY(0)";

        }

    });

};

revealItems.forEach((item)=>{

    item.style.opacity="0";

    item.style.transform=
    "translateY(40px)";

    item.style.transition=
    "all .8s ease";

});

window.addEventListener("scroll",reveal);

window.addEventListener("load",reveal);

// =====================================================
// STEP CARDS HOVER
// =====================================================

const stepCards =
document.querySelectorAll(".step-card");

stepCards.forEach((card,index)=>{

    card.style.transition=
    "all .45s ease";

    card.style.animation=
    `fadeCard .8s ease ${index*0.15}s forwards`;

    card.style.opacity="0";

    card.addEventListener("mouseenter",()=>{

        card.style.transform=
        "translateY(-12px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=
        "translateY(0px)";

    });

});

// =====================================================
// HERO TITLE ANIMATION
// =====================================================

const heroTitle=
document.querySelector(".hero-left h1");

if(heroTitle){

    heroTitle.animate(

        [

            {

                opacity:0,

                transform:"translateY(30px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:900,

            easing:"ease-out",

            fill:"forwards"

        }

    );

}

// =====================================================
// BUTTON RIPPLE EFFECT
// =====================================================

heroButtons.forEach((btn)=>{

    btn.addEventListener("click",(e)=>{

        const ripple=
        document.createElement("span");

        const rect=
        btn.getBoundingClientRect();

        ripple.style.position="absolute";

        ripple.style.width="14px";

        ripple.style.height="14px";

        ripple.style.borderRadius="50%";

        ripple.style.background=
        "rgba(255,255,255,.55)";

        ripple.style.left=
        `${e.clientX-rect.left}px`;

        ripple.style.top=
        `${e.clientY-rect.top}px`;

        ripple.style.transform=
        "translate(-50%,-50%) scale(0)";

        ripple.style.pointerEvents="none";

        ripple.style.transition=
        "transform .6s ease,opacity .6s ease";

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
// CARD ANIMATION
// =====================================================

const style=
document.createElement("style");

style.innerHTML=`

@keyframes fadeCard{

from{

opacity:0;

transform:translateY(35px);

}

to{

opacity:1;

transform:translateY(0);

}

}

`;

document.head.appendChild(style);

// =====================================================
// MOUSE GLOW EFFECT
// =====================================================

document.addEventListener("mousemove",(e)=>{

    document.body.style.background=

    `radial-gradient(

    circle at ${e.clientX}px ${e.clientY}px,

    rgba(37,99,235,.10),

    transparent 260px),

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

    const x=(e.clientX/window.innerWidth)*20;

    const y=(e.clientY/window.innerHeight)*20;

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
// HERO AUTO FLOAT
// =====================================================

const heroRight=
document.querySelector(".hero-right");

if(heroRight){

    let direction=1;

    let position=0;

    setInterval(()=>{

        position+=direction;

        heroRight.style.transform=

        `translateY(${position}px)`;

        if(position>=12) direction=-1;

        if(position<=0) direction=1;

    },80);

}

// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="u" || e.key==="U"){

        window.location.href="/upload";

    }

    if(e.key==="d" || e.key==="D"){

        window.location.href="/dashboard";

    }

});

// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log(

"%c🚀 CivicAI Loaded Successfully",

"color:#3B82F6;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF HOME JS
// =====================================================