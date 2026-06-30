

// =====================================================
// CIVICAI UPLOAD
// =====================================================

// ======================================
// ELEMENTS
// ======================================

const uploadCard =
document.querySelector(".upload-card");

const fileInput =
document.getElementById("imageInput");

const previewContainer =
document.getElementById("previewContainer");

const analyzeBtn =
document.querySelector(".analyze-btn");

const uploadForm =
document.getElementById("uploadForm");

// ======================================
// CHOOSE BUTTON
// ======================================

document
.querySelector(".choose-btn")
.addEventListener("click",()=>{

    fileInput.click();

});

// ======================================
// IMAGE PREVIEW
// ======================================

fileInput.addEventListener("change",(e)=>{

    const file =
    e.target.files[0];

    if(!file) return;

    previewImage(file);

});

// ======================================
// PREVIEW FUNCTION
// ======================================

function previewImage(file){

    if(!file.type.startsWith("image/")){

        alert("Please select an image.");

        fileInput.value="";

        return;

    }

    const reader =
    new FileReader();

    reader.onload=function(event){

        previewContainer.innerHTML=

        `<img src="${event.target.result}"
        alt="Preview">`;

    };

    reader.readAsDataURL(file);

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
// DRAG & DROP
// =====================================================

["dragenter","dragover"].forEach((event)=>{

    uploadCard.addEventListener(event,(e)=>{

        e.preventDefault();

        uploadCard.classList.add("dragover");

    });

});

["dragleave","drop"].forEach((event)=>{

    uploadCard.addEventListener(event,(e)=>{

        e.preventDefault();

        uploadCard.classList.remove("dragover");

    });

});

// =====================================================
// DROP IMAGE
// =====================================================

uploadCard.addEventListener("drop",(e)=>{

    const files=e.dataTransfer.files;

    if(!files.length) return;

    fileInput.files=files;

    previewImage(files[0]);

});

// =====================================================
// BUTTON HOVER
// =====================================================

const buttons=
document.querySelectorAll(

".choose-btn,.analyze-btn"

);

buttons.forEach((btn)=>{

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
// PREVIEW ANIMATION
// =====================================================

const observer=

new MutationObserver(()=>{

    const img=

    previewContainer.querySelector("img");

    if(img){

        img.style.opacity="0";

        img.style.transform=

        "scale(.9)";

        img.style.transition=

        "all .5s ease";

        requestAnimationFrame(()=>{

            img.style.opacity="1";

            img.style.transform=

            "scale(1)";

        });

    }

});

observer.observe(

previewContainer,

{

childList:true

}

);

// =====================================================
// IMAGE VALIDATION
// =====================================================

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function validateImage(file){

    if(!file){

        return false;

    }

    if(!file.type.startsWith("image/")){

        alert("❌ Please select a valid image file.");

        fileInput.value="";

        previewContainer.innerHTML="";

        return false;

    }

    if(file.size > MAX_FILE_SIZE){

        alert("❌ Image size must be less than 10 MB.");

        fileInput.value="";

        previewContainer.innerHTML="";

        return false;

    }

    return true;

}

// =====================================================
// UPDATE FILE INPUT
// =====================================================

fileInput.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(!validateImage(file)){

        return;

    }

    previewImage(file);

});

// =====================================================
// DRAG & DROP VALIDATION
// =====================================================

uploadCard.addEventListener("drop",(e)=>{

    e.preventDefault();

    uploadCard.classList.remove("dragover");

    const file=e.dataTransfer.files[0];

    if(!validateImage(file)){

        return;

    }

    fileInput.files=e.dataTransfer.files;

    previewImage(file);

});

// =====================================================
// FILE NAME
// =====================================================

function showFileName(file){

    let fileName=

    document.querySelector(".selected-file");

    if(!fileName){

        fileName=document.createElement("p");

        fileName.className="selected-file";

        fileName.style.marginTop="18px";

        fileName.style.color="#94A3B8";

        fileName.style.fontSize="14px";

        uploadCard.appendChild(fileName);

    }

    fileName.innerHTML=

    `<strong>Selected:</strong> ${file.name}`;

}

// =====================================================
// PREVIEW UPDATE
// =====================================================

const originalPreviewImage=previewImage;

previewImage=function(file){

    showFileName(file);

    originalPreviewImage(file);

};


// =====================================================
// ANALYZE BUTTON
// =====================================================

if(uploadForm){

    uploadForm.addEventListener("submit",(e)=>{

        const file=fileInput.files[0];

        if(!validateImage(file)){

            e.preventDefault();

            return;

        }

        analyzeBtn.disabled=true;

        analyzeBtn.innerHTML=

        `<i class="fa-solid fa-spinner fa-spin"></i>
        Analyzing...`;

    });

}

// =====================================================
// RIPPLE EFFECT
// =====================================================

buttons.forEach((btn)=>{

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

        "rgba(255,255,255,.45)";

        ripple.style.left=

        `${e.clientX-rect.left}px`;

        ripple.style.top=

        `${e.clientY-rect.top}px`;

        ripple.style.transform=

        "translate(-50%,-50%) scale(0)";

        ripple.style.transition=

        "all .6s ease";

        ripple.style.pointerEvents="none";

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
// PREVENT DOUBLE SUBMIT
// =====================================================

let submitted=false;

if(uploadForm){

    uploadForm.addEventListener("submit",(e)=>{

        if(submitted){

            e.preventDefault();

            return;

        }

        submitted=true;

    });

}

// =====================================================
// IMAGE FADE-IN
// =====================================================

previewContainer.addEventListener("load",()=>{

    previewContainer.style.opacity="1";

});



// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        if(fileInput.files.length>0){

            uploadForm.requestSubmit();

        }

    }

    if(e.key==="Escape"){

        fileInput.value="";

        previewContainer.innerHTML="";

        const fileName=

        document.querySelector(".selected-file");

        if(fileName){

            fileName.remove();

        }

    }

});

// =====================================================
// WINDOW FOCUS
// =====================================================

window.addEventListener("focus",()=>{

    document.title="CivicAI | Upload Issue";

});

window.addEventListener("blur",()=>{

    document.title="Come Back 👋 | CivicAI";

});

// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log(

"%c📤 CivicAI Upload Module Loaded",

"color:#3B82F6;font-size:18px;font-weight:bold;"

);

// =====================================================
// RESET BUTTON STATE
// =====================================================

window.addEventListener("pageshow",()=>{

    if(analyzeBtn){

        analyzeBtn.disabled=false;

        analyzeBtn.innerHTML=

        `<i class="fa-solid fa-magnifying-glass"></i>
        Analyze Image`;

    }

});

// =====================================================
// END OF UPLOAD JS
// =====================================================