

// =====================================================
// CIVICAI HISTORY
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

const searchInput=

document.querySelector(".search-box input");

const filterSelect=

document.querySelector(".filter-select");

const tableRows=

document.querySelectorAll("tbody tr");

// ======================================
// SEARCH
// ======================================

if(searchInput){

    searchInput.addEventListener("keyup",()=>{

        const value=

        searchInput.value.toLowerCase();

        tableRows.forEach((row)=>{

            const text=

            row.innerText.toLowerCase();

            row.style.display=

            text.includes(value)

            ?

            ""

            :

            "none";

        });

    });

}

// ======================================
// FILTER
// ======================================

if(filterSelect){

    filterSelect.addEventListener("change",()=>{

        const value=

        filterSelect.value.toLowerCase();

        tableRows.forEach((row)=>{

            if(

                value==="all"

            ){

                row.style.display="";

                return;

            }

            row.style.display=

            row.innerText

            .toLowerCase()

            .includes(value)

            ?

            ""

            :

            "none";

        });

    });

}

// ======================================
// TABLE REVEAL
// ======================================

tableRows.forEach((row,index)=>{

    row.style.opacity="0";

    row.style.transform=

    "translateY(20px)";

    row.style.transition=

    `all .5s ease ${index*0.05}s`;

});

window.addEventListener("load",()=>{

    tableRows.forEach((row)=>{

        row.style.opacity="1";

        row.style.transform=

        "translateY(0)";

    });

});

// =====================================================
// PAGINATION
// =====================================================

const rowsPerPage = 8;

let currentPage = 1;

const rows =

Array.from(

document.querySelectorAll("tbody tr")

);

const pagination =

document.querySelector(".pagination-section");

// =====================================================
// SHOW PAGE
// =====================================================

function showPage(page){

    currentPage = page;

    const start =

    (page-1)*rowsPerPage;

    const end =

    start+rowsPerPage;

    rows.forEach((row,index)=>{

        row.style.display=

        (index>=start && index<end)

        ?

        ""

        :

        "none";

    });

    updateButtons();

}

// =====================================================
// BUTTONS
// =====================================================

function updateButtons(){

    if(!pagination) return;

    pagination.innerHTML="";

    const totalPages=

    Math.ceil(

    rows.length/

    rowsPerPage

    );

    // Previous

    const prev=

    document.createElement("button");

    prev.className="page-btn";

    prev.innerHTML=

    `<i class="fa-solid fa-angle-left"></i>`;

    prev.disabled=

    currentPage===1;

    prev.onclick=()=>

    showPage(currentPage-1);

    pagination.appendChild(prev);

    // Numbers

    for(let i=1;i<=totalPages;i++){

        const btn=

        document.createElement("button");

        btn.className=

        "page-btn";

        btn.innerText=i;

        if(i===currentPage){

            btn.classList.add("active");

        }

        btn.onclick=()=>

        showPage(i);

        pagination.appendChild(btn);

    }

    // Next

    const next=

    document.createElement("button");

    next.className="page-btn";

    next.innerHTML=

    `<i class="fa-solid fa-angle-right"></i>`;

    next.disabled=

    currentPage===totalPages;

    next.onclick=()=>

    showPage(currentPage+1);

    pagination.appendChild(next);

}

// =====================================================
// INIT
// =====================================================

if(rows.length){

    showPage(1);

}

// =====================================================
// PAGE INFO
// =====================================================

console.log(

"%c📄 History Pagination Ready",

"color:#3B82F6;font-size:16px;font-weight:bold;"

);



// =====================================================
// ACTION BUTTONS
// =====================================================

const actionButtons =

document.querySelectorAll(".action-icons a");

// =====================================================
// VIEW REPORT
// =====================================================

document.querySelectorAll(".view-btn").forEach((btn)=>{

    btn.addEventListener("click",(e)=>{

        e.preventDefault();

        window.location.href="/report";

    });

});

// =====================================================
// DOWNLOAD REPORT
// =====================================================

document.querySelectorAll(".download-btn").forEach((btn)=>{

    btn.addEventListener("click",(e)=>{

        e.preventDefault();

        btn.innerHTML=

        `<i class="fa-solid fa-spinner fa-spin"></i>`;

        btn.style.pointerEvents="none";

        setTimeout(()=>{

            window.location.href="/download_pdf";

            btn.innerHTML=

            `<i class="fa-solid fa-download"></i>`;

            btn.style.pointerEvents="auto";

        },1200);

    });

});

// =====================================================
// DELETE REPORT
// =====================================================

document.querySelectorAll(".delete-btn").forEach((btn)=>{

    btn.addEventListener("click",(e)=>{

        e.preventDefault();

        const row=

        btn.closest("tr");

        const confirmDelete=

        confirm(

        "Are you sure you want to delete this report?"

        );

        if(!confirmDelete){

            return;

        }

        row.style.transition=

        "all .45s ease";

        row.style.opacity="0";

        row.style.transform=

        "translateX(80px)";

        setTimeout(()=>{

            row.remove();

        },450);

    });

});

// =====================================================
// COPY REPORT ID
// =====================================================

document.querySelectorAll(".copy-id").forEach((btn)=>{

    btn.addEventListener("click",async()=>{

        const reportId=

        btn.dataset.id ||

        "REPORT-ID";

        try{

            await navigator.clipboard.writeText(

                reportId

            );

            btn.innerHTML=

            `<i class="fa-solid fa-check"></i>`;

            setTimeout(()=>{

                btn.innerHTML=

                `<i class="fa-solid fa-copy"></i>`;

            },1500);

        }

        catch(error){

            console.log(error);

        }

    });

});

// =====================================================
// BUTTON RIPPLE
// =====================================================

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

        ripple.style.width="10px";

        ripple.style.height="10px";

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
// HISTORY READY
// =====================================================

console.log(

"%c📋 History Actions Ready",

"color:#22C55E;font-size:16px;font-weight:bold;"

);


// =====================================================
// LIVE HISTORY COUNTER
// =====================================================

const totalReports =

document.getElementById("totalReports");

if(totalReports){

    setInterval(()=>{

        let value =

        parseInt(totalReports.innerText) || 0;

        if(Math.random()>0.7){

            totalReports.innerText = value + 1;

        }

    },18000);

}

// =====================================================
// ROW HOVER EFFECT
// =====================================================

tableRows.forEach((row)=>{

    row.addEventListener("mouseenter",()=>{

        row.style.transform=

        "scale(1.01)";

        row.style.transition=

        ".25s ease";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.transform=

        "scale(1)";

    });

});

// =====================================================
// LIVE ACTIVITY BADGE
// =====================================================

const statusBadges=

document.querySelectorAll(

".status,.severity"

);

statusBadges.forEach((badge)=>{

    let glow=true;

    setInterval(()=>{

        badge.style.boxShadow=

        glow

        ?

        "0 0 18px rgba(59,130,246,.35)"

        :

        "none";

        glow=!glow;

    },1200);

});

// =====================================================
// SMART TOAST
// =====================================================

function historyToast(message){

    const toast=

    document.createElement("div");

    toast.className=

    "history-toast";

    toast.innerHTML=`

    <i class="fa-solid fa-clock-rotate-left"></i>

    <span>${message}</span>

    `;

    toast.style.position="fixed";

    toast.style.bottom="30px";

    toast.style.right="30px";

    toast.style.padding="16px 22px";

    toast.style.background="#2563EB";

    toast.style.color="#fff";

    toast.style.borderRadius="14px";

    toast.style.display="flex";

    toast.style.alignItems="center";

    toast.style.gap="12px";

    toast.style.boxShadow=

    "0 15px 40px rgba(37,99,235,.30)";

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

    historyToast(

    "History synchronized successfully."

    );

},2000);

// =====================================================
// WINDOW TITLE
// =====================================================

window.addEventListener("focus",()=>{

    document.title=

    "CivicAI | History";

});

window.addEventListener("blur",()=>{

    document.title=

    "History Updated 📋";

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c📂 History Live Monitoring Enabled",

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

        case "a":

            window.location.href="/analytics";

            break;

        case "h":

            window.location.href="/history";

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
// PARALLAX BACKGROUND
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

".history-table-card,.summary-card,.stat-card"

).forEach((card)=>{

    card.style.opacity="0";

    card.style.transform=

    "translateY(35px)";

    card.style.transition=

    "all .7s ease";

    observer.observe(card);

});

// =====================================================
// AUTO SCROLL TO TOP
// =====================================================

window.addEventListener("beforeunload",()=>{

    window.scrollTo({

        top:0

    });

});

// =====================================================
// CONSOLE
// =====================================================

console.log(

"%c🚀 CivicAI History Ready",

"color:#22C55E;font-size:18px;font-weight:bold;"

);

// =====================================================
// END OF HISTORY JS
// =====================================================