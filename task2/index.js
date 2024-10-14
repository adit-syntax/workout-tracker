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

function executeExercise() {
    if (currentExerciseIndex < exercises.length) {
        const exercise = exercises[currentExerciseIndex];
        let duration = exercise.repDuration;
        workoutInterval = setInterval(() => {
            if (duration > 0) {
                duration--; exercise.actualDuration++; totalTime++;
                document.querySelector('.timer').innerText = `${exercise.name} ${currentRep + 1}/${exercise.reps} - 
                00 : ${('0' + Math.floor(duration / 60)).slice(-2)} : ${('0' + duration % 60).slice(-2)}`;
            } else {
                clearInterval(workoutInterval); currentRep++;
                if (currentRep < exercise.reps) { executeExercise(); } 
                else {
                    exercise.completed = true; currentExerciseIndex++; currentRep = 0;
                    if (currentExerciseIndex < exercises.length) { startBreak(); } else { navigateToSummary(); }
                }
            }
        }, 1000);
    } else { navigateToSummary(); }
}
function beginWorkout(){
    if (exercises.length >= 0) {
        currentExerciseIndex = 0;
        currentRep = 0;
        document.querySelector('.timer').innerText = '00 : 00';
        executeExercise();
    }
}
function startBreak(){
    let breakDuration = 30;
    document.querySelector('.timer').innerText = `Break: 00 : ${('0' + breakDuration).slice(-2)}`;
    workoutInterval = setInterval(() => {
        if (breakDuration > 0) {
            breakDuration--;
            document.querySelector('.timer').innerText = `Break: 00 : ${('0' + breakDuration).slice(-2)}`;
        } else { clearInterval(workoutInterval); executeExercise(); }
    }, 1000);
}
function skipExercise(index){
    if (index === currentExerciseIndex && !exercises[currentExerciseIndex].completed) {
        clearInterval(workoutInterval); currentRep++;
        if (currentRep < exercises[currentExerciseIndex].reps) { executeExercise(); } 
        else {
            exercises[currentExerciseIndex].completed = true; currentExerciseIndex++; currentRep = 0;
            if (currentExerciseIndex < exercises.length) { startBreak(); } else { navigateToSummary(); }
        }
    } else { exercises.splice(index, 1); displayExercises(); }
}
function endWorkout(){
     learInterval(workoutInterval);
      navigateToSummary(); 
    }
    
function navigateToSummary() {
    const summaryData = exercises.map(exercise => ({
        name: exercise.name, reps: exercise.reps, plannedDuration: exercise.plannedDuration, actualDuration: exercise.actualDuration
    }));
    localStorage.setItem('workoutSummary', JSON.stringify(summaryData));
    localStorage.setItem('totalTime', totalTime);
    window.location.href = 'summary.html';
}