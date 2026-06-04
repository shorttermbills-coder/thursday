document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());

const app = document.getElementById("app");

fetch("./brands.json")
.then(r => r.json())
.then(data => {


const path = decodeURIComponent(
    location.pathname.replace(/^\/|\/$/g,"")
);

if(path === ""){
    renderBrands(data);
    return;
}

const parts = path.split("/");

if(parts.length === 1){
    renderModels(data, parts[0]);
    return;
}

if(parts.length === 2){
    renderImages(data, parts[0], parts[1]);
}


});

function renderBrands(data){


let html = `<h1>Brands</h1><div class="grid">`;

Object.keys(data).forEach(brand => {

    html += `
    <a href="/${slug(brand)}" class="card">

        <img src="${data[brand].cover}">

        <div class="card-body">
            <div class="card-title">${brand}</div>

            <div class="card-count">
                ${Object.keys(data[brand].models).length} Models
            </div>
        </div>

    </a>
    `;

});

html += "</div>";

app.innerHTML = html;


}

function renderModels(data, brandSlug){


const brand = Object.keys(data)
    .find(b => slug(b) === brandSlug);

if(!brand){
    app.innerHTML = "<h1>Not Found</h1>";
    return;
}

let html = `
<a href="/" class="back-btn">← Brands</a>
<h1>${brand}</h1>
<div class="grid">
`;

Object.entries(data[brand].models).forEach(([model, images]) => {

    html += `
    <a href="/${brandSlug}/${slug(model)}" class="card">

        <img src="${images[0]}">

        <div class="card-body">
            <div class="card-title">${model}</div>

            <div class="card-count">
                ${images.length} Photos
            </div>
        </div>

    </a>
    `;

});

html += "</div>";

app.innerHTML = html;


}

function renderImages(data, brandSlug, modelSlug){

    const brand = Object.keys(data)
        .find(b => slug(b) === brandSlug);

    if(!brand){
        app.innerHTML = "<h1>Brand not found</h1>";
        return;
    }

    const model = Object.keys(data[brand].models)
        .find(m => slug(m.trim()) === modelSlug);

    if(!model){
        app.innerHTML = `
            <h1>Model not found</h1>
            <p>Brand: ${brand}</p>
            <p>URL Model: ${modelSlug}</p>
            <pre>${JSON.stringify(Object.keys(data[brand].models), null, 2)}</pre>
        `;
        return;
    }

    const images = data[brand].models[model];

    let html = `
    <a href="/${brandSlug}" class="back-btn">← ${brand}</a>
    <h1>${model}</h1>

    <div class="gallery">
    `;

    images.forEach(img => {
        html += `<img src="${img}" class="gallery-img" loading="lazy">`;
    });

    html += "</div>";

    app.innerHTML = html;

    initLightbox();
}


const brand = Object.keys(data)
    .find(b => slug(b) === brandSlug);

if(!brand) return;

const model = Object.keys(data[brand].models)
    .find(m => slug(m) === modelSlug);

if(!model) return;

const images = data[brand].models[model];

let html = `
<a href="/${brandSlug}" class="back-btn">← ${brand}</a>
<h1>${model}</h1>

<div class="gallery">
`;

images.forEach(img => {
    html += `<img src="${img}" class="gallery-img">`;
});

html += "</div>";

app.innerHTML = html;

initLightbox();


}

function slug(text){
return text
.toLowerCase()
.replace(/\s+/g,"-");
}

function initLightbox(){


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

document.querySelectorAll(".gallery-img")
    .forEach(img => {

        img.onclick = () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        };

    });

closeBtn.onclick = () => {
    lightbox.style.display = "none";
};

lightbox.onclick = e => {
    if(e.target === lightbox){
        lightbox.style.display = "none";
    }
};


}
