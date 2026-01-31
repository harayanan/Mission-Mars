// ================================================================
// MISSION MARS V3 — GAME DATA
// Deep financial literacy content with gamification
// ================================================================

const GAME_CONFIG = {
  totalChallenges: 8,
  maxScore: 1200,
  waterStart: 10,
  missionDays: 10,
  quizTimeLimit: 20, // seconds
  badgeCount: 12,
};

const AVATARS = [
  {id:'astro-f', emoji:'👩‍🚀', label:'Commander'},
  {id:'astro-m', emoji:'👨‍🚀', label:'Captain'},
  {id:'astro-n', emoji:'🧑‍🚀', label:'Pilot'},
  {id:'alien', emoji:'👾', label:'Explorer'},
  {id:'robot', emoji:'🤖', label:'Navigator'},
  {id:'ufo', emoji:'🛸', label:'Voyager'},
];

// ===== BADGES (unlockable achievements) =====
const BADGES = [
  {id:'first-step', name:'First Step', icon:'👣', desc:'Complete your first challenge', condition: g => Object.keys(g.answers).length >= 1},
  {id:'budgeteer', name:'Budget Master', icon:'📋', desc:'Score 100+ on the budgeting challenge', condition: g => (g.challengeScores?.ch1 || 0) >= 100},
  {id:'independent', name:'Independent Thinker', icon:'🧠', desc:'Resist peer pressure', condition: g => g.answers?.ch2 === 'stick' || g.answers?.ch2 === 'extra'},
  {id:'insured', name:'Safety First', icon:'🛡️', desc:'Choose to keep the space dog', condition: g => g.answers?.ch3 === 'yes'},
  {id:'scam-detector', name:'Scam Detector', icon:'🔍', desc:'Avoid or investigate the scam', condition: g => g.answers?.ch4 === 'avoid' || g.answers?.ch4 === 'investigate'},
  {id:'investor', name:'Smart Investor', icon:'📈', desc:'Choose balanced investing', condition: g => g.answers?.ch5 === 'split'},
  {id:'diversifier', name:'Diversification Pro', icon:'🎯', desc:'Pick 5+ industries in mutual fund challenge', condition: g => (g.answers?.ch6?.length || 0) >= 5},
  {id:'compound-king', name:'Compound King', icon:'🌳', desc:'Correctly predict the compounding result', condition: g => g.answers?.ch7 === 'yes'},
  {id:'sip-champion', name:'SIP Champion', icon:'📅', desc:'Choose SIP as your strategy', condition: g => g.answers?.ch8 === 'sip'},
  {id:'quiz-ace', name:'Quiz Ace', icon:'🏅', desc:'Answer 5+ quizzes correctly', condition: g => Object.values(g.quizResults || {}).filter(r => r).length >= 5},
  {id:'perfect-quiz', name:'Perfect Score', icon:'💯', desc:'Get all 8 quizzes right', condition: g => Object.values(g.quizResults || {}).filter(r => r).length >= 8},
  {id:'mission-complete', name:'Mission Complete', icon:'🚀', desc:'Finish all 8 challenges', condition: g => Object.keys(g.answers).length >= 8},
];

// ===== NEEDS VS WANTS MINI-GAME DATA =====
const NEEDS_VS_WANTS = [
  {item:'Water purifier', icon:'💧', answer:'need'},
  {item:'Gaming console', icon:'🎮', answer:'want'},
  {item:'School textbooks', icon:'📚', answer:'need'},
  {item:'Designer sneakers', icon:'👟', answer:'want'},
  {item:'Nutritious food', icon:'🥗', answer:'need'},
  {item:'Movie tickets', icon:'🎬', answer:'want'},
  {item:'Medicine', icon:'💊', answer:'need'},
  {item:'Latest smartphone', icon:'📱', answer:'want'},
  {item:'Warm clothing', icon:'🧥', answer:'need'},
  {item:'Fancy restaurant dinner', icon:'🍽️', answer:'want'},
  {item:'Electricity bill', icon:'⚡', answer:'need'},
  {item:'Subscription streaming', icon:'📺', answer:'want'},
];

// ===== INFLATION TIMELINE DATA =====
const INFLATION_EXAMPLES = [
  {item:'Cup of tea', year1990:'₹2', year2000:'₹5', year2010:'₹10', year2024:'₹20', icon:'☕'},
  {item:'Movie ticket', year1990:'₹10', year2000:'₹50', year2010:'₹150', year2024:'₹300', icon:'🎬'},
  {item:'1L Petrol', year1990:'₹12', year2000:'₹28', year2010:'₹55', year2024:'₹105', icon:'⛽'},
  {item:'Gold (10g)', year1990:'₹3,200', year2000:'₹4,400', year2010:'₹18,500', year2024:'₹73,000', icon:'✨'},
];

// ===== SIP COMPARISON DATA =====
const SIP_SCENARIOS = {
  monthly: 500,
  rate: 12,
  milestones: [
    {years:5, invested:30000, value:41243},
    {years:10, invested:60000, value:116170},
    {years:15, invested:90000, value:250458},
    {years:20, invested:120000, value:499574},
    {years:25, invested:150000, value:947033},
    {years:30, invested:180000, value:1764957},
    {years:35, invested:210000, value:3247354},
    {years:40, invested:240000, value:5929090},
    {years:45, invested:270000, value:10793880},
  ],
  earlyVsLate: {
    early: {startAge:15, stopAge:25, monthlyInvest:1000, totalInvested:120000, valueAt60:'₹1.6 Crore'},
    late: {startAge:30, monthlyInvest:5000, totalInvested:1800000, valueAt60:'₹1.76 Crore'},
    punchline: 'Investing ₹1,000/month for just 10 years starting at 15 gives nearly the SAME result as investing ₹5,000/month for 30 years starting at 30!'
  }
};

// ===== STOCK MARKET CRASH SCENARIOS (for emotion challenge) =====
const MARKET_SCENARIOS = [
  {year:'2008', event:'Global Financial Crisis', drop:'-60%', recovery:'Recovered by 2013 — then grew 3x by 2024', lesson:'Those who stayed invested recovered everything and made huge profits. Those who panic-sold locked in losses.'},
  {year:'2020', event:'COVID-19 Crash', drop:'-38% in 1 month', recovery:'Recovered in just 5 months — then hit all-time highs', lesson:'The fastest crash AND fastest recovery in history. Investors who panicked missed one of the greatest comebacks ever.'},
  {year:'2015-16', event:'China Slowdown + Demonetization', drop:'-22%', recovery:'Recovered within 18 months', lesson:'Short-term drops are normal. The market has ALWAYS recovered over time.'},
];

// ===== BONUS FACTS (expanded) =====
const BONUS_FACTS = [
  {fact:'Warren Buffett bought his first stock at age 11. He now says he wishes he had started even earlier!', source:'Warren Buffett'},
  {fact:'The Rule of 72: Divide 72 by your annual return to find how many years it takes to double your money. At 12%, that\'s just 6 years!', source:'Finance Rule'},
  {fact:'Albert Einstein reportedly called compound interest "the eighth wonder of the world."', source:'Albert Einstein (attributed)'},
  {fact:'The BSE Sensex grew from 100 in 1979 to over 73,000 in 2024 — that\'s 730x in 45 years!', source:'BSE India'},
  {fact:'A ₹500/month SIP started at age 15 could grow to over ₹1 crore by age 55, assuming 12% annual returns.', source:'SIP Calculator'},
  {fact:'Only 27% of Indians are financially literate according to the S&P Global Financial Literacy Survey.', source:'S&P Global'},
  {fact:'India\'s CPI inflation averaged about 6% per year. That means prices roughly double every 12 years!', source:'RBI Data'},
  {fact:'A mutual fund SIP of ₹10,000/month for 30 years at 12% could become approximately ₹3.5 crore!', source:'Compounding Math'},
  {fact:'Rakesh Jhunjhunwala turned ₹5,000 into ₹50,000 crore through patient long-term stock investing.', source:'Market Legend'},
  {fact:'The biggest risk in investing is NOT investing at all — inflation silently eats your money\'s purchasing power every year.', source:'Financial Wisdom'},
  {fact:'In India, you can start a mutual fund SIP with as little as ₹500 per month. No excuse not to begin!', source:'SEBI Guidelines'},
  {fact:'If you had invested ₹1 lakh in Sensex in 2003, it would be worth over ₹15 lakh by 2023 — 15x returns!', source:'BSE Data'},
  {fact:'Government schemes like Sukanya Samriddhi Yojana offer 8%+ returns with complete safety for girls\' education.', source:'Govt of India'},
  {fact:'The average Indian saves about 30% of their income, but most keep it in savings accounts earning only 3-4%.', source:'RBI Survey'},
  {fact:'A ₹10 chips packet in 2005 costs ₹20 today. That\'s inflation at work!', source:'Real Life'},
];

// ===== MAIN PHASES =====
const PHASES = [
  // --- PHASE 0: LANDING (handled by engine) ---

  // --- PHASE 1: ONBOARDING ---
  {
    id: 'briefing',
    type: 'story',
    screens: [
      {
        title: 'Welcome to Mission Mars!',
        icon: '🌍',
        blocks: [
          {type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Welcome, <strong>{name}</strong>! You have been selected from thousands of candidates for humanity\'s greatest adventure — a <strong>10-day mission to Mars</strong>.'},
          {type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'But this isn\'t just any space mission. On Mars, you\'ll face challenges that will test your <strong>survival skills</strong> — and teach you the most important life skill that schools don\'t teach: <strong>how to manage MONEY</strong>.'},
          {type:'card', icon:'💧', title:'Water = Money', text:'On Mars, <span class="hl">water is your currency</span>. Every bottle of water represents money. Every decision you make about water mirrors real-life financial choices.<br><br>Manage it well → you thrive.<br>Waste it → you struggle.'},
        ]
      },
      {
        title: 'Why Learn About Money?',
        icon: '🎓',
        blocks: [
          {type:'card', icon:'📚', title:'The Missing Subject', text:'School teaches you math, science, English, history... but <span class="hl">not how to manage money</span>. Yet money affects every single day of your life.'},
          {type:'card', icon:'📊', title:'The Shocking Reality', text:'Only <span class="hl">27% of Indians</span> are financially literate (S&P Global Survey). That means <span class="hl" style="color:#ef5350">73% of people</span> don\'t understand basic money concepts — and they pay for it their whole lives through bad decisions, debt, and missed opportunities.'},
          {type:'card', icon:'🚀', title:'Your Superpower', text:'By the end of this mission, you\'ll understand <span class="hl">8 critical financial concepts</span>. You\'ll know more about money than most adults. That\'s your unfair advantage in life.'},
        ]
      },
      {
        title: 'Mission Parameters',
        icon: '📋',
        blocks: [
          {type:'stat-grid', stats:[
            {value:'10', label:'Days on Mars'},
            {value:'2/day', label:'Water (Days 1-5)'},
            {value:'0/day', label:'Water (Days 6-10)'},
            {value:'10', label:'Total Bottles'},
          ]},
          {type:'card', icon:'🏆', title:'How Scoring Works', text:'<span class="hl">Challenge Points</span> — earn up to 130 pts per challenge based on your decisions<br><br><span class="hl-blue">Quiz Bonus</span> — earn 20-30 bonus pts per quiz<br><br><span class="hl-green">Badges</span> — unlock 12 achievement badges<br><br><span class="hl">Mini-Games</span> — earn bonus pts through interactive exercises'},
          {type:'card', icon:'🤝', title:'Rule #1: Teamwork', text:'In space, <span class="hl">teamwork is key to survival</span>. If playing with others, discuss your answers! Different perspectives lead to better decisions — just like in real investing.'},
          {type:'narrative', speaker:'AI Companion — NOVA', speakerClass:'speaker-ai', text:'I\'m NOVA, your AI mission companion. I\'ll guide you through each challenge, reveal the real-world money lessons, and quiz you along the way. Let\'s make you financially unstoppable! 🚀'},
        ]
      }
    ]
  },

  // --- CHALLENGE 1: BUDGETING ---
  {
    id: 'ch1',
    type: 'challenge',
    badge: 'Challenge 1 of 8',
    title: 'Water Budgeting',
    day: '1',
    badgeId: 'budgeteer',
    miniGame: 'needsVsWants',
    concept: 'Budgeting',
    intro: {
      icon: '🧊',
      blocks: [
        {type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Commander {name}, you\'ve landed on Mars! Welcome to the Space Station. Your 10-day survival starts NOW.'},
        {type:'card', icon:'💧', title:'Your Water Supply', text:'You\'ll receive <span class="hl">2 bottles per day for the first 5 days</span> = 10 bottles total.<br><br>For the <span class="hl" style="color:#ef5350">remaining 5 days, you get NOTHING</span>.<br><br>You must make 10 bottles last 10 days.'},
        {type:'bottle-viz', config:{total:10, filled:10, label:'Your 10 water bottles for the entire mission'}},
        {type:'day-timeline', days:10, supplyDays:5},
      ]
    },
    preGame: {
      type: 'needs-vs-wants',
      title: 'Quick Warm-Up: Needs vs. Wants!',
      subtitle: 'Before we budget water, let\'s see if you can tell the difference between things you NEED and things you WANT. Swipe or tap to sort!',
      items: 6, // use first 6 from NEEDS_VS_WANTS
      pointsPer: 5,
    },
    interaction: {
      type: 'slider',
      question: 'How many bottles will you drink each day to survive all 10 days?',
      min: 0.5, max: 2.5, step: 0.5, default: 1,
      unit: 'bottles per day',
      showBottleViz: true,
    },
    evaluate(val) {
      const daysLast = Math.floor(10 / val);
      if (val <= 1) return {
        score: 130, grade: 'good', icon: '🌟', title: 'Master Budget Planner!', badgeEarned: true,
        text: `At ${val} bottle(s)/day, your 10 bottles last all ${daysLast} days! Every day is covered. You planned perfectly.`,
        lessonTitle: 'Budgeting — The Foundation of All Financial Health',
        lesson: `<strong>Budgeting</strong> means planning how to use your money BEFORE you spend it.<br><br><strong>The 50/30/20 Rule:</strong><br>• <strong>50%</strong> on NEEDS (rent, food, transport, bills)<br>• <strong>30%</strong> on WANTS (entertainment, dining out, shopping)<br>• <strong>20%</strong> on SAVINGS & INVESTMENTS<br><br>If you earn ₹10,000 → save at least ₹2,000. If you get ₹500 pocket money → save ₹100.<br><br><strong>The key principle:</strong> Income − Savings = Expenses (NOT Income − Expenses = Savings). Save FIRST, then spend what's left.`,
        realworld: `Imagine you get ₹2,000 pocket money per month. Using the 50/30/20 rule:<br>• ₹1,000 for needs (school supplies, transport)<br>• ₹600 for wants (snacks, games, movies)<br>• ₹400 for savings<br><br>That ₹400/month = ₹4,800/year. In a mutual fund SIP at 12%, that becomes ₹9,000+ in 5 years!`
      };
      if (val <= 1.5) return {
        score: 70, grade: 'warn', icon: '😅', title: 'Close But Not Quite!',
        text: `At ${val} bottles/day, you run out by day ${daysLast}. That's ${10-daysLast} days without water!`,
        lessonTitle: 'Budgeting — Why "Almost" Isn\'t Good Enough',
        lesson: `Running out even 1-2 days early can be disastrous. In real life, running out of money before your next paycheck means taking loans, paying interest, and starting the next month in debt — a vicious cycle.<br><br><strong>Always budget for the FULL period</strong>, with a buffer for emergencies.`,
        realworld: `Many adults live "paycheck to paycheck" — they run out of money before the next salary. A 2024 survey found that 60% of Indian millennials have less than 3 months of expenses saved. Don't be that statistic!`
      };
      return {
        score: 25, grade: 'bad', icon: '😰', title: 'Budget Crisis!',
        text: `At ${val} bottles/day, you're out by day ${daysLast}! ${10-daysLast} days with zero water. This is a survival emergency.`,
        lessonTitle: 'Overspending = Financial Danger',
        lesson: `Spending too much too early is the #1 financial mistake worldwide. Without budgeting, people spend freely at first and then face a crisis.<br><br>This leads to: borrowing money → paying interest → having even less money → borrowing more. It's called the <strong>debt trap</strong>.`,
        realworld: `Credit card debt in India crossed ₹2 lakh crore in 2024. Many people use credit cards to overspend, then pay 36-42% annual interest! A ₹10,000 credit card bill can become ₹14,000 in one year if unpaid. Budget FIRST, spend SECOND.`
      };
    },
    quiz: {
      question: 'What is the 50/30/20 budgeting rule?',
      timeLimit: 20,
      choices: [
        {id:'a', text:'50% needs, 30% wants, 20% savings', correct:true},
        {id:'b', text:'50% savings, 30% needs, 20% wants', correct:false},
        {id:'c', text:'50% wants, 30% savings, 20% needs', correct:false},
        {id:'d', text:'Spend 50%, give 30%, invest 20%', correct:false},
      ],
      explanation: 'The 50/30/20 rule: 50% on needs (essentials), 30% on wants (lifestyle), and 20% on savings & investments. This is the simplest budgeting framework and works for any income level — even pocket money!'
    }
  },

  // --- CHALLENGE 2: PEER PRESSURE ---
  {
    id: 'ch2',
    type: 'challenge',
    badge: 'Challenge 2 of 8',
    title: 'Peer Pressure on Mars',
    day: '3',
    badgeId: 'independent',
    concept: 'Financial Discipline',
    intro: {
      icon: '👫',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'Day 3 on Mars. You\'ve been doing well with your plan. But I\'m detecting some social pressure incoming...'},
        {type:'card', icon:'🥳', title:'The "Cool" Kids', text:'Some kids at the station are drinking <span class="hl">3-4 bottles per day</span>! They\'re even <span class="hl">wasting water</span> — splashing it, leaving bottles open, showing off.'},
        {type:'dialogue', bubbles:[
          {side:'left', label:'Cool Kid #1', labelClass:'bubble-label-ai', text:'Why are you being so boring with water? Live a little! We\'re on MARS! 🎉'},
          {side:'left', label:'Cool Kid #2', labelClass:'bubble-label-ai', text:'I\'m drinking 4 bottles a day. You only live once, right?'},
          {side:'left', label:'Cool Kid #3', labelClass:'bubble-label-ai', text:'Don\'t be the weird one saving water. Come hang with us!'},
          {side:'right', label:'{name} (thinking)', labelClass:'bubble-label-player', text:'They seem to be having more fun... but my plan says 1 per day. What should I do? 🤔'},
        ]},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'The cool kids want you to drink more. What will you do?',
      choices: [
        {id:'stick', emoji:'🧠', title:'Stick to my plan', desc:'1 bottle/day, no matter what others say'},
        {id:'slight', emoji:'😊', title:'Slightly increase', desc:'1.5 bottles/day — treat myself a bit'},
        {id:'match', emoji:'🎉', title:'Match the cool kids', desc:'3-4 bottles/day — YOLO!'},
        {id:'extra', emoji:'🛡️', title:'Save even MORE', desc:'Cut to 0.5/day — build emergency reserves'},
      ]
    },
    evaluate(val) {
      if (val === 'stick') return {
        score: 130, grade: 'good', icon: '🧠', title: 'Rock Solid Discipline!', badgeEarned: true,
        text: 'You stuck to YOUR plan. By Day 7, the "cool kids" are desperate — begging others for water. Meanwhile, you\'re comfortable with plenty of supply.',
        lessonTitle: 'Follow Your Own Financial Plan — Always',
        lesson: `<strong>Peer pressure</strong> is the #1 reason teenagers and young adults overspend. Studies show that social media makes it worse — seeing friends\' expensive purchases, trips, and lifestyles creates "FOMO" (Fear of Missing Out).<br><br><strong>The truth:</strong><br>• The people who LOOK rich are often the ones with the most <strong>debt</strong><br>• Real wealth is invisible — it\'s in investments, not flashy purchases<br>• Your financial situation is <strong>unique</strong> — what works for others may bankrupt you<br><br>The book "The Millionaire Next Door" found that most millionaires live modestly and avoid showing off.`,
        realworld: `A teenager sees friends buying ₹5,000 sneakers and feels pressure to match them. But those friends might be spending their parents\' money or going into debt. <strong>You don\'t know someone\'s financial reality from their spending.</strong><br><br>Warren Buffett, worth $120 billion, still lives in the same house he bought in 1958 for $31,500. Rich people stay rich by not wasting money to impress others.`
      };
      if (val === 'extra') return {
        score: 110, grade: 'good', icon: '🛡️', title: 'Emergency Fund Builder!', badgeEarned: true,
        text: 'Not only did you resist pressure, you built reserves! When a water tank leaked on Day 8, your extra bottles saved your entire team. Hero!',
        lessonTitle: 'The Emergency Fund — Your Financial Safety Net',
        lesson: `An <strong>Emergency Fund</strong> = 3-6 months of expenses kept in a safe, liquid place. It protects you from:<br>• Job loss<br>• Medical emergencies<br>• Car/bike breakdown<br>• Unexpected family expenses<br><br><strong>Rule:</strong> Build your emergency fund BEFORE investing. Keep it in a savings account or liquid fund — easy to access when needed.`,
        realworld: `COVID-19 showed why emergency funds matter. Millions lost jobs overnight. Those with 6 months savings survived. Those without went into debt.<br><br>Even as a student: save 3 months of your typical expenses. If you spend ₹3,000/month, keep ₹9,000 as an emergency fund.`
      };
      if (val === 'slight') return {
        score: 50, grade: 'warn', icon: '😬', title: 'Soft Pressure Got You!',
        text: 'At 1.5 bottles/day, you run out by Day 6. The last 4 days are rough. The cool kids? They ran out on Day 3!',
        lessonTitle: 'Lifestyle Inflation — The Silent Wealth Killer',
        lesson: `<strong>Lifestyle inflation</strong> = spending MORE every time you earn MORE (or feel pressured to). It\'s why many high-earners are still broke.<br><br>You got a raise? Buy a bigger car. Friends got iPhones? Get one too. This creep never stops unless you consciously fight it.<br><br><strong>Fix:</strong> Every time your income grows, save the increase first. Got ₹1,000 more pocket money? Save ₹700, spend ₹300.`,
        realworld: `A software engineer earning ₹25 lakh/year can be broke if they spend ₹24 lakh on rent, car EMI, eating out, and gadgets. Meanwhile, a teacher earning ₹6 lakh who saves ₹1.5 lakh/year will be wealthier in 20 years. It\'s not what you earn — it\'s what you KEEP.`
      };
      return {
        score: 10, grade: 'bad', icon: '💸', title: 'Herd Mentality Trap!',
        text: 'You matched the cool kids at 3-4 bottles/day and ran dry by Day 3! They ran out too. Now EVERYONE is struggling.',
        lessonTitle: 'Herd Mentality = Financial Disaster',
        lesson: `<strong>Herd mentality</strong> means doing what everyone else does without thinking. In finance, this causes:<br>• <strong>Market bubbles</strong> (everyone buys → prices inflate → crash)<br>• <strong>Panic selling</strong> (everyone sells → prices crash → you lose)<br>• <strong>Lifestyle debt</strong> (everyone spends → you overspend → debt)<br><br>The 2008 global crash happened because everyone copied each other\'s risky bets.`,
        realworld: `Remember when everyone was buying cryptocurrency in 2021? Bitcoin went from ₹25 lakh to ₹50 lakh. People who bought at the peak lost 70% when it crashed. Those who followed the herd got burned. Independent thinkers who researched first made better decisions.`
      };
    },
    quiz: {
      question: 'Your friend just bought a ₹50,000 phone on EMI. She says "You should get one too!" What\'s the smartest response?',
      timeLimit: 20,
      choices: [
        {id:'a', text:'Buy it on EMI — easy monthly payments!', correct:false},
        {id:'b', text:'Check MY budget. If I want it, I\'ll SAVE for it first.', correct:true},
        {id:'c', text:'Ask parents to buy it immediately', correct:false},
        {id:'d', text:'Buy a cheaper one to keep up', correct:false},
      ],
      explanation: 'Always check YOUR budget first. EMIs (Equated Monthly Installments) mean you pay MORE due to interest — a ₹50,000 phone on EMI can cost ₹58,000+! If you truly want something expensive, save for it. Never buy impulsively because someone else did.'
    }
  },

  // --- CHALLENGE 3: INSURANCE ---
  {
    id: 'ch3',
    type: 'challenge',
    badge: 'Challenge 3 of 8',
    title: 'The Space Dog & Insurance',
    day: '4',
    badgeId: 'insured',
    concept: 'Insurance',
    intro: {
      icon: '🐕‍🦺',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'Day 4. I\'m picking up a life sign near the station... It\'s friendly! 🐕'},
        {type:'card', icon:'🐕', title:'Meet COSMO — the Mars Guard Dog', text:'Cosmo is a trained space dog. He can <span class="hl">guard your water supply</span> against theft, damage, and accidents.<br><br><span class="hl">Cost:</span> A tiny sip of water each day (about 1/10th of a bottle total)<br><span class="hl-green">Benefit:</span> Protects all your bottles from loss'},
        {type:'card', icon:'⚠️', title:'The Risk Without Cosmo', text:'Mars is dangerous. Without protection, there\'s a <span class="hl" style="color:#ef5350">real chance</span> you could lose <span class="hl" style="color:#ef5350">2-3 bottles</span> to:<br>• Theft by other desperate kids<br>• Accidental damage<br>• Bottles rolling away in Mars gravity'},
        {type:'card', icon:'🧮', title:'The Math', text:'<span class="hl-blue">With Cosmo:</span> Pay ~1 bottle total, protect all 10<br><span class="hl" style="color:#ef5350">Without Cosmo:</span> Risk losing 2-3 bottles (20-30% of supply)<br><br>Is a small guaranteed cost worth it to prevent a potentially catastrophic loss?'},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Will you keep Cosmo and pay for protection?',
      choices: [
        {id:'yes', emoji:'🐕', title:'YES — Keep Cosmo!', desc:'Small daily sip for guaranteed protection'},
        {id:'no', emoji:'🚫', title:'NO — Can\'t spare any water', desc:'I\'ll guard my own bottles'},
        {id:'temp', emoji:'🤔', title:'Keep him temporarily', desc:'A few days, then evaluate'},
      ]
    },
    evaluate(val) {
      if (val === 'yes') return {
        score: 130, grade: 'good', icon: '🐕', title: 'Protected & Safe!', badgeEarned: true,
        text: 'Cosmo guarded your supply 24/7. On Day 7, a thief tried to steal 3 bottles — Cosmo chased them away! Your ~1 bottle cost saved you 3. Net savings: 2 bottles!',
        lessonTitle: 'Insurance — Small Premium, Massive Protection',
        lesson: `Insurance works exactly like Cosmo. You pay a small <strong>premium</strong> (regular cost) to protect against <strong>catastrophic losses</strong>.<br><br><strong>Types of insurance everyone needs:</strong><br>• <strong>Health Insurance</strong> — Hospital bills in India can be ₹1-20 lakhs. Premium: ₹10-25K/year<br>• <strong>Life Insurance (Term Plan)</strong> — Protects family if breadwinner dies. Premium: ₹500-1000/month for ₹1 crore cover<br>• <strong>Vehicle Insurance</strong> — Legally required. Covers accident damage<br>• <strong>Home Insurance</strong> — Protects your biggest asset<br><br><strong>The formula:</strong> Small certain cost → Protection against large uncertain loss`,
        realworld: `Real example: A hospital stay for dengue costs ₹1-3 lakhs. Health insurance premium for a family is ₹15,000-25,000/year. Without insurance, one illness can wipe out years of savings.<br><br>Cosmo\'s sip = ₹15,000/year premium. The theft he prevented = ₹3 lakh hospital bill. Insurance is NOT a cost — it\'s a smart investment in protection.`
      };
      if (val === 'no') return {
        score: 20, grade: 'bad', icon: '😱', title: 'Unprotected Disaster!',
        text: 'Day 7: A thief stole 3 bottles while you slept. That\'s 30% of your entire supply — gone forever. Cosmo would have cost just 1 bottle...',
        lessonTitle: 'The Devastating Price of No Insurance',
        lesson: `People skip insurance thinking "it won\'t happen to me." But:<br>• <strong>1 in 3</strong> Indians will face a major health event by age 50<br>• <strong>1 in 5</strong> vehicles face accidents annually<br>• Medical inflation in India is <strong>14% per year</strong> — costs double every 5 years<br><br>Without insurance, one bad event can destroy decades of savings.`,
        realworld: `A family without health insurance faces a ₹5 lakh surgery bill. Options: sell assets, take loans at high interest, or compromise on treatment. All devastating. A ₹15,000/year premium prevents ALL of this. <strong>Insurance is never optional.</strong>`
      };
      return {
        score: 55, grade: 'warn', icon: '😟', title: 'Gap in Coverage!',
        text: 'Cosmo protected you for 3 days, but the day after you sent him away, 2 bottles were stolen. The gap in protection cost you dearly.',
        lessonTitle: 'Don\'t Let Your Insurance Lapse',
        lesson: `Insurance only works when it\'s <strong>continuously active</strong>. Letting a policy lapse — even briefly — leaves you exposed at the worst time.<br><br><strong>Common mistake:</strong> People stop paying health insurance premiums to "save money." Then they get sick and realize they have no coverage. Restarting insurance often means waiting periods and higher premiums.`,
        realworld: `If your health insurance lapses for 3 months and you get hospitalized, the insurer won\'t pay. You\'ll face the full bill yourself. Once you get insurance, <strong>never let it lapse</strong>. Set up auto-pay for premiums.`
      };
    },
    quiz: {
      question: 'Health insurance premium for a family is about ₹20,000/year. A single hospital stay can cost ₹3-5 lakhs. What\'s the smart choice?',
      timeLimit: 20,
      choices: [
        {id:'a', text:'Skip insurance — I\'m healthy, I don\'t need it', correct:false},
        {id:'b', text:'Get insurance — ₹20K/year is tiny vs. ₹3-5 lakh risk', correct:true},
        {id:'c', text:'Save the ₹20K instead — I\'ll pay from savings if needed', correct:false},
        {id:'d', text:'Only get insurance when you\'re old', correct:false},
      ],
      explanation: 'Insurance premiums are LOWER when you\'re young and healthy. A 25-year-old pays much less than a 45-year-old for the same coverage. The "I\'m healthy" argument is exactly why you should get it NOW — you\'re paying the lowest possible premium for protection you might need anytime.'
    }
  },

  // --- CHALLENGE 4: FRAUD / PONZI ---
  {
    id: 'ch4',
    type: 'challenge',
    badge: 'Challenge 4 of 8',
    title: 'The Great Mars Scam',
    day: '5',
    badgeId: 'scam-detector',
    concept: 'Fraud Awareness',
    intro: {
      icon: '🎪',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'⚠️ Day 5. I\'m detecting suspicious activity in Sector 7 of the Mars colony...'},
        {type:'dialogue', bubbles:[
          {side:'left', label:'Mystery Man', labelClass:'bubble-label-ai', text:'Step right up! Give me just ONE bottle today, and I\'ll return THREE bottles TOMORROW! Guaranteed returns! 🤑'},
          {side:'left', label:'Kid (excited)', labelClass:'bubble-label-ai', text:'I gave him 1 yesterday and got 3 back! It really works!'},
          {side:'left', label:'Another kid', labelClass:'bubble-label-ai', text:'I just gave him ALL my bottles. I\'ll be SO rich tomorrow! 🤩'},
        ]},
        {type:'card', icon:'🚨', title:'NOVA\'s Analysis', text:'<span class="hl" style="color:#ef5350">RED FLAGS DETECTED:</span><br>• <span class="hl">3x returns overnight?</span> That\'s 200% return in 1 day<br>• <span class="hl">Where does he GET the extra water?</span> He can\'t create it from nothing<br>• <span class="hl">"Guaranteed" returns?</span> Nothing is guaranteed in investing<br>• <span class="hl">Early "winners" recruiting more people?</span> Classic pyramid scheme tactic<br>• <span class="hl">Urgency and FOMO?</span> "Limited time! Others are doing it!"'},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Everyone around you is giving their water. What do YOU do?',
      choices: [
        {id:'avoid', emoji:'🛡️', title:'Stay far away!', desc:'This screams fraud. I\'m keeping my water safe.'},
        {id:'investigate', emoji:'🔍', title:'Investigate first', desc:'Ask tough questions, verify claims, look for proof'},
        {id:'one', emoji:'🤞', title:'Give just 1 bottle', desc:'Small risk — I can afford to test it'},
        {id:'all', emoji:'🤑', title:'Go all in — 3x returns!', desc:'Give everything for maximum return'},
      ]
    },
    evaluate(val) {
      if (val === 'avoid') return {
        score: 130, grade: 'good', icon: '🛡️', title: 'Scam Completely Avoided!', badgeEarned: true,
        text: 'SMART! Next morning, the mystery man VANISHED with everyone\'s water. Kids who gave bottles are left with NOTHING. You saved every drop.',
        lessonTitle: 'Ponzi Schemes & Financial Fraud — How to Spot Them',
        lesson: `This was a <strong>Ponzi Scheme</strong> — a fraud where early investors are paid with money from LATER investors, creating a false illusion of profits. Eventually the scammer disappears with everyone\'s money.<br><br><strong>🚨 Red Flags of Financial Fraud:</strong><br>1. <strong>"Guaranteed" high returns</strong> — nothing in investing is guaranteed<br>2. <strong>Returns far above market rates</strong> (banks give 6-7%, not 200%!)<br>3. <strong>Pressure to invest quickly</strong> ("limited time offer!")<br>4. <strong>Not registered with SEBI</strong> or any regulator<br>5. <strong>Vague about HOW returns are generated</strong><br>6. <strong>Early investors recruiting more people</strong> (pyramid structure)<br>7. <strong>Too complex to explain</strong> or deliberately confusing<br><br><strong>To verify:</strong> Check the SEBI website (sebi.gov.in) for registered intermediaries. If it\'s not registered, DON\'T invest.`,
        realworld: `<strong>Famous Indian scams:</strong><br>• <strong>Saradha Chit Fund</strong> — cheated millions of ₹4,000+ crore<br>• <strong>Sahara Group</strong> — ₹24,000+ crore fraud<br>• <strong>Speak Asia</strong> — online survey scam, ₹2,200 crore<br><br>Globally, Bernie Madoff ran a $65 BILLION Ponzi scheme for 20+ years. The rule is ALWAYS: <strong>if it sounds too good to be true, it IS.</strong>`
      };
      if (val === 'investigate') return {
        score: 110, grade: 'good', icon: '🔍', title: 'Detective Work Pays Off!', badgeEarned: true,
        text: 'Your investigation revealed the "winners" were the scammer\'s friends — planted to create credibility! You reported him and saved others too.',
        lessonTitle: 'Due Diligence — Always Verify Before Investing',
        lesson: `Before investing anywhere, verify:<br>• Is it <strong>registered with SEBI</strong>? (sebi.gov.in)<br>• Does it have a <strong>real track record</strong>?<br>• Can you find <strong>independent reviews</strong>?<br>• Is the return <strong>realistic</strong> compared to market rates?<br>• Do they have a <strong>physical office</strong> and proper paperwork?<br><br>Legitimate investment products (mutual funds, stocks, bonds) are all registered and regulated. If someone bypasses this system, they\'re probably a fraud.`,
        realworld: `Before investing in any mutual fund, you can verify it on:<br>• SEBI website (sebi.gov.in)<br>• AMFI website (amfiindia.com)<br>• Fund house website (e.g., hdfcfund.com)<br><br>Legitimate fund houses like HDFC Mutual Fund are transparent about their returns, holdings, and fees. Fraudsters NEVER provide this level of detail.`
      };
      if (val === 'one') return {
        score: 15, grade: 'bad', icon: '💧', title: 'Bottle Gone Forever!',
        text: 'The scammer vanished overnight. Your 1 bottle is gone — permanently. "Just testing" with a fraudster still means losing money.',
        lessonTitle: 'No "Small Risk" with Fraud',
        lesson: `With <strong>legitimate investments</strong>, small bets are fine — start a ₹500 SIP! But with <strong>fraud</strong>, ANY amount given is 100% lost. The scammer won\'t return anything.<br><br>Online scams work the same: "Send ₹500 to get ₹5,000 back!" Once you send money via UPI, it\'s gone.`,
        realworld: `In 2024, Indians lost over ₹11,000 crore to cyber fraud. Common scams: fake investment apps promising 50%+ returns, crypto "experts" on Telegram, and WhatsApp groups with "insider tips." If money leaves your account to an unverified entity, it\'s usually gone forever.`
      };
      return {
        score: 0, grade: 'bad', icon: '😱', title: 'Total Financial Ruin!',
        text: 'ALL your water is gone. The scammer vanished. You\'re now completely dependent on others\' charity. This is what financial ruin feels like.',
        lessonTitle: 'Greed is the Scammer\'s Best Weapon',
        lesson: `The promise of easy, huge returns overrides logic. This is why <strong>greed</strong> is the #1 emotion scammers exploit.<br><br><strong>Rules to never break:</strong><br>1. Never invest money you can\'t afford to lose<br>2. Never put ALL money in one place<br>3. If returns seem unrealistic, WALK AWAY<br>4. Verify with SEBI before investing anywhere`,
        realworld: `People have lost homes, retirement funds, and children\'s education savings to Ponzi schemes. The emotional and financial damage can last decades. One simple question can save you: "Is this registered with SEBI?" If no → don\'t invest. Period.`
      };
    },
    quiz: {
      question: 'Someone on Instagram says: "Invest ₹10,000, earn ₹1 lakh in 30 days! 100% guaranteed!" What do you do?',
      timeLimit: 15,
      choices: [
        {id:'a', text:'Send ₹10,000 immediately — can\'t miss this!', correct:false},
        {id:'b', text:'Send ₹1,000 to test first', correct:false},
        {id:'c', text:'Block, report, and NEVER respond', correct:true},
        {id:'d', text:'Ask them for more details', correct:false},
      ],
      explanation: '10x returns in 30 days = 100% fraud. No legitimate investment can do this. Don\'t even engage — block and report. Even "asking for details" gives them a chance to manipulate you with fake proofs. The only safe action is to walk away completely.'
    }
  },

  // --- CHALLENGE 5: EQUITY ---
  {
    id: 'ch5',
    type: 'challenge',
    badge: 'Challenge 5 of 8',
    title: 'Mars Companies & Investing',
    day: '6',
    badgeId: 'investor',
    showInflationTable: true,
    concept: 'Equity & Fixed Income',
    intro: {
      icon: '🏗️',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'Day 6! The Mars colony is booming. Astronauts are building companies — and they need investors like YOU.'},
        {type:'card', icon:'🏭', title:'What is Investing?', text:'When you <span class="hl">invest</span> in a company, you become a <span class="hl">part-owner</span> (shareholder). If the company grows, your investment grows. If it fails, you can lose money.<br><br>This is called <span class="hl">equity investing</span> (buying shares/stocks).'},
        {type:'card', icon:'🏦', title:'Two Options on Mars', text:'<span class="hl-blue">Mars Bank (Fixed Deposit):</span><br>Store water safely. Guaranteed +1 bottle after 10 days. <strong>Safe but slow.</strong><br><br><span class="hl">Mars Company (Equity):</span><br>Invest water in a growing company. If it succeeds (70% chance): +3 bottles! If it fails (30% chance): lose your investment. <strong>Risky but high reward.</strong>'},
        {type:'card', icon:'📊', title:'The Historical Truth', text:'India\'s stock market (Sensex) has given <span class="hl-green">~15% average annual returns</span> over 40 years. Fixed deposits give <span class="hl-blue">~6-7%</span>.<br><br>But equity goes through dramatic ups AND downs along the way. FDs are steady and predictable.'},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'How will you invest your water?',
      choices: [
        {id:'split', emoji:'⚖️', title:'Split: half Bank, half Company', desc:'Balance safety and growth — diversify!'},
        {id:'equity', emoji:'📈', title:'All in the Company (Equity)', desc:'Maximum growth, but higher risk'},
        {id:'fd', emoji:'🏦', title:'All in the Bank (Fixed Deposit)', desc:'100% safe, guaranteed but slow'},
        {id:'nothing', emoji:'🛏️', title:'Don\'t invest at all', desc:'Keep everything under my mattress'},
      ]
    },
    evaluate(val) {
      if (val === 'split') return {
        score: 130, grade: 'good', icon: '⚖️', title: 'Perfect Asset Allocation!', badgeEarned: true,
        text: 'Your bank deposit earned +1 bottle (safe). Your company investment earned +3 bottles (it succeeded!). Total: +4 bottles. And even if the company failed, you\'d still have the bank returns. Smart!',
        lessonTitle: 'Asset Allocation — The Most Important Investment Decision',
        lesson: `<strong>Asset allocation</strong> = dividing your money between different investment types:<br><br>• <strong>Equity (Stocks)</strong> — Higher returns (12-15%/year), but volatile. Good for long-term goals (5+ years)<br>• <strong>Fixed Income (FDs/Bonds)</strong> — Safe, predictable (6-7%/year). Good for short-term goals (1-3 years)<br>• <strong>Gold</strong> — Hedge against inflation (8-10%/year historically)<br>• <strong>Emergency Fund</strong> — Liquid savings for emergencies<br><br><strong>A simple rule by age:</strong> Equity % = 100 minus your age. At 20, put 80% in equity. At 50, put 50% in equity.`,
        realworld: `The Sensex grew from 100 (1979) to 73,000+ (2024) — that\'s 730x! But it crashed 60% in 2008 and 38% in 2020. Those crashes terrified people.<br><br>Someone who put 60% in equity and 40% in FDs experienced the growth but with a smoother ride. Their portfolio never dropped as dramatically, and it still grew substantially.`
      };
      if (val === 'equity') return {
        score: 80, grade: 'warn', icon: '📈', title: 'High Risk Paid Off... This Time!',
        text: 'The company succeeded! +3 bottles! But there was a 30% chance of losing everything. What if you weren\'t lucky?',
        lessonTitle: 'Equity — High Growth, High Volatility',
        lesson: `Equity can give great returns but the journey is bumpy:<br>• 2008: Sensex dropped 60% in months<br>• 2020: Dropped 38% in ONE month<br>• But both times, it recovered and went HIGHER than before<br><br><strong>Key rules for equity:</strong><br>1. Only invest money you won\'t need for 5+ years<br>2. Never put ALL your money in stocks<br>3. Diversify across many companies (use mutual funds!)<br>4. Stay invested through ups AND downs`,
        realworld: `₹10,000 invested in Sensex in 2003 → ₹1,50,000+ by 2023 (15x!). But in 2008, it temporarily dropped to ₹5,000. People who panicked and sold lost 50%. People who stayed invested made 15x. <strong>Patience is the price of equity returns.</strong>`
      };
      if (val === 'fd') return {
        score: 55, grade: 'warn', icon: '🏦', title: 'Safe But Falling Behind',
        text: 'Your water is safe and you earned +1 bottle. But others earned +3 to +5 bottles through investing. You\'re safe but losing the wealth race.',
        lessonTitle: 'The Hidden Risk of "Playing It Safe"',
        lesson: `FDs feel safe, but they have a hidden enemy: <strong>INFLATION</strong>.<br><br>If prices rise 6% per year and your FD earns 6%... your REAL return is <strong>ZERO</strong>. Your money didn\'t actually grow in purchasing power.<br><br>Over 20 years:<br>• ₹1 lakh in FD (6%) → ₹3.2 lakh<br>• ₹1 lakh in equity (12%) → ₹9.6 lakh<br>• But inflation makes ₹1 lakh worth ₹3.2 lakh in future terms<br><br>The FD just kept up. The equity tripled your real wealth.`,
        realworld: `In 1990, a cup of tea cost ₹2. Today it\'s ₹20. That\'s 10x in 34 years — roughly 7% annual inflation. If your money only grows at 6-7% (FD rate), you\'re running in place. You NEED equity exposure to actually grow wealthier.`
      };
      return {
        score: 25, grade: 'bad', icon: '🛏️', title: 'Your Money is Sleeping!',
        text: 'While you kept water under your bed, it didn\'t grow at all. Others are thriving. Inflation means your 10 bottles now buy less than 10 bottles did yesterday.',
        lessonTitle: 'Not Investing = Guaranteed Loss',
        lesson: `Keeping money at home or in a basic savings account (3-4%) means <strong>losing purchasing power every year</strong>.<br><br>₹1 lakh today = ₹55,000 in purchasing power after 10 years (at 6% inflation)<br><br>By NOT investing, you\'re GUARANTEED to become poorer in real terms. The "safe" choice is actually the riskiest long-term strategy.`,
        realworld: `Indian households hold over ₹15 lakh crore in physical cash and low-interest savings accounts. If even 10% of this moved to mutual funds, millions of families would be significantly wealthier in 20 years. Don\'t let fear of investing cost you your future.`
      };
    },
    quiz: {
      question: 'The Sensex was at 100 in 1979. In 2024, it crossed 73,000. What average annual return does that represent?',
      timeLimit: 20,
      choices: [
        {id:'a', text:'About 5% per year', correct:false},
        {id:'b', text:'About 15% per year', correct:true},
        {id:'c', text:'About 50% per year', correct:false},
        {id:'d', text:'About 100% per year', correct:false},
      ],
      explanation: 'The Sensex has given approximately 15% compound annual returns over 45 years! This means ₹1 lakh invested in 1979 would be worth over ₹7 crore today. This is the long-term power of equity — but remember, the journey included many scary crashes along the way.'
    }
  },

  // --- CHALLENGE 6: MUTUAL FUNDS ---
  {
    id: 'ch6',
    type: 'challenge',
    badge: 'Challenge 6 of 8',
    title: 'Mutual Funds — Diversify!',
    day: '7',
    badgeId: 'diversifier',
    concept: 'Mutual Funds',
    intro: {
      icon: '🎯',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'Day 7! Mars now has 9 thriving industries. This is your chance to put what you learned about investing into practice.'},
        {type:'card', icon:'🎲', title:'The Challenge', text:'You can invest in <span class="hl">any combination of 9 industries</span>. Some will <span class="hl-green">succeed</span> and some will <span class="hl" style="color:#ef5350">fail</span> — but you DON\'T know which ones!<br><br>This is exactly like the real stock market — nobody can predict which companies will win.'},
        {type:'card', icon:'💡', title:'Think About This', text:'What happens if you pick just <strong>1 industry</strong> and it fails? → You lose everything<br><br>What if you pick <strong>5 industries</strong>, 2 fail but 3 succeed? → You still come out ahead!<br><br>This is the concept of <span class="hl">diversification</span>.'},
        {type:'card', icon:'🧑‍💼', title:'What if You Can\'t Pick?', text:'What if there was a <strong>professional</strong> who researches all 9 industries, picks the best mix, and manages your investment for you? That\'s exactly what a <span class="hl">Mutual Fund Manager</span> does!'},
      ]
    },
    interaction: {
      type: 'invest-grid',
      question: 'Tap to invest in industries. More = more diversified!',
      industries: [
        {id:'pharma', name:'Pharma & Medicine', icon:'🧪', wins:true},
        {id:'logistics', name:'Logistics', icon:'📦', wins:false},
        {id:'tech', name:'Technology', icon:'💻', wins:true},
        {id:'food', name:'Restaurants', icon:'🍽️', wins:false},
        {id:'energy', name:'Energy & Power', icon:'⚡', wins:true},
        {id:'realestate', name:'Real Estate', icon:'🏢', wins:false},
        {id:'manufacturing', name:'Manufacturing', icon:'🏭', wins:true},
        {id:'tourism', name:'Tourism', icon:'✈️', wins:false},
        {id:'transport', name:'Space Transport', icon:'🚀', wins:true},
      ],
      hint: 'Select as many as you like — there\'s no wrong number! More = more diversified.'
    },
    evaluate(picks) {
      const winners = this.interaction.industries.filter(i => i.wins).map(i => i.id);
      const hits = picks.filter(p => winners.includes(p)).length;
      const misses = picks.filter(p => !winners.includes(p)).length;
      const total = picks.length;
      if (total === 0) return {
        score: 10, grade: 'bad', icon: '😶', title: 'Missed the Boat!',
        text: 'You didn\'t invest in anything. Your water stayed flat while others grew theirs significantly.',
        lessonTitle: 'Why Mutual Funds Exist',
        lesson: `If picking industries feels scary or confusing — that\'s EXACTLY why <strong>Mutual Funds</strong> were invented!<br><br>A mutual fund:<br>• Collects money from thousands of investors<br>• A professional <strong>Fund Manager</strong> picks 30-80+ stocks<br>• Your money is spread across many companies and sectors<br>• You don\'t need expertise to get started<br>• Start with as little as <strong>₹500/month</strong>`,
        realworld: `HDFC Mutual Fund manages over ₹6 lakh crore of investors\' money. Their team of experts researches hundreds of companies before picking the best ones for their funds. Instead of YOU trying to pick winners, the fund manager does it professionally.`
      };
      if (total >= 5) return {
        score: 130, grade: 'good', icon: '🌟', title: 'Diversification Champion!', badgeEarned: true,
        text: `You invested in ${total} industries! ${misses > 0 ? `Yes, ${misses} failed — but your ${hits} winners more than compensated!` : 'Impressive picks!'} Your diversified approach delivered strong overall returns.`,
        lessonTitle: 'Mutual Funds = Professional Diversification Made Easy',
        lesson: `<strong>This is EXACTLY how mutual funds work!</strong><br><br>A mutual fund invests across <strong>many companies and sectors</strong> so that:<br>• One company failing barely dents your portfolio<br>• Winners carry the losers<br>• Overall returns are strong and stable<br><br><strong>Types of Mutual Funds:</strong><br>• <strong>Equity Funds</strong> — invest in stocks (higher return, more volatile)<br>• <strong>Debt Funds</strong> — invest in bonds/FDs (stable, moderate return)<br>• <strong>Hybrid Funds</strong> — mix of equity + debt (balanced approach)<br>• <strong>Index Funds</strong> — track the Sensex/Nifty automatically (low cost)<br><br><strong>How to start:</strong> Complete KYC → Choose a fund → Start a SIP of ₹500+/month → That\'s it!`,
        realworld: `A typical equity mutual fund holds 40-80 different stocks across banking, IT, pharma, energy, auto, and more. If Infosys has a bad quarter, TCS or HDFC might have a great one — the fund balances out. This is something you CANNOT easily do by buying individual stocks, especially with small amounts. Mutual funds make professional investing accessible to everyone.`
      };
      if (total >= 3 && hits > misses) return {
        score: 85, grade: 'good', icon: '📊', title: 'Good Diversification!',
        text: `${hits} of your ${total} picks won! Your diversification worked well — the winners outweighed the losers.`,
        lessonTitle: 'More Diversification = Smoother Ride',
        lesson: `You did well, but imagine if you\'d picked all 9 — even with 4 losers, the 5 winners would have given excellent returns. The more diversified, the less volatile your portfolio.<br><br>Professional mutual funds typically hold 30-80 stocks for exactly this reason.`,
        realworld: `Index funds (like Nifty 50 Index Fund) automatically invest in the top 50 Indian companies. They\'re one of the simplest and most effective ways to get instant diversification. Even Warren Buffett recommends index funds for most investors!`
      };
      return {
        score: 40, grade: 'warn', icon: '😬', title: 'Too Concentrated!',
        text: `With only ${total} pick(s), you were concentrated. ${misses > 0 ? 'The failures hit hard.' : 'Lucky this time, but risky.'}`,
        lessonTitle: 'Concentration Risk is Dangerous',
        lesson: `Putting all money in 1-2 investments is <strong>concentration risk</strong>. If those specific investments fail, you lose big.<br><br>Example: If you invested everything in Kingfisher Airlines stock, you lost 100% when it went bankrupt. A mutual fund holding 50 stocks? One bankruptcy barely registers.`,
        realworld: `In India, many people invest their entire savings in one stock tip from a friend or WhatsApp group. This is extremely risky! A mutual fund automatically protects you by investing across dozens of companies. Let the fund manager handle stock picking — that\'s their job.`
      };
    },
    quiz: {
      question: 'A mutual fund collects money from many investors and invests in...',
      timeLimit: 20,
      choices: [
        {id:'a', text:'Only one company for maximum returns', correct:false},
        {id:'b', text:'A diversified portfolio of many stocks, bonds, or other assets', correct:true},
        {id:'c', text:'Only government bonds for safety', correct:false},
        {id:'d', text:'Real estate properties only', correct:false},
      ],
      explanation: 'A mutual fund invests across a diversified portfolio — typically 30-80 different stocks, or a mix of stocks and bonds. This diversification is managed by a professional Fund Manager who researches and selects investments on your behalf. You can start with just ₹500/month through a SIP!'
    }
  },

  // --- CHALLENGE 7: COMPOUNDING ---
  {
    id: 'ch7',
    type: 'challenge',
    badge: 'Challenge 7 of 8',
    title: 'The Magic of Compounding',
    day: '8',
    badgeId: 'compound-king',
    showEarlyVsLate: true,
    concept: 'Compounding',
    intro: {
      icon: '🌱',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'Day 8! Time for your final scientific mission: make Mars GREEN by growing a special plant. This challenge reveals the most powerful force in finance.'},
        {type:'card', icon:'🌿', title:'The Mars Plant Experiment', text:'You\'ve planted a special Mars tree:<br><br>Day 1: <span class="hl">0.5 feet</span> tall (tiny seedling)<br>Rule: It <span class="hl">doubles in size</span> every day<br>Goal: Reach <span class="hl">100+ feet</span> in 10 days'},
        {type:'card', icon:'🤔', title:'Think Carefully', text:'0.5 feet is less than the length of your hand. 100 feet is taller than a 10-story building. Can this tiny plant REALLY get there in just 10 days by doubling?'},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Can a 0.5-foot plant reach 100+ feet in 10 days by doubling daily?',
      choices: [
        {id:'yes', emoji:'✅', title:'YES — Doubling is powerful!', desc:'I believe in exponential growth'},
        {id:'no', emoji:'❌', title:'NO — Impossible from 0.5 feet', desc:'The starting point is too small'},
        {id:'maybe', emoji:'🤔', title:'MAYBE — Not sure', desc:'I can\'t picture the math'},
      ]
    },
    evaluate(val) {
      const days = [0.5, 1, 2, 4, 8, 16, 32, 64, 128, 256];
      const base = {showCompound: true, days};
      if (val === 'yes') return {
        ...base, score: 130, grade: 'good', icon: '🌳', title: 'You Understand Compounding!', badgeEarned: true,
        text: 'CORRECT! Watch: 0.5 → 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 feet! By Day 10, the tree is 256 feet — towering past the goal!',
        lessonTitle: 'The Power of Compounding — The 8th Wonder of the World',
        lesson: `Albert Einstein reportedly called compound interest <strong>"the 8th wonder of the world."</strong><br><br><strong>Compounding</strong> = your gains generate their own gains. It starts tiny but becomes EXPLOSIVE.<br><br><strong>₹500/month SIP at 12% annual return:</strong><br>• 5 years: ₹41,243 (invested ₹30,000)<br>• 10 years: ₹1,16,170 (invested ₹60,000)<br>• 20 years: ₹4,99,574 (invested ₹1,20,000)<br>• 30 years: ₹17,64,957 (invested ₹1,80,000)<br>• 40 years: ₹59,29,090 (invested ₹2,40,000)<br><br>You invested ₹2.4 lakh over 40 years, but it became <strong>₹59 lakh</strong>! That\'s 25x your money!<br><br><strong>The Rule of 72:</strong> Divide 72 by your return rate = years to double.<br>• At 12%: 72/12 = <strong>6 years</strong> to double<br>• At 8%: 72/8 = <strong>9 years</strong> to double<br>• At 6%: 72/6 = <strong>12 years</strong> to double`,
        realworld: `<strong>The unfair advantage of starting early:</strong><br><br>Friend A invests ₹1,000/month from age 15 to 25 (10 years), then STOPS. Total invested: ₹1.2 lakh.<br><br>Friend B invests ₹5,000/month from age 30 to 60 (30 years). Total invested: ₹18 lakh.<br><br>At 12% returns, by age 60:<br>• Friend A: ~₹1.6 crore<br>• Friend B: ~₹1.76 crore<br><br><strong>Friend A invested ₹1.2 lakh. Friend B invested ₹18 lakh. But they ended up with almost the same amount!</strong> Those 15 extra years of compounding made ₹1.2 lakh nearly equal to ₹18 lakh. START EARLY.`
      };
      if (val === 'maybe') return {
        ...base, score: 70, grade: 'warn', icon: '🤯', title: 'Mind = Blown!',
        text: 'YES, it works! 0.5 → 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256. By Day 8 it passes 100, and by Day 10 it\'s at 256!',
        lessonTitle: 'Why Our Brains Underestimate Compounding',
        lesson: `Humans think <strong>linearly</strong> (1, 2, 3, 4, 5...) but compounding is <strong>exponential</strong> (1, 2, 4, 8, 16...). Our brains literally cannot intuit exponential growth — it always surprises us.<br><br>This is why people underestimate long-term investing. The first years feel pathetically slow. But the later years are explosive.<br><br><strong>Warren Buffett's secret:</strong> He's worth $120 billion, but 99% of his wealth came after age 50. He started investing at age 11. Those early decades of compounding, while seemingly slow, built the foundation for explosive later growth.`,
        realworld: `A parent who starts a ₹2,000/month SIP when their child is born (age 0) will have approximately ₹1 crore by the child\'s 18th birthday (at 12% returns). The parent invested ₹4.32 lakh total. Compounding did the rest. But if they start at age 10, they'd need ₹6,000/month to reach the same goal. Starting early is literally 3x more efficient.`
      };
      return {
        ...base, score: 40, grade: 'warn', icon: '😲', title: 'Surprise — It Totally Works!',
        text: 'Most people guess wrong! Here\'s the proof: 0.5 → 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256. The tiny seedling TOWERS past 100 feet!',
        lessonTitle: 'Start Early — Time is Everything',
        lesson: `You DON\'T need to invest large amounts. You need to invest <strong>EARLY</strong>.<br><br><strong>The Rule of 72:</strong> Divide 72 by your annual return → years to double your money.<br>• 12% return: doubles every 6 years<br>• 8% return: doubles every 9 years<br><br>Starting at 15 vs 25 = your money gets to double <strong>1-2 extra times</strong>. That\'s 2-4x more money at retirement!`,
        realworld: `If you start a ₹500/month SIP at age 15, by age 60 you\'d have approximately ₹1.08 crore (at 12% returns). You invested only ₹2.7 lakh over 45 years. Compounding multiplied it 40x! But starting at 30 with the same ₹500/month gives only ₹17.6 lakh by 60. Same amount, but 6x less result. Those 15 years cost you over ₹90 lakh!`
      };
    },
    quiz: {
      question: 'Using the Rule of 72: If your investment grows at 12% per year, how long to DOUBLE your money?',
      timeLimit: 15,
      choices: [
        {id:'a', text:'12 years', correct:false},
        {id:'b', text:'6 years (72÷12 = 6)', correct:true},
        {id:'c', text:'72 years', correct:false},
        {id:'d', text:'2 years', correct:false},
      ],
      explanation: 'Rule of 72: Divide 72 by the annual return rate. At 12%, money doubles every 6 years. So ₹1 lakh becomes ₹2 lakh in 6 years, ₹4 lakh in 12 years, ₹8 lakh in 18 years, ₹16 lakh in 24 years, ₹32 lakh in 30 years! This is exponential growth in action.'
    }
  },

  // --- CHALLENGE 8: SIP ---
  {
    id: 'ch8',
    type: 'challenge',
    badge: 'Challenge 8 of 8 — FINAL',
    title: 'The SIP Strategy',
    day: '9',
    badgeId: 'sip-champion',
    showSipChart: true,
    showMarketScenarios: true,
    concept: 'SIP',
    intro: {
      icon: '💧',
      blocks: [
        {type:'narrative', speaker:'NOVA', speakerClass:'speaker-ai', text:'Day 9 — your FINAL challenge, Commander {name}! You\'ve learned budgeting, discipline, insurance, fraud avoidance, investing, diversification, and compounding. Now let\'s tie it ALL together with the ultimate wealth-building strategy.'},
        {type:'card', icon:'📊', title:'The Mars Water Market', text:'Mars now has a fluctuating water market. Prices change daily:<br><br>Day 1: ₹10/bottle<br>Day 2: ₹15/bottle (expensive!)<br>Day 3: ₹8/bottle (cheap!)<br>Day 4: ₹12/bottle<br>Day 5: ₹7/bottle (cheapest!)'},
        {type:'card', icon:'📋', title:'Strategy Comparison', text:'<span class="hl">Lump Sum (all at once on Day 1):</span><br>₹50 ÷ ₹10 = 5.0 bottles<br><br><span class="hl-green">SIP (₹10/day for 5 days):</span><br>Day 1: 1.00 bottle (₹10)<br>Day 2: 0.67 bottles (₹15)<br>Day 3: 1.25 bottles (₹8)<br>Day 4: 0.83 bottles (₹12)<br>Day 5: 1.43 bottles (₹7)<br>Total: <span class="hl-green">5.18 bottles!</span><br><br>SIP got MORE bottles for the same ₹50!'},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Which investment strategy will you use going forward?',
      choices: [
        {id:'sip', emoji:'📅', title:'SIP — Regular small investments', desc:'Fixed amount every month, rain or shine'},
        {id:'lump', emoji:'💰', title:'Lump Sum — All at once', desc:'Put everything in right now'},
        {id:'wait', emoji:'⏳', title:'Wait for the "right time"', desc:'Try to buy at the lowest price'},
        {id:'none', emoji:'😴', title:'Don\'t invest at all', desc:'Too confusing, I\'ll just save cash'},
      ]
    },
    evaluate(val) {
      if (val === 'sip') return {
        score: 130, grade: 'good', icon: '📅', title: 'SIP Champion — You Get It!', badgeEarned: true,
        text: 'The SIP strategy got 5.18 bottles for ₹50 vs. lump sum\'s 5.0 bottles. When prices were high, you bought less. When low, you bought MORE. Your average cost was lower!',
        lessonTitle: 'SIP — The Smartest Way to Build Wealth',
        lesson: `<strong>SIP (Systematic Investment Plan)</strong> = investing a <strong>fixed amount</strong> at <strong>regular intervals</strong> (monthly).<br><br><strong>How SIP works:</strong><br>• Market HIGH → your ₹500 buys fewer fund units<br>• Market LOW → your ₹500 buys MORE fund units<br>• Over time → average cost is LOWER than average price<br><br>This is called <strong>Rupee Cost Averaging</strong>. It eliminates the need to "time the market."<br><br><strong>SIP advantages:</strong><br>1. <strong>No timing needed</strong> — works in all market conditions<br>2. <strong>Builds discipline</strong> — automatic monthly investment<br>3. <strong>Starts small</strong> — as low as ₹500/month<br>4. <strong>Harnesses compounding</strong> — every SIP compounds over time<br>5. <strong>Emotionless</strong> — removes fear and greed from decisions<br><br><strong>The magic formula:</strong> SIP + Compounding + Time = Extraordinary Wealth`,
        realworld: `<strong>₹5,000/month SIP at 12% returns:</strong><br>• 10 years: ₹11.6 lakh (invested ₹6 lakh)<br>• 20 years: ₹49.9 lakh (invested ₹12 lakh)<br>• 30 years: ₹1.76 crore (invested ₹18 lakh)<br>• 40 years: ₹5.93 crore (invested ₹24 lakh)<br><br>₹5,000/month for 40 years → almost ₹6 CRORE! You invested ₹24 lakh. Compounding added ₹5.69 crore. This is the power of SIP + Time.<br><br><strong>To start a SIP:</strong> Complete KYC online → Choose a mutual fund → Set up auto-debit → Done! Even kids can start with parental help.`
      };
      if (val === 'lump') return {
        score: 55, grade: 'warn', icon: '📊', title: 'Timing is Risky!',
        text: 'You invested all ₹50 on Day 1 at ₹10/bottle = 5 bottles. But if prices drop to ₹7 tomorrow, you missed buying more cheaply. And if they\'d been ₹15 on Day 1, you\'d get only 3.33 bottles!',
        lessonTitle: 'The Danger of Lump Sum Timing',
        lesson: `Lump sum CAN work if you invest at a low point — but how do you know it\'s the bottom? Even experts can\'t consistently predict market direction.<br><br>If you invested a lump sum on Jan 1, 2008 (market peak), your money halved in months! SIP investors during the same period actually benefited — they bought more units at lower prices during the crash, leading to excellent returns when the market recovered.`,
        realworld: `Studies show SIP outperforms lump sum for most retail investors because it removes the dangerous variable of TIMING. You don\'t need to read financial news, watch stock charts, or predict markets. Just set up a monthly SIP and let it work for decades.`
      };
      if (val === 'wait') return {
        score: 25, grade: 'bad', icon: '⏳', title: 'Still Waiting = Losing!',
        text: 'While you waited for the "perfect" price, prices went: ₹10, ₹15, ₹8, ₹12, ₹7. Even if you caught ₹7, you only invested 1 day. SIP investors invested every day and came out ahead.',
        lessonTitle: '"Time in the Market" Beats "Timing the Market"',
        lesson: `The most famous investing quote: <strong>"Time IN the market beats TIMING the market."</strong><br><br>Research shows: if you missed just the <strong>10 best market days</strong> in a 20-year period, your returns would be cut in <strong>HALF</strong>. Since you can\'t predict those days, staying invested (through SIP) is the winning strategy.<br><br>The best time to invest was 20 years ago. The second best time is TODAY.`,
        realworld: `An investor who started a SIP in Nifty 50 in 2004 and continued through the 2008 crash, 2016 correction, and 2020 COVID crash would have earned approximately 14% annual returns by 2024. Trying to time entry and exit during those 20 years would have been nearly impossible.`
      };
      return {
        score: 10, grade: 'bad', icon: '😴', title: 'The Cost of Doing Nothing',
        text: 'Your money sat idle earning nothing while inflation eroded its value. Meanwhile, SIP investors grew their wealth 10-25x over the same period.',
        lessonTitle: 'Inaction is the Most Expensive Decision',
        lesson: `Every year you DON\'T invest is a year of compounding you lose — and you can never get it back.<br><br>₹1 lakh NOT invested for 30 years = still ₹1 lakh (but worth only ₹17,000 in purchasing power due to inflation)<br><br>₹1 lakh invested at 12% for 30 years = ₹30 lakh<br><br>The difference: ₹29 lakh — that\'s the price of inaction.`,
        realworld: `The biggest regret of financially successful adults is always the same: "I wish I started investing sooner." You have an advantage that no amount of money can buy — TIME. At age 15, you have 45+ years of compounding ahead. Don\'t waste a single year. Start your SIP journey today!`
      };
    },
    quiz: {
      question: 'What does SIP stand for and what\'s its biggest advantage?',
      timeLimit: 20,
      choices: [
        {id:'a', text:'Safe Investment Protection — guaranteed returns', correct:false},
        {id:'b', text:'Systematic Investment Plan — removes timing risk through regular investing', correct:true},
        {id:'c', text:'Stock Index Purchase — buying the entire stock market', correct:false},
        {id:'d', text:'Savings Interest Program — earning higher bank interest', correct:false},
      ],
      explanation: 'SIP = Systematic Investment Plan. You invest a fixed amount (e.g., ₹500) every month in a mutual fund. Its biggest advantage is "rupee cost averaging" — you automatically buy more units when prices are low and fewer when prices are high, leading to a lower average cost over time. Combined with compounding, SIP is the most powerful wealth-building tool available to ordinary people.'
    }
  },

  // --- EMOTIONS CHALLENGE (bonus between challenges) ---
  // Handled as part of challenge flow in engine

  // --- RECAP ---
  {
    id: 'recap',
    type: 'recap',
    items: [
      {num:1, concept:'Budget & Plan Ahead', lesson:'Use the 50/30/20 rule. Save FIRST, then spend what\'s left. Make your resources last the full period.', icon:'📋'},
      {num:2, concept:'Follow Your Own Plan', lesson:'Peer pressure destroys wealth. What others spend is irrelevant to YOUR budget. Stay disciplined.', icon:'🧠'},
      {num:3, concept:'Insurance is Essential', lesson:'Small regular premium protects against catastrophic loss. Health, life, and vehicle insurance are non-negotiable.', icon:'🛡️'},
      {num:4, concept:'Avoid Fraud & Scams', lesson:'If returns sound too good to be true, they ARE. Always verify with SEBI. Never invest in unregistered schemes.', icon:'🚨'},
      {num:5, concept:'Invest — Don\'t Just Save', lesson:'FDs are safe but inflation erodes them. Equity + FD mix gives growth with safety. Use asset allocation.', icon:'⚖️'},
      {num:6, concept:'Diversify via Mutual Funds', lesson:'Mutual funds spread risk across 30-80+ companies. Professional management, low minimum. Start with ₹500/month.', icon:'🎯'},
      {num:7, concept:'Start Early — Compounding is Magic', lesson:'Rule of 72: money doubles every 6 years at 12%. Starting at 15 vs 25 can mean 3-5x more wealth at retirement.', icon:'🌳'},
      {num:8, concept:'Use SIP — Invest Regularly', lesson:'Systematic Investment Plan removes timing risk. Fixed monthly investment + compounding + time = extraordinary wealth.', icon:'📅'},
    ]
  },

  // --- FINAL ---
  {
    id: 'final',
    type: 'final',
    ranks: [
      {minScore:1000, title:'Mars Financial Legend', emoji:'🏆', desc:'Outstanding! You\'ve mastered every concept.'},
      {minScore:800, title:'Mars Financial Commander', emoji:'🎖️', desc:'Excellent understanding of financial principles.'},
      {minScore:600, title:'Mars Financial Cadet', emoji:'🌟', desc:'Good grasp of key concepts. Keep learning!'},
      {minScore:400, title:'Mars Financial Rookie', emoji:'🚀', desc:'You\'re on the right path. Review the lessons!'},
      {minScore:0, title:'Mars Financial Trainee', emoji:'📚', desc:'Every expert was once a beginner. Try again!'},
    ]
  }
];