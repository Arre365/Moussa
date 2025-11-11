// js/chart-loader.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔵 ChartLoader initialisé');
    
    // Vérifier si les données existent
    if (typeof ExcelConverter !== 'undefined') {
        console.log('✅ ExcelConverter trouvé');
        initializeCharts();
    } else {
        console.error('❌ ExcelConverter non trouvé');
        // Solution de secours : charger les données directement
        loadFallbackData();
    }
});

function initializeCharts() {
    const converter = new ExcelConverter();
    const data = converter.convertManualData();
    
    console.log('📊 Données chargées:', data);
    
    // Afficher les données dans la page
    displayPopulationData(data.population);
    displayHealthData(data.health);
    displayEducationData(data.education);
    
    // Stocker les données pour utilisation ultérieure
    window.djiboutiData = data;
}

function displayPopulationData(population) {
    const container = document.getElementById('population-data');
    if (!container) {
        console.log('❌ Conteneur population-data non trouvé');
        return;
    }
    
    let html = '<h3>📊 Données de Population</h3>';
    
    // Population totale
    html += '<h4>Population Totale</h4>';
    population.total.forEach(item => {
        html += `<p>${item.period}: ${item.value.toLocaleString()} habitants</p>`;
    });
    
    // Structure par âge
    html += '<h4>Structure par Âge (%)</h4>';
    population.age_structure.forEach(item => {
        html += `<p><strong>${item.category}:</strong> `;
        html += `Avant 1977: ${item.avant_1977}% | `;
        html += `1977-1999: ${item["1977_1999"]}% | `;
        html += `2000-2024: ${item["2000_2024"]}%</p>`;
    });
    
    container.innerHTML = html;
}

function displayHealthData(health) {
    const container = document.getElementById('health-data');
    if (!container) return;
    
    let html = '<h3>🏥 Données de Santé</h3>';
    
    // Infrastructure
    html += '<h4>Infrastructure Médicale</h4>';
    health.infrastructure.forEach(item => {
        html += `<p><strong>${item.type}:</strong> `;
        html += `Avant 1977: ${item.avant_1977} | `;
        html += `1977-1999: ${item["1977_1999"]} | `;
        html += `2000-2024: ${item["2000_2024"]}</p>`;
    });
    
    // Personnel
    html += '<h4>Personnel Médical</h4>';
    health.personnel.forEach(item => {
        html += `<p><strong>${item.type}:</strong> `;
        html += `Avant 1977: ${item.avant_1977} | `;
        html += `1977-1999: ${item["1977_1999"]} | `;
        html += `2000-2024: ${item["2000_2024"]}</p>`;
    });
    
    container.innerHTML = html;
}

function displayEducationData(education) {
    const container = document.getElementById('education-data');
    if (!container) return;
    
    let html = '<h3>🎓 Données Éducation</h3>';
    
    // Écoles
    html += '<h4>Établissements Scolaires</h4>';
    education.schools.forEach(item => {
        html += `<p><strong>${item.type}:</strong> `;
        html += `Avant 1977: ${item.avant_1977} | `;
        html += `1977-1999: ${item["1977_1999"]} | `;
        html += `2000-2024: ${item["2000_2024"]}</p>`;
    });
    
    container.innerHTML = html;
}

function loadFallbackData() {
    console.log('🔄 Chargement des données de secours...');
    
    // Données minimales pour démonstration
    const fallbackData = {
        population: {
            total: [
                { period: "avant_1977", value: 96000 },
                { period: "1977_1999", value: 384000 },
                { period: "2000_2024", value: 989000 }
            ]
        },
        health: {
            personnel: [
                { type: "medecins", avant_1977: 20, "1977_1999": 50, "2000_2024": 227 }
            ]
        }
    };
    
    displayPopulationData(fallbackData.population);
    displayHealthData(fallbackData.health);
}

// Fonction utilitaire pour exporter les données
function exportData() {
    if (window.djiboutiData) {
        const converter = new ExcelConverter();
        converter.saveToJSON(window.djiboutiData);
    } else {
        alert('Aucune donnée à exporter');
    }
}