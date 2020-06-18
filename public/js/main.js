// Select
// Use array prototype to transform the selection in array
const ytImg = Array.prototype.slice.call(document.querySelectorAll('.yt-img'));
const ytIframe = Array.prototype.slice.call(document.querySelectorAll('.yt-iframe'));
const btnHide = Array.prototype.slice.call(document.querySelectorAll('.btn-hide'));
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const loader = document.querySelector('.spinner');

// Scroll on top
const onTop = () => {
    let options = {
        top: 0,
        left: 0,
        behavior: "smooth"
    };
    window.scrollTo(options);
};
// ADD EVENT LISTENER ON IMAGE TO SHOW VIDEO IN FULL SCREEN
if (ytImg !== null) {
    ytImg.map((y, indx) => {
        y.addEventListener('click', () => {
            // Scroll on top
            onTop();
            // Select iframe and show in full screen remove hide class
            ytIframe[indx].classList.remove('hide');
            btnHide[indx].classList.remove('hide');
            // Hide navigations buttons
            if (nextBtn !== null) {
                nextBtn.classList.add('hide');
            }
            if (prevBtn !== null) {
                prevBtn.classList.add('hide');
            }

            // Add hide button event listener
            btnHide[indx].addEventListener('click', () => {
                ytIframe[indx].classList.add('hide');
                y.classList.remove('hide');
                btnHide[indx].classList.add('hide');
                // Stop reset video reproduction 
                ytIframe[indx].src = ytIframe[indx].src;
                // Show nav buttons
                if (nextBtn !== null) {
                    nextBtn.classList.remove('hide');
                }
                if (prevBtn !== null) {
                    prevBtn.classList.remove('hide');
                }
            })
        });
    })
    // Hide loader
    setTimeout(() => {
        loader.classList.remove('show-loader');
    }, 1000);
}