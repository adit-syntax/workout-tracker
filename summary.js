document.addEventListener('DOMContentLoaded', () => {
    const summaryData = JSON.parse(localStorage.getItem('workoutSummary'));
    const totalTime = localStorage.getItem('totalTime');
    const summaryContainer = document.getElementById('summaryContainer');
    const totalTimeElement = document.getElementById('totalTime');

    summaryData.forEach(exercise => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>Exercise: ${exercise.name}</span>
            <span>Reps: ${exercise.reps}</span>
            <span>Planned Time: ${Math.floor(exercise.plannedDuration / 60)}:${('0' + exercise.plannedDuration % 60).slice(-2)}</span>
            <span>Actual Time: ${Math.floor(exercise.actualDuration / 60)}:${('0' + exercise.actualDuration % 60).slice(-2)}</span>
        `;
        summaryContainer.appendChild(summaryItem);
    });

    totalTimeElement.innerText = `${Math.floor(totalTime / 60)}:${('0' + totalTime % 60).slice(-2)}`;
});


function restartWorkout() {
    localStorage.removeItem('workoutSummary');
     localStorage.removeItem('totalTime');
    window.location.href = 'index.html';
}