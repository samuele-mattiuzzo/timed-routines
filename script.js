window.onload = function() {
    var routines = data,
        current_routine,
        current_step = 0,
        current_rep = 0,
        c = 0,
        myTimer,
        start = document.getElementById("startBtn"),
        stop = document.getElementById("stopBtn"),
        next = document.getElementById("nextBtn"),
        routinesList = document.getElementById("routinesList"),
        timer = document.getElementById("timer"),
        routineEl = document.getElementById("routine"),
        routineDesc = document.getElementById("description"),
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
        var n_reps_total = current_routine["num_reps"],
            n_steps_total = current_routine["num_steps"]
            n_reps = parseInt(current_rep + 1),
            n_steps = parseInt(current_step + 1),
            description = current_routine["description"];

        routineEl.innerHTML = getStep();
        routineDesc.innerHTML = description;
        repCount.innerHTML = 'Rep ' + n_reps + ' of ' + n_reps_total;
        stepCount.innerHTML = 'Step ' + n_steps + ' of '+ n_steps_total;
    }

    function nextStep() {
        // increments the step by one

        current_step = current_step + 1;

        //

    }

    function startRoutine() {
    	if (current_step < current_routine['num_steps']) {
            updateStep();
            if (current_routine['has_timer'] == true) {
                // it's a timed routine
                myTimer = setInterval(myCounter, 1000);
            } else {
                // manual step through
                doStep();
            }
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
        routineDesc.innerHTML = '';
    }

    function done() {
        reset();
        routineEl.innerHTML = 'ROUTINE COMPLETE';
    }

    function doStep() {

    }

    function myCounter() {
        // main counter function
        timer.innerHTML = ++c;
        if (c >= current_routine["rep_length"]) {
            // clear timer
            clearInterval(myTimer);

            doStep();
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
                routineDesc.innerHTML = '';
                startRoutine();
            }
        }
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
