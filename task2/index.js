let exercises = [];
let currentExerciseIndex = 0;
let currentRep = 0;
let workoutInterval;
let totalTime = 0;

function addExercise() {
    const name = document.getElementById('exerciseName').value;
    const reps = document.getElementById('exerciseReps').value;
    const minutes = document.getElementById('exerciseMinutes').value || 0;
    const seconds = document.getElementById('exerciseSeconds').value || 0;
    if (name && reps && (minutes || seconds)) {
        if (exercises.some(exercise => exercise.name === name)) {
            alert('Exercise with the same name already exists.');
            return;
        }
        const repDuration = parseInt(minutes) * 60 + parseInt(seconds);
        const exercise = {
            name: name,
            reps: parseInt(reps),
            repDuration: repDuration,
            plannedDuration: repDuration * parseInt(reps),
            actualDuration: 0,
            completed: false
        };
        exercises.push(exercise);
        displayExercises();
        document.getElementById('exerciseName').value = '';
        document.getElementById('exerciseReps').value = '';
        document.getElementById('exerciseMinutes').value = '';
        document.getElementById('exerciseSeconds').value = '';
    }
}

function displayExercises() {
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';
    exercises.forEach((exercise, index) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.className = 'exercise-item';
        exerciseItem.innerHTML = `
            <span>${exercise.name} -- x${exercise.reps} -- ${Math.floor(exercise.repDuration / 60)}:${('0' + exercise.repDuration % 60).slice(-2)}</span>
            <button onclick="skipExercise(${index})">Skip</button>
        `;
        exerciseList.appendChild(exerciseItem);
    });
}