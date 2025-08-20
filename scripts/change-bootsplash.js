const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function isValidHexColor(colorCode) {
  const hexColorRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  return hexColorRegex.test(colorCode);
}

(async () => {
  try {
    let colorCode = '';
    while (!isValidHexColor(colorCode)) {
      colorCode = await getUserInput('Introduce el código hexadecimal de un color (e.g., #RRGGBB): ');
      if (!isValidHexColor(colorCode)) {
        console.log('Código hexadecimal incorrecto. Introduce un código válido.');
      }
    }

    const command = `npx react-native generate-bootsplash assets/icon.png \
      --platforms=ios,android \
      --background=${colorCode.substring(1)} \
      --logo-width=192`;

    execSync(command, { stdio: 'ignore' });

    console.log('¡El comando se ha ejecutado correctamente!');
  } catch (error) {
    console.error('Ha ocurrido un error:', error.message);
    console.error('\n¿Has ejecutado "npm i" previamente?');
  } finally {
    rl.close();
  }
})();