

// =====================================================
// CIVICAI PROFILE
// =====================================================

// ======================================
// PAGE FADE
// ======================================

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition =

    "opacity .7s ease";

    document.body.style.opacity = "1";

});

// ======================================
// ELEMENTS
// ======================================

const profileCard =

document.querySelector(".profile-card");

const infoCards =

document.querySelectorAll(".info-card");

const statsCards =

document.querySelectorAll(".stats-card");

const skillsCard =

document.querySelector(".skills-card");

const activityCard =

document.querySelector(".activity-card");

const editButton =

document.querySelector(".edit-profile-btn");

// ======================================
// REVEAL ANIMATION
// ======================================

const revealItems =

document.querySelectorAll(

".profile-card,.info-card,.stats-card,.skills-card,.activity-card"

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

        "translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=

        "translateY(0)";

    });

});


// =====================================================
// EDIT PROFILE BUTTON
// =====================================================

if(editButton){

    editButton.addEventListener("click",()=>{

        editButton.innerHTML=

        `<i class="fa-solid fa-spinner fa-spin"></i>
        Opening...`;

        editButton.disabled=true;

        setTimeout(()=>{

            editButton.innerHTML=

            `<i class="fa-solid fa-pen"></i>
            Edit Profile`;

            editButton.disabled=false;

            showToast(

            "Profile editing feature coming soon."

            );

        },1200);

    });

}

// =====================================================
// AI STATISTICS COUNTER
// =====================================================

const statNumbers=

document.querySelectorAll(".stat-box h2");

statNumbers.forEach((item)=>{

    const original=

    item.innerText;

    const value=

    parseInt(original.replace(/\D/g,""));

    const suffix=

    original.replace(/[0-9]/g,"");

    if(isNaN(value)) return;

    let current=0;

    const step=

    Math.max(1,Math.ceil(value/60));

    item.innerText="0"+suffix;

    const timer=

    setInterval(()=>{

        current+=step;

        if(current>=value){

            current=value;

            clearInterval(timer);

        }

        item.innerText=

        current+suffix;

    },25);

});

// =====================================================
// SKILL CHIP EFFECT
// =====================================================

document.querySelectorAll(

".skills-list span"

).forEach((chip)=>{

    chip.addEventListener("mouseenter",()=>{

        chip.style.transform=

        "translateY(-4px) scale(1.05)";

    });

    chip.addEventListener("mouseleave",()=>{

        chip.style.transform=

        "translateY(0) scale(1)";

    });

});

// =====================================================
// TOAST
// =====================================================

function showToast(message){

    const toast=

    document.createElement("div");

    toast.className="profile-toast";

    toast.innerHTML=`

    <i class="fa-solid fa-circle-check"></i>

    <span>${message}</span>

    `;

    toast.style.position="fixed";

    toast.style.right="30px";

    toast.style.bottom="30px";

    toast.style.padding="16px 22px";

    toast.style.background="#2563EB";

    toast.style.color="#fff";

    toast.style.borderRadius="14px";

    toast.style.display="flex";

    toast.style.alignItems="center";

    toast.style.gap="12px";

    toast.style.boxShadow=

    "0 15px 40px rgba(37,99,235,.35)";

    toast.style.opacity="0";

    toast.style.transform=

    "translateY(25px)";

    toast.style.transition=".35s";

    toast.style.zIndex="9999";

    document.body.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.style.opacity="1";

        toast.style.transform="translateY(0)";

    });

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform=

        "translateY(25px)";

        setTimeout(()=>{

            toast.remove();

        },350);

    },3000);

}

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showToast(

        "Welcome back to your CivicAI Profile!"

        );

    },1200);

});


// =====================================================
// RECENT ACTIVITY ANIMATION
// =====================================================

const activityItems =

document.querySelectorAll(

".activity-item"

);

activityItems.forEach((item,index)=>{

    item.style.opacity="0";

    item.style.transform=

    "translateX(-30px)";

    item.style.transition=

    `all .6s ease ${index*0.15}s`;

});

window.addEventListener("load",()=>{

    activityItems.forEach((item)=>{

        item.style.opacity="1";

        item.style.transform=

        "translateX(0)";

    });

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

const blurBlue =

document.querySelector(".blur-blue");

const blurPurple =

document.querySelector(".blur-purple");

window.addEventListener("mousemove",(e)=>{

    const x =

    (e.clientX/window.innerWidth)*15;

    const y =

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

const observer =

new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add(

                "active"

            );

        }

    });

},

{

    threshold:.15

});

document.querySelectorAll(

".profile-card,.info-card,.stats-card,.skills-card,.activity-card"

).forEach((card)=>{

    card.classList.add("reveal");

    observer.observe(card);

});

// =====================================================
// PROFILE READY
// =====================================================

console.log(

"%c👤 CivicAI Profile Loaded",

"color:#3B82F6;font-size:16px;font-weight:bold;"

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

        case "s":

            window.location.href="/settings";

            break;

        case "p":

            window.location.href="/profile";

            break;

    }

});

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | Profile";

});

window.addEventListener("blur",()=>{

    document.title="Profile Open 👤";

});

// =====================================================
// PROFILE IMAGE EFFECT
// =====================================================

const profileImage =

document.querySelector(".profile-avatar img");

if(profileImage){

    profileImage.addEventListener("mouseenter",()=>{

        profileImage.style.transform=

        "scale(1.08) rotate(-3deg)";

        profileImage.style.transition=

        ".35s ease";

    });

    profileImage.addEventListener("mouseleave",()=>{

        profileImage.style.transform=

        "scale(1) rotate(0deg)";

    });

}

// =====================================================
// FLOATING PROFILE CARD
// =====================================================

if(profileCard){

    let direction = 1;

    setInterval(()=>{

        profileCard.style.transform =

        `translateY(${direction*3}px)`;

        direction *= -1;

    },1800);

}

// =====================================================
// FINAL CONSOLE
// =====================================================

console.log(

"%c🚀 CivicAI Profile Ready",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF PROFILE JS
// =====================================================