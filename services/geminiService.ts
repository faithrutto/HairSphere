import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert Hair Consultant and Tricologist for the app "HairSphere".
Your goal is to help users understand their hair type (Type 1-4, porosity, density) and suggest routines.
You should be encouraging, scientific but accessible, and focused on hair health.
If a user describes their hair, analyze it and give a classification.
Keep responses concise and formatted for a chat interface.
`;

const getApiKey = (): string | undefined => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return undefined;
  }
};

export const getHairAdvice = async (userPrompt: string): Promise<string> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    // Simulate network delay for realism in demo mode
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateMockResponse(userPrompt);
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the hair knowledge database right now. Please try again later.";
  }
};

// Fallback logic for when no API key is present
const generateMockResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();
  
  if (p.includes('dry') || p.includes('brittle') || p.includes('frizzy')) {
    return "It sounds like your hair needs a moisture boost! \n\n**Recommendation:**\n1. **Deep Condition**: Use a honey or aloe-based mask weekly.\n2. **LOC Method**: Apply Liquid, Oil, then Cream to seal hydration.\n3. **Check Porosity**: If water absorbs instantly, you have high porosity hair—seal with heavier butters like shea.";
  }
  
  if (p.includes('growth') || p.includes('long') || p.includes('length')) {
    return "To maximize growth, focus on length retention:\n\n1. **Scalp Massage**: Stimulate blood flow for 5 mins daily using rosemary oil.\n2. **Protective Styles**: Keep ends tucked away to reduce friction.\n3. **Trim**: Dusting split ends every 8-12 weeks prevents breakage from traveling up the shaft.";
  }

  if (p.includes('oily') || p.includes('greasy')) {
    return "For oily hair or scalp:\n\n1. **Clarify**: Use a clarifying shampoo bi-weekly to remove product buildup.\n2. **Product Placement**: Apply oils/creams only from mid-length to ends, avoiding the scalp.\n3. **Apple Cider Vinegar**: A diluted rinse can help balance scalp pH.";
  }

  if (p.includes('dandruff') || p.includes('itchy')) {
      return "Scalp health is the foundation of hair growth!\n\n1. **Exfoliate**: Use a gentle scalp scrub to remove dead skin.\n2. **Tea Tree Oil**: Look for products with tea tree oil for its antifungal properties.\n3. **Hydrate**: Ensure you aren't scratching, which can damage follicles.";
  }

  return "I'm your HairSphere AI assistant! (Demo Mode)\n\nSince I'm running in demo mode (no API key detected), I can give you simulated advice. Try asking about **dryness**, **growth**, or **breakage**!";
};