// wartet bis die gesamte webseite geladen ist bevor den rest der code ausführt.
document.addEventListener('DOMContentLoaded', () => {
    // es lädt xml und verarbeitet
    const loadXMLDoc = async () => {
        try {
            // Holt die Datei site.xml 
            const response = await fetch('site.xml');
            // die Datei überprüfen erfolgreich geladen wurde.
            if (!response.ok) {
                throw new Error('networkrespone not oke');
            }
            // liest die Datei als Text.
            const xmlText = await response.text();
            // einen parser erstellen text in xml dokument umwandeln
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            // xml dokumente inhalt anzeigen
            displayResult(xmlDoc);
        } catch (error) {
            // fehlermeldung
            console.error('error', error);
        }
    };

    // ergeinisse anzeigen
    const displayResult = (xmlDoc) => {
        // alle seite vom xml holen
        const seiten = xmlDoc.getElementsByTagName('seite');
        let output = '<h2>Webseiten</h2>';
        // geht durch alle seite.
        for (let i = 0; i < seiten.length; i++) {
            const titel = seiten[i].getElementsByTagName('titel')[0].textContent;
            const url = seiten[i].getElementsByTagName('url')[0].textContent;
            // fügt titel und urls hinzu.
            output += `<p><strong>Titel:</strong> ${titel}<br><strong>URL:</strong> <a href="${url}">${url}</a></p>`;
        }
        document.getElementById('result').innerHTML = output;
    };

    
    loadXMLDoc();
});
