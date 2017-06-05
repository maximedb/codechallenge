fs = require('fs'); // Needed to read the-code.txt

class Interpreter {
    /**
    * Interprets javascript code. Can only read console.log and setTimeout.
    * Uses an internal queue to run "asynchronous" calls.
    * @param {string} source_code - the source code to execute.
    */
    constructor(source_code) {
        this.queue = [] // The
        this.source_code = source_code;
    }

    /**
    * Parse a string of text based on the semi-column character into an array of commands to execute.
    * @param {string} text - the text to parse into command.
    * @return {array} commands - list of commands to execute.
    */
    parse_commands(text){
        var tmp = text.split(';'); // split on ;
        for (var i = 0; i < tmp.length; i++) {
            tmp[i] = tmp[i].trim() // Remove the end of line char
        }
        return tmp
    }

    /**
    * Basic implementation of the console.log function
    * @param {string} text - the text to print to the console.
    */
    console_log(text) {
        process.stdout.write(text);
        process.stdout.write('\n');
    }

    /**
    * Start the interpreter.
    */
    start() {
        var commands = this.parse_commands(this.source_code);
        for (var i = 0; i < commands.length; i++) {
            interpreter.interpret(commands[i])
        }
        this.startsQueue()
    }

    /**
    * Interprets a line of code. Can only recognize console.log, function (without parameters) and setTimeout.
    * If the function makes a timeOut call, the call will be added to the queue for later execution.
    * @param {string} text - the string of text to interpet.
    */
    interpret(text) {
        if (text.startsWith("console.log")){
            var init = text.indexOf('(');
            var fin = text.lastIndexOf(')');
            this.console_log(text.substr(init+1,fin-init-1));
        } else if (text.startsWith("function")){
            var init = text.indexOf('{');
            var fin = text.lastIndexOf('}');
            var ins = text.substr(init+1,fin-init-1)
            this.interpret(ins)
        } else if (text.startsWith("setTimeout")){
            var init = text.indexOf('(');
            var fin = text.lastIndexOf(')');
            var splitted = text.substr(init+1,fin-init-1).split(',')
            this.queue.push([splitted[0], splitted[1]]);
        }
    }

    /**
    * Start the dequeuing of the internal queue.
    */
    startsQueue(){
        var start_time = (new Date()).getTime(); // Initial time
        while(this.queue.length > 0){ // Untile there is nothing in the queue
            var time = (new Date()).getTime() - start_time; // Current time of execution
            for (var i = this.queue.length - 1; i >= 0; i--) { // For all processes still in the queue.
                if (time > this.queue[i][1]){ // If the current time of exec is larger than the
                    var command = this.queue[i][0];
                    this.interpret(command); // give the command to the interpret
                    this.queue.splice(i,1); // remove it from the queue. Safe to remove as the loop is from bottom to top.
                }
            }

        }
    }
}

process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        fs.readFile(val, 'utf8', function(err, data) {
            interpreter = new Interpreter(source_code = data);
            interpreter.start();
        });
    }
});
