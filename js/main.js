// Ініціалізація
const experiment = new Experiment();
const canvas = document.getElementById('experimentCanvas');
const renderer = new Renderer(canvas);
const chartCanvas = document.getElementById('analysisChart');
const chartRenderer = new ChartRenderer(chartCanvas);

// Елементи DOM
const addWeightBtn = document.getElementById('addWeight');
const removeWeightBtn = document.getElementById('removeWeight');
const resetBtn = document.getElementById('resetExperiment');
const weightCountEl = document.getElementById('weightCount');
const forceValueEl = document.getElementById('forceValue');
const cordLengthEl = document.getElementById('cordLength');
const elongationEl = document.getElementById('elongation');
const resultsBody = document.getElementById('resultsBody');
const conclusionText = document.getElementById('conclusionText');

// Оновлення інтерфейсу
function updateUI() {
    weightCountEl.textContent = experiment.weightCount;
    forceValueEl.textContent = experiment.getForce().toFixed(2) + ' Н';
    cordLengthEl.textContent = (experiment.getCurrentLength() * 100).toFixed(2) + ' см';
    elongationEl.textContent = (experiment.getElongation() * 100).toFixed(2) + ' см';
    
    renderer.draw(experiment.initialLength, experiment.getCurrentLength(), experiment.weightCount);
    updateTable();
    updateChart();
    updateConclusion();
}

// Оновлення таблиці
function updateTable() {
    const measurements = experiment.getMeasurements();
    resultsBody.innerHTML = '';
    
    measurements.forEach(m => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${m.number}</td>
            <td>${m.weightCount}</td>
            <td>${m.force.toFixed(2)}</td>
            <td>${m.length.toFixed(4)}</td>
            <td>${m.elongation.toFixed(4)}</td>
            <td>${m.ratio.toFixed(2)}</td>
        `;
        resultsBody.appendChild(row);
    });
}

// Оновлення графіка
function updateChart() {
    chartRenderer.drawChart(experiment.getMeasurements());
}

// Оновлення висновку
function updateConclusion() {
    const measurements = experiment.getMeasurements();
    
    if (measurements.length === 0) {
        conclusionText.textContent = 'Виконайте експеримент, щоб побачити висновки.';
        return;
    }
    
    const avgRatio = experiment.getAverageRatio();
    const isElastic = measurements.every(m => m.ratio > 0);
    
    let conclusion = `За результатами експерименту:`;
    conclusion += `<ol>`;
    conclusion += `<li>Середнє значення відношення F/Δl = ${avgRatio.toFixed(2)} Н/м </li>`;
    conclusion += `<li>Це значення приблизно дорівнює коефіцієнту жорсткості k гумового шнура. </li>`;
    conclusion += `<li>Деформація шнура була ${isElastic ? 'пружною' : 'непружною'}, оскільки шнур ${isElastic ? 'повертався' : 'не повертався'} до початкового стану після зняття навантаження. </li>`;
    conclusion += `<li>Графік залежності F від Δl має ${measurements.length > 2 ? 'лінійний характер' : 'характер прямої лінії'}, що підтверджує закон Гука: F = k·Δl </li>`;
    conclusion += `</ol>`
    conclusionText.innerHTML = conclusion;
}

// Обробники подій
addWeightBtn.addEventListener('click', () => {
    if (experiment.addWeight()) {
        updateUI();
    } else {
        alert('Досягнуто максимальну кількість тягарців (4)');
    }
});

removeWeightBtn.addEventListener('click', () => {
    if (experiment.removeWeight()) {
        updateUI();
    }
});

resetBtn.addEventListener('click', () => {
    if (confirm('Ви впевнені, що хочете скинути експеримент?')) {
        experiment.reset();
        updateUI();
    }
});

// Початкова ініціалізація
updateUI();