/**
 * EduTutor AI - 智慧家教與錯題診斷學習系統
 * 資料核心與互動邏輯
 */

// 1. 學生資料與診斷模型
const currentStudent = {
  name: "黃芊瑜",
  department: "資料處理科（資處科）",
  grade: "一年 仁班",
  seatNumber: "07",
  subject: "數位科技概論（上）",
  examTitle: "隨堂測驗卷 第 3 回：系統平台的組成架構－硬體（第3章）",
  score: 68,
  totalScore: 100,
  deduction: 32,
  totalQuestions: 25,
  scannedQuestions: 13,
  wrongCountPage1: 4,
  estimatedTotalWrong: 8,
  classAverage: 74.5,
  masteryRadar: {
    "電腦五大架構": 88,
    "CPU與運算指標": 42,
    "記憶體儲存階層": 60,
    "周邊介面與熱插拔": 50,
    "硬體組裝與擴充": 45
  },
  learningStyle: "邏輯推理與架構感好，但在微觀名詞細節（縮寫、硬體插槽實體規格）易被題目語意陷阱誤導",
  pedagogicalPrescription: "以資處科未來的『統測專業科目（商管群/資電類）』高頻考點與『電腦軟硬體裝修/軟體應用檢定』實務做連結，提升精準度與秒殺能力！"
};

// 2. 試卷 1~13 題完整題庫資料庫（含學生真實作答與紅筆標記）
const examQuestions = [
  {
    id: 1,
    question: "隨機存取記憶體（RAM）區分為動態隨機存取記憶體（DRAM）及靜態隨機存取記憶體（SRAM）兩種，請問下列哪一項是SRAM優於DRAM的特點？",
    options: {
      A: "單位資料的存取速度較快",
      B: "單位面積所能儲存資料量較小",
      C: "需要持續充電更新（refresh），才能確保資料完整",
      D: "每單位資料的儲存成本較低"
    },
    studentAns: "A",
    correctAns: "A",
    isWrong: true, // 考卷上題號有紅斜線標記
    teacherNote: "SRAM 速度極快、作為快取記憶體；DRAM 便宜容量大、需充電 refresh 作為主記憶體",
    category: "記憶體儲存階層",
    analysis: "SRAM（靜態隨機存取記憶體）使用雙極性正反器（Flip-Flop）電路，速度極快且不需充電刷新（refresh），常作為 CPU 內部的快取記憶體（Cache）。選項 (B) 單位面積儲存量較小是 SRAM 的缺點（積體度低）；(C) 需要持續充電是 DRAM 的特點；(D) 成本較低是 DRAM 的優勢。",
    tutorTip: "💡 【家教生活化記憶法】：SRAM 的 S 記成『Speedy（光速神醫）』，直接待在 CPU 旁隨時快取；DRAM 的 D 記成『Dynamic / Discharge（像漏充電容）』，需要護理師定時巡房充電！"
  },
  {
    id: 2,
    question: "傑克將iPhone手機拍攝的照片轉存到電腦中，並列印出來與朋友分享。請問列印設備在電腦的五大單元中，是歸屬為下列哪一種單元？",
    options: {
      A: "控制單元",
      B: "輸入單元",
      C: "輸出單元",
      D: "記憶單元"
    },
    studentAns: "C",
    correctAns: "C",
    isWrong: false,
    teacherNote: "正確！印表機屬於輸出單元",
    category: "電腦五大架構",
    analysis: "印表機（Printer）將數位訊號轉換為紙本實體呈現給使用者，屬於標準的輸出單元（Output Unit）。",
    tutorTip: "💡 學生概念穩固：輸入＝鍵盤/掃描器/麥克風；輸出＝螢幕/印表機/喇叭。"
  },
  {
    id: 3,
    question: "下列對於電腦硬體五大單元的敘述何者有誤？",
    options: {
      A: "輸入單元：待處理的資料須經由此單元進入電腦",
      B: "輸出單元：處理完成之資料由此單元送出",
      C: "算術邏輯單元：所有的算術運算均在此單元完成",
      D: "記憶單元：僅儲存輸入待處理之資料"
    },
    studentAns: "D",
    correctAns: "D",
    isWrong: false,
    teacherNote: "正確！記憶單元同時儲存指令、運算中間值與輸出結果",
    category: "電腦五大架構",
    analysis: "記憶單元（MU）除了存放等待處理的輸入資料，還負責儲存程式碼指令、CPU 計算中的中間暫存數據，以及運算完畢等待輸出的資料，選項 (D) 使用『僅』字過於絕對，故有誤。",
    tutorTip: "💡 掌握題眼技巧：題目中出現『僅』、『必定』、『絕對』時，往往是重要陷阱題眼！"
  },
  {
    id: 4,
    question: "電腦基本架構中有數個主要的組成單元（或部門），其中負責存放電腦程式與資料的單元是：",
    options: {
      A: "算術與邏輯單元",
      B: "輸入單元",
      C: "記憶單元",
      D: "控制單元"
    },
    studentAns: "C",
    correctAns: "C",
    isWrong: false,
    teacherNote: "正確！",
    category: "電腦五大架構",
    analysis: "負責存放程式（Instructions）與資料（Data）的單元即為記憶單元（Memory Unit）。",
    tutorTip: "💡 馮·紐曼（Von Neumann）架構核心：內存程式概念（Stored-Program Concept）。"
  },
  {
    id: 5,
    question: "在電腦的組成單元中，下列哪兩個單元合稱為中央處理單元？",
    options: {
      A: "輸入單元及控制單元",
      B: "控制單元及算術／邏輯單元",
      C: "輸入單元及輸出單元",
      D: "算術／邏輯單元及記憶單元"
    },
    studentAns: "B",
    correctAns: "B",
    isWrong: false,
    teacherNote: "正確！CPU = CU + ALU",
    category: "電腦五大架構",
    analysis: "CPU（Central Processing Unit）是由控制單元（CU, Control Unit）與算術邏輯單元（ALU, Arithmetic and Logic Unit）組合而成。",
    tutorTip: "💡 【護理類比】：CPU 就像主治醫師的大腦，CU 負責指揮醫囑流程，ALU 負責精密計算用藥劑量。"
  },
  {
    id: 6,
    question: "請問所謂的I/O指的是",
    options: {
      A: "1跟0",
      B: "物聯網(IoT)",
      C: "輸入與輸出",
      D: "整合式辦公室系統 (integrated office system)"
    },
    studentAns: "C",
    correctAns: "C",
    isWrong: false,
    teacherNote: "正確！I/O = Input / Output",
    category: "周邊介面與熱插拔",
    analysis: "I 代表 Input（輸入），O 代表 Output（輸出），合稱 I/O（輸入輸出介面）。",
    tutorTip: "💡 【護理類比】：就像病患的『I/O Sheet（攝入量與排出量紀錄單）』，電腦也是 Input 進來、Output 出去！"
  },
  {
    id: 7,
    question: "關於「熱插拔」的敘述，何者為真？",
    options: {
      A: "只能在開機的情況下插拔",
      B: "只能在關機的情況下插拔",
      C: "在開機及關機的情況下皆可插拔",
      D: "只有當主機溫度高於一定溫度時才可插拔"
    },
    studentAns: "A",
    correctAns: "C",
    isWrong: true,
    teacherNote: "不用關機的情況下直接插拔硬體設備的功能（關機時當然也能拔！）",
    category: "周邊介面與熱插拔",
    analysis: "【重大盲點剖析】：學生將『開機運作中不需關機即可插拔設備』誤解為『只能在開機時拔』。關機斷電時本就可以安全更換任何硬體！熱插拔（Hot Swapping）的特點是在開機運作下也能安全插拔，故開機與關機皆可。",
    tutorTip: "💡 【家教生活化記憶法】：就像換點滴袋一樣，在輸液運作中可以直接抽換（不用把整個病人重開機），病人睡著關機時當然也能換！熱插拔核心是『不需要關機』，絕非『禁止關機』！"
  },
  {
    id: 8,
    question: "阿布想要為自己的筆記型電腦擴充2G的RAM，請問他應該將RAM安插在下列哪一種插槽？",
    options: {
      A: "記憶體插槽",
      B: "PCI-E插槽",
      C: "CPU插槽",
      D: "M.2插槽"
    },
    studentAns: "B",
    correctAns: "A",
    isWrong: true,
    teacherNote: "RAM 是插在記憶體插槽（SO-DIMM / SDRAM記憶體）",
    category: "硬體組裝與擴充",
    analysis: "【插槽規格混淆】：RAM（隨機存取記憶體）必須安裝在主機板的『記憶體插槽』（桌上型為 DIMM，筆電為 SO-DIMM）。PCI-E 插槽是用來插獨立顯卡、網卡等；M.2 插槽是用於 NVMe 固態硬碟或無線網卡；CPU 插槽（Socket）是裝中央處理器。",
    tutorTip: "💡 【各插槽對照表】：<br>• 記憶體插槽 → RAM（DDR4/DDR5）<br>• PCI-E → 獨立顯示卡、擴充卡<br>• M.2 → 高速 SSD 固態硬碟<br>• Socket / CPU 插槽 → 處理器晶片"
  },
  {
    id: 9,
    question: "微軟公司在台灣成立了亞洲第一座「雲端運算」中心，以整合電腦的運算資源，來提供給國內各項創新研究計畫使用。一般而言，研究計畫都需要大量的運算，包括計算、比對、配對等不同的處理，請問電腦中負責這些運算工作的是下列哪一個單元？",
    options: {
      A: "CU",
      B: "MU",
      C: "ALU",
      D: "OU"
    },
    studentAns: "C",
    correctAns: "C",
    isWrong: false,
    teacherNote: "正確！ALU 負責算術與邏輯比對",
    category: "CPU與運算指標",
    analysis: "運算包括數值計算（算術運算）與條件比對（邏輯運算），均是由 CPU 內的 ALU（Arithmetic and Logic Unit，算術邏輯單元）執行。",
    tutorTip: "💡 學生對 ALU 的功能辨識清楚，運算/比對/計算關鍵字掌握度佳。"
  },
  {
    id: 10,
    question: "MIPS為一種衡量電腦CPU之測量指標，其中I代表：",
    options: {
      A: "資訊 (Information)",
      B: "指令 (Instruction)",
      C: "輸入 (Input)",
      D: "內部 (Internal)"
    },
    studentAns: "A",
    correctAns: "B",
    isWrong: true,
    teacherNote: "MIPS: Millions of Instructions Per Second 每秒百萬指令數 -> 指令",
    category: "CPU與運算指標",
    analysis: "【縮寫盲點剖析】：MIPS 全名為 Millions of Instructions Per Second（每秒百萬指令數），其中 I 代表 Instruction（指令）。學生憑直覺猜測成 Information（資訊）。",
    tutorTip: "💡 【常見 CPU 效能指標一覽】：<br>• <b>MIPS</b>: Millions of <b>Instructions</b> Per Second（每秒百萬<b>指令</b>數）<br>• <b>FLOPS</b>: <b>Floating-point</b> Operations Per Second（每秒<b>浮點運算</b>次數，衡量超算）<br>• <b>GHz / 時脈</b>: 每秒鐘時脈震盪週期（Clock Cycles）"
  },
  {
    id: 11,
    question: "在「星際迷航記」影集中，船長寇克領導眾船員一同探索宇宙，當遭遇危機時，船長便會指派船員完成各自的工作，並引導船員們脫離險境。請問若以船長扮演的角色來看，可比喻成電腦的哪一個單元最適當？",
    options: {
      A: "輸入單元",
      B: "記憶單元",
      C: "輸出單元",
      D: "控制單元"
    },
    studentAns: "D",
    correctAns: "D",
    isWrong: false,
    teacherNote: "正確！CU 負責指揮控制全機",
    category: "電腦五大架構",
    analysis: "船長負責發號施令、指揮調度與決策引導，正如同電腦中控制單元（CU, Control Unit）指揮協調各部件運作的角色。",
    tutorTip: "💡 學生情境比喻理解力強，能順利將組織指揮官對應到 CU！"
  },
  {
    id: 12,
    question: "志華購買了一台安裝8GB記憶體的64位元電腦，下列有關該台電腦的敘述何者正確？",
    options: {
      A: "8GB指的是快取記憶體的容量",
      B: "一般用途暫存器的位元數為8GB",
      C: "CPU時脈頻率為64位元",
      D: "64位元指的是一般用途暫存器的位元數"
    },
    studentAns: "D",
    correctAns: "D",
    isWrong: false,
    teacherNote: "正確！64位元代表暫存器寬度/資料匯流排寬度",
    category: "CPU與運算指標",
    analysis: "所謂『64位元電腦』是指 CPU 內部的一般用途暫存器（General-Purpose Registers）或內部資料匯流排的寬度為 64 位元（bit）。8GB 指的是主記憶體（RAM）的容量。",
    tutorTip: "💡 觀念清晰：快取記憶體通常僅數十MB，8GB 為主記憶體。"
  },
  {
    id: 13,
    question: "高雄六龜區為了成立社區數位機會中心 (digital opportunity center)，打算將原來社區教室的電腦全數移轉至該中心。如果你是數位機會中心的電腦管理員，為了要提升這些電腦的執行效能，下列何者最不可能是你要優先考慮更換的設備或元件？",
    options: {
      A: "CPU",
      B: "主記憶體",
      C: "顯示卡",
      D: "鍵盤"
    },
    studentAns: "D",
    correctAns: "D",
    isWrong: false,
    teacherNote: "正確！鍵盤為輸入週邊，無法提升核心處理效能",
    category: "硬體組裝與擴充",
    analysis: "升級 CPU（運算能力）、主記憶體（容納多工資料）或顯示卡（圖形加速）都能實質提升系統效能；而更換鍵盤只是輸入設備，不影響電腦的運算執行速度。",
    tutorTip: "💡 判斷準確：周邊設備不影響系統核心運算能力。"
  }
];

// 3. 弱點自適應補強測驗題庫（專為黃芊瑜打造的 5 道練習題）
const adaptivePracticeQuiz = [
  {
    id: "p1",
    question: "【針對 Q1 補強】關於快取記憶體（Cache Memory）的敘述，下列何者正確？",
    options: {
      A: "由 DRAM 組成，容量極大且成本低廉",
      B: "由 SRAM 組成，存取速度接近 CPU，不需要定時充電刷新",
      C: "速度比暫存器快，通常安裝在硬碟旁邊",
      D: "電腦關機後資料依然永久保存，屬於非揮發性記憶體"
    },
    answer: "B",
    explanation: "快取記憶體（Cache）是由高速的 SRAM（靜態隨機存取記憶體）製成，速度遠快於主記憶體 DRAM，不需要像電容一樣充電刷新（refresh），但斷電後資料會消失（屬於揮發性記憶體）。"
  },
  {
    id: "p2",
    question: "【針對 Q7 補強】關於硬體的「熱插拔」（Hot-swapping）技術，下列敘述何者最精確？",
    options: {
      A: "使用者可以在電腦開機運作時直接插拔設備，而不需先關閉系統電源",
      B: "硬體溫度必須超過攝氏 60 度以上時才能拔除",
      C: "一旦拔除熱插拔設備，電腦必須立刻強制重新開機才能再次識別",
      D: "如果電腦處於關機狀態，熱插拔設備將會鎖死而無法拆卸"
    },
    answer: "A",
    explanation: "熱插拔（Hot Swapping）的定義為『不需關閉系統電源，即可在開機運作狀態下插拔替換周邊硬體』。在關機狀態下當然也可以自由插拔！"
  },
  {
    id: "p3",
    question: "【針對 Q8 補強】小明組裝電腦時，想要安裝一條 DDR5 32GB 的記憶體模組與一張高效能顯示卡，請問這兩者應該分別插入主機板的哪一種插槽？",
    options: {
      A: "記憶體插槽、PCI-E 插槽",
      B: "PCI-E 插槽、M.2 插槽",
      C: "SATA 插槽、CPU 插槽",
      D: "M.2 插槽、記憶體插槽"
    },
    answer: "A",
    explanation: "DDR5 記憶體模組必須安裝在主機板專屬的『記憶體插槽』（DIMM）；而高階顯示卡則需要高頻寬傳輸，必須安裝在『PCI-E 插槽』。"
  },
  {
    id: "p4",
    question: "【針對 Q10 補強】在衡量超級電腦或繪圖處理器（GPU）進行科學計算的效能時，常使用的指標為 FLOPS，請問其中的『FLOP』代表什麼？",
    options: {
      A: "Floating-point Operation（浮點運算）",
      B: "Fast Logic Output Program（快速邏輯輸出程序）",
      C: "File Loading Optimization Process（檔案加載最佳化流程）",
      D: "Fixed Level Operator Performance（固定階層運算效能）"
    },
    answer: "A",
    explanation: "FLOPS 是 Floating-point Operations Per Second 的縮寫，代表每秒執行的浮點運算次數；而衡量 CPU 一般指令速度的指標則是 MIPS（Millions of Instructions Per Second）。"
  },
  {
    id: "p5",
    question: "【統測實戰題 • 五大單元應用】某連鎖超商建立新一代 POS 結帳收銀系統，店員使用條碼掃描槍讀取商品條碼，主機透過網路比對會員資料庫後，螢幕即時顯示折扣金額，最後發票機印出電子發票。請問在此流程中，條碼掃描槍、螢幕與發票機分別屬於五大單元中的哪些單元？",
    options: {
      A: "輸入單元、輸出單元、輸出單元",
      B: "輸出單元、輸入單元、記憶單元",
      C: "輸入單元、記憶單元、控制單元",
      D: "控制單元、算術邏輯單元、輸出單元"
    },
    answer: "A",
    explanation: "條碼掃描槍將條碼資料讀取傳送至電腦，屬於『輸入單元』；螢幕顯示資訊給店員/顧客看，以及發票機列印紙本發票，兩者均負責將運算處理結果傳達出來，皆屬於『輸出單元』。"
  }
];

// 4. 內建 AI 家教諮詢庫與意圖分析回答引擎
const aiTutorDialogue = {
  getInitialGreeting: () => {
    return `芊瑜同學好！原來妳是<b>資料處理科（資處科）</b>的 <b>07 號</b> 同學！💻<br><br>
老師剛才從考卷筆跡誤看，跟妳說聲抱歉！身為資處科的優秀學生，<b>《數位科技概論》</b>可是未來<b>四技二專統測（商管群/資電類）</b>的關鍵核心專業科目！<br><br>
我仔細看過妳這次在<b>隨堂測驗（第3回）《硬體架構》</b>的答題狀況：<br>
妳拿到了 <b>68 分</b>，在電腦五大架構的邏輯整合（如船長比喻控制單元、印表機是輸出單元、ALU 邏輯比對等）觀念很穩，展現出資處科同學的好底子！👏<br><br>
這次失分主要落在 4 個<b>統測超高頻陷阱題</b>：
1. <b>熱插拔</b>的邏輯語意陷阱（Q7：為什麼開機與關機都能拔？）
2. <b>記憶體插槽 (DIMM)</b> vs <b>PCI-E 插槽</b>規格（Q8：RAM 該插哪裡？）
3. <b>MIPS</b> 英文縮寫與 CPU 指標（Q10：I 代表指令 Instruction，不是 Information）
4. <b>SRAM 與 DRAM</b> 的核心結構與快取應用（Q1：正反器 vs 電容充電刷新）<br><br>
這 4 題在統測每年幾乎必考 1~2 題。你想先搞懂哪一題？可以直接點下方快捷問題，或是直接問我！`;
  },

  // 根據問題關鍵字提供引導式回答
  answerQuestion: (query) => {
    const q = query.toLowerCase();
    
    if (q.includes("熱插拔") || q.includes("q7") || q.includes("7題") || q.includes("開機") && q.includes("插拔")) {
      return `【🎯 統測考點秒殺 • Q7 熱插拔陷阱】：<br><br>
芊瑜，妳在第 7 題選了 (A)『只能在開機的情況下插拔』，這是歷屆統測非常多同學都會掉進去的『語意排他性陷阱』！<br><br>
<b>【陷阱拆解】</b>：
• 一般硬體（如主機板上的 CPU、傳統 IDE 硬碟）：必須在「關機斷電」時才能安裝或拆卸，開機時拔會燒毀。<br>
• 支援「熱插拔」（Hot-swapping）的設備（如 USB 隨身碟、外接硬碟、伺服器熱抽換硬碟）：特點是<b>在開機運作中，不需要重開機就能直接抽換</b>。<br><br>
👉 <b>關鍵破題點：</b>既然在開機通電時都能拔了，那在「關機斷電」時當然也能拔！所以正確答案是 <b>(C) 在開機及關機的情況下皆可插拔</b>。<br>
記住統測口訣：<b>『熱插拔核心是「免關機」，不是「限開機」』</b>！`;
    }

    if (q.includes("ram") || q.includes("插槽") || q.includes("q8") || q.includes("8題") || q.includes("pci-e") || q.includes("阿布")) {
      return `【🎯 統測考點秒殺 • Q8 主機板插槽規格】：<br><br>
第 8 題阿布要擴充 2G RAM，妳選了 (B) PCI-E 插槽。身為資處科同學，電腦硬體裝修檢定與統測最愛考主機板插槽配對！<br><br>
請芊瑜把這張主機板插槽配對表刻進腦海：<br>
<table class="w-full text-left border-collapse my-2 text-sm">
  <tr class="bg-indigo-50 border-b border-indigo-200">
    <th class="p-2 font-bold text-indigo-700">插槽名稱</th><th class="p-2 font-bold text-slate-700">專用硬體配件</th><th class="p-2 font-bold text-slate-700">外觀與特徵</th>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-bold text-indigo-600">記憶體插槽 (DIMM / SO-DIMM)</td>
    <td class="p-2 font-bold text-emerald-600">RAM (DDR4 / DDR5)</td>
    <td class="p-2">兩端有防呆卡榫，桌機為長條 DIMM，筆電為短版 SO-DIMM</td>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-bold text-indigo-600">PCI-E 插槽 (x16 / x4 / x1)</td>
    <td class="p-2">獨立顯示卡、高速擴充卡</td>
    <td class="p-2">長條插槽，主要提供顯示卡高頻寬傳輸通道</td>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-bold text-indigo-600">M.2 插槽</td>
    <td class="p-2">NVMe SSD 固態硬碟、Wi-Fi 網卡</td>
    <td class="p-2">體積小、直接緊貼主機板以螺絲固定</td>
  </tr>
  <tr>
    <td class="p-2 font-bold text-indigo-600">CPU 插座 (Socket)</td>
    <td class="p-2">中央處理器 (CPU 晶片)</td>
    <td class="p-2">針腳陣列 (LGA / PGA)，上方會覆蓋散熱器</td>
  </tr>
</table>
👉 所以阿布要擴充 RAM，百分之百是插在<b>記憶體插槽</b>！`;
    }

    if (q.includes("mips") || q.includes("q10") || q.includes("10題") || q.includes("flops") || q.includes("指標")) {
      return `【🎯 統測考點秒殺 • Q10 CPU 效能與測量指標】：<br><br>
第 10 題問 MIPS 中的 I 代表什麼，妳選了 (A) 資訊（Information）。<br>
這題是統測必出的英文縮寫送分題，身為資處科同學下次一定要秒答：<br><br>
📌 <b>MIPS</b> = <b>M</b>illions of <b>I</b>nstructions <b>P</b>er <b>S</b>econd<br>
• 中文：<b>每秒執行的百萬指令數</b>。<br>
• 其中的 <b>I = Instruction（指令）</b>！不是 Information（資訊）。<br><br>
📌 <b>FLOPS</b> = <b>FL</b>oating-point <b>O</b>perations <b>P</b>er <b>S</b>econd<br>
• 中文：<b>每秒執行的浮點運算次數</b>（常用於超級電腦、GPU AI 算力評估，如 TFLOPS、PFLOPS）。<br><br>
📌 <b>時脈頻率 (Clock Rate)</b>：單位是 <b>GHz</b>（每秒數十億次時鐘脈衝信號）。<br><br>
下次看到 MIPS，馬上想到『CPU 跑指令，I 就是 Instruction』！`;
    }

    if (q.includes("sram") || q.includes("dram") || q.includes("q1") || q.includes("1題") || q.includes("快取") || q.includes("記憶體")) {
      return `【🎯 統測考點秒殺 • Q1 SRAM vs DRAM 世紀對決】：<br><br>
第 1 題問 SRAM 優於 DRAM 的特點，正解是 (A) 單位資料存取速度較快！<br><br>
資處科統測商管群最愛考的記憶體對比：<br>
<table class="w-full text-left border-collapse my-2 text-sm">
  <tr class="bg-indigo-50 border-b border-indigo-200">
    <th class="p-2">比較指標</th><th class="p-2 font-bold text-indigo-700">SRAM (靜態 RAM)</th><th class="p-2 font-bold text-sky-700">DRAM (動態 RAM)</th>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-semibold">電路組成</td><td class="p-2">正反器 (Flip-Flop)</td><td class="p-2">電容 + 電晶體</td>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-semibold">存取速度</td><td class="p-2 text-emerald-600 font-bold">極快 (約幾奈秒)</td><td class="p-2 text-slate-500">較慢 (幾十奈秒)</td>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-semibold">充電更新 (Refresh)</td><td class="p-2 text-emerald-600 font-bold">不需要 (通電就維持)</td><td class="p-2 text-rose-500 font-bold">需要持續充電刷新 (電容會漏電)</td>
  </tr>
  <tr class="border-b border-slate-100">
    <td class="p-2 font-semibold">單位成本與體積</td><td class="p-2 text-rose-500">成本極高、體積大 (積體度低)</td><td class="p-2 text-emerald-600 font-bold">成本低、體積小 (積體度高)</td>
  </tr>
  <tr>
    <td class="p-2 font-semibold">常見實務應用</td><td class="p-2 font-bold text-indigo-700">CPU 內部快取 (L1/L2/L3 Cache)</td><td class="p-2 font-bold text-sky-700">電腦主記憶體 (DDR4 / DDR5 模組)</td>
  </tr>
</table>
👉 統測秒殺要訣：<b>『快取找 SRAM，主記憶體找 DRAM；免充電是 SRAM，電容漏電需 Refresh 是 DRAM』</b>！`;
    }

    if (q.includes("資處") || q.includes("統測") || q.includes("商管群") || q.includes("未來")) {
      return `【🎓 資處科同學的統測戰略建議】：<br><br>
芊瑜，身為資料處理科的學生，在高一時打好《數位科技概論》與程式設計的底子，高三統測會超級輕鬆！<br><br>
在<b>四技二專統測（商管群）</b>中：<br>
• 《數位科技概論》佔了專業科目一整整 <b>50% 的比重（50分）</b>！<br>
• 每一題都是 2 分，往往差 1 題就差一個志願學校（如國立台中科大、國立台北商大、國立高雄科大資管系）！<br>
• 硬體章節是每年的送分區，只要把「專有名詞英文全名」、「主機板插槽」、「匯流排架構」與「記憶體階層」徹底弄通，硬體題目就能拿到 100% 全對！<br><br>
老師非常有信心，只要把今天這 4 題盲點補齊，妳的實力直接飆到 90 分以上！`;
    }

    // 通用回應
    return `芊瑜問得很有深度！這題在資處科課程中也是核心觀念。<br><br>
電腦硬體的設計哲學就是：<b>『越靠近 CPU 速度越快、成本越高、容量越小』</b>（暫存器 > 快取 Cache(SRAM) > 主記憶體(DRAM) > 輔助記憶體(SSD/硬碟)）。<br><br>
身為資處科 07 號同學，妳可以試著回答看看：『當我們在程式設計中宣告一個變數，這個變數在程式執行期間，主要是存放在哪一種記憶體中呢？』`;
  }
};

