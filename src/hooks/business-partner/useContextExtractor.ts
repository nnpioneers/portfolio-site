import { BPContext } from '@/store/bpStore';

export function useContextExtractor() {
  const extractContext = (text: string, currentCtx: BPContext) => {
    const lower = text.toLowerCase();
    const isUpdate = /change|update|instead|actually|modify|replace|wrong/i.test(lower);
    const updates: Array<{field: string, old: string | null, new: string}> = [];
    
    const newFields: Partial<BPContext> = {};

    const trySet = (field: keyof BPContext, value: string, label: string) => {
      if (!value) return;
      if (!currentCtx[field] || isUpdate) {
        if (currentCtx[field] && (currentCtx[field] as string).toLowerCase() !== value.toLowerCase()) {
          updates.push({ field: label, old: currentCtx[field] as string, new: value });
          
          if (field === 'location') newFields.locationAnalyzed = false;
          if (field === 'budget') newFields.financeAnalyzed = false;
          newFields.strategyAnalyzed = false; 
        }
        (newFields as any)[field] = value;
      }
    };

    // Budget
    const budgetMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)\s*(?:lakhs?|lakh|l|crore|cr|k|thousand)/i) || text.match(/budget\s*(?:is|=|:)?\s*(.+)/i);
    if (budgetMatch) {
      let cleanBudget = budgetMatch[0].replace(/budget\s*(is|=|:)?\s*/i, '').trim();
      cleanBudget = cleanBudget.replace(/lakhs?/i, 'Lakhs');
      trySet('budget', cleanBudget, 'Budget');
    }

    // Location
    const locMatch = text.match(/(?:in|at|near|from|for)\s+([A-Z][a-zA-Z\s]{2,20}(?:,\s*[A-Z][a-zA-Z]+)?)/);
    if (locMatch) {
      trySet('location', locMatch[1].trim(), 'Location');
    } else {
      const cities = ['chennai','coimbatore','madurai','trichy','salem','erode','tirupur','vellore','cuddalore','bangalore','mumbai','delhi','hyderabad','kolkata','pune','kochi','trivandrum'];
      cities.forEach(city => {
        if (lower.includes(city)) trySet('location', city.charAt(0).toUpperCase() + city.slice(1), 'Location');
      });
    }

    // Experience
    if (/beginner|fresher|new to|never|first time|no experience/i.test(text)) trySet('experience', 'Beginner', 'Experience');
    else if (/\d+\s*years?\s*(?:of\s*)?experience/i.test(text)) {
      const match = text.match(/\d+\s*years?\s*(?:of\s*)?experience/i);
      if (match) trySet('experience', match[0], 'Experience');
    }
    else if (/experienced|expert|professional|senior/i.test(text)) trySet('experience', 'Experienced', 'Experience');

    // Timeline
    const tlMatch = text.match(/(?:in|within|by)\s+(\d+\s*(?:days?|weeks?|months?|years?))/i) || text.match(/(?:\d+\s*(?:days?|weeks?|months?|years?))/i);
    if (tlMatch) trySet('timeline', tlMatch[0].trim(), 'Timeline');

    // Audience
    if (/college student|teens?|youth|young/i.test(text)) trySet('audience', 'Youth / Students', 'Target Audience');
    else if (/family|families/i.test(text)) trySet('audience', 'Families', 'Target Audience');
    else if (/women|ladies|female/i.test(text)) trySet('audience', 'Women', 'Target Audience');
    else if (/professional|corporate|b2b/i.test(text)) trySet('audience', 'Professionals / B2B', 'Target Audience');
    else if (/general|everyone|all/i.test(text)) trySet('audience', 'General public', 'Target Audience');
    
    // Competition
    if (/high competition|very competitive|lot of/i.test(text)) trySet('competition', 'High', 'Competition');
    else if (/no competition|new market|blue ocean/i.test(text)) trySet('competition', 'Low', 'Competition');
    else if (/some competition|average/i.test(text)) trySet('competition', 'Medium', 'Competition');
    
    // Staff
    const staffMatch = text.match(/(\d+)\s*(?:staff|employees|workers|people)/i);
    if (staffMatch) trySet('staff', staffMatch[1] + ' employees', 'Staff Planning');
    else if (/myself|alone|solo/i.test(text)) trySet('staff', 'Solo / Owner managed', 'Staff Planning');
    
    // Equipment
    if (/machines|equipment|computers|ovens|furniture/i.test(text)) trySet('equipment', 'Required', 'Equipment');
    else if (/software only|service based|no equipment/i.test(text)) trySet('equipment', 'Minimal', 'Equipment');
    
    // Marketing
    if (/instagram|facebook|social media|online/i.test(text)) trySet('marketing', 'Digital Focus', 'Marketing Strategy');
    else if (/flyers|posters|local ads|newspaper/i.test(text)) trySet('marketing', 'Local / Offline Focus', 'Marketing Strategy');
    else if (/word of mouth/i.test(text)) trySet('marketing', 'Word of Mouth', 'Marketing Strategy');

    // Goal extraction if none exists
    if (!currentCtx.goal && (currentCtx.mode || newFields.mode)) {
      const goalPhrases = ['want to','planning to','trying to','need to','help me','i have an idea','building','create','start','open','setup'];
      goalPhrases.forEach(p => {
        const idx = lower.indexOf(p);
        if (idx !== -1 && !currentCtx.goal && !newFields.goal) {
          newFields.goal = text.substring(idx, idx + 60).trim();
        }
      });
      if (!currentCtx.goal && !newFields.goal) {
        newFields.goal = text.substring(0, 60).trim();
      }
    }

    return { updates, newFields };
  };

  return { extractContext };
}
