let slides = [
    {
        img: "./images/autumn.jpg",
        caption: "Crimson Reflections"
    },
    {
        img: "./images/beach.jpg",
        caption: "Twilight Shore"
    },
    {
        img: "./images/Ocean.jpg",
        caption: "Endless Path"
    }
]

let currentIdx = 0, autoPlayInterval = null, isPlaying = false;

const showSlide = (idx) => {
    const slide = slides[idx];
    let img = document.getElementById("slider-img")
    let caption = document.getElementById("caption")
    let counter = document.getElementById("counter")

    img.classList.remove("opacity-100");
    img.classList.add("opacity-0");

    setTimeout(() => {
        img.src = slide.img;
        caption.innerHTML = `${slide.caption}`;
        counter.innerHTML = `Slide ${idx + 1} of ${slides.length}`;
        console.log("Slide Change")
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
    }, 300);
}

const nextSlide = () => {
    if (currentIdx < slides.length - 1) {
        currentIdx++;
        showSlide(currentIdx);
    } else {
        console.log("Message: This is last slide.")
        alert("This is last slide.")
    }
}

const prevSlide = () => {
    if (currentIdx > 0) {
        currentIdx--;
        showSlide(currentIdx);
    } else {
        console.log("Message: This is First Slide.")
        alert("This is First Slide.")
    }
}

const addSlide = () => {
    const url = document.getElementById("img_url").value;
    const caption = document.getElementById("img_caption").value;

    if (url && caption) {
        slides.push({ img: url, caption })
        console.log(`Added new slide: ${caption}`)
        document.getElementById("img_url").value = "";
        document.getElementById("img_caption").value = "";
        document.getElementById("imgError").textContent = ""
        document.getElementById("captionError").textContent = ""
    } else {
        console.log("Message: Please add both image and caption to add the image")
        document.getElementById("imgError").textContent = "Image Field is required"
        document.getElementById("captionError").textContent = "Caption Field is required"
    }
}

const toggleAutoPlay = () => {
    let btn = document.getElementById("autoPlay");
    if (!isPlaying) {
        btn.title = "Pause";
        startAutoPlay();
        isPlaying = true;
        btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        btn.title = "Start Auto Play";
        stopAutoPlay();
        isPlaying = false;
        btn.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;
    }
}

const startAutoPlay = () => {
    stopAutoPlay()
    autoPlayInterval = setInterval(() => {
        if (currentIdx < slides.length - 1) {
            nextSlide();
        } else {
            currentIdx = 0;
            showSlide(currentIdx);
        }
    }, 3000);
    console.log("Auto Play Started");
}

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
    console.log("Auto Play Stopped");
}

function addSlider() {
    let img_url = document.getElementById("img_url").value;
    let img_caption = document.getElementById("img_caption").value;

    if (img_url == "" && img_caption == "") {
        alert("Enter both image url and image caption")
    }
}

window.onload = () => {
    showSlide(currentIdx);
    const img = document.getElementById("slider-img");
    img.classList.remove("opacity-0");
    img.classList.add("opacity-100");
};