


// =====================================================
// CIVICAI DASHBOARD
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

const statCards=

document.querySelectorAll(".stat-card");

const chartCards=

document.querySelectorAll(".chart-card");

const tableRows=

document.querySelectorAll("tbody tr");

const profileBtn=

document.querySelector(".profile-btn");

// ======================================
// SIDEBAR ACTIVE
// ======================================

const menuLinks=

document.querySelectorAll(".sidebar-menu a");

menuLinks.forEach((link)=>{

    link.addEventListener("click",()=>{

        menuLinks.forEach(item=>{

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});

// ======================================
// PROFILE BUTTON
// ======================================

if(profileBtn){

    profileBtn.addEventListener("click",()=>{

        window.location.href = "/profile";

    });

}

// ======================================
// CARD REVEAL
// ======================================

const revealItems=

document.querySelectorAll(

".stat-card,.chart-card,.table-card,.bottom-card"

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




// =====================================================
// KPI COUNTER ANIMATION
// =====================================================

const counters =
document.querySelectorAll(".counter");

counters.forEach((counter)=>{

    const target = parseInt(

        counter.dataset.target ||

        counter.innerText ||

        0

    );

    counter.innerText="0";

    let current=0;

    const increment=

    Math.max(1,Math.ceil(target/100));

    const timer=setInterval(()=>{

        current+=increment;

        if(current>=target){

            current=target;

            clearInterval(timer);

        }

        counter.innerText=current;

    },20);

});

// =====================================================
// KPI CARD HOVER
// =====================================================

statCards.forEach((card)=>{

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
// CHART CARD HOVER
// =====================================================

chartCards.forEach((card)=>{

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
// AUTO REFRESH TIMER
// =====================================================

const refreshTime =

document.getElementById("refreshTime");

let seconds=30;

setInterval(()=>{

    seconds--;

    if(refreshTime){

        refreshTime.innerText=

        `${seconds}s`;

    }

    if(seconds<=0){

        seconds=30;

        console.log("Dashboard Refreshed");

    }

},1000);

// =====================================================
// LIVE STATUS DOT
// =====================================================

const statusDot=

document.querySelector(".status-dot");

if(statusDot){

    let pulse=true;

    setInterval(()=>{

        statusDot.style.opacity=

        pulse ? "1" : ".35";

        pulse=!pulse;

    },650);

}

// =====================================================
// CHART.JS
// =====================================================

const issuesChart =

document.getElementById("issuesChart");

const severityChart =

document.getElementById("severityChart");

const departmentChart =

document.getElementById("departmentChart");

// =====================================================
// MONTHLY ISSUES
// =====================================================

if(issuesChart){

new Chart(issuesChart,{

type:"line",

data:{

labels:[

"Jan",

"Feb",

"Mar",

"Apr",

"May",

"Jun"

],

datasets:[{

label:"Issues",

data:[

35,

48,

61,

74,

66,

89

],

borderColor:"#3B82F6",

backgroundColor:

"rgba(59,130,246,.15)",

fill:true,

tension:.4,

pointRadius:5,

pointHoverRadius:7

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

display:false

}

},

scales:{

x:{

ticks:{

color:"#CBD5E1"

},

grid:{

color:"rgba(255,255,255,.05)"

}

},

y:{

ticks:{

color:"#CBD5E1"

},

grid:{

color:"rgba(255,255,255,.05)"

}

}

}

}

});

}

// =====================================================
// SEVERITY PIE
// =====================================================

if(severityChart){

new Chart(severityChart,{

type:"doughnut",

data:{

labels:[

"Low",

"Medium",

"High",

"Critical"

],

datasets:[{

data:[

    window.chartData.low,

    window.chartData.medium,

    window.chartData.high,

    window.chartData.critical

],

backgroundColor:[

"#10B981",

"#F59E0B",

"#EF4444",

"#7C3AED"

],

borderWidth:0

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

cutout:"72%",

plugins:{

legend:{

labels:{

color:"#CBD5E1"

}

}

}

}

});

}

// =====================================================
// DEPARTMENT BAR
// =====================================================

if(departmentChart){

new Chart(departmentChart,{

type:"bar",

data:{

labels:[

"Road",

"Water",

"Electric",

"Waste",

"Traffic"

],

datasets:[{

label:"Resolved",

data:[

22,

18,

30,

25,

16

],

backgroundColor:[

"#3B82F6",

"#10B981",

"#7C3AED",

"#F59E0B",

"#EF4444"

],

borderRadius:8

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

display:false

}

},

scales:{

x:{

ticks:{

color:"#CBD5E1"

},

grid:{

display:false

}

},

y:{

ticks:{

color:"#CBD5E1"

},

grid:{

color:"rgba(255,255,255,.05)"

}

}

}

}

});

}





// =====================================================
// LIVE AI ACTIVITY FEED
// =====================================================

const activityList =
document.querySelector(".activity-list");

const activities=[

"🤖 AI detected a new pothole issue.",

"🚰 Water leakage classified as HIGH priority.",

"🛣️ Road maintenance report generated.",

"⚡ Electricity complaint resolved successfully.",

"🗑️ Waste management issue assigned to department.",

"🚦 Traffic congestion analysis completed."

];

if(activityList){

    let index=0;

    setInterval(()=>{

        const items=

        activityList.querySelectorAll(".activity-item");

        if(items.length){

            items[0].remove();

        }

        const newItem=

        document.createElement("div");

        newItem.className="activity-item";

        newItem.innerHTML=`

        <div class="activity-icon">

            <i class="fa-solid fa-robot"></i>

        </div>

        <div class="activity-content">

            <h4>AI Update</h4>

            <p>${activities[index]}</p>

        </div>

        `;

        activityList.appendChild(newItem);

        index++;

        if(index>=activities.length){

            index=0;

        }

    },6000);

}

// =====================================================
// LIVE NOTIFICATION
// =====================================================

function showNotification(message){

    const toast=

    document.createElement("div");

    toast.className="dashboard-toast";

    toast.innerHTML=`

    <i class="fa-solid fa-bell"></i>

    <span>${message}</span>

    `;

    toast.style.position="fixed";

    toast.style.right="30px";

    toast.style.bottom="30px";

    toast.style.padding="16px 22px";

    toast.style.borderRadius="16px";

    toast.style.background="#2563EB";

    toast.style.color="#fff";

    toast.style.zIndex="9999";

    toast.style.display="flex";

    toast.style.alignItems="center";

    toast.style.gap="12px";

    toast.style.boxShadow=

    "0 15px 40px rgba(37,99,235,.35)";

    toast.style.opacity="0";

    toast.style.transform=

    "translateY(30px)";

    toast.style.transition=

    ".4s";

    document.body.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.style.opacity="1";

        toast.style.transform=

        "translateY(0)";

    });

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform=

        "translateY(30px)";

        setTimeout(()=>{

            toast.remove();

        },400);

    },3500);

}

setTimeout(()=>{

    showNotification(

    "Dashboard synced successfully."

    );

},2500);

// =====================================================
// REPORT TABLE ANIMATION
// =====================================================

tableRows.forEach((row)=>{

    row.addEventListener("mouseenter",()=>{

        row.style.transform="scale(1.01)";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.transform="scale(1)";

    });

});

// =====================================================
// LIVE CLOCK
// =====================================================

const liveClock=

document.getElementById("liveClock");

if(liveClock){

    setInterval(()=>{

        const now=new Date();

        liveClock.innerText=

        now.toLocaleTimeString();

    },1000);

}

// =====================================================
// RANDOM KPI UPDATE
// =====================================================

setInterval(()=>{

    counters.forEach((counter)=>{

        let value=

        parseInt(counter.innerText);

        value+=Math.floor(Math.random()*2);

        counter.innerText=value;

    });

},12000);

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c📊 Dashboard Live Services Running",

"color:#3B82F6;font-size:16px;font-weight:bold;"

);


// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(e.target.tagName==="INPUT" ||

       e.target.tagName==="TEXTAREA"){

        return;

    }

    switch(e.key.toLowerCase()){

        case "u":

            window.location.href="/upload";

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

        case "d":

            window.location.href="/dashboard";

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

".stat-card,.chart-card,.table-card,.bottom-card"

).forEach((card)=>{

    observer.observe(card);

});

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | Dashboard";

});

window.addEventListener("blur",()=>{

    document.title="Dashboard Running 📊";

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c🚀 Dashboard Ready",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF DASHBOARD JS
// =====================================================