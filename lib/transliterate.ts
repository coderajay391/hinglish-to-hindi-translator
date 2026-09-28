// Fast client-side rule-based and phonetic transliteration dictionary for instant dynamic typing
// Covers high-frequency Hinglish words, pronouns, verbs, conjunctions, questions, and prefixes/suffixes

const WORD_MAP: Record<string, string> = {
  // Pronouns
  "main": "मैं",
  "mai": "मैं",
  "hum": "हम",
  "ham": "हम",
  "tu": "तू",
  "tum": "तुम",
  "aap": "आप",
  "ap": "आप",
  "yeh": "यह",
  "ye": "यह",
  "voh": "वह",
  "woh": "वह",
  "wo": "वह",
  "vo": "वह",
  "mera": "मेरा",
  "meri": "मेरी",
  "mere": "मेरे",
  "tera": "तेरा",
  "teri": "तेरी",
  "tere": "तेरे",
  "tumhara": "तुम्हारा",
  "tumhari": "तुम्हारी",
  "tumhare": "तुम्हारे",
  "apka": "आपका",
  "aapka": "आपका",
  "aapki": "आपकी",
  "apki": "आपकी",
  "aapke": "आपके",
  "apke": "आपके",
  "iska": "इसका",
  "iski": "इसकी",
  "iske": "इसके",
  "uska": "उसका",
  "uski": "उसकी",
  "uske": "उसके",
  "unka": "उनका",
  "unki": "उनकी",
  "unke": "उनके",
  "inhe": "इन्हें",
  "unhe": "उन्हें",
  "mujhe": "मुझे",
  "tujhe": "तुझे",
  "hume": "हमें",
  "hame": "हमें",
  "hamein": "हमें",
  "apne": "अपने",
  "apna": "अपना",
  "apni": "अपनी",
  "sab": "सब",
  "sabka": "सबका",
  "sabko": "सबको",

  // Auxiliary / Verbs
  "hai": "है",
  "hain": "हैं",
  "ho": "हो",
  "hoon": "हूँ",
  "hun": "हूँ",
  "tha": "था",
  "thi": "थी",
  "the": "थे",
  "hoga": "होगा",
  "hogi": "होगी",
  "honge": "होंगे",
  "raha": "रहा",
  "rahi": "रही",
  "rahe": "रहे",
  "jana": "जाना",
  "jane": "जाने",
  "jani": "जानी",
  "aana": "आना",
  "aane": "आने",
  "karna": "करना",
  "karne": "करने",
  "karta": "करता",
  "karti": "करती",
  "karte": "करते",
  "kar": "कर",
  "karo": "करो",
  "kijiye": "कीजिए",
  "kiya": "किया",
  "kiye": "किए",
  "gaya": "गया",
  "gaye": "गए",
  "gayi": "गई",
  "aaya": "आया",
  "aaye": "आए",
  "aayi": "आई",
  "bolna": "बोलना",
  "bolo": "बोलो",
  "boli": "बोली",
  "likhna": "लिखना",
  "likho": "लिखो",
  "padhna": "पढ़ना",
  "padho": "पढ़ो",
  "samajhna": "समझना",
  "samajh": "समझ",
  "dekhna": "देखना",
  "dekho": "देखो",
  "dekha": "देखा",
  "sunna": "सुनना",
  "suno": "सुनो",
  "dena": "देना",
  "do": "दो",
  "diya": "दिया",
  "lena": "लेना",
  "lo": "लो",
  "liya": "लिया",
  "chahiye": "चाहिए",
  "chahta": "चाहता",
  "chahti": "चाहती",
  "chahte": "चाहते",
  "sakta": "सकता",
  "sakti": "सकती",
  "sakte": "सकते",
  "sakenge": "सकेंगे",
  "paunga": "पाऊँगा",
  "paungi": "पाऊँगी",

  // Question words
  "kya": "क्या",
  "kyun": "क्यों",
  "kyu": "क्यों",
  "kaha": "कहाँ",
  "kahan": "कहाँ",
  "kaise": "कैसे",
  "kaisi": "कैसी",
  "kaisa": "कैसा",
  "kab": "कब",
  "kon": "कौन",
  "kaun": "कौन",
  "kitna": "कितना",
  "kitni": "कितनी",
  "kitne": "कितने",
  "kisko": "किसको",
  "kiska": "किसका",
  "kisne": "किसने",

  // Time & Days
  "aaj": "आज",
  "kal": "कल",
  "parso": "परसों",
  "subah": "सुबह",
  "dopahar": "दोपहर",
  "shaam": "शाम",
  "sham": "शाम",
  "raat": "रात",
  "din": "दिन",
  "abhi": "अभी",
  "ab": "अब",
  "tab": "तब",
  "jab": "जब",
  "kabhi": "कभी",
  "hamesha": "हमेशा",
  "roj": "रोज़",
  "roz": "रोज़",
  "saal": "साल",
  "mahina": "महीना",
  "hafte": "हफ़्ते",
  "samay": "समय",
  "waqt": "वक्त",

  // Common Nouns / Adjectives
  "naam": "नाम",
  "ghar": "घर",
  "paani": "पानी",
  "pani": "पानी",
  "khana": "खाना",
  "kam": "काम",
  "kaam": "काम",
  "dost": "दोस्त",
  "bhai": "भाई",
  "behan": "बहन",
  "baat": "बात",
  "cheez": "चीज़",
  "shahar": "शहर",
  "desh": "देश",
  "gaav": "गाँव",
  "gaon": "गाँव",
  "bhasha": "भाषा",
  "kitab": "किताब",
  "pustak": "पुस्तक",
  "achha": "अच्छा",
  "acha": "अच्छा",
  "achhi": "अच्छी",
  "achi": "अच्छी",
  "achhe": "अच्छे",
  "ache": "अच्छे",
  "bahut": "बहुत",
  "jyada": "ज़्यादा",
  "zyada": "ज़्यादा",
  "thoda": "थोड़ा",
  "kamzor": "कमज़ोर",
  "bada": "बड़ा",
  "badi": "बड़ी",
  "bade": "बड़े",
  "chhota": "छोटा",
  "chhoti": "छोटी",
  "chhote": "छोटे",
  "sahi": "सही",
  "galat": "गलत",
  "sach": "सच",
  "jhooth": "झूठ",
  "khush": "खुश",
  "dukh": "दुख",
  "sundar": "सुंदर",
  "naya": "नया",
  "nayi": "नई",
  "naye": "नए",
  "purana": "पुराना",
  "purani": "पुरानी",
  "purane": "पुराने",
  "mausam": "मौसम",
  "pyar": "प्यार",
  "prem": "प्रेम",
  "shanti": "शांति",
  "kripya": "कृपया",
  "dhanyavad": "धन्यवाद",
  "shukriya": "शुक्रिया",
  "namaste": "नमस्ते",
  "pranam": "प्रणाम",
  "swagat": "स्वागत",
  "alvida": "अलविदा",
  "ha": "हाँ",
  "haan": "हाँ",
  "han": "हाँ",
  "nahi": "नहीं",
  "nahin": "नहीं",
  "na": "ना",
  "mat": "मत",

  // Pure Hindi equivalents for loanwords
  "office": "कार्यालय",
  "daftar": "दफ़्तर",
  "meeting": "बैठक",
  "market": "बाज़ार",
  "bazar": "बाज़ार",
  "news": "समाचार",
  "time": "समय",
  "school": "विद्यालय",
  "hospital": "अस्पताल",
  "doctor": "चिकित्सक",
  "book": "पुस्तक",
  "library": "पुस्तकालय",
  "station": "स्टेशन",
  "train": "रेलगाड़ी",
  "bus": "बस",
  "car": "गाड़ी",
  "problem": "समस्या",
  "answer": "उत्तर",
  "question": "प्रश्न",
  "help": "मदद",
  "work": "कार्य",
  "weather": "मौसम",
  "today": "आज",
  "tomorrow": "कल",
  "yesterday": "कल",
  "friend": "मित्र",
  "morning": "प्रातःकाल",
  "evening": "संध्या",
  "night": "रात्रि",
  "water": "जल",
  "food": "भोजन",

  // Prepositions / Connectors
  "aur": "और",
  "ya": "या",
  "lekin": "लेकिन",
  "par": "पर",
  "pe": "पे",
  "me": "में",
  "mein": "में",
  "se": "से",
  "ko": "को",
  "ke": "के",
  "ki": "की",
  "ka": "का",
  "bhi": "भी",
  "to": "तो",
  "toh": "तो",
  "isliye": "इसलिए",
  "kyunki": "क्योंकि",
  "kyuki": "क्योंकि",
  "agar": "अगर",
  "yadi": "यदि",
  "bina": "बिना",
  "saath": "साथ",
  "sath": "साथ",
  "paas": "पास",
  "dur": "दूर",
  "upar": "ऊपर",
  "niche": "नीचे",
  "aage": "आगे",
  "piche": "पीछे",
  "andar": "अंदर",
  "bahar": "बाहर",
  "taraf": "तरफ़",
  "sirf": "सिर्फ़",
  "keval": "केवल",
};

// Character-by-character phonetic fallback mapping
const CONSONANTS: [string, string][] = [
  ["kya", "क्या"],
  ["khy", "ख्य"],
  ["gya", "ज्ञा"],
  ["tra", "त्र"],
  ["shh", "ष्"],
  ["chh", "छ"],
  ["kh", "ख"],
  ["gh", "घ"],
  ["ch", "च"],
  ["jh", "झ"],
  ["th", "थ"],
  ["dh", "ध"],
  ["ph", "फ"],
  ["bh", "भ"],
  ["sh", "श"],
  ["k", "क"],
  ["g", "ग"],
  ["j", "ज"],
  ["t", "त"],
  ["d", "द"],
  ["n", "न"],
  ["p", "प"],
  ["b", "ब"],
  ["m", "म"],
  ["y", "य"],
  ["r", "र"],
  ["l", "ल"],
  ["v", "व"],
  ["w", "व"],
  ["s", "स"],
  ["h", "ह"],
  ["z", "ज़"],
  ["f", "फ़"],
];

const VOWEL_MATRAS: [string, string][] = [
  ["aa", "ा"],
  ["ai", "ै"],
  ["au", "ौ"],
  ["ee", "ी"],
  ["oo", "ू"],
  ["a", ""],
  ["i", "ि"],
  ["u", "ु"],
  ["e", "े"],
  ["o", "ो"],
];

const INITIAL_VOWELS: [string, string][] = [
  ["aa", "आ"],
  ["ai", "ऐ"],
  ["au", "औ"],
  ["ee", "ई"],
  ["oo", "ऊ"],
  ["a", "अ"],
  ["i", "इ"],
  ["u", "उ"],
  ["e", "ए"],
  ["o", "ओ"],
];

/**
 * Phonetically transliterates a single Romanized Hindi word if not in dictionary
 */
export function transliterateWordPhonetic(rawWord: string): string {
  const word = rawWord.toLowerCase();

  // 1. Direct dictionary match
  if (WORD_MAP[word]) {
    return WORD_MAP[word];
  }

  // 2. Simple Rule-based parser
  let result = "";
  let i = 0;
  const len = word.length;

  while (i < len) {
    // Check initial vowel
    if (i === 0) {
      let matchedVowel = false;
      for (const [rom, dev] of INITIAL_VOWELS) {
        if (word.startsWith(rom, i)) {
          result += dev;
          i += rom.length;
          matchedVowel = true;
          break;
        }
      }
      if (matchedVowel) continue;
    }

    // Match consonants
    let matchedConsonant = false;
    for (const [rom, dev] of CONSONANTS) {
      if (word.startsWith(rom, i)) {
        i += rom.length;
        // Check following vowel matra
        let matchedMatra = false;
        for (const [vRom, vMatra] of VOWEL_MATRAS) {
          if (word.startsWith(vRom, i)) {
            result += dev + vMatra;
            i += vRom.length;
            matchedMatra = true;
            break;
          }
        }
        if (!matchedMatra) {
          // If followed by another consonant or end of word
          if (i >= len) {
            // Hindi words ending without vowel often have inherent 'a' sound dropped or kept
            result += dev;
          } else {
            result += dev + "्";
          }
        }
        matchedConsonant = true;
        break;
      }
    }

    if (!matchedConsonant) {
      // Pass-through or vowel
      let matchedVowel = false;
      for (const [rom, dev] of INITIAL_VOWELS) {
        if (word.startsWith(rom, i)) {
          result += dev;
          i += rom.length;
          matchedVowel = true;
          break;
        }
      }
      if (!matchedVowel) {
        result += word[i];
        i++;
      }
    }
  }

  return result || rawWord;
}

/**
 * Fast client-side instant transliterator for dynamic live typing preview
 */
export function dynamicTransliterate(text: string): string {
  if (!text) return "";

  // Split tokens preserving whitespace and punctuation
  const tokens = text.split(/(\s+|[.,!?;:()[\]{}'"])/);

  return tokens
    .map((token) => {
      // If whitespace or punctuation, return directly
      if (!token || /^\s+$/.test(token) || /^[.,!?;:()[\]{}'"]+$/.test(token)) {
        return token;
      }

      const lower = token.toLowerCase();

      // Check dictionary first
      if (WORD_MAP[lower]) {
        return WORD_MAP[lower];
      }

      // Check numbers
      if (/^\d+$/.test(token)) {
        return token;
      }

      // If already contains Devanagari characters, keep it
      if (/[\u0900-\u097F]/.test(token)) {
        return token;
      }

      // If purely english letters, transliterate phonetically
      if (/^[a-zA-Z]+$/.test(token)) {
        return transliterateWordPhonetic(token);
      }

      return token;
    })
    .join("");
}
