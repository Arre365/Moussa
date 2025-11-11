// js/excel-converter.js
class ExcelConverter {
    constructor() {
        this.data = null;
    }

    // Méthode pour convertir des données Excel formatées manuellement en JSON
    convertManualData() {
        // Vos données structurées manuellement depuis Excel
        const manualData = {
            metadata: {
                last_updated: new Date().toISOString().split('T')[0],
                source: "World Bank, UNESCO, OMS, Banque Africaine de Développement"
            },
            population: {
                total: [
                    { period: "avant_1977", value: 96000 },
                    { period: "1977_1999", value: 384000 },
                    { period: "2000_2024", value: 989000 }
                ],
                age_structure: [
                    { category: "0-14 ans", avant_1977: 46, "1977_1999": 42, "2000_2024": 35 },
                    { category: "15-64 ans", avant_1977: 51, "1977_1999": 55, "2000_2024": 62 },
                    { category: "65+ ans", avant_1977: 2.4, "1977_1999": 3.1, "2000_2024": 4.9 }
                ]
            },
            education: {
                schools: [
                    { type: "primaires", avant_1977: 25, "1977_1999": 85, "2000_2024": 150 },
                    { type: "colleges", avant_1977: 5, "1977_1999": 15, "2000_2024": 35 },
                    { type: "lycees", avant_1977: 2, "1977_1999": 8, "2000_2024": 20 },
                    { type: "universites", avant_1977: 0, "1977_1999": 1, "2000_2024": 3 }
                ],
                students: [
                    { level: "primaire", avant_1977: 5000, "1977_1999": 45000, "2000_2024": 85000 },
                    { level: "universitaire", avant_1977: 0, "1977_1999": 500, "2000_2024": 8000 }
                ]
            },
            health: {
                infrastructure: [
                    { type: "hopitaux", avant_1977: 2, "1977_1999": 4, "2000_2024": 8 },
                    { type: "centres_sante", avant_1977: 10, "1977_1999": 25, "2000_2024": 45 },
                    { type: "postes_sante", avant_1977: 15, "1977_1999": 40, "2000_2024": 80 }
                ],
                personnel: [
                    { type: "medecins", avant_1977: 20, "1977_1999": 50, "2000_2024": 227 },
                    { type: "infirmiers", avant_1977: 50, "1977_1999": 150, "2000_2024": 1078 },
                    { type: "sages_femmes", avant_1977: 10, "1977_1999": 30, "2000_2024": 80 }
                ],
                indicators: [
                    { indicator: "mortalite_infantile", avant_1977: 130, "1977_1999": 100, "2000_2024": 48 },
                    { indicator: "esperance_vie", avant_1977: 48, "1977_1999": 55, "2000_2024": 64 }
                ]
            },
            economy: {
                gdp: [
                    { period: "avant_1977", value: 847 },
                    { period: "1977_1999", value: 735 },
                    { period: "2000_2024", value: 3496 }
                ],
                trade: [
                    { type: "exportations", avant_1977: 21, "1977_1999": 16, "2000_2024": 3830 },
                    { type: "importations", avant_1977: 33, "1977_1999": 120, "2000_2024": 4390 }
                ]
            },
            technology: {
                connectivity: [
                    { type: "abonnements_mobile", avant_1977: 0, "1977_1999": 5000, "2000_2024": 800000 },
                    { type: "utilisateurs_internet", avant_1977: 0, "1977_1999": 1, "2000_2024": 60 }
                ]
            }
        };

        return manualData;
    }

    // Méthode pour sauvegarder les données en JSON
    saveToJSON(data, filename = 'djibouti-data.json') {
        const jsonString = JSON.stringify(data, null, 2);
        
        // Créer un blob et un lien de téléchargement
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`Fichier ${filename} prêt au téléchargement`);
    }

    // Méthode pour initialiser la conversion
    init() {
        const data = this.convertManualData();
        console.log('Données converties:', data);
        
        // Optionnel: Sauvegarder automatiquement
        // this.saveToJSON(data);
        
        return data;
    }
}

// Si vous voulez une interface utilisateur pour la conversion
function setupConverterUI() {
    const converter = new ExcelConverter();
    
    const convertBtn = document.createElement('button');
    convertBtn.textContent = 'Générer JSON depuis Excel';
    convertBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 1000;
        padding: 10px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    convertBtn.addEventListener('click', () => {
        const data = converter.init();
        converter.saveToJSON(data);
    });
    
    document.body.appendChild(convertBtn);
}

// Version alternative: Conversion directe sans UI
function generateDataFile() {
    const converter = new ExcelConverter();
    const data = converter.convertManualData();
    
    // Sauvegarder directement dans le localStorage pour développement
    localStorage.setItem('djiboutiData', JSON.stringify(data));
    console.log('Données sauvegardées dans localStorage');
    
    return data;
}

// Exporter pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExcelConverter;
} else {
    window.ExcelConverter = ExcelConverter;
    window.generateDataFile = generateDataFile;
    window.setupConverterUI = setupConverterUI;
}