// Pixel Launcher v2.3 - by unvsDev
// for Setting up Pixel Widget

// Unauthorized Redistribute is Strictly prohibited.
// Contact developer for question, or reporting abuse
// You can use Discord to contact @unvsDev!

// German Fork by jojo-mp4 v1.5

const version = 2.3
const plName = Script.name()

var fm = FileManager.iCloud()
var fDir = fm.joinPath(fm.documentsDirectory(), "/Pixel Widget")
if(!fm.fileExists(fDir)){ fm.createDirectory(fDir) }
var prefPath = fm.joinPath(fDir, "pixelPref.txt")
var namePath = fm.joinPath(fDir, "plName.txt")
var progPath = fm.joinPath(fDir, "plPlugin.txt")

fm.writeString(namePath, JSON.stringify({"name":plName, "update":"false"}))

var defaultJSON = {"apikey":"openweatherapikey","cityid":"1835848","layout":"pixel","username":"Sir","tempunit":"metric","locale":"de","textcolor":"#ffffff","textsize":"23","iconcolor":"default","iconsize":"27","font":"Product Sans","fontbold":"Product Sans Medium","spacing":"45","previewmode":"true","previewsize":"medium","refreshview":"false","greeting1":"Guten Morgen","greeting2":"Guten Nachmittag","greeting3":"Guten Abend","greeting4":"Gute Nacht","greeting5":"Zeit zu schlafen","greeting0":"Willkommen beim Pixel Widget","dateformat":"EEEE, dd. MMMM","quotemode":"false","bgmode":"solid","bglight":"null","bgdark":"null","bgcolor":"#147158","iconrefresh":"true","wallrefresh":"true","refreshrate":"90","ddaymode":"false","ddayname":"Weihnachten","ddaytarg":"2021-12-24","hideb":"false","event":"true"}

var optionName = {
  "apikey": "Openweather API Key",
  "cityid": "City ID",
  "layout": "Widget Layout",
  "username": "Benutzername",
  "tempunit": "Temperatureinheit",
  "locale": "Standort",
  "textcolor": "Text Farbe",
  "textsize": "Text Größe",
  "iconcolor": "Symbol Farbe",
  "iconsize": "Symbol Größe",
  "font": "Schriftart",
  "fontbold": "fette Schriftart",
  "spacing": "obere Leerzeile",
  "previewmode": "Widget Vorschau",
  "previewsize": "Widget Vorschau größe",
  "refreshview": "RefreshView",
  "greeting1": "Morgen Begrüßung",
  "greeting2": "Nachmittag Begrüßung",
  "greeting3": "Abend Begrüßung",
  "greeting4": "Nacht Begrüßung",
  "greeting5": "Begrüßung zum Schlafen",
  "greeting0": "feste Begrüßung",
  "dateformat": "Datum Format",
  "quotemode": "Benutze feste Begrüßung",
  "bgmode": "Hintergrund Modus",
  "bglight": "Hellen Hintergrund auswählen",
  "bgdark": "Dunklen Hintergrund auswählen",
  "bgcolor": "Hintergrund Farbe",
  "iconrefresh": "Immer Wetter Symbol aktualisieren",
  "wallrefresh": "Immer Hintergrundbild aktualisieren",
  "refreshrate": "Widget Aktualisierungsrate",
  "ddaymode": "Countdown an/aus",
  "ddayname": "Name des Countdowns",
  "ddaytarg": "Datum des Countdowns",
  "hideb": "Blende das Batterie Symbol aus",
  "event": "Zeige Kalendereinträge"
}

var optionFormat = {
  "apikey": "API Key hier einfügen",
  "cityid": "City ID für festen Standort hier einfügen",
  "layout": "(pixel, siri)",
  "username": "Name für die Begrüßung",
  "tempunit": "(metric, imperial)",
  "locale": "Für sprachliche Anpassung",
  "textcolor": "(auto, or Color Hex Code)",
  "textsize": "(Zahl)",
  "iconcolor": "(auto, default, or Color Hex Code)",
  "iconsize": "(Zahl)",
  "font": "(Schriftart Name)",
  "fontbold": "(Schriftart Name)",
  "spacing": "(Zahl)",
  "previewmode": "(true, false) - zeige Vorschau",
  "previewsize": "(small, medium, large)",
  "refreshview": "(true, false) - zeige letzte Aktualisierung",
  "greeting1": "(String) - 5 Uhr ~ 11 Uhr",
  "greeting2": "(String) - 12 Uhr ~ 17 Uhr",
  "greeting3": "(String) - 18 Uhr ~ 21 Uhr",
  "greeting4": "(String) - 22 Uhr ~ 23 Uhr",
  "greeting5": "(String) - 24 Uhr ~ 4 Uhr",
  "greeting0": "(String) - Wird angezeigt wenn feste Begrüßung = true",
  "dateformat": "(Date Format) - show date",
  "quotemode": "(true, false) - zeige feste Begrüßunge",
  "bgmode": "(auto, fixed, solid, or gradient)",
  "bglight": "für fixed & auto mode",
  "bgdark": "für auto mode",
  "bgcolor": "(Color Hex Code) - solid mode",
  "iconrefresh": "(true, false) - empfohlen true",
  "wallrefresh": "(true, false) - empfohlen true",
  "refreshrate": "(second)",
  "ddaymode": "(true, false)",
  "ddayname": "(Name)",
  "ddaytarg": "Format: Jahr-Monat-Datum",
  "hideb": "(true, false)",
  "event": "(true, false)"
}

var welcomemode = 0

// Preparing File
let prefData0; var settingmode = 0; var pluginmode = 0;
if(!(fm.fileExists(prefPath))) {
  welcomemode = 1
  await fm.writeString(prefPath, JSON.stringify(defaultJSON))
}

var orgProgData = {
    "minimemo": "",
    "minidday": ["", ""]
}
let progData
if(!(fm.fileExists(progPath))) {
  progData = orgProgData
  await fm.writeString(progPath, JSON.stringify(progData))
}

// Main Menu
let plAlert = new Alert()
plAlert.title = welcomemode ? "Welcome to Pixel Widget!" : "Pixel Launcher"
let menuOptions = ["Widget anpassen", "Plugins", "Allgemeine Einstellungen"]
for(const option of menuOptions) {
  plAlert.addAction(option)
}
plAlert.addCancelAction("fertig")
let response = await plAlert.presentAlert()
if(response == 1){
  pluginmode = 1
} else if(response == 2) {
  settingmode = 1
} else if(response == -1) {
  return 0
}


if(pluginmode){
  progData = JSON.parse(fm.readString(progPath))
  
  // Auto Update Preferences
  var cnt = 0
  for(i in orgProgData){
    if(progData[i] == undefined){
      cnt = cnt + 1
      progData[i] = orgProgData[i]
      console.log("[!] Updating preferences.. (" + cnt + ")")
    }
  }
  
  let pluginMenu = new UITable()
  pluginMenu.showSeparators = true
  
  
  const minimemo = new UITableRow()
  minimemo.dismissOnSelect = false
  minimemo.addText("kurze Notiz", "Schreibe einen kurzen Text oder eine Erinnerung")
  pluginMenu.addRow(minimemo)
  
  minimemo.onSelect = async () => {
    let pAlert = new Alert()
    pAlert.title = "Bearbeite Notiz"
    pAlert.message = "\nLasse es leer zum Ausblenden."
    pAlert.addTextField("Schreibe Notiz", progData.minimemo)
    pAlert.addCancelAction("Abbrechen")
    pAlert.addAction("Fertig")
    let response = await pAlert.present()
    if(response != -1) {
      progData.minimemo = pAlert.textFieldValue()
    }
  }
  
  const minidday = new UITableRow()
  minidday.dismissOnSelect = false
  minidday.addText("Countdown", "Feiere deinen besonderen Tag mit einem kleinen Countdown!")
  pluginMenu.addRow(minidday)
  
  minidday.onSelect = async () => {
    let pAlert = new Alert()
    pAlert.title = "Bearbeite deinen Countdown"
    pAlert.message = (progData.minidday[0].length < 1 ? "Der Countdown ist uur Zeit ausgeschaltet." : progData.minidday[1] + " is set to " + progData.minidday[0]) + "\nLasse es leer um es auszublenden, oder schreibe ein Datum hinein."
    pAlert.addTextField("Format: Jahr-Monat-Tag", progData.minidday[0])
    pAlert.addTextField("Countdown Name", progData.minidday[1])
    pAlert.addCancelAction("Abbrechen")
    pAlert.addAction("Fertig")
    let response = await pAlert.present()
    if(response != -1) {
      progData.minidday[0] = pAlert.textFieldValue(0)
      progData.minidday[1] = pAlert.textFieldValue(1)
    }
  }
  
  await pluginMenu.present()
  
  await fm.writeString(progPath, JSON.stringify(progData))
  
  return 0
}


// General Settings
if(settingmode){
  let settings = new UITable()
  settings.showSeparators = true
  
  const option1 = new UITableRow()
  option1.dismissOnSelect = false
  option1.addText("Installiere das Schriftart Profil")
  settings.addRow(option1)
  
  option1.onSelect = async () => {
    var fontURL = await new Request("https://pastebin.com/raw/rfHS7Xey").loadString()
    Safari.openInApp(fontURL, false)
  }
  
  const option2 = new UITableRow()
  option2.dismissOnSelect = true
  option2.addText("Widget zurücksetzen")
  settings.addRow(option2)
  
  option2.onSelect = async () => {
    let resetAlert = new Alert()
    resetAlert.title = "bestätige Zurücksetzten"
    resetAlert.message = "Möchtest du wirklich alle Daten löschen? Du kannst sie danach nicht mehr wiederherstellen."
    resetAlert.addCancelAction("abbrechen")
    resetAlert.addDestructiveAction("Ja")
    let response = await resetAlert.presentAlert()
    if(response != -1) {
      fm.remove(prefPath)
      return 0
    }
    
    await settings.present()
  }
  
  
     const option4 = new UITableRow()
     option4.dismissOnSelect = false
     option4.addText("Widget Version 1.5 (tippe um Github zu öffnen)")
     settings.addRow(option4)
  
     option4.onSelect = () => {
       Safari.openInApp("https://github.com/jojo-mp4/german-pixel-widget", false)
     }
  
  await settings.present()
  
  return 0
}


// Edit Preferences
fm.downloadFileFromiCloud(prefPath)
prefData0 = fm.readString(prefPath)
let prefData = JSON.parse(prefData0)

var prevData = {
  "apikey": prefData.apikey,
  "cityid": prefData.cityid,
  "layout": prefData.layout,
  "username": prefData.username,
  "tempunit": prefData.tempunit,
  "locale": prefData.locale,
  "textcolor": prefData.textcolor,
  "textsize": prefData.textsize,
  "iconcolor": prefData.iconcolor,
  "iconsize": prefData.iconsize,
  "font": prefData.font,
  "fontbold": prefData.fontbold,
  "spacing": prefData.spacing,
  "previewmode": prefData.previewmode,
  "previewsize": prefData.previewsize,
  "refreshview": prefData.refreshview,
  "greeting1": prefData.greeting1,
  "greeting2": prefData.greeting2,
  "greeting3": prefData.greeting3,
  "greeting4": prefData.greeting4,
  "greeting5": prefData.greeting5,
  "greeting0": prefData.greeting0,
  "dateformat": prefData.dateformat,
  "quotemode": prefData.quotemode,
  "bgmode": prefData.bgmode,
  "bglight": prefData.bglight,
  "bgdark": prefData.bgdark,
  "bgcolor": prefData.bgcolor,
  "iconrefresh": prefData.iconrefresh,
  "wallrefresh": prefData.wallrefresh,
  "refreshrate": prefData.refreshrate,
  "ddaymode": prefData.ddaymode,
  "ddayname": prefData.ddayname,
  "ddaytarg": prefData.ddaytarg,
  "hideb": prefData.hideb,
  "event": prefData.event
}

// Auto Update Preferences
var cnt = 0
for(i in defaultJSON){
  if(prevData[i] == undefined){
    cnt = cnt + 1
    prevData[i] = defaultJSON[i]
    console.log("[!] Updating preferences.. (" + cnt + ")")
  }
}

const settings = new UITable()
settings.showSeparators = true

var optionList = []
for(title in prevData){
  // Settings List
  const option = new UITableRow()
  optionList.push(title)
  option.dismissOnSelect = false
  option.addText(optionName[title], optionFormat[title])
  settings.addRow(option)
  option.onSelect = async (number) => {
    if(number != 24 && number != 25 && number != 26){
      let editAlert = new Alert()
      editAlert.title = "Bearbeite " + optionName[optionList[number]]
      editAlert.addTextField(optionFormat[optionList[number]], prevData[optionList[number]].toString())
      editAlert.addCancelAction("Abbrechen")
      editAlert.addAction("Fertig")
      if(await editAlert.present() == 0){
        prevData[optionList[number]] = editAlert.textFieldValue()
      }
    } else if(number == 24){
      let bgPickerAlert = new Alert()
      bgPickerAlert.title = "Bearbeite Hintergrund Modus"
      bgPickerAlert.message = "Gerade eingestellt zu " + prevData.bgmode + "."
      bgPickerAlert.addAction("Fixed - Ein Hintergrund")
      bgPickerAlert.addAction("Auto - Zwei Hintergründe")
      bgPickerAlert.addAction("Solid - einfache Farbe")
      bgPickerAlert.addAction("Gradient - Basiert auf der Zeit")
      bgPickerAlert.addCancelAction("Abbrechen")
      let response = await bgPickerAlert.present()
      if(response == 0) { prevData.bgmode = "fixed" }
      else if(response == 1) { prevData.bgmode = "auto" }
      else if(response == 2) { prevData.bgmode = "solid" }
      else if(response == 3) { prevData.bgmode = "gradient" }
      
    } else if(number == 25){
      if(prevData.bgmode == "fixed" || prevData.bgmode == "auto") {
        prevData.bglight = await DocumentPicker.openFile()
        let bgPickerAlert = new Alert()
        bgPickerAlert.title = "Helles Hintergrundbild"
        bgPickerAlert.message = "Dein Hintergrundbild wurde erfolgreich gespeichert!"
        bgPickerAlert.addAction("OK")
        await bgPickerAlert.present()
      } else {
        let bgPickerAlert = new Alert()
        bgPickerAlert.title = "Helles Hintergrundbild"
        bgPickerAlert.message = "Du kannst diesen Bereich ändern\nwenn du in fixed / auto mode bist."
        bgPickerAlert.addAction("OK")
        await bgPickerAlert.present()
      }
    } else if(number == 26){
      if(prevData.bgmode == "auto") {
        prevData.bgdark = await DocumentPicker.openFile()
        let bgPickerAlert = new Alert()
        bgPickerAlert.title = "Dunkles Hintergrundbild"
        bgPickerAlert.message = "Dein Hintergrundbild wurde erfolgreich gespeichert!"
        bgPickerAlert.addAction("OK")
        await bgPickerAlert.present()
      } else {
        let bgPickerAlert = new Alert()
        bgPickerAlert.title = "Dunkles Hintergrundbild"
        bgPickerAlert.message = "Du kannst diesen Bereich ändern wenn du in auto mode bist."
        bgPickerAlert.addAction("OK")
        await bgPickerAlert.present()
      }
    }
  }
}
await settings.present()

fm.writeString(prefPath, JSON.stringify(prevData))

Script.complete()

async function generateAlert(title,message,options) {
  let alert = new Alert()
  alert.title = title
  alert.message = message
  
  for (const option of options) {
    alert.addAction(option)
  }
  
  let response = await alert.presentAlert()
  return response
}
