

// =====================================================
// CIVICAI ANALYTICS
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

const kpiCards=

document.querySelectorAll(".kpi-card");

const chartCards=

document.querySelectorAll(".chart-card");

const insightCards=

document.querySelectorAll(

".insight-card,.ranking-card,.recommendation-card"

);

const refreshBtn=

document.querySelector(".refresh-btn");

// ======================================
// KPI COUNTERS
// ======================================

const counters=

document.querySelectorAll(".counter");

counters.forEach((counter)=>{

    const target=

    parseInt(

    counter.dataset.target ||

    counter.innerText ||

    0

    );

    let current=0;

    const increment=

    Math.max(

    1,

    Math.ceil(target/100)

    );

    counter.innerText="0";

    const timer=

    setInterval(()=>{

        current+=increment;

        if(current>=target){

            current=target;

            clearInterval(timer);

        }

        counter.innerText=current;

    },20);

});

// ======================================
// CARD REVEAL
// ======================================

const revealItems=

document.querySelectorAll(

".kpi-card,.chart-card,.insight-card,.ranking-card,.recommendation-card"

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
// REFRESH BUTTON
// ======================================

if(refreshBtn){

    refreshBtn.addEventListener("click",()=>{

        refreshBtn.disabled=true;

        refreshBtn.innerHTML=

        `<i class="fa-solid fa-spinner fa-spin"></i>
        Refreshing...`;

        setTimeout(()=>{

            refreshBtn.disabled=false;

            refreshBtn.innerHTML=

            `<i class="fa-solid fa-rotate"></i>
            Refresh`;

        },1800);

    });

}



// =====================================================
// CHART.JS
// =====================================================

const lineChart =
document.getElementById("lineChart");

const pieChart =
document.getElementById("pieChart");

const barChart =
document.getElementById("barChart");

const weeklyChart =
document.getElementById("weeklyChart");

// =====================================================
// MONTHLY TREND
// =====================================================

if(lineChart){

new Chart(lineChart,{

type:"line",

data:{

labels: monthlyLabels,

datasets:[{

label:"Reported Issues",

data: monthlyCounts,

borderColor:"#3B82F6",

backgroundColor:

"rgba(59,130,246,.12)",

fill:true,

tension:.45,

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

beginAtZero:true,

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
// ISSUE DISTRIBUTION
// =====================================================

if(pieChart){

new Chart(pieChart,{

type:"doughnut",

data:{

labels:[

"Road",

"Water",

"Electric",

"Garbage",

"Traffic"

],

datasets:[{

data: severityCounts,

backgroundColor:[

"#3B82F6",

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
// DEPARTMENT PERFORMANCE
// =====================================================

if(barChart){

new Chart(barChart,{

type:"bar",

data:{

labels: departmentLabels,

datasets:[{

label:"Resolved",

data: departmentCounts,

backgroundColor:[

"#3B82F6",

"#10B981",

"#F59E0B",

"#EF4444",

"#7C3AED"

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

beginAtZero:true,

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
// WEEKLY REPORTS
// =====================================================

if(weeklyChart){

new Chart(weeklyChart,{

type:"bar",

data:{

labels:[

"Mon",

"Tue",

"Wed",

"Thu",

"Fri",

"Sat",

"Sun"

],

datasets:[{

label:"Reports",

data:[

18,

24,

21,

27,

31,

19,

15

],

backgroundColor:"#2563EB",

borderRadius:6

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

beginAtZero:true,

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
// AI INSIGHTS TYPING EFFECT
// =====================================================

const insightTexts =

document.querySelectorAll(

".insight-item p"

);

insightTexts.forEach((text)=>{

    const original=

    text.innerText;

    text.innerText="";

    let index=0;

    const typing=

    setInterval(()=>{

        text.innerText+=

        original.charAt(index);

        index++;

        if(index>=original.length){

            clearInterval(typing);

        }

    },12);

});

// =====================================================
// INSIGHT CARD HOVER
// =====================================================

insightCards.forEach((card)=>{

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
// HEATMAP PLACEHOLDER
// =====================================================

const heatmap=

document.querySelector(

".heatmap-placeholder"

);

if(heatmap){

    let glow=true;

    setInterval(()=>{

        heatmap.style.boxShadow=

        glow

        ?

        "0 0 35px rgba(37,99,235,.20)"

        :

        "0 0 15px rgba(37,99,235,.08)";

        glow=!glow;

    },900);

}

// =====================================================
// RECOMMENDATION LIST
// =====================================================

const recommendations=

document.querySelectorAll(

".recommendation-list li"

);

recommendations.forEach((item,index)=>{

    item.style.opacity="0";

    item.style.transform=

    "translateX(-25px)";

    item.style.transition=

    `all .5s ease ${index*0.15}s`;

});

window.addEventListener("load",()=>{

    recommendations.forEach((item)=>{

        item.style.opacity="1";

        item.style.transform=

        "translateX(0)";

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
// CONSOLE
// =====================================================

console.log(

"%c🤖 AI Insights Loaded",

"color:#7C3AED;font-size:16px;font-weight:bold;"

);

// =====================================================
// DEPARTMENT RANKING ANIMATION
// =====================================================

const rankItems =

document.querySelectorAll(".rank-item");

rankItems.forEach((item,index)=>{

    item.style.opacity="0";

    item.style.transform=

    "translateX(-30px)";

    item.style.transition=

    `all .6s ease ${index*0.12}s`;

});

window.addEventListener("load",()=>{

    rankItems.forEach((item)=>{

        item.style.opacity="1";

        item.style.transform=

        "translateX(0)";

    });

});

// =====================================================
// LIVE KPI UPDATE
// =====================================================

setInterval(()=>{

    counters.forEach((counter)=>{

        let value=

        parseInt(counter.innerText)||0;

        value += Math.floor(Math.random()*2);

        counter.innerText=value;

    });

},15000);

// =====================================================
// REFRESH STATUS
// =====================================================

const liveStatus=

document.querySelector(".live-badge span");

if(liveStatus){

    const messages=[

        "Live Data",

        "Synced",

        "AI Updated",

        "Monitoring"

    ];

    let current=0;

    setInterval(()=>{

        liveStatus.innerText=

        messages[current];

        current++;

        if(current>=messages.length){

            current=0;

        }

    },4000);

}

// =====================================================
// ANALYTICS TOAST
// =====================================================

function analyticsToast(message){

    const toast=

    document.createElement("div");

    toast.className=

    "analytics-toast";

    toast.innerHTML=`

    <i class="fa-solid fa-chart-line"></i>

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

    toast.style.zIndex="9999";

    toast.style.opacity="0";

    toast.style.transform=

    "translateY(25px)";

    toast.style.transition=".35s";

    document.body.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.style.opacity="1";

        toast.style.transform=

        "translateY(0)";

    });

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform=

        "translateY(25px)";

        setTimeout(()=>{

            toast.remove();

        },350);

    },3200);

}

setTimeout(()=>{

    analyticsToast(

    "Analytics dashboard synchronized."

    );

},2200);

// =====================================================
// RANK ITEM HOVER
// =====================================================

rankItems.forEach((item)=>{

    item.addEventListener("mouseenter",()=>{

        item.style.transform=

        "translateX(10px)";

    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform=

        "translateX(0)";

    });

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c📈 Live Analytics Running",

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

        case "r":

            window.location.href="/report";

            break;

        case "a":

            window.location.href="/analytics";

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

const blurBlue =

document.querySelector(".blur-blue");

const blurPurple =

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

const analyticsObserver =

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

".kpi-card,.chart-card,.insight-card,.ranking-card,.recommendation-card"

).forEach((card)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(35px)";

    card.style.transition=

    "all .7s ease";

    analyticsObserver.observe(card);

});

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | Analytics";

});

window.addEventListener("blur",()=>{

    document.title="Analytics Running 📊";

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c🚀 CivicAI Analytics Ready",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF ANALYTICS JS
// =====================================================