export const bpModeMap = {
  BUSINESS: { 
    label: 'Business Co-Founder', 
    emoji: '💼', 
    color: '#10b981', 
    keywords: ['business','hotel','restaurant','cafe','shop','store','firm','company','trade','food','retail','salon','gym','clinic','medical','pharmacy','bakery','laundry','boutique','supermarket','கடை','தொழில்', 'agency', 'institute', 'parlour'] 
  },
  STARTUP: { 
    label: 'Startup Advisor', 
    emoji: '🚀', 
    color: '#f59e0b', 
    keywords: ['startup','mvp','funding','investor','venture','app idea','scale','unicorn','product','saas','disrupt','innovation','launch','idea validation','seed','pitch'] 
  },
  STUDENT: { 
    label: 'Student Mentor', 
    emoji: '🎓', 
    color: '#06b6d4', 
    keywords: ['student','college','school','project','final year','assignment','thesis','internship','campus','semester','marks','exam','career guidance','fresher','என் project','படிக்கிறேன்'] 
  },
  SOFTWARE: { 
    label: 'Software Architect', 
    emoji: '💻', 
    color: '#8b5cf6', 
    keywords: ['code','coding','software','website','app','web','react','node','python','java','javascript','html','css','api','database','backend','frontend','github','deploy','flutter','android','ios','sql','mongodb','framework'] 
  },
  CAREER: { 
    label: 'Career Coach', 
    emoji: '📈', 
    color: '#ec4899', 
    keywords: ['career','job','interview','resume','cv','salary','promotion','skill','learn','course','certification','linkedin','hire','placement','switch career'] 
  },
  MARKETING: { 
    label: 'Marketing Strategist', 
    emoji: '📣', 
    color: '#f97316', 
    keywords: ['marketing','seo','social media','ads','brand','content','instagram','facebook','campaign','promotion','viral','digital marketing','email marketing','influencer'] 
  },
  INVESTMENT: { 
    label: 'Investment Analyst', 
    emoji: '💰', 
    color: '#eab308', 
    keywords: ['invest','investment','stock','mutual fund','crypto','profit','return','roi','financial','money','wealth','portfolio','savings'] 
  }
};

export const bpQuestions = {
  BUSINESS: [
      { id: 'goal',       field: 'goal',       q_en: "What specific business are you planning to start?" },
      { id: 'location',   field: 'location',   q_en: "Which city and specific area are you targeting?" },
      { id: 'budget',     field: 'budget',     q_en: "What is your estimated investment budget?" },
      { id: 'audience',   field: 'audience',   q_en: "Who is your primary target customer?" },
      { id: 'competition',field: 'competition',q_en: "How would you describe the competition in your chosen location? (High, Medium, Low)" },
      { id: 'staff',      field: 'staff',      q_en: "How many staff members do you plan to hire initially?" },
      { id: 'equipment',  field: 'equipment',  q_en: "Do you have the necessary equipment ready?" },
      { id: 'marketing',  field: 'marketing',  q_en: "How do you plan to market your business?" },
      { id: 'timeline',   field: 'timeline',   q_en: "When is your expected launch date?" },
      { id: 'experience', field: 'experience', q_en: "Finally, do you have any prior experience in this field?" }
  ],
  GENERAL: [ 
    { id: 'goal', field: 'goal', q_en: "I'd love to help. Could you share a bit more about what you're trying to achieve?" } 
  ]
};
