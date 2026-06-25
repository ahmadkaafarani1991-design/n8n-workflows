# 🤖 JARVIS - Desktop AI Assistant (Electron)

Ein **echter persönlicher AI-Assistent** im Iron Man JARVIS-Stil. Nicht nur ein Chat-Bot, sondern ein vollständiges Desktop-System mit Voice Recognition, NLP und echtem AI.

## ✨ Features

### 🎤 Voice Recognition & Synthesis
- ✅ Spracherkennung (Deutsch, Englisch, etc.)
- ✅ Natural Language Processing
- ✅ Text-to-Speech Ausgabe
- ✅ Kontinuierliches Zuhören
- ✅ Interim-Transkript während des Sprechens

### 🧠 Intelligente Verarbeitung
- ✅ Intent-Erkennung (Absichts-Analyse)
- ✅ Kontextabhängige Antworten
- ✅ Gesprächshistorie
- ✅ Plug-in System für Erweiterungen
- ✅ Lernen aus Benutzerinteraktionen

### 🖥️ Desktop Integration
- ✅ Electron Desktop App
- ✅ Systemstatus & Monitoring
- ✅ Timer & Alarme
- ✅ Wetter Integration
- ✅ Zeitanzeige & Lokalisierung

### 🎨 UI/UX
- ✅ JARVIS-inspiriertes Design (blau/cyan)
- ✅ Responsive Interface
- ✅ Realtime Status-Anzeige
- ✅ Animationen & Effekte
- ✅ Chat-Interface

## 📦 Installation

### Systemanforderungen
- Node.js 14+
- npm oder yarn
- Windows/macOS/Linux

### Setup

```bash
# Repository klonen
git clone https://github.com/ahmadkaafarani1991-design/jarvis-desktop.git
cd jarvis-desktop

# Abhängigkeiten installieren
npm install

# Development starten
npm run dev

# Produktions-Build
npm run dist
```

## 🚀 Verwendung

### 1. Anwendung starten
```bash
npm start
```

### 2. Voice-Befehle nutzen
Klick auf das 🎤 Button und sprechen:

```
"Was ist die aktuelle Zeit?"
"Wetter heute"
"Timer für 5 Minuten"
"Erzähl mir einen Witz"
"Systemstatus"
"Suche nach [Begriff]"
```

### 3. Text eingeben
Direkt in das Eingabefeld tippen und Enter drücken.

## 📁 Projektstruktur

```
jarvis-desktop/
├── main.js                 # Electron Main Process
├── preload.js             # IPC Bridge (sicher)
├── package.json           # Dependencies
│
├── src/
│   ├── App.jsx           # React UI Komponente
│   ├── App.css           # JARVIS Styling
│   ├── index.jsx         # React Entry Point
│   │
│   └── services/
│       ├── voiceAssistant.js    # Speech Recognition/Synthesis
│       ├── nlpEngine.js         # Natural Language Processing
│       ├── commandHandler.js    # Befehlsverarbeitung
│       └── pluginSystem.js      # Erweiterungssystem
│
├── public/
│   ├── index.html        # HTML Template
│   └── favicon.ico       # App Icon
│
└── assets/
    └── jarvis-icon.png   # App Icon für Desktop
```

## 🧠 NLP Engine - Verfügbare Intents

| Intent | Keywords | Funktion |
|--------|----------|----------|
| **GREETING** | hallo, hi, guten morgen | Begrüßung |
| **TIME** | zeit, uhr, wie spät | Aktuelle Zeit |
| **WEATHER** | wetter, temperatur, regen | Wetterbericht |
| **TIMER** | timer, alarm, erinnern | Timer setzen |
| **SEARCH** | suchen, google, was ist | Web-Suche |
| **SYSTEM** | system, status, prozess | System-Info |
| **JOKE** | witz, lustig, spaß | Witz erzählen |
| **HELP** | hilfe, befehle | Hilfe |
| **FAREWELL** | auf wiedersehen, tschüss | Verabschiedung |

## 🔧 API Reference

### Voice Assistant

```javascript
// Spracherkennung starten
await jarvis.startVoiceRecognition();

// Spracherkennung stoppen
await jarvis.stopVoiceRecognition();

// Text aussprechen
await jarvis.speak('Guten Tag, Sir');

// Sprache wechseln
jarvis.setLanguage('en-US');
```

### NLP Engine

```javascript
// Text verarbeiten
const result = await jarvis.processText('Was ist die Zeit?');
// Returns: { response, intent, confidence, action }

// Gesprächshistorie abrufen
const history = nlpEngine.getConversationHistory();

// Plugin registrieren
nlpEngine.registerPlugin('custom', async (text) => {
  return 'Custom handler response';
});
```

### IPC Communication

```javascript
// Text prozessieren
ipcRenderer.invoke('process-text', 'Benutzer-Input');

// Voice Recognition
ipcRenderer.invoke('start-voice-recognition');
ipcRenderer.invoke('stop-voice-recognition');

// Systeminfo
ipcRenderer.invoke('get-system-info');
```

## 🎨 Styling & Theme

JARVIS nutzt ein **Cyan/Dunkelblau-Theme** inspiriert von Iron Mans UI:

```css
--primary: #0a7ea4
--primary-light: #00d9ff
--bg-dark: #0a1628
--text-primary: #00d9ff
```

Alle Farben können in `src/App.css` angepasst werden.

## 🧩 Plugin System

Erweitere JARVIS mit eigenen Befehlen:

```javascript
// Plugin registrieren
nlpEngine.registerPlugin('mein-befehl', async (text) => {
  // Benutzerdefinierte Logik
  return 'Antwort';
});

// Intent hinzufügen
INTENTS.MEIN_INTENT = {
  keywords: ['schlüsselwort1', 'schlüsselwort2'],
  handler: 'mein-befehl'
};
```

## 🔊 Sprachen

Standard: Deutsch (de-DE)

Unterstützte Sprachen:
- Deutsch (de-DE)
- Englisch (en-US)
- Französisch (fr-FR)
- Spanisch (es-ES)

Sprache wechseln:
```javascript
jarvis.setLanguage('en-US');
recognition.language = 'fr-FR';
```

## 🐛 Troubleshooting

### Spracherkennung funktioniert nicht
- Chrome/Edge verwenden (beste Unterstützung)
- Microphone-Permissions checken
- Console auf Fehler prüfen

### Keine Stimmen verfügbar
```javascript
// Verfügbare Stimmen anzeigen
const voices = jarvis.getVoices();
console.log(voices);
```

### Performance-Probleme
- Chrome DevTools öffnen (F12)
- Memory & CPU monitoren
- Gesprächshistorie löschen: `nlpEngine.clearHistory()`

## 📝 Entwicklung

### Development Mode
```bash
npm run dev
```
- Hot-Reload für React
- DevTools automatisch offen
- Source Maps aktiviert

### Production Build
```bash
npm run dist
```
- Optimiert & minifiziert
- Installer für Windows/macOS
- Ready to ship

## 🔐 Sicherheit

- ✅ Context Isolation aktiviert
- ✅ Node Integration deaktiviert
- ✅ Preload Script für IPC
- ✅ Sandbox-Mode
- ✅ Keine unsicheren APIs

## 🚀 Zukünftige Features

- 🌙 Dark Mode Toggle
- 📚 Lokale Wissensdatenbank
- 🔗 API-Integration (Weather, News)
- 📊 Erweiterte Analytics
- 🎯 Maschinelles Lernen
- ☁️ Cloud-Sync Option
- 🎮 Spiel-Integration
- 📱 Mobile Companion App

## 📄 Lizenz

MIT License - Frei verwendbar für persönlich & kommerzielle Projekte

## 🤝 Beitragen

Contributions sind willkommen! Bitte:
1. Fork das Repo
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📧 Kontakt

Ahmad Kaafarani
- GitHub: [@ahmadkaafarani1991-design](https://github.com/ahmadkaafarani1991-design)
- Email: ahmadkaafarani1991@gmail.com

---

**JARVIS - Your Personal AI Assistant** 🤖✨
