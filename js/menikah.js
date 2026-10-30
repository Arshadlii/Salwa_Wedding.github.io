// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("toTop").style.display = "block";
  } else {
    document.getElementById("toTop").style.display = "none";
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");
});



// Wedding Countdown and WhatsApp Sharing
// Wedding: 26 December 2026, 11:00 AM IST

document.addEventListener("DOMContentLoaded", function () {
    const weddingDate = new Date(
        "2026-12-26T11:00:00+05:30"
    ).getTime();

    function updateCountdown() {
        const now = Date.now();
        const distance = weddingDate - now;

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (!days || !hours || !minutes || !seconds) {
            return;
        }

        if (distance <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            return;
        }

        days.textContent = String(
            Math.floor(distance / (1000 * 60 * 60 * 24))
        ).padStart(2, "0");

        hours.textContent = String(
            Math.floor((distance / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0");

        minutes.textContent = String(
            Math.floor((distance / (1000 * 60)) % 60)
        ).padStart(2, "0");

        seconds.textContent = String(
            Math.floor((distance / 1000) % 60)
        ).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Share the invitation through WhatsApp
    const shareButton = document.getElementById("shareButton");

    if (shareButton) {
        shareButton.addEventListener("click", function () {
            const message =
                "You are warmly invited to the wedding of " +
                "Selva & Muhammed Nawaz!\n\n" +
                "Date: Saturday, 26 December 2026\n" +
                "Reception: 11 AM – 2 PM\n" +
                "Venue: MKM Convention Center, Aloor\n\n" +
                "Nikah: 10 AM\n" +
                "Venue: Masjid Taqwa, Kudallur\n\n" +
                "We look forward to celebrating with you!\n\n" +
                "Wedding invitation: " + window.location.href;

            const whatsappURL =
                "https://wa.me/?text=" +
                encodeURIComponent(message);

            window.open(whatsappURL, "_blank");
        });
    }
});


// ===== WEDDING OPENING SCREEN, MUSIC AND ANIMATIONS =====

document.addEventListener("DOMContentLoaded", function () {
    const openingScreen = document.getElementById("openingScreen");
    const openButton = document.getElementById("openInvitationButton");
    const music = document.getElementById("weddingMusic");
    const musicToggle = document.getElementById("musicToggle");

    let musicPlaying = false;

    async function playMusic() {
        if (!music) return;

        try {
            await music.play();
            musicPlaying = true;
            updateMusicButton();
        } catch (error) {
            musicPlaying = false;
            updateMusicButton();
            console.log("Music playback was not started.", error);
        }
    }

    function updateMusicButton() {
        if (!musicToggle) return;

        musicToggle.innerHTML = musicPlaying
            ? '<i class="fa-solid fa-pause"></i><span>Pause Music</span>'
            : '<i class="fa-solid fa-music"></i><span>Play Music</span>';

        musicToggle.setAttribute("aria-pressed", String(musicPlaying));
        musicToggle.setAttribute(
            "aria-label",
            musicPlaying ? "Pause background music" : "Play background music"
        );
    }

    if (openButton && openingScreen) {
        openButton.addEventListener("click", function () {
            openingScreen.classList.add("is-hidden");

            // Start music in response to the guest's click.
            playMusic();

            // Reveal the invitation from the top.
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (musicToggle && music) {
        musicToggle.addEventListener("click", async function () {
            if (musicPlaying) {
                music.pause();
                musicPlaying = false;
                updateMusicButton();
            } else {
                await playMusic();
            }
        });

        music.addEventListener("ended", function () {
            musicPlaying = false;
            updateMusicButton();
        });
    }

    // Animate sections and cards when they enter the viewport.
    const animatedElements = document.querySelectorAll(
        ".section-title, .section-kicker, .event-card, " +
        ".venue-card, .gallery-item, .date-card, .bodytext"
    );

    animatedElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }
});


// Generate a QR code for the current published URL.
document.addEventListener("DOMContentLoaded", function () {
    const qrImage = document.getElementById("weddingQRCode");
    const downloadLink = document.getElementById("downloadQRCode");

    if (!qrImage || !downloadLink) return;

    const websiteURL = window.location.href.split("#")[0];

    const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/" +
        "?size=440x440&format=png&data=" +
        encodeURIComponent(websiteURL);

    qrImage.src = qrURL;
    downloadLink.href = qrURL;
});