# Code Challenge

The first interpreter I have ever built. It is quite basic and can only interpret console.log() & setTimeout().

The concept is straight-forward:
1. Take a string of code
2. Break it into multiple sequences according to the ";" character.
3. Read every line
4. If it starts with console.log, send what's between parenthesis to the internal print function.
5. If it starts setTimeout(), load the first argument to the queue for later execution.
6. If it starts with function, call the interpreter with the text between the curly braces.
7. Once the interpreter has gone through each line, start dequeuing the queue.

### Comments

The main bottleneck of this interpret is its limited scope, it can only interpret console.log and setTimeout.

Second, it assumes that what's iniside a function will be a one line command: `function(){console.log(1)}` It cannot handle mulitple commands within a function call: `function(){console.log(1); console.log(2)}`.

Third, efficiency is lost with the while loop. Resources could be used to do something else while waiting.
