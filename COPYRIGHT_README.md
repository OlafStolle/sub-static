# Copyright-Schutz-System - sub-static Projekt

**Datum:** 2025-12-05
**Version:** 1.0
**Projekt:** DLKarte - Digitale Karten für Dienstleistungen

---

## 📋 ÜBERSICHT

Dieses Dokument beschreibt das implementierte Copyright-Schutz-System für das
sub-static Projekt (DLKarte).

---

## 📄 ERSTELLTE DATEIEN

### 1. **LICENSE**
Proprietäre Lizenzvereinbarung mit:
- Urheberrechtsschutz (© 2025 Olaf Stolle)
- Nutzungsbedingungen
- Vertragsstrafen (50.000€ - 500.000€)
- Rechtliche Durchsetzung
- Strafverfolgungshinweise (§ 106 UrhG)

### 2. **COPYRIGHT_HEADER.txt**
Template für JS/CSS-Dateien (/* */ Kommentare):
- Copyright-Notice
- Vertraulichkeitshinweis
- Strafen bei Verstößen
- Kontaktinformation

### 3. **COPYRIGHT_HEADER_HTML.txt**
Template für HTML-Dateien (<!-- --> Kommentare):
- Identischer Inhalt wie COPYRIGHT_HEADER.txt
- Angepasst für HTML-Kommentar-Syntax

### 4. **add_copyright_headers.sh**
Automatisierungs-Script zum:
- Hinzufügen von Copyright-Headern zu allen .html, .js, .css Dateien
- Backup-Erstellung vor Änderungen
- Überspringen bereits geschützter Dateien
- Rekursive Verarbeitung von Unterverzeichnissen

---

## 🚀 IMPLEMENTIERUNG

### Copyright-Header zu Code hinzufügen

```bash
# Script ausführbar machen
chmod +x add_copyright_headers.sh

# Copyright-Header hinzufügen
./add_copyright_headers.sh

# Änderungen prüfen
git diff
```

**Was macht das Script:**
- Sucht alle .html, .js, .css Dateien
- Überspringt bereits geschützte Dateien (erkennt "Proprietary and Confidential")
- Fügt passenden Header ein (HTML oder JS/CSS)
- Erstellt Backups vor Änderungen

---

## 📖 DATEIEN MIT COPYRIGHT-HEADER

Nach Ausführung des Scripts sind folgende Dateien geschützt:

**HTML-Dateien:**
- index.html
- dlkarte.html
- Alle HTML-Dateien in Unterverzeichnissen (Archiv/, etc.)

**JavaScript-Dateien:**
- js/main.js
- scripts/*.js
- Alle JS-Dateien in plugins/

**CSS-Dateien:**
- style.css
- styles.css
- Alle CSS-Dateien in Unterverzeichnissen

**NICHT bearbeitet:**
- README.md (Dokumentation)
- LICENSE (Lizenztext selbst)
- COPYRIGHT_*.txt (Header-Templates)
- .gitignore, package.json, etc. (Konfigurationsdateien)
- Binärdateien (.ico, .png, .json mit Geodaten)

---

## 🔒 RECHTLICHE HINWEISE

### ⚖️ WICHTIG - Keine Rechtsberatung!

Diese Vorlagen sind:
- ✅ Als Ausgangspunkt gedacht
- ✅ Basis für eigene Anpassungen
- ❌ KEINE professionelle Rechtsberatung

**Empfohlen:**
- Rechtsanwalt konsultieren (spezialisiert auf Urheberrecht/IT-Recht)
- Verträge an dein Land anpassen
- Strafen rechtlich prüfen lassen

### Urheberrecht in Deutschland

**Relevante Gesetze:**
- **§ 69a UrhG**: Computerprogramme (Besonderer Schutz)
- **§ 97 UrhG**: Unterlassungs- und Schadensersatzanspruch
- **§ 106 UrhG**: Unerlaubte Verwertung (Straftat!)
- **§ 108a UrhG**: Umgehung technischer Schutzmaßnahmen (Straftat!)

**Strafrahmen:**
- Freiheitsstrafe bis zu **3 Jahren** oder Geldstrafe
- In schweren Fällen bis zu **5 Jahren**

---

## 📊 VERTRAGSSTRAFEN-ÜBERSICHT

| Verstoß | Einmalige Strafe | Zusätzlich |
|---------|-----------------|-----------|
| Unlizenzierte Nutzung | 50.000 EUR | +5.000 EUR/Tag |
| Reverse Engineering | 100.000 EUR | Herausgabe Erkenntnisse |
| Weitergabe an Dritte | 150.000 EUR | Schadensersatz |
| Konkurrenzprodukte | 250.000 EUR | Unterlassung + Gewinnabschöpfung |
| Kommerzielle Verwertung | 500.000 EUR | +25% Umsatz |
| Copyright-Entfernung | 10.000 EUR | Pro entferntem Hinweis |

---

## 🎯 DURCHGEFÜHRTE SCHRITTE

- [x] LICENSE erstellt
- [x] COPYRIGHT_HEADER.txt erstellt (JS/CSS)
- [x] COPYRIGHT_HEADER_HTML.txt erstellt (HTML)
- [x] COPYRIGHT_README.md erstellt
- [x] add_copyright_headers.sh angepasst (HTML/JS/CSS)
- [ ] Script ausgeführt (in Arbeit)
- [ ] Git Commit + Push

---

## 📞 KONTAKT

**Rechteinhaber:**
Olaf Stolle
Buschstrasse 10a, 58091 Hagen
info@aicrafters.io

**Für Lizenzanfragen:**
- E-Mail: info@aicrafters.io
- Schriftliche Anfragen bevorzugt

**Für rechtliche Fragen:**
- **Konsultiere einen Fachanwalt für Urheberrecht!**

---

**© 2025 Olaf Stolle. Alle Rechte vorbehalten.**
