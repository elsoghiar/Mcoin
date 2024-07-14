document.addEventListener("DOMContentLoaded", function () {
    const counterElement = document.getElementById("counter");
    const referralLink = document.getElementById("referral-link");
    const storedCount = localStorage.getItem("persistentCounter");
    const startDate = new Date().getTime();
    let count = storedCount ? parseInt(storedCount) : 0;

    function updateCounter() {
        const currentDate = new Date().getTime();
        count = Math.floor((currentDate - startDate) / 1000) + (storedCount ? parseInt(storedCount) : 0);
        counterElement.textContent = count;
        localStorage.setItem("persistentCounter", count);
    }

    setInterval(updateCounter, 1000);

    setTimeout(function () {
        document.querySelector(".splash-screen").style.display = "none";
        document.querySelector(".main-container").style.display = "flex";
    }, 4000);

    // Use a fixed referral link
    const userId = "user_id"; // Replace with a dynamic user ID if available
    referralLink.value = "https://t.me/DROB_MCoin_bot?+start=invite_6793556284" + userId;

    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('ref');
    if (referrerId) {
        let referrals = JSON.parse(localStorage.getItem("referrals") || "[]");
        if (!referrals.includes(referrerId)) {
            referrals.push(referrerId);
            localStorage.setItem("referrals", JSON.stringify(referrals));

            let referrerCount = parseInt(localStorage.getItem(referrerId) || "0");
            referrerCount += 1000;
            localStorage.setItem(referrerId, referrerCount);

            let userCount = parseInt(localStorage.getItem(userId) || "0");
            userCount += 1000;
            localStorage.setItem(userId, userCount);

            let currentCount = parseInt(localStorage.getItem("persistentCounter") || "0");
            currentCount += 1000;
            localStorage.setItem("persistentCounter", currentCount);
            counterElement.textContent = currentCount;
        }
    }
});

function showReferralPage() {
    document.querySelector('.main-container').style.display = 'none';
    document.querySelector('.withdraw-container').style.display = 'none';
    document.querySelector('.referral-container').style.display = 'flex';
}

function showWithdrawPage() {
    document.querySelector('.main-container').style.display = 'none';
    document.querySelector('.referral-container').style.display = 'none';
    document.querySelector('.withdraw-container').style.display = 'flex';
}

function goBack() {
    document.querySelector('.referral-container').style.display = 'none';
    document.querySelector('.withdraw-container').style.display = 'none';
    document.querySelector('.main-container').style.display = 'flex';
}

function copyReferralLink() {
    const referralLink = document.getElementById('referral-link');
    referralLink.select();
    referralLink.setSelectionRange(0, 99999);
    document.execCommand('copy');
}
