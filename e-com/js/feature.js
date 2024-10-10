document.addEventListener("DOMContentLoaded", function () {
    const features = document.querySelectorAll(".feature");
    let currentIndex = 0;

    // Show the first feature
    features[currentIndex].classList.add("active");

    function showNextFeature() {
        features[currentIndex].classList.remove("active"); // Hide current feature
        currentIndex = (currentIndex + 1) % features.length; // Move to the next feature
        features[currentIndex].classList.add("active"); // Show next feature
    }

    setInterval(showNextFeature, 5000); // Change feature every 3 seconds
});
