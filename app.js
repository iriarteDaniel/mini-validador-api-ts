"use strict";
function safeParse(json) {
    try {
        return JSON.parse(json);
    }
    catch {
        return null;
    }
}
function isStudent(x) {
    if (typeof x !== 'object' || x === null)
        return false;
    const candidate = x;
    return (typeof candidate.id === 'number' &&
        typeof candidate.name === 'string' &&
        Array.isArray(candidate.scores) &&
        candidate.scores.every((score) => typeof score === 'number'));
}
function average(nums) {
    if (nums.length === 0)
        return 0;
    const total = nums.reduce((acc, curr) => acc + curr, 0);
    return total / nums.length;
}
function validateAndRender(jsonInput, containerId = 'app') {
    const container = document.getElementById(containerId);
    if (!container)
        return;
    container.innerHTML = '';
    const parsedData = safeParse(jsonInput);
    if (isStudent(parsedData)) {
        const title = document.createElement('h1');
        title.textContent = parsedData.name;
        const avgScore = average(parsedData.scores);
        const paragraph = document.createElement('p');
        paragraph.textContent = `Promedio de notas: ${avgScore.toFixed(2)}`;
        container.appendChild(title);
        container.appendChild(paragraph);
    }
    else {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Error: El JSON recibido no es un objeto Student válido.';
        container.appendChild(errorMessage);
    }
}
function testValid() {
    const json = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';
    validateAndRender(json);
}
function testInvalid() {
    const jsonInvalid = '{"id":2,"name":"Ron","scores":"asd"}';
    validateAndRender(jsonInvalid);
}
document.addEventListener('DOMContentLoaded', () => {
    const btnValid = document.getElementById('btn-valid');
    const btnInvalid = document.getElementById('btn-invalid');
    if (btnValid)
        btnValid.addEventListener('click', testValid);
    if (btnInvalid)
        btnInvalid.addEventListener('click', testInvalid);
});
