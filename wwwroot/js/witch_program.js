class WitchKillCalculator {
    constructor() {
        this.results = [1];
        this.sortKills = [1];
    }

    getKilledInYear(year) {
        if (year <= 0) return -1;

        while (this.results.length < year) {
            let lastResult = this.results[this.results.length - 1];
            let killsData = (this.sortKills.length < 2) ? 1 : this.sortKills[this.sortKills.length - 1] + this.sortKills[this.sortKills.length - 2];
            this.sortKills.push(killsData);
            let newResult = lastResult + killsData;

            this.results.push(newResult);
        }

        return this.results[year - 1];
    }
}

class InputHandler {
    constructor(calculator) {
        this.calculator = calculator;
        this.resultElement = document.getElementById('result');
    }

    calculateAverage() {
        try{
            // debugger;
            const ageOfDeathA = parseInt(document.getElementById('ageOfDeathA').value);
            const yearOfDeathA = parseInt(document.getElementById('yearOfDeathA').value);
            const ageOfDeathB = parseInt(document.getElementById('ageOfDeathB').value);
            const yearOfDeathB = parseInt(document.getElementById('yearOfDeathB').value);
    
            if (this.isInvalidInput(ageOfDeathA, yearOfDeathA, ageOfDeathB, yearOfDeathB)) {
                this.resultElement.innerText = '-1';
                return;
            }

            const birthYearA = yearOfDeathA - ageOfDeathA;
            const birthYearB = yearOfDeathB - ageOfDeathB;

            const killedInBirthYearA = this.calculator.getKilledInYear(birthYearA);
            const killedInBirthYearB = this.calculator.getKilledInYear(birthYearB);

            if (killedInBirthYearA === -1 || killedInBirthYearB === -1) {
                this.resultElement.innerText = '-1';
                return;
            }

            const average = (killedInBirthYearA + killedInBirthYearB) / 2.0;
            this.resultElement.innerText = `The average number of people killed in the birth years is: ${average}`;
        }catch(error){
            this.resultElement.innerText = '-1';
            return;
        }
    }

    isInvalidInput(ageOfDeathA, yearOfDeathA, ageOfDeathB, yearOfDeathB) {
        if (isNaN(ageOfDeathA) || isNaN(yearOfDeathA) || isNaN(ageOfDeathB) || isNaN(yearOfDeathB)) {
            return true;
        }
    
        return ageOfDeathA < 0 || yearOfDeathA <= 0 || ageOfDeathB < 0 || yearOfDeathB <= 0 ||
            ageOfDeathA >= yearOfDeathA || ageOfDeathB >= yearOfDeathB;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    const calculator = new WitchKillCalculator();
    const inputHandler = new InputHandler(calculator);

    document.querySelector("#btn_result").addEventListener('click', () => {
        inputHandler.calculateAverage();
    });
});