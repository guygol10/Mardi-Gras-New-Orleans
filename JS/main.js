/* start back to top */
const backToTopButton = document.querySelector("#back-to-top-btn");

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};
/* end  back to top */

document.querySelector(".btn").addEventListener('click', validateEmail)

function validateEmail() {
    let emailID = document.querySelector(".Email").value;
    let atpos = emailID.indexOf("@");
    let dotpos = emailID.lastIndexOf(".");

    if (atpos < 1 || (dotpos - atpos < 2)) {
        return false;
    }
    return (true);
}
const quiz = document.querySelector(".btn-quiz")
quiz.addEventListener('click', function () {
    window.open('quiz_app/index.html')
});