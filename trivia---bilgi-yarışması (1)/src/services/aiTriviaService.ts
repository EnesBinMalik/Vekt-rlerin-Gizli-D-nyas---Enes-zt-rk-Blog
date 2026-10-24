import { GoogleGenAI, Type } from '@google/genai';
import { GameSettings, Question } from '../types/trivia';

export async function generateAITriviaQuestions(
  topic: string,
  settings: GameSettings
): Promise<Question[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('API anahtarı bulunamadı.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const formatText =
    settings.questionType === 'true_false'
      ? 'Tüm sorular Doğru / Yanlış (True / False) formatında olmalıdır. Cevap kesinlikle "Doğru" veya "Yanlış" olmalıdır.'
      : settings.questionType === 'multiple_choice'
      ? 'Tüm sorular 4 şıklı çoktan seçmeli formatta olmalıdır. 4 seçenek (options dizisi) ve 1 kesin doğru cevap (correctAnswer) içermelidir.'
      : 'Sorular Doğru/Yanlış ve Çoktan Seçmeli karışık formatta olabilir.';

  const count = settings.questionCount || 10;

  const prompt = `
Sen profesyonel bir Türkçe Trivia ve Bilgi Yarışması soru yazarısın.
Kullanıcının belirlediği şu özel konuda tam ${count} adet yüksek kaliteli, ilgi çekici, doğruluğu kesin Türkçe trivia sorusu hazırla:
Konu: "${topic}"
Zorluk derecesi: ${settings.difficulty === 'all' ? 'Dengeli (Kolay-Orta-Zor karışık)' : settings.difficulty}
Format Kuralı: ${formatText}

Her soru için:
- Anlaşılır, kaliteli soru cümlesi
- Soru türü ("true_false" veya "multiple_choice")
- Seçenekler (çoktan seçmeliyse 4 şık)
- Kesin doğru cevap
- Kısa, öğretici ve ilginç 1-2 cümlelik açıklama (explanation)
- Kategori ("general", "history", "geography", "science", "cinema_art", "sports", "technology", "literature" değerlerinden biri)
- Zorluk ("easy", "medium", "hard" değerlerinden biri)
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      temperature: 0.7,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['true_false', 'multiple_choice'] },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            category: {
              type: Type.STRING,
              enum: [
                'general',
                'history',
                'geography',
                'science',
                'cinema_art',
                'sports',
                'technology',
                'literature',
              ],
            },
            difficulty: {
              type: Type.STRING,
              enum: ['easy', 'medium', 'hard'],
            },
          },
          required: ['question', 'type', 'correctAnswer', 'explanation', 'category', 'difficulty'],
        },
      },
    },
  });

  const parsedText = response.text?.trim();
  if (!parsedText) {
    throw new Error('Yapay zeka soru üretemedi.');
  }

  const rawQuestions = JSON.parse(parsedText);
  return rawQuestions.map((q: any, index: number) => ({
    id: `ai-${Date.now()}-${index}`,
    question: q.question,
    type: q.type,
    options: q.type === 'multiple_choice' ? q.options : undefined,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || 'Harika bir genel kültür detayı!',
    category: q.category || 'general',
    difficulty: q.difficulty || 'medium',
  }));
}
