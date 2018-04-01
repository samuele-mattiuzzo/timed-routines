window.onload = function() {
    var routines = data,
        current_routine,
        current_step = 0,
        current_rep = 0,
        c = 0,
        myTimer,
        start = document.getElementById("startBtn"),
        stop = document.getElementById("stopBtn"),
        routinesList = document.getElementById("routinesList"),
        timer = document.getElementById("timer"),
        routineEl = document.getElementById("routine"),
        repCount = document.getElementById("repCount"),
        stepCount = document.getElementById("stepCount");

    // Functions
    function createSelect() {
        // creates a dropdown with all the available routines
        var result = '';
        for (var i=0; i<routines.length; i++) {
            result += '<option value="'+i+'">'+routines[i]["name"]+'</option>';
        }
        routinesList.innerHTML = result;
    }

    function selectRoutine() {
        // selects and assigns the current routine
        var selected = routinesList.options[routinesList.selectedIndex].value;
        current_routine = routines[selected];
    }

    function getStep() {
        // gets the next step from a routine
        var cs = current_routine["steps"][current_step];
        return cs.split(" | ").join("<br/>");
    }

    function updateStep() {
        routineEl.innerHTML = getStep();
        repCount.innerHTML = 'Rep '+parseInt(current_rep+1)+' of '+current_routine["num_reps"];
        stepCount.innerHTML = 'Step '+parseInt(current_step+1)+' of '+current_routine["num_steps"];
    }

    function done() {
        reset();
        routineEl.innerHTML = 'ROUTINE COMPLETE';
    }

    function myCounter() {
        // main counter function
        timer.innerHTML = ++c;
        if (c >= current_routine["rep_length"]) {
            // clear timer
            clearInterval(myTimer);

            // next repetition
            current_rep += 1;

            // next exercise
            if (current_rep >= current_routine["num_reps"]) {
                current_rep = 0;
                current_step += 1;
            }

            // end of routine
            if (current_step >= current_routine["num_steps"]) {
                done();
            } else {
                // start repetition
                c = 0;
                timer.innerHTML = c;
                routineEl.innerHTML = '';
                startRoutine();
            }
        }
    }

    function startRoutine() {
    	if (current_step < current_routine['num_steps']) {
            updateStep();
            myTimer = setInterval(myCounter, 1000);
        }
    }

    function reset() {
    	clearInterval(myTimer);
    	c = 0;
        current_rep = 0;
        current_step = 0;
        current_routine = 0;
    	timer.innerHTML = '';
        routineEl.innerHTML = '';
        repCount.innerHTML = '';
        stepCount.innerHTML = '';
    }

    start.onclick = function(){
        reset();
        selectRoutine();
        startRoutine();
    }

    stop.onclick = function(){
        reset();
    }

    createSelect();
}
