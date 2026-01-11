class Experiment {
    constructor() {
        this.initialLength = 0.08; // 8 см у метрах
        this.weightCount = 0;
        this.maxWeights = 4;
        this.weightMass = 0.1; // 100 г = 0.1 кг
        this.g = 9.8; // прискорення вільного падіння
        this.k = 50; // коефіцієнт жорсткості (Н/м)
        this.measurements = [];
    }

    addWeight() {
        if (this.weightCount < this.maxWeights) {
            this.weightCount++;
            this.addMeasurement();
            return true;
        }
        return false;
    }

    removeWeight() {
        if (this.weightCount > 0) {
            this.weightCount--;
            this.measurements.pop();
            return true;
        }
        return false;
    }

    reset() {
        this.weightCount = 0;
        this.measurements = [];
    }

    getForce() {
        return this.weightCount * this.weightMass * this.g;
    }

    getElongation() {
        const force = this.getForce();
        return force / this.k;
    }

    getCurrentLength() {
        return this.initialLength + this.getElongation();
    }

    addMeasurement() {
        const force = this.getForce();
        const elongation = this.getElongation();
        const currentLength = this.getCurrentLength();
        const ratio = elongation > 0 ? force / elongation : 0;

        this.measurements.push({
            number: this.measurements.length + 1,
            weightCount: this.weightCount,
            force: force,
            length: currentLength,
            elongation: elongation,
            ratio: ratio
        });
    }

    getMeasurements() {
        return this.measurements;
    }

    getAverageRatio() {
        if (this.measurements.length === 0) return 0;
        const sum = this.measurements.reduce((acc, m) => acc + m.ratio, 0);
        return sum / this.measurements.length;
    }
}