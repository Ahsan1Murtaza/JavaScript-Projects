
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const image_wrapper = document.querySelector('.image-wrapper');
const images = document.querySelectorAll('.image-wrapper img');

let index = 0;

function showImage(){
    if (index < 0){
        index = images.length - 1;
    }
    if (index >= images.length){
        index = 0;
    }
    image_wrapper.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener("click", ()=>{
    index++;
    showImage();
});
prev.addEventListener("click", ()=>{
    index--;
    showImage();
});

     

