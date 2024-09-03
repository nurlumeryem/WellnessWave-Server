const { GoogleGenerativeAI } = require("@google/generative-ai");
const QuotesRepository = require("../../application/interfaces/QuotesRepository");

const genAi = new GoogleGenerativeAI("AIzaSyBFNYtqisfhA4cDEj9ymterq_MA7Ka7ZcU");
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiApi extends QuotesRepository {
    async getDailyQuotes() {
        const prompt = `Please provide three inspirational quotes for meditation, one for each part of the day: morning, noon, and evening. 
        Return the response in JSON format with the following structure:
        {
            "morningQuote": "Your morning quote here",
            "noonQuote": "Your noon quote here",
            "eveningQuote": "Your evening quote here"
        } Return the JSON only without using the keyword "json".`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }

    async getAdviceByMood(mood) {
        let prompt;

        switch (mood.toLowerCase()) {
            case 'mutlu':
                prompt = `Mutlu olduğuna sevindim! Bu ruh halini korumak için:
                - Yeni bir şeyler deneyebilir ve kendini ödüllendirebilirsin.
                - Sevdiğin insanlarla vakit geçir.
                - Dışarı çıkıp güzel bir yürüyüş yap.
                - Yaratıcı bir şeyler yap, belki resim çiz veya yazı yaz.`;
                break;
            case 'sakin':
                prompt = `Sakin bir ruh hali içinde olmak huzur verici! Bu anı daha da derinleştirmek için:
                - Meditasyon yaparak sakinliğini pekiştirebilirsin.
                - Sessiz bir yerde kitap oku veya doğayı dinle.
                - Hafif bir yoga seansı yaparak bedenini rahatlat.`;
                break;
            case 'rahat':
                prompt = `Rahat olmak güzel bir duygu! Bu hissi devam ettirmek için:
                - Sıcak bir içecek al ve en sevdiğin köşede keyfini çıkar.
                - Hafif bir müzik aç ve biraz meditasyon yap.
                - Derin nefes alarak tüm negatif enerjiyi bırak.`;
                break;
            case 'odaklan':
                prompt = `Odaklanmış olman harika! Bu durumu en iyi şekilde kullanmak için:
                - Yapılacaklar listeni gözden geçir ve en önemli görevlerle başla.
                - Kısa molalar vererek enerjini yüksek tut.
                - Sessiz bir ortamda çalışmayı tercih et.
                - Odaklanmanı bozacak şeylerden uzak dur.`;
                break;
            default:
                prompt = `Bu ruh hali için sana birkaç önerim var: 
                - Eğer kendini iyi hissetmiyorsan, biraz derin nefes alarak rahatlayabilirsin. 
                - Bir yürüyüş yap veya hoşuna giden bir müzik dinle.
                - Egzersiz yapmak ruh halini iyileştirebilir. 
                - Meditasyon yapmayı deneyebilirsin veya sıcak bir duş alabilirsin. 
                - En sevdiğin film veya diziye zaman ayır.
                - Güvendiğin biriyle konuşmak da sana iyi gelebilir.`;
                break;
        }

        prompt += ` So, this mood is: ${mood}.
        Return the response in JSON format, but without using the keyword "json".`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }
}

module.exports = GeminiApi;
