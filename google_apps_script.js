/**
 * NileCare Healthcare - Google Apps Script Backend
 * كود الربط بين موقع العيادة وجدول بيانات Google Sheets
 * 
 * طريقة التركيب:
 * 1. افتح جدول Google Sheets الخاص بك.
 * 2. من القائمة العلوية اضغط على: Extensions (الإضافات / التطبيقات الملحقة) -> Apps Script.
 * 3. احذف أي كود موجود في المحرر واستبدله بهذا الكود كاملاً.
 * 4. اضغط حفظ (أيقونة القرص أو Ctrl+S).
 * 5. اضغط على الزر الأزرق Deploy (نشر) -> New deployment (نشر جديد).
 * 6. اضغط على أيقونة الترس بجانب "Select type" واختر Web app.
 * 7. قم بضبط الإعدادات كالآتي:
 *    - Description: NileCare Booking Webhook
 *    - Execute as: Me (حسابك الشخصي على جوجل)
 *    - Who has access: Anyone (أي شخص) <--- هام جداً جداً!
 * 8. اضغط Deploy (نشر) وامنح الصلاحيات (Authorize access).
 * 9. انسخ الرابط الذي ينتهي بـ /exec وضعه في متغير APPS_SCRIPT_URL في ملف booking.html.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // منع تعارض الطلبات المتزامنة

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Google Sheets Web App is connected and active!"
  })).setMimeType(ContentService.MimeType.JSON);
}
