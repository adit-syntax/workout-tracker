document.addEventListener('DOMContentLoaded', () => {
    const summaryData = JSON.parse(localStorage.getItem('workoutSummary')), totalTime = parseInt(localStorage.getItem('totalTime')),
        summaryTable = document.getElementById('summaryTable').querySelector('tbody');
    summaryData.forEach(exercise => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${exercise.name}</td><td>${exercise.reps}</td><td>${formatTime(exercise.plannedDuration)}</td><td>${formatTime(exercise.actualDuration)}</td>`;
        summaryTable.appendChild(row);
    });
    document.getElementById('totalTime').innerText = `Total Workout Time: ${formatTime(totalTime)}`;
});
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${('0' + (seconds % 60)).slice(-2)}`;
}

function restartWorkout() {
    localStorage.removeItem('workoutSummary'); localStorage.removeItem('totalTime');
    window.location.href = 'index.html';
}