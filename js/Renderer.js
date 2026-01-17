class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawStand() {
        const ctx = this.ctx;

        // Стіл
        ctx.fillStyle = '#666';
        ctx.fillRect(0, 265, 220, 300);
        
        // Основа штатива
        ctx.fillStyle = '#333';
        ctx.fillRect(115, 250, 100, 15);
        
        // Вертикальна стійка
        ctx.fillRect(195, 65, 10, 200);
        
        // Муфта
        ctx.fillStyle = '#555';
        ctx.fillRect(185, 100, 30, 20);
        
        // Лапка
        ctx.fillStyle = '#666';
        ctx.fillRect(205, 105, 40, 10);
    }

    drawCord(initialLength, currentLength) {
        const ctx = this.ctx;
        const startY = 110;
        const pixelsPerMeter = 2000; // Масштаб
        
        const cordHeight = currentLength * pixelsPerMeter;
        
        // Верхня петля
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(245, startY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Гумовий шнур
        ctx.strokeStyle = '#CD853F';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(245, startY);
        ctx.lineTo(245, startY + cordHeight);
        ctx.stroke();
        
        // Нижня петля
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(245, startY + cordHeight, 5, 0, Math.PI * 2);
        ctx.fill();
        
        return startY + cordHeight;
    }

    drawWeights(count, bottomY) {
        const ctx = this.ctx;
        const weightHeight = 30;
        const weightWidth = 40;
        
        for (let i = 0; i < count; i++) {
            const y = bottomY + 5 + i * (weightHeight + 2);
            
            // Тягарець
            ctx.fillStyle = '#999';
            ctx.fillRect(245 - weightWidth / 2, y, weightWidth, weightHeight);
            
            // Обведення
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(245 - weightWidth / 2, y, weightWidth, weightHeight);
            
            // Напис
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('100г', 245, y + 19);
        }
    }

    drawRuler(initialLength, currentLength) {
        const ctx = this.ctx;
        const startY = 110;
        const pixelsPerMeter = 2000;
        
        const initialHeight = initialLength * pixelsPerMeter;
        const currentHeight = currentLength * pixelsPerMeter;
        
        // Лінійка
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(280, startY);
        ctx.lineTo(280, startY + currentHeight);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Початкова довжина
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(270, startY + initialHeight);
        ctx.lineTo(290, startY + initialHeight);
        ctx.stroke();
        
        ctx.fillStyle = '#FF0000';
        ctx.font = '11px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`l₀ = ${(initialLength * 100).toFixed(1)} см`, 295, startY + initialHeight + 4);
        
        // Поточна довжина
        if (currentLength > initialLength) {
            ctx.strokeStyle = '#00FF00';
            ctx.beginPath();
            ctx.moveTo(270, startY + currentHeight);
            ctx.lineTo(290, startY + currentHeight);
            ctx.stroke();
            
            ctx.fillStyle = '#00FF00';
            ctx.fillText(`l = ${(currentLength * 100).toFixed(1)} см`, 295, startY + currentHeight + 4);
        }
    }

    draw(initialLength, currentLength, weightCount) {
        this.clear();
        this.drawStand();
        const bottomY = this.drawCord(initialLength, currentLength);
        this.drawWeights(weightCount, bottomY);
        this.drawRuler(initialLength, currentLength);
    }
}