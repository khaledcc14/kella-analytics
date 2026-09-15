// KELLA Auto-Fetch Matches Engine
document.addEventListener("DOMContentLoaded", () => {
    loadLiveMatches();
});

function loadLiveMatches() {
    const container = document.getElementById('leaguesContainer');
    
    // محاكاة جلب البيانات الحية من السيرفر الرياضي المنظم حسب الدوريات
    setTimeout(() => {
        container.innerHTML = `
            <!-- 1. الدوري الإسباني -->
            <div class="league-box">
                <div class="league-title"><span>🇪🇸</span><span>Espagne - LaLiga</span></div>
                <div class="match-row" onclick="openAIAnalysis('Real Madrid', 'Barcelona')">
                    <div class="team-name left">Real Madrid</div>
                    <div class="match-center-info">
                        <span style="font-size: 12px; font-weight: bold; color: #4b5563;">21:00</span><br>
                        <span style="font-size: 10px; color: #0284c7;">Auto-Synced</span>
                    </div>
                    <div class="team-name right">Barcelona</div>
                </div>
                <div class="match-row" onclick="openAIAnalysis('Villarreal', 'Atletico Madrid')">
                    <div class="team-name left">Villarreal</div>
                    <div class="match-center-info">
                        <span class="match-score">2 - 1</span><br>
                        <span style="font-size: 10px; color: #ef4444; font-weight: bold;">LIVE 75'</span>
                    </div>
                    <div class="team-name right">Atletico Madrid</div>
                </div>
            </div>

            <!-- 2. الدوري الإنجليزي الممتاز -->
            <div class="league-box">
                <div class="league-title"><span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><span>England - Premier League</span></div>
                <div class="match-row" onclick="openAIAnalysis('Arsenal', 'Manchester City')">
                    <div class="team-name left">Arsenal</div>
                    <div class="match-center-info">
                        <span style="font-size: 12px; font-weight: bold; color: #4b5563;">18:30</span><br>
                        <span style="font-size: 10px; color: #0284c7;">Auto-Synced</span>
                    </div>
                    <div class="team-name right">Manchester City</div>
                </div>
                <div class="match-row" onclick="openAIAnalysis('Liverpool', 'Chelsea')">
                    <div class="team-name left">Liverpool</div>
                    <div class="match-center-info">
                        <span class="match-score">1 - 1</span><br>
                        <span style="font-size: 10px; color: #ef4444; font-weight: bold;">FT</span>
                    </div>
                    <div class="team-name right">Chelsea</div>
                </div>
            </div>

            <!-- 3. دوري أبطال أوروبا -->
            <div class="league-box">
                <div class="league-title"><span>🇪🇺</span><span>Champions League</span></div>
                <div class="match-row" onclick="openAIAnalysis('Paris SG', 'Bayern Munich')">
                    <div class="team-name left">Paris SG</div>
                    <div class="match-center-info">
                        <span style="font-size: 12px; font-weight: bold; color: #4b5563;">20:00</span><br>
                        <span style="font-size: 10px; color: #0284c7;">Auto-Synced</span>
                    </div>
                    <div class="team-name right">Bayern Munich</div>
                </div>
            </div>
        `;
    }, 600);
}

const aiPredictor = new KellaAIPredictor();

function openAIAnalysis(home, away) {
    const modal = document.getElementById('aiModal');
    document.getElementById('modalMatchTitle').innerText = `${home} vs ${away}`;

    let data = aiPredictor.generateMatchIntelligence(home, away, "Advanced");

    document.getElementById('aiModalBody').innerHTML = `
        <div class="ai-card">
            <div class="ai-title">📊 احتمالات الفوز والنتيجة</div>
            <div class="stat-row"><span>الفوز (${home}):</span> <strong>${data.probabilities.home}</strong></div>
            <div class="stat-row"><span>التعادل:</span> <strong>${data.probabilities.draw}</strong></div>
            <div class="stat-row"><span>الفوز (${away}):</span> <strong>${data.probabilities.away}</strong></div>
            <div class="stat-row"><span>النتيجة المتوقعة:</span> <strong style="color: #0284c7;">${data.predictedScore}</strong></div>
        </div>

        <div class="ai-card">
            <div class="ai-title">⚽ الأهداف وتسجيل الفريقين (BTTS)</div>
            <div class="stat-row"><span>إجمالي الأهداف المتوقعة:</span> <strong>${data.expectedGoals}</strong></div>
            <div class="stat-row"><span>تسجيل الفريقين (BTTS):</span> <strong style="color: #16a34a;">نعم (Likely)</strong></div>
        </div>

        <div class="ai-card">
            <div class="ai-title">🟨 توقعات البطاقات الصفراء</div>
            <div class="stat-row"><span>متوسط البطاقات:</span> <strong>3.8 بطاقة</strong></div>
        </div>

        <div class="ai-card">
            <div class="ai-title">📋 تشكيلة الفريقين والمستجدات</div>
            <p style="margin: 0; color: #475569; line-height: 1.4;">
                <strong>${home}:</strong> جاهزية تامة وعودة العناصر الأساسية.<br>
                <strong>${away}:</strong> غياب مؤثر في خط الوسط مع اعتماد تكتيك هجومي.
            </p>
        </div>

        <div style="background: #e0f2fe; padding: 10px; border-radius: 8px; color: #0369a1; font-size: 12px;">
            💡 <strong>رأي خبير KELLA:</strong> ${data.aiAdvice}
        </div>
    `;

    modal.style.display = 'flex';
}

function closeModal(e) {
    if (e.target.id === 'aiModal') {
        e.target.style.display = 'none';
    }
}
