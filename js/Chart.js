class ChartRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    drawChart(measurements) {
        const ctx = this.ctx;
        
        ctx.clearRect(0, 0, this.width, this.height);
        
        if (measurements.length === 0) {
            ctx.fillStyle = '#999';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Виконайте вимірювання для побудови графіка', this.width / 2, this.height / 2);
            return;
        }
        
        const padding = 60;
        const chartWidth = this.width - 2 * padding;
        const chartHeight = this.height - 2 * padding;
        
        // Осі
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, this.height - padding);
        ctx.lineTo(this.width - padding, this.height - padding);
        ctx.stroke();
        
        // Підписи осей
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Видовження Δl, м', this.width / 2, this.height - 15);
        
        ctx.save();
        ctx.translate(20, this.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Сила пружності F, Н', 0, 0);
        ctx.restore();
        
        // Знаходимо максимальні значення
        const maxElongation = Math.max(...measurements.map(m => m.elongation));
        const maxForce = Math.max(...measurements.map(m => m.force));
        
        // Малюємо точки та з'єднуємо їх
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        measurements.forEach((m, i) => {
            const x = padding + (m.elongation / maxElongation) * chartWidth;
            const y = this.height - padding - (m.force / maxForce) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Малюємо точки
        measurements.forEach(m => {
            const x = padding + (m.elongation / maxElongation) * chartWidth;
            const y = this.height - padding - (m.force / maxForce) * chartHeight;
            
            ctx.fillStyle = '#764ba2';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        // Шкала осі X
        ctx.fillStyle = '#666';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i <= 4; i++) {
            const value = (maxElongation / 4) * i;
            const x = padding + (chartWidth / 4) * i;
            ctx.fillText(value.toFixed(4), x, this.height - padding + 20);
        }
        
        // Шкала осі Y
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const value = (maxForce / 4) * i;
            const y = this.height - padding - (chartHeight / 4) * i;
            ctx.fillText(value.toFixed(2), padding - 10, y + 4);
        }
    }
}