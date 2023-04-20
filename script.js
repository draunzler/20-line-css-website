/*const track = document.getElementById("image-track");
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, 
    maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    const boundedPercentage = Math.min(Math.max(nextPercentage, 0), -100);
    track.dataset.percentage = boundedPercentage;
    track.animate({
        transform: `translate(${boundedPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});
    for(const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: `${boundedPercentage + 100}% 50%`
        }, {duration: 1200, fill: "forwards"});
    }
}*/

const track = document.getElementById("image-track");
const images = track.getElementsByClassName("image");
const imageWidth = images[0].offsetWidth;
const trackWidth = imageWidth * images.length;
const maxDelta = window.innerWidth / 2 - imageWidth / 2;
const minPercentage = -100 * (images.length - 1);
const maxPercentage = 0;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    let percentage = (mouseDelta / maxDelta) * 100;
    if(track.dataset.prevPercentage){
        percentage += parseFloat(track.dataset.prevPercentage);
    }
    percentage = Math.max(Math.min(percentage, maxPercentage), minPercentage);
    track.dataset.percentage = percentage;
    track.animate({
        transform: `translate(${percentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});
    for(const image of images){
        image.animate({
            objectPosition: `${percentage + 100}% 50%`
        }, {duration: 1200, fill: "forwards"});
    }
};
