/* Hong Kong Traditional Chinese for Smart GMV HK — PREVIEW BUILD.
 *
 * Off unless the page is opened with ?lang=zh-HK (the choice then sticks on
 * that phone until it is switched back). English stays the default, so a staff
 * member who never asks for Chinese sees exactly the app they see today.
 *
 * HOW IT WORKS
 * The app's own code is not touched. This file translates what has already
 * been rendered: text nodes and the placeholder / title / aria-label
 * attributes, re-running after every render through a MutationObserver.
 * That matters because several English strings are also VALUES — the status
 * chips carry 'Operated' / 'No Sales' in data-s, the records carry them to the
 * sheet, and the sheet is billing. Translating the source strings would have
 * changed what gets written; translating the rendered text cannot.
 *
 * WORDING
 * Written Chinese in traditional characters with Hong Kong vocabulary
 * (儲存 / 上載 / 場地 / 訂單), not written Cantonese — an operations app is
 * not a chat. 'Sales' is 銷售額, deliberately NOT 營業額: 營業額 is the name of
 * the KeeTa tab we do not read, and reusing it here would invite the exact
 * mistake the reading rule exists to prevent.
 *
 * KNOWN GAP: 'Checking…' under the PIN pad is left in English on purpose.
 * app.js hides that line by sniffing its own text (el.textContent.includes
 * ('Checking')), so translating it would leave the line on screen. One line in
 * setPinBusy() fixes it properly, and that is an app.js change, not a
 * translation.
 */
(function () {
  'use strict';

  var KEY = 'sgmv.lang';
  var q = new URLSearchParams(location.search).get('lang');
  if (q) { try { localStorage.setItem(KEY, q); } catch (e) {} }
  var lang = q;
  if (!lang) { try { lang = localStorage.getItem(KEY); } catch (e) {} }
  if (lang !== 'zh-HK') return;

  /* ---------- exact strings ---------- */
  var DICT = {
    /* login */
    'Daily sales capture · Hong Kong': '每日銷售記錄 · 香港',
    'Select your site': '選擇你的場地',
    'Change site': '更改場地',
    'Who are you?': '請選擇你的名字',
    'Type your name to find it faster': '輸入名字可更快找到',
    'Back to the list': '返回名單',
    'Register yourself': '自行登記',
    'Your full name': '你的全名',
    'Home site (optional)': '常駐場地（可選）',
    'Employment': '僱用類別',
    'Part-timer': '兼職',
    'Full-time staff': '全職員工',
    'Create your 4-digit PIN': '設定你的 4 位數密碼',
    'PIN': '密碼',
    'Repeat PIN': '再輸入一次',
    'The two PINs don’t match': '兩次輸入的密碼不同',
    'The two PINs don\'t match': '兩次輸入的密碼不同',
    'This PIN logs you in from now on — don’t share it. Your name goes on every record you save.':
      '日後用這組密碼登入，請勿告訴他人。你儲存的每一筆記錄都會記下你的名字。',
    'This PIN logs you in from now on — don\'t share it. Your name goes on every record you save.':
      '日後用這組密碼登入，請勿告訴他人。你儲存的每一筆記錄都會記下你的名字。',
    'Register & continue': '登記並繼續',
    'Registering…': '登記中…',
    'Not you?': '不是你？',
    'Enter your PIN': '輸入你的密碼',
    'Wrong PIN — try again': '密碼錯誤，請再試',
    'Recent on this device': '這部手機最近使用',
    'recent on this device': '這部手機最近使用',
    'Continue as': '繼續使用',
    'Removed from this device': '已從這部手機移除',
    'Type it again to confirm': '請再輸入一次確認',
    'No PIN yet for this name — create yours now': '這個名字尚未設定密碼 — 請現在設定',
    'PIN set ✓ — use it to log in from now on': '密碼已設定 ✓ — 日後用這組密碼登入',
    'A PIN was already set for this name — enter it, or ask the supervisor to reset it':
      '這個名字已設定密碼 — 請輸入，或請主管重設',
    'The app was just updated — log in once more': '應用程式剛更新 — 請重新登入一次',
    'The app was just updated — enter your PIN once more': '應用程式剛更新 — 請再輸入一次密碼',
    'Session expired — enter your PIN again': '登入已逾時 — 請再輸入密碼',

    /* header + round */
    'Menu': '選單',
    'Log out': '登出',
    'Tonight’s round': '今晚的記錄',
    'Tonight\'s round': '今晚的記錄',
    'Tap a merchant to capture its sales': '點選商戶開始記錄銷售',
    'left': '待做',
    'Auto-next after save': '儲存後自動跳下一間',
    'Auto-next after save · off': '儲存後自動跳下一間 · 已關',
    'After Save, open the next kitchen still waiting': '儲存後，自動開啟下一間未記錄的廚房',
    '↻ Refresh': '↻ 重新整理',
    'Check for records saved on other phones': '檢查其他手機已儲存的記錄',
    'Checking for records saved on other phones…': '正在檢查其他手機儲存的記錄…',
    '⏳ Checking the server for records already saved today…': '⏳ 正在向伺服器查詢今日已儲存的記錄…',
    '⚠ Could not check the server for saved records — reload before capturing':
      '⚠ 無法向伺服器查詢已儲存的記錄 — 請重新載入後再記錄',
    'No delivery merchants at this site yet': '這個場地尚未有外賣商戶',
    'Round complete — every merchant recorded 🎉': '全部完成 — 所有商戶都已記錄 🎉',
    'Every kitchen has been recorded': '所有廚房都已記錄',
    'to check': '待查',

    /* sections + list heads */
    'Opening GMV': '早上讀數',
    'Closing GMV': '晚上讀數',
    '24-hr merchants · shoot at 10 am': '24 小時商戶 · 上午 10 時拍攝',
    'Kitchen': '廚房',
    'Brand': '品牌',
    'Attributes': '屬性',
    'Opening shot': '早上拍攝',
    'Status': '狀態',
    'Tonight': '今晚',
    'Monthly dine-in': '每月堂食',
    'One sheet covers every brand for the month': '一張表涵蓋整個月所有品牌',

    /* dashboard (desktop) */
    'Tonight’s GMV': '今晚銷售額',
    'Tonight\'s GMV': '今晚銷售額',
    'Round progress': '完成進度',
    'Round complete': '全部完成',
    'Orders': '訂單',
    'across recorded kitchens': '已記錄廚房合計',
    'To check': '待查',
    'nothing flagged': '沒有異常',
    'By platform': '各平台',
    'tonight': '今晚',
    'Still to capture': '尚未記錄',
    'Platform split appears once a kitchen is recorded.': '記錄第一間廚房後，這裡會顯示各平台分佈。',
    'Every kitchen on this site has been recorded.': '這個場地的所有廚房都已記錄。',

    /* statuses (display only — the values stay English in data-s and in the sheet) */
    'Operated': '有營業',
    'No Sales': '沒有銷售',
    'Not operated': '沒有營業',
    'Locked': '廚房上鎖',
    '✓ Not operated': '✓ 沒有營業',
    '✓ no sales': '✓ 沒有銷售',
    '⬆ saving…': '⬆ 儲存中…',
    'not saved': '未儲存',
    'reading…': '讀取中…',
    'confirm': '待確認',
    '○ shoot opening': '○ 拍早上讀數',
    '○ capture': '○ 待記錄',

    /* menu */
    'Review previous days': '查看過往日期',
    'Add new brand': '新增品牌',
    'Manage brands': '管理品牌',
    'Monthly billing': '每月帳單',
    'Switch site': '切換場地',
    'Change my PIN': '更改密碼',
    'Cancel': '取消',

    /* review */
    'Review sales': '查看銷售',
    'Jump to a date': '跳至指定日期',
    'That date is after today': '該日期在今日之後',
    'saved by': '儲存者',

    /* manage brands */
    'Disabling a brand hides it from new GMV capture. Its history stays in Review, and you can re-enable it anytime. This ticks the Disabled column in SFDC ID Map.':
      '停用品牌後，它不會再出現在新的銷售記錄中。過往記錄仍可在「查看銷售」找到，隨時可以重新啟用。此操作會在 SFDC ID Map 的 Disabled 欄打勾。',
    'Disabled — tap to bring it back into capture': '已停用 — 點擊可重新加入記錄',
    'Active — tap to hide it from new capture': '使用中 — 點擊可從新記錄中隱藏',
    'A brand needs at least one delivery channel — disable the brand instead':
      '品牌至少需要一個外賣平台 — 如要停止，請直接停用品牌',

    /* capture */
    'Merchant': '商戶',
    'Kitchen status': '廚房狀態',
    'Sales date': '銷售日期',
    'Confirm & save': '確認並儲存',
    'Save changes': '儲存變更',
    'Update & save': '更新並儲存',
    'update & save': '更新並儲存',
    'Fix the highlighted numbers': '請修正標示的數字',
    'Shoot the screens to start': '先拍攝畫面即可開始',
    'Reading… hang on a moment': '讀取中…請稍候',
    'Shoot at least one screen first': '請最少拍攝一個畫面',
    'Enter the catering orders and sales first': '請先輸入 Catering 的訂單數和銷售額',
    'Enter the catering figures': '輸入 Catering 數字',
    '⬆ Saving…': '⬆ 儲存中…',
    '❗ Retry save': '❗ 重試儲存',
    '⬆ Saving opening GMV…': '⬆ 儲存早上讀數中…',
    '❗ Retry opening GMV save': '❗ 重試儲存早上讀數',
    'Opening GMV recorded ✓ — back to list': '早上讀數已記錄 ✓ — 返回名單',
    'Update opening GMV & save': '更新早上讀數並儲存',
    'Opening GMV saving… one moment': '早上讀數儲存中…請稍候',
    '❗ Retry catering save': '❗ 重試儲存 Catering',
    'Sales (HK$)': '銷售額 (HK$)',
    'Tap to view or mark the correct number': '點擊查看，或標示正確數字',
    'Tap to mark the correct number on the photo': '點擊在相片上標示正確數字',
    'Remove photo and readings': '刪除相片和讀數',
    'You can type the numbers first — but a photo is required as evidence before saving.':
      '可以先輸入數字，但儲存前必須有相片作憑證。',
    'This channel is manual — type the numbers. A photo is optional here.':
      '此平台需人手輸入 — 請填寫數字，相片非必需。',
    'Photo saved as evidence — enter the numbers manually for this channel.':
      '相片已存為憑證 — 此平台請自行輸入數字。',
    'Not in the summary yet': '未計入日結畫面',
    'Pending rider pickup': '等待外賣員取餐',
    'Remove this order': '刪除這張訂單',
    'Remove this pending order?': '刪除這張待取訂單？',
    'Yes, remove it': '是，刪除',
    'Pending order removed': '待取訂單已刪除',
    'Yes, clear it': '是，清除',
    'Yes — no sales today': '是 — 今日沒有銷售',
    'No overnight sales — a 0/0 opening is recorded, so tonight’s reading is billed in full. Just confirm below.':
      '通宵沒有銷售 — 早上讀數記為 0/0，今晚的讀數會全數計算。在下方確認即可。',
    'AIGENS line on X-Reading': 'X-Reading 上的 AIGENS 一行',
    'Draw a box around the correct number': '在正確的數字上畫框',
    'Drag on the photo to box the correct number, then type it in. Double-tap to zoom.':
      '在相片上拖曳畫框圈住正確數字，然後輸入。連按兩下可放大。',
    'Type the number you boxed…': '輸入你圈住的數字…',
    'Save as Orders': '存為訂單數',
    'Save as Sales (HK$)': '存為銷售額 (HK$)',
    '🔍 Zoomed — double-tap to zoom out and draw a box.': '🔍 已放大 — 連按兩下縮小即可畫框。',
    'Marked ✓ — value updated, AI will learn from this': '已標示 ✓ — 數值已更新，AI 會據此學習',
    'Photos captured — next kitchen ➜': '相片已拍好 — 下一間廚房 ➜',
    'snap & go': '拍完即走',
    'Limit reached — up to 12 pending orders per channel': '已達上限 — 每個平台最多 12 張待取訂單',

    /* catering + add brand */
    'Catering is often recorded days later — pick the date the sale happened. For our own kitchens this fills the Catering column of that day’s row and leaves every other channel untouched.':
      'Catering 通常事後幾天才記錄 — 請選擇實際銷售當日。對自家廚房，此操作只填該日的 Catering 欄，其他平台維持不變。',
    'Catering · add an existing brand, or a third-party partner': 'Catering · 加入現有品牌，或第三方合作夥伴',
    'Search brand or kitchen…': '搜尋品牌或廚房…',
    'Search company name…': '搜尋公司名稱…',
    'Add catering partner': '新增 Catering 夥伴',
    'Create brand record': '建立品牌記錄',
    'Creates a new SFDC ID Map record': '會在 SFDC ID Map 新增一筆記錄',
    '1 · Which kitchen?': '1 · 哪一間廚房？',
    '2 · Brand name on the delivery platform': '2 · 外賣平台上顯示的品牌名稱',
    'Change kitchen': '更改廚房',
    'e.g. DM Chicken': '例如 DM Chicken',
    'Brand name can differ from the company’s registered name — type it exactly as it appears on KeeTa / foodpanda.':
      '品牌名稱可以和公司註冊名稱不同 — 請照 KeeTa / foodpanda 上顯示的字樣輸入。',
    'Operates outside 10 am – 10 pm': '營業時間超出上午 10 時至晚上 10 時',
    'e.g. 24-hour kitchens. Staff will shoot an opening GMV photo daily and the app deducts it automatically. Ticks the Overnight column in SFDC ID Map.':
      '例如 24 小時廚房。員工每日會拍一張早上讀數，系統自動扣減。此操作會在 SFDC ID Map 的 Overnight 欄打勾。',

    /* billing */
    'Apply': '套用',
    'Filter merchants…': '篩選商戶…',
    'Sales reports need permission from the manager.': '銷售報表需要經理授權。',
    'Pick a valid range — from must be on or before to': '請選擇有效範圍 — 起始日期不可遲於結束日期',

    /* guards + confirms */
    'Some records are not saved yet': '有記錄尚未儲存',
    'Retry saving all': '全部重試儲存',
    'Log out anyway — unsaved data will be lost': '仍要登出 — 未儲存的資料會遺失',
    'Switch anyway — unsaved data will be lost': '仍要切換 — 未儲存的資料會遺失',
    'Stay logged in': '留在系統',
    'Stay on this site': '留在這個場地',
    'Change status?': '更改狀態？',
    'Yes, clear the readings': '是，清除讀數',
    'Keep the readings': '保留讀數',
    'This name is already registered': '這個名字已經登記',
    'That’s me — continue': '是我 — 繼續',
    'That\'s me — continue': '是我 — 繼續',
    'I’m a different person — register anyway': '我是另一個人 — 仍然登記',
    'I\'m a different person — register anyway': '我是另一個人 — 仍然登記',

    /* PIN change */
    'Current PIN': '目前密碼',
    'New PIN — enter it twice': '新密碼 — 請輸入兩次',
    '4 digits': '4 位數字',
    'New PIN': '新密碼',
    'Repeat new PIN': '再輸入新密碼',
    'Change PIN': '更改密碼',
    'The new PIN is the same as the current one': '新密碼和目前密碼相同',
    'PIN changed ✓ — use the new PIN from your next login': '密碼已更改 ✓ — 下次登入請用新密碼',

    /* modes */
    'PREVIEW · invented data, nothing is saved anywhere — the live app is untouched':
      'PREVIEW · 全為虛構數據，不會儲存到任何地方 — 正式系統完全不受影響',
    'DEMO MODE · AI readings are simulated — real engine comes with the backend':
      'DEMO 模式 · AI 讀數為模擬 — 正式引擎隨後端一同啟用',

    /* channel card hints. KeeTa's English hint still says 'Completed + day
       total', which the 25 Aug rule change made wrong — the rule is 已完成 +
       進行中. The Chinese says the right thing; the English needs the same fix
       in app.js (CH_META). */
    'Completed + day total': '已完成 + 進行中',
    'All − Cancelled': '全部 − 已取消',
    'AIGENS / other platforms': 'AIGENS / 其他平台',
    'Catering orders': 'Catering 訂單',
    'POS screenshot': 'POS 截圖',
    'Others': '其他',
    'Dine-in': '堂食',
    '(Promo) Dine-in': '（推廣）堂食',

    /* baseline banners */
    'Stored as today’s opening GMV — deducted tonight. Not billed.':
      '已存為今日的早上讀數 — 今晚自動扣減，不會計費。',
    'Stored as today\'s opening GMV — deducted tonight. Not billed.':
      '已存為今日的早上讀數 — 今晚自動扣減，不會計費。',
    'Shoot each screen now — stored as today’s opening GMV and deducted automatically tonight. Nothing is billed from this shot.':
      '請現在拍下每個平台的畫面 — 會存為今日的早上讀數，今晚自動扣減。這一次拍攝不會產生任何費用。',
    'Shoot each screen now — stored as today\'s opening GMV and deducted automatically tonight. Nothing is billed from this shot.':
      '請現在拍下每個平台的畫面 — 會存為今日的早上讀數，今晚自動扣減。這一次拍攝不會產生任何費用。',
    'Opening GMV is saving right now.': '早上讀數正在儲存。',
    'Give it a moment — the save button unlocks as soon as it lands.':
      '請稍等片刻 — 儲存完成後按鈕便會解鎖。',
    'This morning was saved as “Not operated”.': '今早已存為「沒有營業」。',
    'If the shop did open, tonight’s reading cannot auto-deduct — it will be flagged for supervisor review.':
      '如果店舖其實有營業，今晚的讀數無法自動扣減，會標示交主管覆核。',
    'If the shop did open, tonight\'s reading cannot auto-deduct — it will be flagged for supervisor review.':
      '如果店舖其實有營業，今晚的讀數無法自動扣減，會標示交主管覆核。',
    'No opening GMV today.': '今日沒有早上讀數。',
    'Tonight’s reading cannot auto-deduct — it will be flagged for supervisor review. You can also go back and shoot the opening GMV first.':
      '今晚的讀數無法自動扣減，會標示交主管覆核。你也可以返回先拍早上讀數。',
    'Tonight\'s reading cannot auto-deduct — it will be flagged for supervisor review. You can also go back and shoot the opening GMV first.':
      '今晚的讀數無法自動扣減，會標示交主管覆核。你也可以返回先拍早上讀數。',
    '24-hr merchant — tonight’s reading auto-deducts this morning’s opening GMV. Both photos are kept as evidence.':
      '24 小時商戶 — 今晚的讀數會自動扣減今早的早上讀數。兩張相片都會保留作憑證。',
    '24-hr merchant — tonight\'s reading auto-deducts this morning\'s opening GMV. Both photos are kept as evidence.':
      '24 小時商戶 — 今晚的讀數會自動扣減今早的早上讀數。兩張相片都會保留作憑證。',

    /* photo slots */
    'Retake': '重拍',
    'Upload': '上載',
    '✕ Remove': '✕ 刪除',
    'Photo on record': '已有相片',
    'Photo on record — saved to Drive earlier.': '已有相片 — 較早前已存入 Drive。',
    'Saved to Drive earlier — retake only if it was wrong.': '較早前已存入 Drive — 除非拍錯，否則不用重拍。',
    'Undo — record sales instead': '復原 — 改為記錄銷售',
    'Confirm opening GMV & save': '確認早上讀數並儲存',
    'Reading the screenshot — one moment.': '正在讀取截圖 — 請稍候。',
    'Retry save': '重試儲存',
    'Site total ·': '場地合計 ·',
    'No flags this month — every record is clean.': '本月沒有異常 — 所有記錄正常。',
    'Third-party partner': '第三方夥伴',
    'Outside company, no SFDC ID — catering only': '外部公司，沒有 SFDC ID — 只作 Catering',
    'No SFDC ID — logged in the catering tab only, never billed as a licensee':
      '沒有 SFDC ID — 只記入 Catering 頁籤，不會以租戶身分計費',
    'Welcome,': '歡迎，',
    'Active': '使用中',
    'Disabled': '已停用',
    '24 h': '24 小時',
    'Take photo': '拍照',
    'Shoot one': '拍一張',
    'Add from gallery': '從相簿選取',
    '＋ Add': '＋ 新增',
    'An order done but not yet inside the day’s completed figure? Shoot its details page — one photo per order. Shoot the summary first.':
      '有訂單已完成但未計入當日的已完成數字？請拍下該張訂單的詳情頁 — 一張訂單一張相。請先拍日結畫面。',
    'An order done but not yet inside the day\'s completed figure? Shoot its details page — one photo per order. Shoot the summary first.':
      '有訂單已完成但未計入當日的已完成數字？請拍下該張訂單的詳情頁 — 一張訂單一張相。請先拍日結畫面。',
    'Waiting for a rider? Shoot each order’s details page — one photo per order. Orders already out for delivery ARE counted in foodpanda’s All, so don’t add them.':
      '仍在等外賣員？請逐張拍下訂單詳情頁 — 一張訂單一張相。已經派送中的訂單已計入 foodpanda 的「全部」，不要重複加入。',
    'Waiting for a rider? Shoot each order\'s details page — one photo per order. Orders already out for delivery ARE counted in foodpanda\'s All, so don\'t add them.':
      '仍在等外賣員？請逐張拍下訂單詳情頁 — 一張訂單一張相。已經派送中的訂單已計入 foodpanda 的「全部」，不要重複加入。'
  };

  /* channel names as they appear inside composed lines */
  var CHN = { 'KeeTa': 'KeeTa', 'foodpanda': 'foodpanda', 'Others': '其他',
              'Catering': 'Catering', 'Dine-in': '堂食', '(Promo) Dine-in': '（推廣）堂食' };

  /* Dates come out of toLocaleDateString('en-HK', …) — 'Fri, 4 Sept',
     '4 Sept', 'Today', 'September 2026'. Rewritten here rather than in app.js
     so the record keys, which are ISO strings, are untouched. */
  var MON = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8,
              Sep: 9, Sept: 9, Oct: 10, Nov: 11, Dec: 12 };
  var MONL = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7,
               August: 8, September: 9, October: 10, November: 11, December: 12 };
  var WD = { Mon: '一', Tue: '二', Wed: '三', Thu: '四', Fri: '五', Sat: '六', Sun: '日' };

  /* ---------- strings with values in them ---------- */
  var RULES = [
    [/^Today$/, function () { return '今日'; }],
    [/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\.?$/,
      function (m, w, d, mo) { return MON[mo] + '月' + Number(d) + '日（' + WD[w] + '）'; }],
    [/^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\.?$/,
      function (m, d, mo) { return MON[mo] + '月' + Number(d) + '日'; }],
    [/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/,
      function (m, mo, y) { return y + '年' + MONL[mo] + '月'; }],
    [/^(\d+) of (\d+) captured · tap to continue$/, '已記錄 $1 / $2 · 點選繼續'],
    [/^⚑ (\d+) to check$/, '⚑ $1 項待查'],
    [/^(\d+) of (\d+) kitchens? recorded$/, '已記錄 $1 / $2 間廚房'],
    [/^(\d+) kitchens? still to capture$/, '尚有 $1 間廚房待記錄'],
    [/^flagged rows? in tonight’s round$/, '今晚有異常記錄'],
    [/^and (\d+) more$/, '另有 $1 間'],
    [/^Hi (.+) — create your 4-digit PIN$/, '你好，$1 — 請設定 4 位數密碼'],
    [/^Hi (.+), enter your PIN$/, '你好，$1，請輸入密碼'],
    [/^Forget (.+)$/, '移除 $1'],
    [/^Saved as “(.+)” ✓ — back to list$/, '已存為「$1」✓ — 返回名單'],
    [/^Save opening as “(.+)”\?$/, '早上讀數存為「$1」？'],
    [/^Save opening as “(.+)”$/, '早上讀數存為「$1」'],
    [/^Yes, save as (.+)$/, '是，存為 $1'],
    [/^Save as “(.+)”\?$/, '存為「$1」？'],
    [/^Save as “(.+)”$/, '存為「$1」'],
    [/^Save catering for (.+)$/, '儲存 $1 的 Catering'],
    [/^Save changes for (.+)$/, '儲存 $1 的變更'],
    [/^(.+) saved ✓$/, '$1 已儲存 ✓'],
    [/^(.+) saved — ⚠ no opening GMV this morning · flagged for supervisor$/,
      '$1 已儲存 — ⚠ 今早沒有早上讀數 · 已標示交主管跟進'],
    [/^(.+) saved — ⚠ (.+)$/, '$1 已儲存 — ⚠ $2'],
    [/^❗ (.+) NOT saved — (.+)\. It stays on your list; tap the red card to retry\.$/,
      '❗ $1 未能儲存 — $2。它仍留在名單上，點擊紅色卡片可重試。'],
    [/^❗ (.+) opening GMV NOT saved — (.+)\. Tap the red card to retry\.$/,
      '❗ $1 的早上讀數未能儲存 — $2。點擊紅色卡片可重試。'],
    [/^❗ (.+) NOT saved — (.+)$/, '❗ $1 未能儲存 — $2'],
    [/^(.+) opening GMV recorded ✓ — deducted automatically tonight$/,
      '$1 的早上讀數已記錄 ✓ — 今晚自動扣減'],
    [/^(.+): no overnight sales recorded ✓ — tonight is billed in full$/,
      '$1：通宵沒有銷售 ✓ — 今晚全數計算'],
    [/^(.+) readings ready — tap to confirm 🟡$/, '$1 的讀數已備妥 — 點擊確認 🟡'],
    [/^(.+) parked ⏳ — confirm when readings are ready$/, '$1 已暫存 ⏳ — 讀數備妥後再確認'],
    [/^(.+) — (.+) saved ✓, audit logged$/, '$1 — $2 已儲存 ✓，已記入審計紀錄'],
    [/^(.+) cleared$/, '$1 已清除'],
    [/^Remove (.+) data\?$/, '刪除 $1 的資料？'],
    [/^No sales on (.+) today\?$/, '今日 $1 沒有銷售？'],
    [/^(.+) — no sales recorded$/, '$1 — 已記錄為沒有銷售'],
    [/^Next: (.+)$/, '下一間：$1'],
    [/^(.+) · next: (.+)$/, '$1 · 下一間：$2'],
    [/^(.+) disabled — hidden from new capture, history kept$/, '$1 已停用 — 不再出現在新記錄，過往記錄保留'],
    [/^(.+) re-enabled ✓$/, '$1 已重新啟用 ✓'],
    [/^(.+) marked outside-hours 🌙 — daily opening GMV shot needed$/,
      '$1 已標示為超時營業 🌙 — 每日需要拍早上讀數'],
    [/^(.+) back to normal hours$/, '$1 已改回正常營業時間'],
    [/^(.+) added to catering ✓$/, '$1 已加入 Catering ✓'],
    [/^(.+) removed from catering$/, '$1 已從 Catering 移除'],
    [/^Now on (.+)$/, '現在使用 $1'],
    [/^Pick a date within the last (\d+) days$/, '請選擇最近 $1 天內的日期'],
    [/^⚠ This looks like a (.+) screen, not (.+) — check the photo$/,
      '⚠ 這看來是 $1 的畫面，不是 $2 — 請檢查相片'],
    [/^AI reading failed \((.+)\) — type the numbers manually, the photo is kept as evidence\.$/,
      'AI 讀取失敗（$1）— 請自行輸入數字，相片已保留作憑證。'],
    [/^Could not load the merchant list \((.+)\) — try again$/, '無法載入商戶名單（$1）— 請再試'],
    [/^(\d+) days ago$/, '$1 天前'],
    [/^just now$/, '剛剛'],
    [/^a while ago$/, '較早前'],
    [/^No sales on (.+) today$/, function (m, c) { return '今日 ' + (CHN[c] || c) + ' 沒有銷售'; }],
    [/^(Others|Catering|Dine-in|\(Promo\) Dine-in) — none today$/,
      function (m, c) { return (CHN[c] || c) + ' — 今日沒有'; }],
    [/^(Others|Catering|Dine-in|\(Promo\) Dine-in)$/, function (m, c) { return CHN[c] || c; }],
    [/^(\d+) merchants?$/, '$1 間商戶'],
    [/^(.+) runs 24 hours\.$/, '$1 為 24 小時營業。'],
    [/^No sales fields needed for “(.+)”\. Just confirm below — date, site, merchant and your name are recorded automatically\.$/,
      '「$1」不需要填銷售數字。在下方確認即可 — 日期、場地、商戶和你的名字都會自動記錄。'],
    [/^Not operating today — tonight’s record for (.+) is closed off as “Not operated” automatically\. If the shop opens later, open tonight’s card and change its status\.$/,
      '今日沒有營業 — $1 今晚的記錄會自動結為「沒有營業」。如果稍後開店，請打開今晚的卡片更改狀態。'],
    [/^Billable 10 am–10 pm: (\d+) orders · (.+)$/, '上午 10 時至晚上 10 時計費：$1 張訂單 · $2'],
    [/^order (\d+)$/, '訂單 $1'],
    [/^No name matches “(.+)” — new here\? Register below\.$/, '沒有符合「$1」的名字 — 第一次使用？請在下方登記。'],
    [/^No brand matches “(.+)”$/, '沒有符合「$1」的品牌'],
    [/^(.+) — you’re on the list now$/, '$1 — 你已在名單上'],
    [/^(.+) — you're on the list now$/, '$1 — 你已在名單上'],
    [/^Could not save the PIN \((.+)\) — try again$/, '無法儲存密碼（$1）— 請再試'],
    [/^Could not verify \((.+)\) — try again$/, '無法驗證（$1）— 請再試'],
    [/^Registration failed: (.+)$/, '登記失敗：$1'],
    [/^(.+) catering saved ✓ — (.+) row updated, other channels untouched$/,
      '$1 Catering 已儲存 ✓ — 已更新 $2 的一行，其他平台不變'],
    [/^(.+) catering saved ✓ — logged for (.+) \(partner, no licensee row\)$/,
      '$1 Catering 已儲存 ✓ — 已記錄於 $2（夥伴，沒有租戶行）'],
    [/^❗ (.+) catering NOT saved — (.+)$/, '❗ $1 Catering 未能儲存 — $2'],
    [/^❗ Could not update (.+) — (.+)$/, '❗ 無法更新 $1 — $2'],
    [/^❗ Change NOT saved — (.+)$/, '❗ 變更未能儲存 — $1'],
    [/^❗ Brand NOT created — (.+)$/, '❗ 未能建立品牌 — $1'],
    [/^(.+) closed for today ✓ — tonight’s record set to “Not operated”$/,
      '$1 今日已結束 ✓ — 今晚的記錄設為「沒有營業」'],
    [/^“(.+)” is already on the staff list$/, '「$1」已在員工名單上'],
    [/^Only (\d+) more can be added \(12 max\) — first (\d+) taken$/,
      '最多只能再加 $1 張（上限 12 張）— 已取前 $2 張']
  ];

  /* Pieces that appear inside lines the app builds from parts (the capture
     sub-header, list badges). Applied only when nothing above matched, longest
     first so a phrase is never cut in half by a shorter one. */
  var FRAG = [
    [' · ☀️ opening GMV', ' · ☀️ 早上讀數'],
    [' · ✏️ editing ', ' · ✏️ 編輯 '],
    [' · 🌙 morning GMV required', ' · 🌙 需要早上讀數'],
    [' · ⚠ no opening GMV that day', ' · ⚠ 當日沒有早上讀數'],
    [' · creates a new SFDC ID Map record', ' · 會在 SFDC ID Map 新增一筆記錄'],
    [' · the contract covering today is used', ' · 會採用今日生效的合約'],
    [' · deducted that night · view only', ' · 當晚已扣減 · 只可查看'],
    ['— clear these before invoicing', '— 開帳單前請先處理'],
    ['— view all ›', '— 查看全部 ›'],
    ['— none today', '— 今日沒有'],
    ['＋ add record', '＋ 新增記錄'],
    [' · last used', ' · 最近使用'],
    [' · billable', ' · 計費'],
    [' · promo', ' · 推廣'],
    [' · pending', ' · 待處理'],
    ['(this site)', '（這個場地）'],
    ['(home site ', '（常駐場地 '],
    ['(opening GMV)', '（早上讀數）'],
    ['(not confirmed yet — open it and confirm)', '（尚未確認 — 請打開並確認）'],
    ['PART-TIMER', '兼職'],
    [' · Kitchen', ' · 廚房'],
    [' merchants', ' 間商戶'],
    [' orders · ', ' 張訂單 · ']
  ];

  function tr(s) {
    var t = s.trim();
    if (!t) return null;
    if (Object.prototype.hasOwnProperty.call(DICT, t)) return s.replace(t, DICT[t]);
    for (var i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(t)) return s.replace(t, t.replace(RULES[i][0], RULES[i][1]));
    }
    var out = t, hit = false;
    for (var j = 0; j < FRAG.length; j++) {
      if (out.indexOf(FRAG[j][0]) !== -1) { out = out.split(FRAG[j][0]).join(FRAG[j][1]); hit = true; }
    }
    return hit ? s.replace(t, out) : null;
  }

  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, svg: 1, path: 1, circle: 1, rect: 1 };
  var ATTRS = ['placeholder', 'title', 'aria-label'];
  var busy = false;

  function attrs(el) {
    for (var k = 0; k < ATTRS.length; k++) {
      var v = el.getAttribute(ATTRS[k]);
      if (v) { var n = tr(v); if (n !== null) el.setAttribute(ATTRS[k], n); }
    }
  }

  function walk(root) {
    if (!root) return;
    var it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        return p && !SKIP[p.nodeName] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var texts = [], t;
    while ((t = it.nextNode())) texts.push(t);
    for (var i = 0; i < texts.length; i++) {
      var out = tr(texts[i].nodeValue);
      if (out !== null) texts[i].nodeValue = out;
    }
    if (root.nodeType === 1) attrs(root);
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label]') : [];
    for (var j = 0; j < els.length; j++) attrs(els[j]);
  }

  function sweep() {
    if (busy) return;
    busy = true;
    try { walk(document.body); } finally { busy = false; }
  }

  /* A way back to English without editing the URL — last item in the menu. */
  function addToggle() {
    var sheet = document.querySelector('#menu-overlay .menu-sheet');
    var cancel = document.getElementById('menu-cancel');
    if (!sheet || !cancel || document.getElementById('menu-lang')) return;
    var b = document.createElement('button');
    b.className = 'menu-item';
    b.id = 'menu-lang';
    var mark = document.createElement('span');
    mark.style.cssText = 'font-weight:800;letter-spacing:.5px';
    mark.textContent = 'A文';
    var label = document.createElement('span');
    label.textContent = 'English';
    b.appendChild(mark);
    b.appendChild(document.createTextNode(' '));
    b.appendChild(label);
    b.onclick = function () {
      try { localStorage.setItem(KEY, 'en'); } catch (e) {}
      var u = new URL(location.href);
      u.searchParams.set('lang', 'en');
      location.href = u.toString();
    };
    sheet.insertBefore(b, cancel);
  }

  function start() {
    document.documentElement.lang = 'zh-HK';
    sweep();
    new MutationObserver(function (muts) {
      if (busy) return;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData' || (m.addedNodes && m.addedNodes.length)) { sweep(); return; }
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
    addToggle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
