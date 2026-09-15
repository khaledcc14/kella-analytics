<!-- قسم تجربة الذكاء الاصطناعي المؤقت -->
<div style="padding: 15px; background: #f4f6f8; margin: 10px; border-radius: 8px; text-align: center;">
    <h3>اختبار خوارزمية التوقعات الذكية</h3>
    <button onclick="runTestPrediction()" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">اختبار مباراة (Real Madrid vs Barcelona)</button>
    <p id="ai-test-result" style="margin-top: 10px; font-weight: bold; color: #333;"></p>
</div>

<script>
    function runTestPrediction() {
        if (window.KellaAI) {
            // بيانات تجريبية للفريقين
            let result = window.KellaAI.analyzeMatch(
                "Real Madrid", 
                "Barcelona", 
                {goalsFor: 14, possession: 54, form: ['W','W','D','W','W']}, 
                {goalsFor: 13, possession: 56, form: ['W','L','W','W','D']}
            );
            
            // عرض النتيجة على الشاشة
            document.getElementById('ai-test-result').innerHTML = `
                ${result.match} <br>
                التوقعات: ريال (${result.prediction["Real Madrid"]}) - برشلونة (${result.prediction["Barcelona"]}) - تعادل (${result.prediction["Draw"]})<br>
                <span style="color: #007bff; font-size: 14px;">${result.aiCommentary}</span>
            `;
        } else {
            alert("تأكد من إضافة ملف ai-predictor.js واستدعائه في الصفحة أولاً!");
        }
    }
</script>
