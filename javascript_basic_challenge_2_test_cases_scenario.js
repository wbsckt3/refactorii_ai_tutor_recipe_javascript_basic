function test_cases_scenario(){    
    const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        mode: 'javascript',
        lineWrapping: true,
		theme: 'dracula', // Aplicar el tema oscuro
		scrollbarStyle: 'null'
    });
    // Función para mostrar el modal con el mensaje de error
    document.getElementById('modify-message').addEventListener('click', function() {
        $('#errorMessageModalBody').html(error_message); // Coloca el contenido del error en el cuerpo del modal
        $('#errorMessageModal').modal('show'); // Muestra el modal
    });
    function logToConsole(message, color) {
        const consoleElement = document.getElementById('console');
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        if (color) {
            messageElement.style.color = color;
            messageElement.style.fontWeight = 'bold';
        }
            consoleElement.appendChild(messageElement);
    }
	document.getElementById('run-button').addEventListener('click', function() {
        // Clear previous results
        document.getElementById('console').innerHTML = '';
        document.getElementById('mocha').innerHTML = '';
        mocha.suite.suites = []; // Clear previous test cases	
        // Get the user's code from the editor
        const userCode = editor.getValue();
        // Redirect console.log to custom console
		const output = [];
		const originalConsoleLog = console.log;
		logToConsole('Running tests....', '#67e810');
		console.log = function(...args) {
		    const message = args.join(' ');
		    originalConsoleLog.apply(console, args); // Still log to the original console
		    logToConsole(message);
		};

		setTimeout(() => {

            // Evaluate the user's code
            try {
				        const userFunction = new Function(userCode + '; return shape;');  
                    const shape = userFunction();
                new Function(userCode)();
                // Define test cases
                const expect = chai.expect;
				// Tests suite 
				describe('shape.out1()', function() {
				  // Para quitar un extracto del contenido de la función shape
				  // y permitir que se ejecute en consola los test planteados
				  // y aparezca botón reintentar
				  let loggedValues;
				  let originalConsoleLog;
				  beforeEach(function() {
					// Almacenar la función original de console.log y los valores registrados
					loggedValues = [];
					originalConsoleLog = console.log;
					console.log = (...args) => {
					  loggedValues.push(args[0]); // Captura el valor registrado
					  originalConsoleLog.apply(console, args); // Llama al original console.log
					};
				  });
				  afterEach(function() {
					// Restaura console.log después de cada prueba
					console.log = originalConsoleLog;
				  });
			
                  it;
				  it;
				  it;
					
                });

				// Variable para rastrear el estado de los tests
                let allTestsPassed = true;	
                // Run Mocha tests
                mocha.run()
                    .on('test', function(test) {
                        logToConsole('• Running test: ' + test.title);
                    })
                    .on('test end', function(test) {
                        logToConsole('• Test finished: ' + test.title);
                    })
                    .on('pass', function(test) {
                        logToConsole('• Test passed: ' + test.title);
                    })
                    .on('fail', function(test, err) {
						logToConsole('• Test failed: ' + test.title + ' - ' + err.message);
						success_message = modal_click_message;
						const runButton = document.getElementById('run-button');
						runButton.innerText = 'Reintentar';
						runButton.style.backgroundColor = '#ff0000ad';
						runButton.onclick = function() {
							window.location.reload();
						};
			                allTestsPassed = false; // Si cualquier test falla, actualizamos la variable	
					})
					.on('end', function() {
						logToConsole('• All tests finished!');
						document.getElementById('modify-message').innerText = success_message;
						document.getElementById('modify-message').style.display = 'block';
						document.getElementById('modify-message').style.color = 'black';
						if (allTestsPassed) {
					               const sendResponseButton = document.getElementById('send-response-button');
					               sendResponseButton.classList.add('enabled');
					        } 
					});
            } catch (e) {
                console.error('Error evaluating user code:', e);
                logToConsole('Error: ' + e.message, 'red');
            } finally {
                // Restore original console.log
                console.log = originalConsoleLog;
            }	
		}, 3000); // 3 seconds delay
    });
}  			             

test_cases_scenario();
