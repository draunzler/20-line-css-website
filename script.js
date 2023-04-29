const track = document.getElementById("image-track");
const images = track.getElementsByClassName("image");
const totalWidth = images.length * images[0].clientWidth;
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = totalWidth - window.innerWidth;
    const percentage = (mouseDelta / maxDelta) * 100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) - percentage;
    if (nextPercentage > 0) {
        nextPercentage = 0;
    } else if (nextPercentage < -100){
        nextPercentage = -100;
    }
    track.dataset.percentage = nextPercentage;
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});
    for(const image of images){
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, {duration: 1200, fill: "forwards"});
    }
}
