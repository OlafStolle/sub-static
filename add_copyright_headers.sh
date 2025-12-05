#!/bin/bash
# Script zum Hinzufügen von Copyright-Headern zu HTML/JS/CSS Dateien
# WICHTIG: Erstellt automatisch Backup!

set -e

HEADER_JS_CSS="COPYRIGHT_HEADER.txt"
HEADER_HTML="COPYRIGHT_HEADER_HTML.txt"
BACKUP_DIR="backup_before_copyright_$(date +%Y%m%d_%H%M%S)"

echo "==================================="
echo "Copyright Header Injection Script"
echo "sub-static Projekt (HTML/JS/CSS)"
echo "==================================="
echo ""

# Prüfe ob Header-Dateien existieren
if [ ! -f "$HEADER_JS_CSS" ]; then
    echo "❌ ERROR: $HEADER_JS_CSS nicht gefunden!"
    exit 1
fi

if [ ! -f "$HEADER_HTML" ]; then
    echo "❌ ERROR: $HEADER_HTML nicht gefunden!"
    exit 1
fi

# Erstelle Backup
echo "📦 Erstelle Backup in: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Funktion: Copyright-Header hinzufügen
add_header() {
    local file="$1"
    local header_file="$2"
    local temp_file="${file}.tmp"

    # Prüfe ob Datei bereits Copyright-Header hat
    if grep -q "AiCrafters Platform - Proprietary" "$file" 2>/dev/null; then
        echo "  ⏭️  Überspringe: $file (Header bereits vorhanden)"
        return 1
    fi

    # Backup erstellen
    cp "$file" "$BACKUP_DIR/"

    # Header hinzufügen
    cat "$header_file" > "$temp_file"
    echo "" >> "$temp_file"
    cat "$file" >> "$temp_file"
    mv "$temp_file" "$file"

    echo "  ✅ Header hinzugefügt: $file"
    return 0
}

# Zähler
TOTAL=0
ADDED=0
SKIPPED=0

echo ""
echo "🔍 Suche Code-Dateien..."
echo ""

# HTML Dateien
echo "📄 Verarbeite HTML Dateien (.html)..."
while IFS= read -r -d '' file; do
    # Überspringe Archiv und Backup-Verzeichnisse
    if [[ "$file" == *"/Archiv/"* ]] || [[ "$file" == *"/backup_"* ]]; then
        echo "  ⏭️  Überspringe Archiv/Backup: $file"
        continue
    fi

    TOTAL=$((TOTAL + 1))
    if add_header "$file" "$HEADER_HTML"; then
        ADDED=$((ADDED + 1))
    else
        SKIPPED=$((SKIPPED + 1))
    fi
done < <(find . -name "*.html" -not -path "./Archiv/*" -not -path "./backup_*" -print0 2>/dev/null)

# JavaScript Dateien
echo ""
echo "📄 Verarbeite JavaScript Dateien (.js)..."
while IFS= read -r -d '' file; do
    # Überspringe node_modules und Backup-Verzeichnisse
    if [[ "$file" == *"/node_modules/"* ]] || [[ "$file" == *"/backup_"* ]]; then
        continue
    fi

    TOTAL=$((TOTAL + 1))
    if add_header "$file" "$HEADER_JS_CSS"; then
        ADDED=$((ADDED + 1))
    else
        SKIPPED=$((SKIPPED + 1))
    fi
done < <(find . -name "*.js" -not -path "./node_modules/*" -not -path "./backup_*" -print0 2>/dev/null)

# CSS Dateien
echo ""
echo "📄 Verarbeite CSS Dateien (.css)..."
while IFS= read -r -d '' file; do
    # Überspringe Backup-Verzeichnisse
    if [[ "$file" == *"/backup_"* ]]; then
        continue
    fi

    TOTAL=$((TOTAL + 1))
    if add_header "$file" "$HEADER_JS_CSS"; then
        ADDED=$((ADDED + 1))
    else
        SKIPPED=$((SKIPPED + 1))
    fi
done < <(find . -name "*.css" -not -path "./backup_*" -print0 2>/dev/null)

echo ""
echo "==================================="
echo "Zusammenfassung"
echo "==================================="
echo "Gesamt:        $TOTAL Dateien"
echo "Hinzugefügt:   $ADDED Dateien"
echo "Übersprungen:  $SKIPPED Dateien"
echo "Backup:        $BACKUP_DIR"
echo ""

if [ $ADDED -gt 0 ]; then
    echo "✅ Copyright-Header erfolgreich hinzugefügt!"
    echo ""
    echo "⚠️  WICHTIG:"
    echo "   1. Prüfe die Änderungen: git diff"
    echo "   2. Teste die Anwendung im Browser"
    echo "   3. Backup-Verzeichnis aufbewahren: $BACKUP_DIR"
    echo "   4. Bei Problemen: cp -r $BACKUP_DIR/* ."
    echo ""
    echo "📝 Nächste Schritte:"
    echo "   git add ."
    echo "   git commit -m 'feat: ⚖️ Copyright-Schutz-System implementiert'"
    echo "   git push"
else
    echo "ℹ️  Keine neuen Header hinzugefügt."
fi

echo ""
echo "==================================="
