/**
 * NileCare Healthcare - Google Apps Script Backend
 * كود الربط بين موقع العيادة وجدول بيانات Google Sheets
 * 
 * طريقة الاستخدام:
 * 1. افتح جدول Google Sheet الخاص بك من الرابط: https://docs.google.com/spreadsheets/
 *    أو أنشئ جدولاً جديداً فوراً من الرابط: https://sheets.new
 * 2. انسخ رابط جدول الشيت من المتصفح وضعه في المتغير SPREADSHEET_URL بالأسفل.
 * 3. احفظ التعديل (Ctrl+S) ثم انشر بالضغط على Deploy -> Manage deployments -> تعديل -> New version -> Deploy.
 */

// رابط ومعرف جدول شيت عيادة NileCare:
var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1c1Tgyev59QvcaLFW1McbeA24GVr7odtMVul5Ygs1z2A/edit"; 

function getTargetSheet() {
  // 1. إذا تم وضع رابط الشيت بالمتغير أعلاه
  if (SPREADSHEET_URL && SPREADSHEET_URL.trim() !== "") {
    var url = SPREADSHEET_URL.trim();
    if (url.indexOf("http") === 0) {
      return SpreadsheetApp.openByUrl(url).getActiveSheet();
    } else {
      return SpreadsheetApp.openById(url).getActiveSheet();
    }
  }

  // 2. إذا كان السكربت مفتوحاً من داخل الشيت مباشرة عبر Extensions -> Apps Script
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active.getActiveSheet();
  }

  throw new Error("لم يتم العثور على جدول Google Sheet! يرجى وضع رابط الشيت في خانة SPREADSHEET_URL بأعلى الكود أو إنشاء السكربت من داخل الشيت عبر Extensions -> Apps Script.");
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // منع تعارض الطلبات المتزامنة

  try {
    var sheet = getTargetSheet();

    // إنشاء صف العناوين تلقائياً إذا كان الشيت فارغاً
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "وقت التسجيل",
        "اسم المريض",
        "رقم الموبايل",
        "القسم الطبي",
        "الطبيب المفضل",
        "تاريخ الحجز المطلوب",
        "كيف سمع عنا"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0f9d8a");
      headerRange.setFontColor("#ffffff");
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var formattedDate = Utilities.formatDate(now, "Africa/Cairo", "yyyy-MM-dd HH:mm:ss");

    var name = data.name || "";
    var mobile = data.mobile || "";
    var department = data.department || "";
    var doctor = data.doctor || "غير محدد";
    var date = data.date || "";
    var referral = data.referral || "";

    // إضافة ' قبل الموبايل لمنع إزالة الصفر في بداية الرقم من قبل إكسل/شيتس
    sheet.appendRow([
      formattedDate,
      name,
      "'" + mobile,
      department,
      doctor,
      date,
      referral
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "تم حفظ الحجز بنجاح"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var sheetLink = "";
  try {
    var s = getTargetSheet();
    sheetLink = s.getParent().getUrl();
  } catch (err) {
    sheetLink = "لم يتم ربط شيت بعد - يرجى وضع الرابط في SPREADSHEET_URL";
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Google Sheets Web App is connected and active!",
    sheetUrl: sheetLink
  })).setMimeType(ContentService.MimeType.JSON);
}
