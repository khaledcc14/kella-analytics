async function loadLiveMatches() {
    try {
        // رابط الـ Raw الخاص بملف live.json في مستودعك
        const response = await fetch('https://raw.githubusercontent.com/khaledcc14/kella-analytics/main/live.json?t=' + new Date().getTime());
        const data = await response.json();
        
        if (data && data.matches && data.matches.length > 0) {
            console.log("Matches loaded successfully:", data.matches.length);
            // تغيير النقطة إلى الأخضر (متصل)
            updateConnectionStatus(true);
            // عرض المباريات في واجهة التطبيق
            renderMatches(data.matches);
        } else {
            console.log("No matches found in live.json, using fallback.");
            updateConnectionStatus(false);
        }
    } catch (error) {
        console.error("Error fetching live.json:", error);
        updateConnectionStatus(false);
    }
}

function updateConnectionStatus(isConnected) {
    const dot = document.querySelector('.connection-dot'); // أو محدد النقطة عندك في الواجهة
    if (dot) {
        dot.style.backgroundColor = isConnected ? '#22c55e' : '#eab308'; // أخضر أو أصفر
    }
}

// تشغيل الدالة عند فتح التطبيق أو الضغط على زر Actualiser
document.addEventListener("DOMContentLoaded", () => {
    loadLiveMatches();
});

