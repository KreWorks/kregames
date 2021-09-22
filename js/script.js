const sliderContainer = document.querySelector(".slider-container")
const slideRight = document.querySelector(".slide")
const upButton = document.querySelector(".up-button")
const downButton = document.querySelector(".down-button")
const slides =
    slideRight != null ? slideRight.querySelectorAll("div.slide-item") : null
const body = document.querySelector("body")
const ticks = document.querySelector(".ticks")
const courses = document.querySelectorAll(".course-list li")
const courseImage = document.getElementById("course-img")

let activeSlideIndex = 0
let MOUSE_OVER = false
let activeCourseIndex = 0

if (slides != null) {
    for (let i = 0; i < slides.length; i++) {
        const listEl = document.createElement("li")
        listEl.classList.add(slides[i].id)
        if (i == 0) listEl.classList += " active"
        listEl.innerHTML = `<a href="#${slides[i].id}"><img src="logos/pp_mosaic.png"></a>`

        ticks.appendChild(listEl)
    }
}
const skills = document.querySelectorAll(".progress-value")

skills.forEach((skill) => {
    const value = +skill.getAttribute("data-value")
    if (value >= 70) {
        skill.classList.add("green-bar")
    } else if (value >= 40) {
        skill.classList.add("yellow-bar")
    } else {
        skill.classList.add("red-bar")
    }
    move(skill, value)
    //skill.style.width = `${value}%`
})

courses.forEach((course, idx) => {
    course.addEventListener("click", () => {
        courseImage.src = `${course.getAttribute("data-image-link")}`
        course.classList.add("active")
        activeCourseIndex = idx
        deselectList(idx)
    })
})

function deselectList(active) {
    courses.forEach((course, idx) => {
        if (idx != active) {
            course.classList.remove("active")
        }
    })
}
function move(myBar, percent) {
    var i = 0
    if (i == 0) {
        i = 1
        var elem = myBar
        var width = 1
        var id = setInterval(frame, 20)
        function frame() {
            if (width >= percent) {
                clearInterval(id)
                i = 0
            } else {
                width++
                elem.style.width = width + "%"
            }
        }
    }
}

const panels = document.querySelectorAll(".panel")

panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        removeActiveClasses()
        panel.classList.add("active")
    })
})

function removeActiveClasses() {
    panels.forEach((panel) => {
        panel.classList.remove("active")
    })
}

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight
    let liItem = document.querySelector("." + slides[activeSlideIndex].id)
    liItem.classList.remove("active")

    if (direction == "up") {
        if (activeSlideIndex != 0) {
            activeSlideIndex--
        }
    } else if (direction == "down") {
        if (activeSlideIndex != slides.length - 1) {
            activeSlideIndex++
        }
    }
    console.log(activeSlideIndex)
    slideRight.style.transform = `translateY(-${
        activeSlideIndex * sliderHeight
    }px)`
    console.log("." + slides[activeSlideIndex].id)
    liItem = document.querySelector("." + slides[activeSlideIndex].id)
    console.log(liItem)
    liItem.classList.add("active")
}

if (sliderContainer != null) {
    sliderContainer.addEventListener("mouseenter", function () {
        MOUSE_OVER = true
    })
    sliderContainer.addEventListener("mouseleave", function () {
        MOUSE_OVER = false
    })
    sliderContainer.addEventListener(
        "mousewheel",
        function (e) {
            const delta = e.wheelDelta
            if (delta > 0) {
                changeSlide("up")
            } else {
                changeSlide("down")
            }
        },
        { passive: true }
    )
}
body.addEventListener(
    "mousewheel",
    function (e) {
        if (MOUSE_OVER) {
            if (e.preventDefault) {
                //e.preventDefault()
            }
            //e.returnValue = false
            return false
        }
    },
    { passive: true }
)

var quoteIndex = 1;
showSlides(quoteIndex);

function plusSlides(n) {
  showSlides(quoteIndex += n);
}

function currentSlide(n) {
  showSlides(quoteIndex = n);
}

function showSlides(n) {
  var i;
  var quotes = document.getElementsByClassName("quote");
  var dots = document.getElementsByClassName("dot");
  if (n > quotes.length) {quoteIndex = 1}
    if (n < 1) {quoteIndex = quotes.length}
    for (i = 0; i < quotes.length; i++) {
        quotes[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    quotes[quoteIndex-1].style.display = "block";
  dots[quoteIndex-1].className += " active";
}