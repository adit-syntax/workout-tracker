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