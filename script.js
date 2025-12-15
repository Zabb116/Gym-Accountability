document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const checkInButton = document.getElementById('checkInButton');
    const verseDisplay = document.getElementById('verseDisplay');
    const streakCounter = document.getElementById('streakCounter');
    const badgeDisplay = document.getElementById('badgeDisplay');
    const loginForm = document.getElementById('loginForm');
    const checkInArea = document.getElementById('checkInArea');

    // Powerful verses specifically on lust, temptation, and guarding your eyes
    const bibleVerses = [
        "Matthew 5:28 – But I tell you that anyone who looks at a woman lustfully has already committed adultery with her in his heart.",
        "1 Corinthians 10:13 – No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.",
        "Job 31:1 – I made a covenant with my eyes not to look lustfully at a young woman.",
        "2 Timothy 2:22 – Flee the evil desires of youth and pursue righteousness, faith, love and peace, along with those who call on the Lord out of a pure heart.",
        "1 Corinthians 6:18 – Flee from sexual immorality. All other sins a person commits are outside the body, but whoever sins sexually, sins against their own body.",
        "Psalm 119:37 – Turn my eyes away from worthless things; preserve my life according to your word.",
        "Proverbs 4:25 – Let your eyes look straight ahead; fix your gaze directly before you.",
        "Galatians 5:16 – So I say, walk by the Spirit, and you will not gratify the desires of the flesh."
    ];

    // Get today's date as string (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    let streak = parseInt(localStorage.getItem('streak')) || 0;

    // Reset streak if missed a day
    if (lastCheckIn && lastCheckIn !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (lastCheckIn !== yesterdayStr) {
            streak = 0; // Missed more than one day? Reset fully
            localStorage.setItem('streak', streak);
        }
    }

    // Update display
    streakCounter.innerText = `Streak: ${streak} days`;
    if (streak >= 7) {
        badgeDisplay.style.display = 'block';
    }

    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        if (username) {
            loginForm.style.display = 'none';
            checkInArea.style.display = 'block';
        } else {
            alert('Enter a username, brother.');
        }
    });

    checkInButton.addEventListener('click', () => {
        // Only allow one check-in per day
        if (lastCheckIn === today) {
            verseDisplay.innerHTML = `<strong>You already checked in today, warrior. Stay strong!</strong>`;
            return;
        }

        const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
        verseDisplay.innerHTML = `<strong>${randomVerse}</strong><br><br><em>Victory in Jesus — you chose Him today.</em>`;

        // Increment streak and save
        streak++;
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastCheckIn', today);

        streakCounter.innerText = `Streak: ${streak} days`;
        if (streak >= 7) {
            badgeDisplay.style.display = 'block';
        }
    });
});
