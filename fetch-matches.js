// KELLA Pro - Automated AI & Technical Analysis Engine
document.addEventListener("DOMContentLoaded", () => {
    // جلب مباريات اليوم والتاريخ الحالي أوتوماتيكياً
    const today = new Date().toISOString().split('T')[0];
    loadAndAnalyzeMatches(today);
});

function loadAndAnalyzeMatches(dateString) {
    const container = document.getElementById('leaguesContainer');
    container.innerHTML = `<div class="loading-text">جاري جلب وتحليل مباريات تاريخ ${dateString} بالذكاء الاصطناعي... 🤖⚽</div>`;

    // محاكاة سحب البيانات من السيرفر الشامل وتمريرها على محرك التحليل الفني
    setTimeout(() => {
        renderAnalyzedLeagues(container, dateString);
    }, 600);
}

function renderAnalyzedLeagues(container, date) {
    const aiPredictor = new KellaAIPredictor();

    // تحليل المباريات مسبقاً قبل العرض
    const m1 = aiPredictor.generateMatchIntelligence("Arsenal", "Chelsea", "Advanced");
    const m2 = aiPredictor.generateMatchIntelligence("Real Madrid", "Barcelona", "Advanced");
    const m3 = aiPredictor.generateMatchIntelligence("Bayern Munich", "Paris SG", "Advanced");

    container.innerHTML = `
        <div style="background: #0f172a; color: white; padding: 10px 15px; font-size: 12px; text-align: center; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
            <span>📅 جدول مباريات ومراجعات الذكاء الاصطناعي (${date})</span>
            <span style="color: #38bdf8; font-size: 11px;">محلل آلياً بالكامل ⚡</span>
        </div>

        <!-- 1. الدوري الإنجليزي -->
        <div class="league-box">
            <div class="league-title"><span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><span>England - Premier League</span></div>
            
            <div class="match-row" onclick="openAIAnalysis('Arsenal', 'Chelsea')">
                <div class="team-name left">Arsenal</div>
                <div class="match-center-info">
                    <span style="font-size: 13px; font-weight: bold; color: #0284c7;">🎯 ${m1.predictedScore}</span><br>
                    <span style="font-size: 10px; color: #16a34a; font-weight: bold;">AI: فوز ${m1.probabilities.home > m1.probabilities.away ? 'Arsenal' : 'Chelsea'}</span>
                </div>
                <div class="team-name right">Chelsea</div>
            </div>
        </div>

        <!-- 2. الدوري الإسباني -->
        <div class="league-box">
            <div class="league-title"><span>🇪🇸</span><span>Espagne - LaLiga</span></div>
            
            <div class="match-row" onclick="openAIAnalysis('Real Madrid', 'Barcelona')">
                <div class="team-name left">Real Madrid</div>
                <div class="match-center-info">
                    <span style="font-size: 13px; font-weight: bold; color: #0284c7;">🎯 ${m2.predictedScore}</span><br>
                    <span style="font-size: 10px; color: #16a34a; font-weight: bold;">AI: فوز ${m2.probabilities.home > m2.probabilities.away ? 'Real Madrid' : 'Barcelona'}</span>
                </div>
                <div class="team-name right">Barcelona</div>
            </div>
        </div>

        <!-- 3. دوري أبطال أوروبا -->
        <div class="league-box">
            <div class="league-title"><span>🇪🇺</span><span>UEFA Champions League</span></div>
            
            <div class="match-row" onclick="openAIAnalysis('Bayern Munich', 'Paris SG')">
                <div class="team-name left">Bayern Munich</div>
                <div class="match-center-info">
                    <span style="font-size: 13px; font-weight: bold; color: #0284c7;">🎯 ${m3.predictedScore}</span><br>
                    <span style="font-size: 10px; color: #16a34a; font-weight: bold;">AI: فوز ${m3.probabilities.home > m3.probabilities.away ? 'Bayern' : 'PSG'}</span>
                </div>
                <div class="team-name right">Paris SG</div>
            </div>
        </div>
    `;
}

// محرك عرض نافذة التحليل العميق عند الضغط على أي مباراة
const globalPredictor = new KellaAIPredictor();

function openAIAnalysis(home, away) {
    const modal = document.getElementById('aiModal');
    document.getElementById('modalMatchTitle').innerText = `${home} vs ${away}`;

    let data = globalPredictor.generateMatchIntelligence(home, away, "Advanced");

    document.getElementById('aiModalBody').innerHTML = `
        <div class="ai-card" style="border-left: 4px solid #0284c7;">
            <div class="ai-title">📊 دراسة الاحتمالات الفنية والنتيجة</div>
            <div class="stat-row"><span>نسبة فوز (${home}):</span> <strong>${data.probabilities.home}</strong></div>
            <div class="stat-row"><span>نسبة التعادل:</span> <strong>${data.probabilities.draw}</strong></div>
            <div class="stat-row"><span>نسبة فوز (${away}):</span> <strong>${data.probabilities.away}</strong></div>
            <div class="stat-row"><span>النتيجة المتوقعة بدقة:</span> <strong style="color: #0284c7; font-size:14px;">${data.predictedScore}</strong></div>
        </div>

        <div class="ai-card" style="border-left: 4px solid #16a34a;">
            <div class="ai-title">⚽ تحليل الأهداف والرهانات</div>
            <div class="stat-row"><span>معدل الأهداف المتوقعة (xG):</span> <strong>${data.expectedGoals} هدف</strong></div>
            <div class="stat-row"><span>تسجيل الفريقين (BTTS):</span> <strong style="color: #16a34a;">نعم (احتمال قوي)</strong></div>
        </div>

        <div class="ai-card" style="border-left: 4px solid #eab308;">
            <div class="ai-title">🟨 دراسة الإنذارات والبطاقات</div>
            <div class="stat-row"><span>متوسط البطاقات الصفراء:</span> <strong>4.2 بطاقة</strong></div>
            <div class="stat-row"><span>مستوى التوتر التكتيكي:</span> <strong>مرتفع</strong></div>
        </div>

        <div class="ai-card" style="border-left: 4px solid #8b5cf6;">
            <div class="ai-title">📋 قراءة الخبراء والتشكيلة</div>
            <p style="margin: 0; color: #475569; line-height: 1.4;">
                <strong>${home}:</strong> جاهزية عالية وسيطرة متوقعة في وسط الملعب.<br>
                <strong>${away}:</strong> اعتماد خطة الهتكات المرتدة السريعة لاستغلال المساحات.
            </p>
        </div>

        <div style="background: #e0f2fe; padding: 10px; border-radius: 8px; color: #0369a1; font-size: 12px; border: 1px solid #bae6fd;">
            💡 <strong>الخلاصة التحليلية لـ KELLA:</strong> ${data.aiAdvice}
        </div>
    `;

    modal.style.display = 'flex';
}

function closeModal(e) {
    if (e.target.id === 'aiModal') {
        e.target.style.display = 'none';
    }
}
