// Define el objeto `shape` con la función a probar
const shape = {
  out1() {
    let output = [];
    for (let i = 0; i < 3; i++) {
      console.log(i);
      output.push(i);
    }
    return output;
  },
};

function test_cases_scenario() {
  const editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    lineNumbers: true,
    mode: 'javascript',
    lineWrapping: true,
    theme: 'dracula', 
    scrollbarStyle: 'null'
  });

  document.getElementById('modify-message').addEventListener('click', function () {
    $('#errorMessageModalBody').html(error_message);
    $('#errorMessageModal').modal('show');
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

  document.getElementById('run-button').addEventListener('click', function () {
    document.getElementById('console').innerHTML = '';
    document.getElementById('mocha').innerHTML = '';
    mocha.suite.suites = [];

    const userCode = editor.getValue();
    const output = [];
    const originalConsoleLog = console.log;
    logToConsole('Running tests....', '#67e810');
    console.log = function (...args) {
      const message = args.join(' ');
      originalConsoleLog.apply(console, args);
      logToConsole(message);
    };

    setTimeout(() => {
      try {
        new Function(userCode)();
        const expect = chai.expect;

        describe('JavaScript Code Tests', function () {
          let loggedValues;
          let originalConsoleLog;

          beforeEach(function () {
            loggedValues = [];
            originalConsoleLog = console.log;
            console.log = (...args) => {
              loggedValues.push(args[0]);
              originalConsoleLog.apply(console, args);
            };
          });

          afterEach(function () {
            console.log = originalConsoleLog;
          });

          it('should return an array with values [0, 1, 2]', function () {
            const result = shape.out1();
            expect(result).to.deep.equal([0, 1, 2]);
          });

          it('should log the values 0, 1, and 2 in order', function () {
            shape.out1();
            expect(loggedValues).to.deep.equal([0, 1, 2]);
          });
        });

        let allTestsPassed = true;
        mocha.run()
          .on('test', function (test) {
            logToConsole('• Running test: ' + test.title);
          })
          .on('pass', function (test) {
            logToConsole('• Test passed: ' + test.title);
          })
          .on('fail', function (test, err) {
            logToConsole('• Test failed: ' + test.title + ' - ' + err.message);
            success_message = modal_click_message;
            const runButton = document.getElementById('run-button');
            runButton.innerText = 'Reintentar';
            runButton.style.backgroundColor = '#ff0000ad';
            runButton.onclick = function () {
              window.location.reload();
            };
            allTestsPassed = false;
          })
          .on('end', function () {
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
        console.log = originalConsoleLog;
      }
    }, 3000);
  });
}

test_cases_scenario();
