function round_time(tp, round_direction=0, round_precision=10, timepoint=tp.date.now("HHmm")) {
    // round_direction: 0 = default js rounding
    // round_direction: 1 = round to the next <round_precision> minutes
    // round_direction: -1 = round *back* to the previous <round_precision> minutes, e.g. 2029 -> 2020

    var hours = Number(timepoint.slice(0,2));
    var mins = Number(timepoint.slice(2,4));

    if( round_direction == 0 ) {
        // use javascript's default rounding
        if(mins % round_precision != 0) {
            if(mins > 59 - round_precision) {
                // round up to the next hour
                hours += 1;
                mins = 0;
            }
            else {
                // round to the next <round_precision> minutes
                mins = Math.round(mins / round_precision) * round_precision;
            }
        }
    }
    else if( round_direction > 0 ) {
        // round up to the next <round_precision> minutes
        if(mins % round_precision != 0) {
            if(mins > 59 - round_precision) {
                // round up to the next hour
                hours += 1;
                mins = 0;
            }
            else {
                mins = Math.ceil(mins / round_precision) * round_precision;
            }
        }
    }
    else if( round_direction < 0 ) {
        // round back to the previous <round_precision> minutes
        if(mins % round_precision != 0) {
            if(mins < round_precision) {
                // round back to the previous hour
                hours -= 1;
                mins = 60 - round_precision;
            }
            else {
                mins = Math.floor(mins / round_precision) * round_precision;
            }
        }
    }

    // ensure hours and mins are within valid ranges
    if(hours < 0) {
        hours = 0;
    }
    else if(hours > 23) {
        hours = 23;
    }

    return String(hours).padStart(2, '0') + String(mins).padStart(2, '0');
}
module.exports = round_time
