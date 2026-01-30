// ================================================================
// MISSION MARS V2 — GAME DATA
// All content: challenges, teachings, quizzes, scenarios
// ================================================================

const GAME_CONFIG = {
  totalChallenges: 8,
  maxScore: 1000,
  waterStart: 10,
  missionDays: 10,
};

// ===== AVATARS =====
const AVATARS = ['👩‍🚀','👨‍🚀','🧑‍🚀','👾','🤖','🛸'];

// ===== MISSION PHASES (narrative progression) =====
const PHASES = [
  // --- PHASE 0: INTRO / BRIEFING ---
  {
    id: 'briefing',
    type: 'story',
    screens: [
      {
        title: 'Welcome to Mission Mars!',
        icon: '🌍',
        blocks: [
          { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Welcome, {name}! You have been selected from thousands of candidates for humanity\'s greatest adventure — a <strong>10-day mission to Mars</strong>.' },
          { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'This won\'t be easy. Mars is unforgiving. You\'ll need to manage your <strong>resources</strong>, make <strong>smart decisions</strong>, and resist <strong>temptation</strong> to survive.' },
          { type:'card', icon:'💧', title:'Water = Money', text:'On Mars, <span class="hl">water is your currency</span>. Everything you learn about managing water here mirrors how you\'ll manage money in real life. Every bottle counts, every decision matters.' },
        ]
      },
      {
        title: 'Mission Parameters',
        icon: '📋',
        blocks: [
          { type:'card', icon:'🗓️', title:'Your 10-Day Mission', text:'Your trip to Mars lasts <span class="hl">10 days</span>. You\'ll face challenges that test your survival skills — and each one teaches a real-life financial concept.' },
          { type:'stat-grid', stats:[
            {value:'10', label:'Days on Mars'},
            {value:'2/day', label:'Water Supply (Days 1-5)'},
            {value:'0/day', label:'Water Supply (Days 6-10)'},
            {value:'10', label:'Total Bottles'},
          ]},
          { type:'card', icon:'🤝', title:'Rule #1: Teamwork', text:'In space, <span class="hl">teamwork is key to survival</span>. Listen, learn, and work together. No astronaut survives alone.' },
          { type:'narrative', speaker:'AI Companion', speakerClass:'speaker-ai', text:'I\'ll be your AI guide throughout this mission. After each challenge, I\'ll reveal the real-life money lesson hidden in your Mars adventure. Ready?' },
        ]
      },
      {
        title: 'Why Financial Literacy?',
        icon: '🎓',
        blocks: [
          { type:'card', icon:'📚', title:'What School Doesn\'t Teach', text:'School teaches math, science, and language — all important! But there\'s one subject most schools <span class="hl">don\'t teach</span>: how to manage <span class="hl">MONEY</span>.' },
          { type:'card', icon:'💡', title:'The Cost of Not Knowing', text:'Without financial knowledge, people make costly mistakes — <span class="hl">overspending, falling for scams, not saving, not investing</span>. These mistakes can follow you for decades.' },
          { type:'card', icon:'🚀', title:'Your Advantage', text:'By the end of this mission, you\'ll understand <span class="hl">8 critical financial concepts</span> that most adults wish they learned at your age. This knowledge is your superpower.' },
        ]
      }
    ]
  },

  // --- PHASE 1: CHALLENGE 1 — BUDGETING ---
  {
    id: 'ch1',
    type: 'challenge',
    badge: 'Challenge 1 of 8',
    title: 'Water Budgeting',
    day: '1',
    intro: {
      icon: '🧊',
      blocks: [
        { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Commander {name}, you\'ve landed on Mars! Welcome to the Space Station.' },
        { type:'card', icon:'💧', title:'Your Water Supply', text:'Your trip is <span class="hl">10 days</span>. You\'ll receive <span class="hl">2 bottles daily for the first 5 days</span> — that\'s 10 bottles total. But for the <span class="hl">remaining 5 days, you get NOTHING</span>.' },
        { type:'bottle-viz', config:{total:10, filled:10, label:'Your 10 water bottles'} },
        { type:'day-timeline', days:10, supplyDays:5 },
      ]
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
        score: 120, grade: 'good', icon: '🌟', title: 'Master Planner!',
        text: `At ${val} bottle(s)/day, your 10 bottles last all ${daysLast} days! You planned perfectly — every day is covered.`,
        lessonTitle: 'Budgeting — The Foundation of Financial Health',
        lesson: `<strong>Budgeting</strong> means planning how to use your money before you spend it. Just like you rationed water for 10 days, you should plan your earnings to cover all your expenses — rent, food, transport, and savings.<br><br><strong>The 50/30/20 Rule:</strong> Spend 50% on needs, 30% on wants, and save 20%. If you earn ₹10,000, save at least ₹2,000 every month!`,
        realworld: `Imagine you get ₹1,000 pocket money per month. If you spend ₹500 in the first week on snacks and games, you'll have very little for the remaining 3 weeks. But if you plan — ₹250/week — you're covered all month AND can save some!`
      };
      if (val <= 1.5) return {
        score: 70, grade: 'warn', icon: '😅', title: 'A Bit Tight!',
        text: `At ${val} bottles/day, you'll run out by day ${daysLast}. That's ${10-daysLast} days without water!`,
        lessonTitle: 'Budgeting — Plan for the Full Month',
        lesson: `You almost made it, but not quite. This is what happens when people spend "just a little more" than they should — they run short at the end of the month. A budget ensures your resources last the <strong>entire period</strong>, not just most of it.`,
        realworld: `Many adults live "paycheck to paycheck" because they don't budget properly. They run out of money before the next salary. Starting to budget early — even with pocket money — builds a habit that prevents this.`
      };
      return {
        score: 25, grade: 'bad', icon: '😰', title: 'Water Crisis!',
        text: `At ${val} bottles/day, you'll be completely out by day ${daysLast}! That's ${10-daysLast} days of survival without any water. Dangerous!`,
        lessonTitle: 'Budgeting — Why Overspending is Dangerous',
        lesson: `Spending too much too early is the #1 financial mistake. Without a budget, people spend freely at first and then have <strong>nothing left for essentials</strong> later. This leads to debt, stress, and crisis.`,
        realworld: `Think of it this way: if you get ₹500 for a school trip and spend ₹400 on souvenirs on day one, you'll have almost nothing left for food and transport. Always plan FIRST, spend SECOND.`
      };
    },
    quiz: {
      question: 'You get ₹6,000 pocket money for 3 months. How much should you spend per month?',
      choices: [
        { id: 'a', text: '₹6,000 in month 1 — live large!', correct: false },
        { id: 'b', text: '₹2,000 per month — spread it evenly', correct: true },
        { id: 'c', text: '₹3,000 for 2 months, nothing for the 3rd', correct: false },
        { id: 'd', text: '₹1,500 per month and save ₹1,500', correct: true, bonus: true },
      ],
      explanation: 'Spreading money evenly ensures you always have enough. Saving extra (option D) is even better — that\'s emergency savings! Never spend everything upfront.'
    }
  },

  // --- PHASE 2: CHALLENGE 2 — PEER PRESSURE ---
  {
    id: 'ch2',
    type: 'challenge',
    badge: 'Challenge 2 of 8',
    title: 'Peer Pressure on Mars',
    day: '3',
    intro: {
      icon: '👫',
      blocks: [
        { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Day 3 on Mars. You\'ve been doing well sticking to your plan. But you\'ve noticed something...' },
        { type:'card', icon:'🥳', title:'The Cool Kids', text:'Some kids at the station are drinking <span class="hl">3-4 bottles per day</span>! They\'re even <span class="hl">wasting water</span> — splashing it around, leaving bottles half-full.' },
        { type:'dialogue', bubbles:[
          { side:'left', label:'Other Kid', labelClass:'bubble-label-ai', text:'Why are you being so boring with your water? Live a little! We\'re on MARS!' },
          { side:'left', label:'Another Kid', labelClass:'bubble-label-ai', text:'Yeah, I\'m drinking 4 bottles a day. Water supply probably comes tomorrow anyway.' },
          { side:'right', label:'You (thinking)', labelClass:'bubble-label-player', text:'They make it look fun... but my plan says 1 per day. Should I change?' },
        ]},
      ]
    },
    interaction: {
      type: 'choice',
      question: 'What will you do?',
      choices: [
        { id:'stick', emoji:'🧠', title:'Stick to my plan', desc:'Keep drinking 1 bottle/day as planned' },
        { id:'slight', emoji:'😊', title:'Increase a little', desc:'Go to 1.5 bottles — enjoy a bit more' },
        { id:'match', emoji:'🎉', title:'Match the others', desc:'Drink 3+ bottles — they seem happy!' },
        { id:'extra', emoji:'🛡️', title:'Save even more', desc:'Cut to 0.5/day — build an emergency reserve' },
      ]
    },
    evaluate(val) {
      if (val === 'stick') return {
        score: 120, grade: 'good', icon: '🧠', title: 'Rock Solid Discipline!',
        text: 'You stuck to YOUR plan while others wasted their supply. By Day 7, the "cool kids" are begging for water — and you still have plenty!',
        lessonTitle: 'Follow Your Own Financial Plan',
        lesson: `<strong>Peer pressure</strong> is one of the biggest reasons people overspend. When friends buy expensive shoes, phones, or go on trips, you feel pressure to match them. But their financial situation is <strong>NOT yours</strong>.<br><br>The kids drinking 4 bottles might have extra (unlikely) or they're heading for disaster (likely). Your plan was based on YOUR reality.`,
        realworld: `If your friend buys a ₹50,000 phone on EMI, should you? NO. Their parents might earn differently. They might be going into debt. <strong>Make financial decisions based on YOUR budget</strong>, not what others are doing. The people who look "rich" are often the ones with the most debt.`
      };
      if (val === 'extra') return {
        score: 100, grade: 'good', icon: '🛡️', title: 'Ultra Disciplined!',
        text: 'You cut your consumption AND built an emergency buffer! When a water tank leaked on Day 8, your reserves saved your team.',
        lessonTitle: 'Building an Emergency Fund',
        lesson: `Saving more than the minimum is the mark of true financial wisdom. An <strong>Emergency Fund</strong> — typically 3-6 months of expenses — protects you from unexpected events like job loss, medical bills, or car repairs.`,
        realworld: `Even as a student, try saving a portion of any money you receive — birthday gifts, pocket money, part-time work. Even ₹100/month adds up. This habit of saving MORE than necessary will serve you for life.`
      };
      if (val === 'slight') return {
        score: 50, grade: 'warn', icon: '😬', title: 'Peer Influence Detected!',
        text: 'Increasing to 1.5 means you run out by Day 6. You survived, but the last 4 days were tough — and the cool kids? They ran out on Day 3!',
        lessonTitle: 'Soft Peer Pressure is Still Pressure',
        lesson: `You didn't fully cave, but the influence was enough to hurt your plan. In real life, "just one more purchase" or "I'll save next month" are soft forms of peer pressure — even from yourself!`,
        realworld: `"Lifestyle inflation" is when your spending grows every time your income grows. You get ₹2,000 pocket money instead of ₹1,000, but instead of saving the extra, you spend more. Resist the creep!`
      };
      return {
        score: 10, grade: 'bad', icon: '💸', title: 'The Herd Mentality Trap!',
        text: 'You matched the others at 3+ bottles/day and ran completely dry by Day 3! The others ran out too. Now EVERYONE is in trouble.',
        lessonTitle: 'Herd Mentality = Financial Disaster',
        lesson: `Following the crowd without thinking is called <strong>herd mentality</strong>. In the financial world, this causes bubbles and crashes — everyone buys something because "everyone is buying it," then it collapses.<br><br>Always <strong>think independently</strong> about your money.`,
        realworld: `The stock market crash of 2008 happened partly because everyone copied each other's risky investments. People who thought independently and stuck to their plan survived. Those who followed the crowd lost everything.`
      };
    },
    quiz: {
      question: 'Your best friend just bought a ₹40,000 gaming laptop. She says "You should get one too!" What\'s the best response?',
      choices: [
        { id:'a', text:'Buy it immediately — I don\'t want to feel left out', correct:false },
        { id:'b', text:'Check if it fits my budget, and save up if I really want it', correct:true },
        { id:'c', text:'Buy it on EMI — I\'ll pay later', correct:false },
        { id:'d', text:'Ask parents to buy it no matter what', correct:false },
      ],
      explanation: 'The right answer is always to check YOUR budget first. If you want something expensive, make a savings plan for it. Never buy impulsively just because someone else did — that\'s how debt starts.'
    }
  },

  // --- PHASE 3: CHALLENGE 3 — INSURANCE ---
  {
    id: 'ch3',
    type: 'challenge',
    badge: 'Challenge 3 of 8',
    title: 'The Space Dog & Insurance',
    day: '4',
    intro: {
      icon: '🐕‍🦺',
      blocks: [
        { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Day 4. A friendly space dog has been spotted near your station! It seems to want to join your crew.' },
        { type:'card', icon:'🐕', title:'Meet Cosmo the Space Dog', text:'Cosmo is trained to <span class="hl">guard supplies</span>. If you keep Cosmo, he\'ll <span class="hl">protect your water bottles</span> from theft, damage, and getting lost.' },
        { type:'card', icon:'💧', title:'The Cost', text:'Cosmo needs just a <span class="hl">small sip of water each day</span> — about 1/10th of a bottle. A tiny cost for a big benefit.' },
        { type:'card', icon:'⚠️', title:'The Risk Without Cosmo', text:'Without protection, there\'s a chance you could <span class="hl">lose 2-3 bottles</span> to theft or accidents during the mission. That could be catastrophic.' },
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Will you keep Cosmo the Space Dog?',
      choices: [
        { id:'yes', emoji:'🐕', title:'Yes — keep Cosmo!', desc:'Pay a small sip daily for protection against bottle loss' },
        { id:'no', emoji:'🚫', title:'No — I can\'t spare any water', desc:'Save every drop. I\'ll take my chances.' },
        { id:'temp', emoji:'🤔', title:'Keep him for a few days only', desc:'Try it briefly, then send him away to save water' },
      ]
    },
    evaluate(val) {
      if (val === 'yes') return {
        score: 120, grade: 'good', icon: '🐕', title: 'Protected!',
        text: 'Cosmo guarded your supply faithfully! On Day 7, a thief tried to steal 3 bottles — but Cosmo chased them away! Your small daily sip cost just 1 bottle total, but saved you 3. Net gain: 2 bottles!',
        lessonTitle: 'Insurance — Small Cost, Big Protection',
        lesson: `This is exactly how <strong>INSURANCE</strong> works. You pay a small <strong>premium</strong> (the sip) regularly to protect against a big potential loss (stolen bottles).<br><br><strong>Types of insurance:</strong><br>• <strong>Health Insurance</strong> — protects against huge medical bills<br>• <strong>Life Insurance</strong> — protects your family if something happens to you<br>• <strong>Car/Vehicle Insurance</strong> — covers accident damage<br>• <strong>Home Insurance</strong> — protects your biggest asset`,
        realworld: `A health insurance premium might be ₹15,000/year. That seems like a lot — until you need a surgery costing ₹5,00,000. Without insurance, you'd be financially devastated. With insurance, you're covered. <strong>Insurance is NOT optional.</strong>`
      };
      if (val === 'no') return {
        score: 20, grade: 'bad', icon: '😱', title: 'Unprotected!',
        text: 'Day 7: A thief stole 3 of your water bottles while you slept! Without Cosmo\'s protection, there was nothing stopping them. You lost 3 bottles — far more than the 1 bottle Cosmo would have cost.',
        lessonTitle: 'The Devastating Cost of No Insurance',
        lesson: `Without insurance, you\'re fully exposed to risks. That 1 bottle "saved" by not keeping Cosmo cost you 3 bottles when disaster struck.<br><br>People often skip insurance thinking "it won't happen to me." But accidents, illness, and theft happen to <strong>everyone</strong> eventually.`,
        realworld: `In India, a hospital stay can cost ₹1-10 lakhs. Without health insurance, families often go into debt or sell assets to pay medical bills. A ₹15,000/year premium is tiny compared to a ₹5 lakh bill. <strong>Always get insured.</strong>`
      };
      return {
        score: 55, grade: 'warn', icon: '😟', title: 'Partial Protection',
        text: 'Cosmo was with you for 3 days, then you sent him away. On Day 8 — the day after Cosmo left — 2 bottles were stolen. If Cosmo had stayed, you\'d have been protected!',
        lessonTitle: 'Consistent Insurance Coverage',
        lesson: `Insurance only protects you when it's <strong>active</strong>. Letting your policy lapse — even briefly — leaves you vulnerable at exactly the wrong moment. Keep your insurance continuous!`,
        realworld: `If you stop paying your health insurance premium for 3 months and then get sick, the insurance company won't cover you. Gaps in coverage are dangerous. Once you get insurance, <strong>never let it lapse</strong>.`
      };
    },
    quiz: {
      question: 'Which of these is NOT a real type of insurance?',
      choices: [
        { id:'a', text:'Health Insurance', correct:false },
        { id:'b', text:'Lottery Insurance (guarantees you win the lottery)', correct:true },
        { id:'c', text:'Life Insurance', correct:false },
        { id:'d', text:'Vehicle Insurance', correct:false },
      ],
      explanation: 'There\'s no such thing as "Lottery Insurance"! Real insurance protects against risks like health emergencies, accidents, and death. It does NOT guarantee profits or winnings — be wary of anyone who claims otherwise.'
    }
  },

  // --- PHASE 4: CHALLENGE 4 — FRAUD / PONZI ---
  {
    id: 'ch4',
    type: 'challenge',
    badge: 'Challenge 4 of 8',
    title: 'The Great Water Scam',
    day: '5',
    intro: {
      icon: '🎪',
      blocks: [
        { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Day 5. You come across a large crowd gathered around a charismatic person at the Mars marketplace...' },
        { type:'dialogue', bubbles:[
          { side:'left', label:'Mystery Man', labelClass:'bubble-label-ai', text:'Step right up! Give me just ONE bottle today, and I will give you THREE bottles TOMORROW! Guaranteed! 🤑' },
          { side:'left', label:'Kid in crowd', labelClass:'bubble-label-ai', text:'I gave him 1 bottle yesterday and got 3 back! It\'s real! I\'m giving ALL my bottles now!' },
          { side:'left', label:'Another kid', labelClass:'bubble-label-ai', text:'Me too! 3x return! Everyone\'s doing it!' },
          { side:'right', label:'You (thinking)', labelClass:'bubble-label-player', text:'3 bottles for 1? That would solve all my water problems... but where is HE getting all this water? 🤔' },
        ]},
        { type:'card', icon:'🚨', title:'Red Flags', text:'<span class="hl">Think carefully</span>: Where would he get enough water to give everyone 3x? Why would he give away water for free? Why are the "winners" so eager to put ALL their water back in?' },
      ]
    },
    interaction: {
      type: 'choice',
      question: 'What will you do?',
      choices: [
        { id:'avoid', emoji:'🛡️', title:'Stay far away!', desc:'This screams scam. I\'m keeping my water safe.' },
        { id:'investigate', emoji:'🔍', title:'Investigate first', desc:'Ask questions, verify claims before deciding' },
        { id:'one', emoji:'🤞', title:'Give just 1 bottle', desc:'Small risk — I can afford to lose 1 bottle' },
        { id:'all', emoji:'🤑', title:'Go all in!', desc:'Give everything for 3x return!' },
      ]
    },
    evaluate(val) {
      if (val === 'avoid') return {
        score: 120, grade: 'good', icon: '🛡️', title: 'Scam Dodged!',
        text: 'SMART! The next morning, the mystery man had VANISHED with everyone\'s water. Kids who gave their bottles were left with NOTHING. You kept all your water safe!',
        lessonTitle: 'Spotting Financial Fraud & Ponzi Schemes',
        lesson: `This was a <strong>PONZI SCHEME</strong> — a fraud where early investors are paid with money from later investors, creating an illusion of returns. Eventually, the scammer runs away with everyone's money.<br><br><strong>Red flags of fraud:</strong><br>• <strong>Guaranteed</strong> high returns (nothing in investing is guaranteed!)<br>• Returns that are <strong>much higher</strong> than normal (banks give 6-7%, not 200%!)<br>• Pressure to <strong>invest quickly</strong> ("limited time offer!")<br>• Testimonials from people who've "already made money"<br>• No clear explanation of <strong>how</strong> they generate returns`,
        realworld: `Famous scams: Bernie Madoff stole $65 BILLION in history's largest Ponzi scheme. In India, Saradha Group scam cheated millions of people out of ₹4,000+ crores. The rule is simple: <strong>if it sounds too good to be true, it IS.</strong>`
      };
      if (val === 'investigate') return {
        score: 100, grade: 'good', icon: '🔍', title: 'Smart Detective!',
        text: 'Your questions revealed the truth! The "winners" were the scammer\'s friends — planted to trick others. You reported him to the station authorities. Hero move!',
        lessonTitle: 'Always Do Your Due Diligence',
        lesson: `Before investing anywhere, <strong>investigate</strong>:<br>• Is the person/company <strong>registered</strong> with regulators (SEBI in India)?<br>• Can you verify the <strong>track record</strong>?<br>• Do they have a <strong>physical office</strong>?<br>• Is the return realistic compared to <strong>market rates</strong>?<br><br>Legitimate investments don't need hard-sell tactics.`,
        realworld: `Before investing in any mutual fund, stock, or scheme, check it on the SEBI website. Legitimate fund houses like HDFC Mutual Fund are registered and regulated. If someone approaches you with an "amazing opportunity" that isn't registered, RUN.`
      };
      if (val === 'one') return {
        score: 15, grade: 'bad', icon: '💧', title: 'Bottle Lost Forever!',
        text: 'The scammer vanished overnight. Your 1 bottle is gone forever. "Just trying" with a scammer still means losing money!',
        lessonTitle: 'There\'s No "Small Risk" with Fraud',
        lesson: `With legitimate risks (like stock investing), small bets are fine. But with <strong>fraud</strong>, any money given is gone. There's no "small loss" — it's 100% loss. The scammer isn't going to return anything.`,
        realworld: `Online scams work the same way: "Send ₹500 and get ₹5,000 back!" Once you send money to a fraudster through UPI or bank transfer, it's gone. No amount of complaining will get it back.`
      };
      return {
        score: 0, grade: 'bad', icon: '😱', title: 'Total Devastation!',
        text: 'You gave EVERYTHING and the scammer vanished. You have ZERO water. You\'re now completely dependent on others\' charity for survival. This is financial ruin.',
        lessonTitle: 'Financial Ruin from Greed',
        lesson: `Greed is the scammer's best weapon. The promise of easy, huge returns overrides logic. People have lost their <strong>life savings, homes, and retirement funds</strong> to Ponzi schemes because greed clouded their judgment.`,
        realworld: `Never invest money you can't afford to lose in any single scheme. And NEVER invest in anything that promises guaranteed extraordinary returns. The stock market averages about 12-15% per year over the long term. Anyone promising 200% overnight is a fraud.`
      };
    },
    quiz: {
      question: 'Someone messages you: "Invest ₹10,000 and earn ₹1,00,000 in 1 month! GUARANTEED!" What should you do?',
      choices: [
        { id:'a', text:'Send the money immediately before the offer expires', correct:false },
        { id:'b', text:'Ask a friend if they\'ve tried it', correct:false },
        { id:'c', text:'Block and report the number — it\'s definitely a scam', correct:true },
        { id:'d', text:'Send ₹1,000 first to test it', correct:false },
      ],
      explanation: '10x returns in 1 month is IMPOSSIBLE through legitimate means. This is 100% a scam. Don\'t even test it with a small amount. Block, report, and move on. Legitimate investments never message you with "guaranteed" returns.'
    }
  },

  // --- PHASE 5: CHALLENGE 5 — EQUITY INVESTING ---
  {
    id: 'ch5',
    type: 'challenge',
    badge: 'Challenge 5 of 8',
    title: 'Mars Companies & Equity',
    day: '6',
    intro: {
      icon: '🏗️',
      blocks: [
        { type:'narrative', speaker:'AI Companion', speakerClass:'speaker-ai', text:'Day 6! The Mars colony is growing. Astronauts have started building companies, and they need investors like YOU.' },
        { type:'card', icon:'🏭', title:'What is a "Company"?', text:'A company is a business that makes products or provides services. When you <span class="hl">invest in a company</span>, you become a <span class="hl">part-owner</span>. If the company does well, your investment grows. If it fails, you can lose your investment.' },
        { type:'card', icon:'📊', title:'Risk vs. Reward', text:'<span class="hl-green">High Potential Return</span> = High Risk (the company might fail)<br><br><span class="hl-blue">Low Risk</span> = Lower Return (safe, but grows slowly)<br><br>This is the fundamental trade-off of investing.' },
        { type:'card', icon:'🏦', title:'Two Options on Mars', text:'<span class="hl">Option A: Mars Bank (Fixed Deposit)</span> — Store your water in the bank. It\'s 100% safe, and they\'ll add 1 extra bottle after 10 days. Slow but safe.<br><br><span class="hl">Option B: Mars Company (Equity)</span> — Invest water in a company. If it succeeds (70% chance), you get 3 extra bottles! If it fails (30% chance), you lose your investment.' },
      ]
    },
    interaction: {
      type: 'choice',
      question: 'How will you invest your water?',
      choices: [
        { id:'split', emoji:'⚖️', title:'Split: half in Bank, half in Company', desc:'Balance safety and growth' },
        { id:'equity', emoji:'📈', title:'All in the Company', desc:'Maximum growth potential, but risky' },
        { id:'fd', emoji:'🏦', title:'All in the Bank (Fixed Deposit)', desc:'100% safe, guaranteed small return' },
        { id:'nothing', emoji:'🛏️', title:'Don\'t invest — keep water with me', desc:'No risk at all, but no growth' },
      ]
    },
    evaluate(val) {
      if (val === 'split') return {
        score: 120, grade: 'good', icon: '⚖️', title: 'Perfect Asset Allocation!',
        text: 'Brilliant! Your bank deposit earned 1 extra bottle (safe!), and your company investment earned 3 extra bottles (it succeeded!). Total gain: 4 bottles. But even if the company had failed, you\'d still have your safe bank bottles. Smart move!',
        lessonTitle: 'Asset Allocation — Don\'t Put All Eggs in One Basket',
        lesson: `<strong>Asset Allocation</strong> means dividing your money between different types of investments:<br><br>• <strong>Equity (Stocks/Companies)</strong> — Higher returns over long term (12-15%/year), but prices go up AND down<br>• <strong>Fixed Income (FDs/Bonds)</strong> — Safe, predictable returns (6-7%/year), but grows slowly<br>• <strong>Gold/Other Assets</strong> — Protection against inflation<br><br>The smartest strategy is to have a <strong>MIX of all three</strong> based on your age and goals.`,
        realworld: `The Indian stock market (Sensex) has grown from 100 in 1979 to over 70,000+ today. But it had MANY crashes along the way. Fixed deposits gave steady 6-7% throughout. People who had BOTH did well — the equity grew their wealth, and the FDs provided safety.`
      };
      if (val === 'equity') return {
        score: 80, grade: 'warn', icon: '📈', title: 'High Risk Pays Off... This Time!',
        text: 'The company succeeded and you got 3 extra bottles! Great return! But this was risky — there was a 30% chance of losing everything.',
        lessonTitle: 'Equity: High Growth, High Volatility',
        lesson: `Investing everything in equity can give great returns, but it's volatile. The Sensex has crashed 40-50% multiple times (2008, 2020). If you needed your money during a crash, you'd take huge losses.<br><br><strong>Rule: Only invest in equity what you won't need for 5+ years.</strong>`,
        realworld: `If you invested ₹10,000 in the Sensex in 2003, it would be worth ₹1,50,000+ by 2023. But in 2008, it would have temporarily dropped to ₹5,000! Those who held on got rich. Those who panicked and sold lost money.`
      };
      if (val === 'fd') return {
        score: 55, grade: 'warn', icon: '🏦', title: 'Safe but Slow',
        text: 'Your water is 100% safe and you earned 1 extra bottle. Meanwhile, other astronauts who invested in companies earned 3-5 extra bottles. You\'re safe but falling behind.',
        lessonTitle: 'Fixed Deposits: Safe but Inflation Risk',
        lesson: `Fixed Deposits (FDs) are safe and give guaranteed returns of about 6-7%. But there\'s a hidden risk: <strong>inflation</strong>.<br><br>If prices rise 6% per year and your FD earns 6%, your money's real growth is ZERO. Over decades, FD-only investors lose purchasing power while equity investors grow wealth.`,
        realworld: `In 1990, a cup of tea cost ₹2. Today it costs ₹20. That's inflation! If your money only grows at FD rates (6-7%), it barely keeps up with rising prices. You need equity (12-15% growth) to actually become wealthier over time.`
      };
      return {
        score: 30, grade: 'bad', icon: '🛏️', title: 'No Growth at All',
        text: 'Your water didn\'t grow at all. Others who invested now have 50-100% more. You\'re falling behind because your resources aren\'t working for you.',
        lessonTitle: 'Money Under the Mattress Loses Value',
        lesson: `Keeping all your money at home (or in a regular savings account at 3-4%) means it <strong>loses value</strong> every year due to inflation. Your ₹100 today will buy less next year, and even less the year after.`,
        realworld: `₹1 lakh kept at home for 20 years is still ₹1 lakh — but it can only buy what ₹25,000 bought 20 years ago! The same ₹1 lakh invested in a mutual fund could become ₹10+ lakhs in 20 years.`
      };
    },
    quiz: {
      question: 'What happens to money in a savings account (3-4% interest) if inflation is 6%?',
      choices: [
        { id:'a', text:'It grows in value', correct:false },
        { id:'b', text:'It stays the same', correct:false },
        { id:'c', text:'It actually loses purchasing power over time', correct:true },
        { id:'d', text:'Inflation doesn\'t affect savings', correct:false },
      ],
      explanation: 'If your money earns 4% but prices rise 6%, you\'re effectively losing 2% per year! This is why investing (not just saving) is essential. Your money needs to grow faster than inflation.'
    }
  },

  // --- PHASE 6: CHALLENGE 6 — MUTUAL FUNDS ---
  {
    id: 'ch6',
    type: 'challenge',
    badge: 'Challenge 6 of 8',
    title: 'Diversify Like a Pro',
    day: '7',
    intro: {
      icon: '🎯',
      blocks: [
        { type:'narrative', speaker:'AI Companion', speakerClass:'speaker-ai', text:'Day 7! Mars now has 9 different industries. The big question: WHERE should you invest your water?' },
        { type:'card', icon:'🎲', title:'The Challenge', text:'You can invest in <span class="hl">any combination</span> of these 9 industries. Some will <span class="hl-green">succeed</span> and some will <span class="hl" style="color:#ef5350">fail</span> — but you don\'t know which ones! Choose wisely.' },
        { type:'card', icon:'💡', title:'A Hint', text:'Think about what happens if you pick just ONE industry and it fails... versus picking FIVE industries where some succeed and some fail. Which strategy feels safer?' },
      ]
    },
    interaction: {
      type: 'invest-grid',
      question: 'Tap to select the industries you want to invest in:',
      industries: [
        { id:'pharma', name:'Pharma & Medicine', icon:'🧪', wins:true },
        { id:'logistics', name:'Logistics & Shipping', icon:'📦', wins:false },
        { id:'tech', name:'Technology & IT', icon:'💻', wins:true },
        { id:'food', name:'Restaurants & Food', icon:'🍽️', wins:false },
        { id:'energy', name:'Energy & Power', icon:'⚡', wins:true },
        { id:'realestate', name:'Real Estate', icon:'🏢', wins:false },
        { id:'manufacturing', name:'Manufacturing', icon:'🏭', wins:true },
        { id:'tourism', name:'Hotels & Tourism', icon:'✈️', wins:false },
        { id:'transport', name:'Space Transport', icon:'🚀', wins:true },
      ],
      hint: 'Select as many as you like. More = more diversified!'
    },
    evaluate(picks) {
      const winners = this.interaction.industries.filter(i=>i.wins).map(i=>i.id);
      const hits = picks.filter(p=>winners.includes(p)).length;
      const misses = picks.filter(p=>!winners.includes(p)).length;
      const total = picks.length;
      if (total === 0) return {
        score: 10, grade: 'bad', icon: '😶', title: 'Missed Opportunity!',
        text: 'You didn\'t invest in anything! Your water stayed flat while investors grew theirs by 50-100%.',
        lessonTitle: 'Why Mutual Funds Exist',
        lesson: `If picking individual industries feels risky or confusing, that's exactly why <strong>Mutual Funds</strong> exist! A mutual fund collects money from many investors and a <strong>professional Fund Manager</strong> invests it across dozens of companies for you.`,
        realworld: `You don't need to be an expert stock picker. A mutual fund like HDFC Balanced Fund invests across many sectors — banking, tech, pharma, energy — so even if one sector fails, others carry you forward.`
      };
      if (total >= 5) return {
        score: 120, grade: 'good', icon: '🌟', title: 'Diversification Master!',
        text: `You picked ${total} industries! ${misses > 0 ? `Yes, ${misses} failed — but your ${hits} winners MORE than made up for the losses!` : 'And most were winners!'} Your overall portfolio grew significantly because you spread your bets.`,
        lessonTitle: 'Mutual Funds = Professional Diversification',
        lesson: `<strong>This is EXACTLY how mutual funds work!</strong><br><br>A <strong>Mutual Fund</strong> pools money from thousands of investors and invests across <strong>many companies and sectors</strong>. A professional Fund Manager researches and picks the investments.<br><br><strong>Benefits of Mutual Funds:</strong><br>• <strong>Diversification</strong> — spread across many companies, reducing risk<br>• <strong>Professional Management</strong> — experts pick stocks for you<br>• <strong>Low Minimum</strong> — start with as little as ₹500/month<br>• <strong>Liquidity</strong> — withdraw anytime (for most funds)<br>• <strong>Regulated</strong> — supervised by SEBI for your protection`,
        realworld: `Instead of trying to pick which company stock to buy (risky!), you can invest in a mutual fund that holds 50+ different stocks. If 10 companies fail but 40 succeed, you still come out ahead. That's the magic of diversification through mutual funds!`
      };
      if (total >= 3 && hits > misses) return {
        score: 85, grade: 'good', icon: '📊', title: 'Good Diversification!',
        text: `${hits} of your ${total} picks won! Diversifying across ${total} industries reduced your risk nicely.`,
        lessonTitle: 'The More You Diversify, the Safer You Are',
        lesson: `You did well! But imagine if you\'d picked all 9 — even with 4 losers, the 5 winners would have given you excellent overall returns. The more diversified your portfolio, the smoother your ride.`,
        realworld: `A mutual fund typically holds 30-80 different stocks. This means even if 10 companies have a bad year, the other 20-70 can carry the performance. You'd never get this level of diversification buying individual stocks.`
      };
      return {
        score: 40, grade: 'warn', icon: '😬', title: 'Too Concentrated!',
        text: `With only ${total} pick(s), you were too concentrated. ${misses > 0 ? 'The failures hit hard.' : 'It worked, but it was risky.'}`,
        lessonTitle: 'Concentration Risk',
        lesson: `Putting all your money in 1-2 investments is <strong>concentration risk</strong>. If those few investments fail, you lose big. Diversification is your best defense — and mutual funds do it automatically.`,
        realworld: `If you invest all your money in one company's stock and that company fails (like Kingfisher Airlines), you lose everything. But a mutual fund holding 50 stocks? One company failing barely dents your portfolio.`
      };
    },
    quiz: {
      question: 'What is a Mutual Fund?',
      choices: [
        { id:'a', text:'A type of bank account with high interest', correct:false },
        { id:'b', text:'A pool of money from many investors, professionally managed across many stocks/bonds', correct:true },
        { id:'c', text:'A government scheme that guarantees double your money', correct:false },
        { id:'d', text:'A savings account at the post office', correct:false },
      ],
      explanation: 'A Mutual Fund collects money from many investors and a professional Fund Manager invests it across a diversified portfolio of stocks, bonds, or other assets. It\'s one of the best ways for anyone to start investing — even with just ₹500/month!'
    }
  },

  // --- PHASE 7: CHALLENGE 7 — COMPOUNDING ---
  {
    id: 'ch7',
    type: 'challenge',
    badge: 'Challenge 7 of 8',
    title: 'The Magic Plant',
    day: '8',
    intro: {
      icon: '🌱',
      blocks: [
        { type:'narrative', speaker:'Mission Control', speakerClass:'speaker-mission', text:'Day 8! Your final scientific mission: make a part of Mars GREEN by growing a special plant.' },
        { type:'card', icon:'🌿', title:'The Mars Plant', text:'You\'ve planted a special fast-growing Mars tree.<br><br>On Day 1, it\'s just <span class="hl">0.5 feet</span> tall — barely a seedling.<br>But it <span class="hl">doubles in size every day</span>.' },
        { type:'card', icon:'🎯', title:'The Goal', text:'Your target: grow the tree to at least <span class="hl">100 feet tall</span> within 10 days. That seems impossible from a tiny 0.5-foot seedling... doesn\'t it?' },
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Can a 0.5-foot plant reach 100+ feet in just 10 days by doubling daily?',
      choices: [
        { id:'yes', emoji:'✅', title:'YES — Doubling adds up fast!', desc:'I trust the math' },
        { id:'no', emoji:'❌', title:'NO — 0.5 is way too small', desc:'No way it reaches 100 in 10 days' },
        { id:'maybe', emoji:'🤔', title:'MAYBE — I\'m not sure', desc:'The math isn\'t clear to me' },
      ]
    },
    evaluate(val) {
      const days = [0.5, 1, 2, 4, 8, 16, 32, 64, 128, 256];
      const base = { showCompound: true, days };
      if (val === 'yes') return {
        ...base, score: 120, grade: 'good', icon: '🌳', title: 'You Understand Compounding!',
        text: 'CORRECT! Watch the growth: 0.5 → 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 feet! By Day 10, the tree is 256 feet — TOWERING over the 100-foot goal!',
        lessonTitle: 'The Power of Compounding — The 8th Wonder',
        lesson: `Albert Einstein reportedly called compound interest <strong>"the 8th wonder of the world"</strong>.<br><br><strong>Compounding</strong> means your gains generate their own gains. It starts slow but becomes EXPLOSIVE over time:<br>• Year 1: ₹10,000 → ₹11,200 (+₹1,200)<br>• Year 10: ₹10,000 → ₹31,058 (tripled!)<br>• Year 20: ₹10,000 → ₹96,462 (nearly 10x!)<br>• Year 30: ₹10,000 → ₹2,99,599 (30x!)<br><br>The growth looks tiny at first, then EXPLODES. This is why <strong>starting early is everything</strong>.`,
        realworld: `If you invest just ₹1,000/month starting at age 15, by age 60 (45 years), at 12% average returns, you'd have approximately ₹1.6 CRORE! But if you start at age 30 (only 30 years), you'd have just ₹35 lakhs. Same monthly amount — but 15 extra years of compounding makes a 4.5x difference!`
      };
      if (val === 'maybe') return {
        ...base, score: 70, grade: 'warn', icon: '🤯', title: 'Surprise — It Totally Works!',
        text: 'The math is mind-blowing: 0.5 → 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 feet! The doubling seems slow at first, but by Day 8 it EXPLODES past 100!',
        lessonTitle: 'Why Compounding Fools Our Brains',
        lesson: `Humans are bad at understanding <strong>exponential growth</strong>. We think linearly: 0.5, 1, 1.5, 2... But compounding is exponential: 0.5, 1, 2, 4, 8, 16...<br><br>This is why people underestimate long-term investing. The first few years feel slow ("only ₹1,200 gain?"), but after 20-30 years, the growth is astonishing.`,
        realworld: `Warren Buffett, one of the richest people in the world, made 99% of his wealth AFTER age 50! His investments compounded for decades, and the explosive growth came later. Patience + time = extraordinary wealth.`
      };
      return {
        ...base, score: 40, grade: 'warn', icon: '😲', title: 'Think Again — It Absolutely Works!',
        text: 'Most people guess wrong! Here\'s the proof: 0.5 → 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 → 256 feet. That tiny seedling DOES reach 100+ feet, and then some!',
        lessonTitle: 'Start Early — Time is Your Superpower',
        lesson: `Most people think they need to invest LARGE amounts to get rich. Wrong! You need to invest <strong>EARLY</strong>. Compounding does the heavy lifting over time.<br><br><strong>The doubling rule (Rule of 72):</strong> Divide 72 by your annual return to know how many years it takes to double your money.<br>• At 12% return: 72/12 = 6 years to double<br>• At 8% return: 72/8 = 9 years to double`,
        realworld: `Here's the shocking math: If two friends both invest ₹5,000/month at 12% returns — Friend A from age 20-30 (stops after 10 years) vs Friend B from age 30-60 (invests for 30 years) — Friend A ends up with MORE money at age 60! Despite investing for only 10 years vs 30 years! That's the unfair advantage of starting early.`
      };
    },
    quiz: {
      question: 'The Rule of 72: If your investment grows at 12% per year, approximately how long does it take to DOUBLE?',
      choices: [
        { id:'a', text:'12 years', correct:false },
        { id:'b', text:'6 years (72÷12=6)', correct:true },
        { id:'c', text:'72 years', correct:false },
        { id:'d', text:'It never doubles', correct:false },
      ],
      explanation: 'The Rule of 72 is a quick mental math trick: divide 72 by your annual return percentage. At 12%, your money doubles every 6 years! At 8%, it doubles every 9 years. This is why even a few extra percent of return makes a huge difference over decades.'
    }
  },

  // --- PHASE 8: CHALLENGE 8 — SIP ---
  {
    id: 'ch8',
    type: 'challenge',
    badge: 'Challenge 8 of 8',
    title: 'The SIP Strategy',
    day: '9',
    intro: {
      icon: '💧',
      blocks: [
        { type:'narrative', speaker:'AI Companion', speakerClass:'speaker-ai', text:'Day 9 — your final challenge, Commander {name}! You\'ve learned about saving, insurance, avoiding scams, investing, and compounding. Now let\'s tie it all together.' },
        { type:'card', icon:'📊', title:'The Water Market', text:'Mars now has a water market where the price of water fluctuates daily:<br><br>Day 1: 1 bottle = <span class="hl">₹10</span><br>Day 2: 1 bottle = <span class="hl">₹15</span> (expensive!)<br>Day 3: 1 bottle = <span class="hl">₹8</span> (cheap!)<br>Day 4: 1 bottle = <span class="hl">₹12</span><br>Day 5: 1 bottle = <span class="hl">₹7</span> (very cheap!)' },
        { type:'card', icon:'💡', title:'Two Strategies', text:'<span class="hl">Strategy A (Lump Sum):</span> Invest all ₹50 on Day 1. You get 5 bottles at ₹10 each.<br><br><span class="hl">Strategy B (SIP):</span> Invest ₹10 each day for 5 days. You buy different amounts each day depending on the price:<br>Day 1: 1 bottle (₹10), Day 2: 0.67 bottles (₹15), Day 3: 1.25 bottles (₹8), Day 4: 0.83 bottles (₹12), Day 5: 1.43 bottles (₹7)<br>= <span class="hl-green">5.18 bottles total!</span>' },
      ]
    },
    interaction: {
      type: 'choice',
      question: 'Which investment strategy do you prefer?',
      choices: [
        { id:'sip', emoji:'📅', title:'Regular small investments (SIP)', desc:'Invest a fixed amount regularly, no matter the price' },
        { id:'lump', emoji:'💰', title:'Invest everything at once (Lump Sum)', desc:'Put all your money in right now' },
        { id:'wait', emoji:'⏳', title:'Wait for the lowest price', desc:'Try to time the market for the best deal' },
        { id:'none', emoji:'😴', title:'Don\'t invest at all', desc:'Keep everything in cash — too risky' },
      ]
    },
    evaluate(val) {
      if (val === 'sip') return {
        score: 130, grade: 'good', icon: '📅', title: 'SIP Champion!',
        text: 'The SIP strategy got you 5.18 bottles for ₹50 — MORE than the lump sum\'s 5 bottles! When prices were high, you bought less. When prices were low, you bought more. The average cost was lower!',
        lessonTitle: 'SIP — The Smartest Investment Strategy',
        lesson: `<strong>SIP (Systematic Investment Plan)</strong> means investing a <strong>fixed amount at regular intervals</strong> (usually monthly).<br><br><strong>How SIP works:</strong><br>• When market is HIGH → your fixed amount buys fewer units<br>• When market is LOW → your fixed amount buys MORE units<br>• Over time, your average cost is lower than the average price!<br><br>This is called <strong>Rupee Cost Averaging</strong>. It removes the need to "time the market."<br><br><strong>SIP advantages:</strong><br>• No need to predict market direction<br>• Builds <strong>discipline</strong> (automatic investing every month)<br>• Works even with small amounts (₹500/month)<br>• Combines beautifully with <strong>compounding</strong>`,
        realworld: `A ₹5,000/month SIP in a good equity mutual fund, started at age 25, could grow to approximately ₹3.5 crore by age 60 (at 12% average annual returns). That's the combined power of SIP + Compounding + Time. Start as early as possible!`
      };
      if (val === 'lump') return {
        score: 55, grade: 'warn', icon: '📊', title: 'Timing Risk!',
        text: 'You invested all ₹50 on Day 1 at ₹10/bottle, getting 5 bottles. But if you\'d invested on Day 5 at ₹7/bottle, you\'d get 7.14 bottles! Timing a lump sum is risky — you might invest at the worst time.',
        lessonTitle: 'The Problem with Lump Sum Investing',
        lesson: `Lump sum investing means putting all your money in at once. It CAN work if you invest at a low point, but how do you know it's the low point? You can't predict the market.<br><br>What if you invested a lump sum on January 2008 (market peak) right before the crash? Your money would have halved! SIP protects against this by spreading your investment over time.`,
        realworld: `Studies show SIP performs better than lump sum for most investors because it removes emotion and timing from the equation. You don't need to read financial news or track the market — just set up an automatic SIP and let it work.`
      };
      if (val === 'wait') return {
        score: 25, grade: 'bad', icon: '⏳', title: 'Still Waiting!',
        text: 'You spent 5 days trying to find the lowest price. By the time you decided, the prices went: ₹10, ₹15, ₹8, ₹12, ₹7. You waited for ₹7 but missed the earlier cheaper days. And what if tomorrow it\'s ₹5... or ₹20? You can\'t know!',
        lessonTitle: 'Time in the Market > Timing the Market',
        lesson: `The famous investing saying is: <strong>"Time in the market beats timing the market."</strong><br><br>Nobody — not even professional investors — can consistently predict market highs and lows. By waiting for the "perfect time," you lose the biggest advantage: time for compounding to work.`,
        realworld: `Research shows that if you missed just the 10 best days in the stock market over 20 years, your returns would be cut in HALF. Since you can't predict those best days, staying invested (through SIP) is the winning strategy.`
      };
      return {
        score: 10, grade: 'bad', icon: '😴', title: 'Opportunity Lost!',
        text: 'Your money sat idle, earning nothing. Inflation ate into its value. Meanwhile, SIP investors grew their wealth by 50%+.',
        lessonTitle: 'The Cost of Inaction',
        lesson: `Not investing is also a decision — a costly one. Inflation (prices rising 5-6% per year) silently reduces your money's purchasing power. ₹1 lakh today will only be worth ₹55,000 in purchasing power after 10 years if you don't invest!`,
        realworld: `The biggest regret of most financially savvy adults? "I wish I started investing sooner." Every year you don't invest is a year of compounding you lose. Don't let fear or indecision steal your financial future. Start a SIP today!`
      };
    },
    quiz: {
      question: 'What does SIP stand for?',
      choices: [
        { id:'a', text:'Safe Investment Protection', correct:false },
        { id:'b', text:'Systematic Investment Plan', correct:true },
        { id:'c', text:'Stock Index Purchase', correct:false },
        { id:'d', text:'Savings Interest Program', correct:false },
      ],
      explanation: 'SIP = Systematic Investment Plan. It means investing a fixed amount (e.g., ₹500 or ₹5,000) every month into a mutual fund, automatically. It\'s the easiest and most powerful way to build wealth over time. Even kids can start with small amounts!'
    }
  },

  // --- PHASE 9: RECAP ---
  {
    id: 'recap',
    type: 'recap',
    items: [
      { num: 1, concept: 'Budget & Plan Ahead', lesson: 'Don\'t spend everything at once. Plan your income to last the entire period. Use the 50/30/20 rule.', icon: '📋' },
      { num: 2, concept: 'Follow Your Own Plan', lesson: 'Don\'t let peer pressure change your financial decisions. What works for others may not work for you.', icon: '🧠' },
      { num: 3, concept: 'Insurance is a Must', lesson: 'Pay a small regular premium to protect against big unexpected losses. Health & life insurance are essential.', icon: '🛡️' },
      { num: 4, concept: 'Avoid Fraud & Scams', lesson: 'If returns sound too good to be true, they ARE. Never invest in unverified schemes. Check SEBI registration.', icon: '🚨' },
      { num: 5, concept: 'Equity & Fixed Income', lesson: 'Balance high-growth equity with safe fixed deposits. Don\'t put all eggs in one basket.', icon: '⚖️' },
      { num: 6, concept: 'Mutual Funds & Diversification', lesson: 'Mutual funds spread your money across many investments, professionally managed. Start with just ₹500/month.', icon: '🎯' },
      { num: 7, concept: 'Power of Compounding', lesson: 'Small amounts grow exponentially over time. Starting early is your #1 advantage. Use the Rule of 72!', icon: '🌳' },
      { num: 8, concept: 'SIP — Invest Regularly', lesson: 'A Systematic Investment Plan removes timing risk and builds wealth through discipline and consistency.', icon: '📅' },
    ]
  },

  // --- PHASE 10: FINAL / CERTIFICATE ---
  {
    id: 'final',
    type: 'final',
    ranks: [
      { minScore: 900, title: 'Mars Financial Legend', emoji: '🏆' },
      { minScore: 750, title: 'Mars Financial Commander', emoji: '🎖️' },
      { minScore: 550, title: 'Mars Financial Cadet', emoji: '🌟' },
      { minScore: 300, title: 'Mars Financial Rookie', emoji: '🚀' },
      { minScore: 0, title: 'Mars Financial Trainee', emoji: '📚' },
    ]
  }
];

// ===== SECRET MILLIONAIRE CLUB — BONUS FACTS =====
const BONUS_FACTS = [
  { fact: 'Warren Buffett bought his first stock at age 11 and says he started too late!', source: 'Warren Buffett' },
  { fact: 'The Rule of 72: Divide 72 by your return rate to find how many years to double your money.', source: 'Finance Rule' },
  { fact: 'Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn\'t, pays it.', source: 'Attributed to Albert Einstein' },
  { fact: 'The Indian stock market (Sensex) has given ~15% average annual returns over 40 years.', source: 'BSE Data' },
  { fact: '₹500/month SIP started at age 15 could grow to over ₹1 crore by age 55!', source: 'At 12% CAGR' },
  { fact: 'More than 50% of Indian households have NO investments beyond savings accounts.', source: 'SEBI Survey' },
  { fact: 'A mutual fund SIP of ₹10,000/month for 30 years at 12% becomes ₹3.5 crore!', source: 'Compounding Math' },
  { fact: 'The biggest risk in investing is not investing at all — inflation eats your money silently.', source: 'Financial Wisdom' },
];
