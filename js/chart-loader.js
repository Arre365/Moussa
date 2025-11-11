class DjiboutiDataVisualizer {
    constructor() {
        this.data = null;
        this.charts = {};
        this.init();
    }

    async init() {
        await this.loadData();
        this.createCharts();
        this.populateTable();
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const response = await fetch('data/djibouti-data.json');
            this.data = await response.json();
            console.log('Données chargées:', this.data);
        } catch (error) {
            console.error('Erreur chargement données:', error);
        }
    }

    createCharts() {
        this.createPopulationChart();
        this.createEducationChart();
        this.createHealthChart();
        this.createTechnologyChart();
    }

    createPopulationChart() {
        const ctx = document.getElementById('populationChart').getContext('2d');
        const popData = this.data.population.total;
        
        this.charts.population = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: popData.map(d => this.formatPeriod(d.period)),
                datasets: [{
                    label: 'Population',
                    data: popData.map(d => d.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Évolution de la Population'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre d\'habitants'
                        }
                    }
                }
            }
        });
    }

    createEducationChart() {
        const ctx = document.getElementById('educationChart').getContext('2d');
        const eduData = this.data.education.schools;
        
        this.charts.education = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Primaires', 'Collèges', 'Lycées', 'Universités'],
                datasets: [
                    {
                        label: 'Avant 1977',
                        data: [
                            eduData.find(d => d.type === 'primaires').avant_1977,
                            eduData.find(d => d.type === 'colleges').avant_1977,
                            eduData.find(d => d.type === 'lycees').avant_1977,
                            eduData.find(d => d.type === 'universites').avant_1977
                        ],
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    },
                    {
                        label: '1977-1999',
                        data: [
                            eduData.find(d => d.type === 'primaires')['1977_1999'],
                            eduData.find(d => d.type === 'colleges')['1977_1999'],
                            eduData.find(d => d.type === 'lycees')['1977_1999'],
                            eduData.find(d => d.type === 'universites')['1977_1999']
                        ],
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    },
                    {
                        label: '2000-2024',
                        data: [
                            eduData.find(d => d.type === 'primaires')['2000_2024'],
                            eduData.find(d => d.type === 'colleges')['2000_2024'],
                            eduData.find(d => d.type === 'lycees')['2000_2024'],
                            eduData.find(d => d.type === 'universites')['2000_2024']
                        ],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Évolution des Établissements Scolaires'
                    }
                }
            }
        });
    }

    createHealthChart() {
        const ctx = document.getElementById('healthChart').getContext('2d');
        // Implémentation similaire pour la santé
    }

    createTechnologyChart() {
        const ctx = document.getElementById('techChart').getContext('2d');
        // Implémentation similaire pour la technologie
    }

    populateTable() {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        // Ajouter les données au tableau
        Object.keys(this.data).forEach(category => {
            Object.keys(this.data[category]).forEach(indicator => {
                const rowData = this.data[category][indicator];
                if (Array.isArray(rowData)) {
                    rowData.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${this.formatLabel(category, indicator)}</td>
                            <td>${item.avant_1977 || '-'}</td>
                            <td>${item['1977_1999'] || '-'}</td>
                            <td>${item['2000_2024'] || '-'}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                }
            });
        });
    }

    formatPeriod(period) {
        const periods = {
            'avant_1977': 'Avant 1977',
            '1977_1999': '1977-1999',
            '2000_2024': '2000-2024'
        };
        return periods[period] || period;
    }

    formatLabel(category, indicator) {
        // Formater les labels pour l'affichage
        return indicator.charAt(0).toUpperCase() + indicator.slice(1);
    }

    setupEventListeners() {
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterCharts(e.target.value);
        });

        document.getElementById('periodFilter').addEventListener('change', (e) => {
            this.filterByPeriod(e.target.value);
        });
    }

    filterCharts(category) {
        // Implémenter le filtrage par catégorie
        console.log('Filtrer par catégorie:', category);
    }

    filterByPeriod(period) {
        // Implémenter le filtrage par période
        console.log('Filtrer par période:', period);
    }
}

// Initialiser quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    window.djiboutiViz = new DjiboutiDataVisualizer();
});