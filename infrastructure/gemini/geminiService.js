const { GoogleGenerativeAI } = require("@google/generative-ai");
const QuotesRepository = require("../../application/interfaces/QuotesRepository");

const genAi = new GoogleGenerativeAI("API_KEY");
const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" });

class GeminiApi extends QuotesRepository {
    async getDailyQuotes() {
        const prompt = `Please provide three inspirational quotes for meditation, one for each part of the day: morning, noon, and evening. 
        Return the response in JSON format with the following structure:
        {
            "morningQuote": "Your morning quote here",
            "noonQuote": "Your noon quote here",
            "eveningQuote": "Your evening quote here"
        } return the json only without using keyword json.`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text;
        
        // JSON formatında gelen veriyi parse ederek döndürüyoruz
        try {
            const quotes = JSON.parse(text);
            return quotes;
        } catch (error) {
            console.error("JSON parse hatası: ", error);
            return null;
        }
    }

    async getAdviceByMood(mood) {
        const prompt = `Ruh halin: ${mood}. Bu ruh hali için sana birkaç önerim var: 
        - Eğer kendini iyi hissetmiyorsan, biraz derin nefes alarak rahatlayabilirsin. 
        - Bir yürüyüş yap veya hoşuna giden bir müzik dinle.
        - Egzersiz yapmak ruh halini iyileştirebilir. 
        - Meditasyon yapmayı deneyebilirsin veya sıcak bir duş alabilirsin. 
        - En sevdiğin film veya diziye zaman ayır.
        - Güvendiğin biriyle konuşmak da sana iyi gelebilir.
        So, this mood is: ${mood}.
         Return the response in JSON format, but without using the keyword "json".`;
    
        const result = await model.generateContent(prompt);
        const text = result.response.text;
        return text; // Gelen metni direkt olarak döndürüyoruz
    }
    
}

module.exports = GeminiApi;
