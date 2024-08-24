function getKilledInYear(year) {
    if (year <= 0) return -1;

    const results = [1];
    const sort_kills = [1];

    for (let i = 1; i < year; i++) {
        let lastResult = results[results.length - 1];
        let kills_data = (sort_kills.length < 2) ? 1 : (sort_kills[sort_kills.length - 1] + sort_kills[sort_kills.length - 2] == 0) ? 1 : sort_kills[sort_kills.length - 1] + sort_kills[sort_kills.length - 2];
        sort_kills.push(kills_data);
        let newResult = lastResult + sort_kills[sort_kills.length - 1];
        
        results.push(newResult);
    }

    return results[year - 1];
}

function calculateAverage() {
    const ageOfDeathA = parseInt(document.getElementById('ageOfDeathA').value);
    const yearOfDeathA = parseInt(document.getElementById('yearOfDeathA').value);
    const ageOfDeathB = parseInt(document.getElementById('ageOfDeathB').value);
    const yearOfDeathB = parseInt(document.getElementById('yearOfDeathB').value);

    if (ageOfDeathA < 0 || yearOfDeathA <= 0 || ageOfDeathB < 0 || yearOfDeathB <= 0 ||
        ageOfDeathA >= yearOfDeathA || ageOfDeathB >= yearOfDeathB) {
        document.getElementById('result').innerText = 'Input data is invalid.';
        return;
    }

    const birthYearA = yearOfDeathA - ageOfDeathA;
    const birthYearB = yearOfDeathB - ageOfDeathB;

    const killedInBirthYearA = getKilledInYear(birthYearA);
    const killedInBirthYearB = getKilledInYear(birthYearB);

    if (killedInBirthYearA === -1 || killedInBirthYearB === -1) {
        document.getElementById('result').innerText = '-1';
        return;
    }

    const average = (killedInBirthYearA + killedInBirthYearB) / 2.0;
    document.getElementById('result').innerText = `The average number of people killed in the birth years is: ${average}`;
}
