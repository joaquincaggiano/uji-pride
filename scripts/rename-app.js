const DEFAULT_APP_NAME = 'apprename';
const EXCLUDED_DIRS = ['scripts', 'node_modules', '.git', 'Pods', 'build'];
const EXCLUDED_FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.keystore', '.ttf', '.jar'];

const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function getSearchText() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(`Texto a modificar (por defecto: "${DEFAULT_APP_NAME}"): `, input => {
      rl.close();
      const searchText = input.trim();
      if (searchText === '') {
        resolve(DEFAULT_APP_NAME);
      } else {
        resolve(searchText);
      }
    });
  });
}


// Función para obtener el nuevo texto, validando que solo contenga letras minúsculas
function getNewText() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question('Introduce el nuevo texto (solo letras minúsculas): ', input => {
      rl.close();
      if (/^[a-z]+$/.test(input)) {
        resolve(input);
      } else {
        console.log('El nuevo texto debe contener solo letras minúsculas.');
        resolve(getNewText());
      }
    });
  });
}

// Función para reemplazar el texto en un archivo
function replaceTextInFile(filePath, searchText, replaceText) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const replacedContent = fileContent.replace(new RegExp(searchText, 'g'), replaceText);
  fs.writeFileSync(filePath, replacedContent, 'utf8');
}

function renameFile(filePath, searchText, replaceText) {
  const fileName = path.basename(filePath);
  const newFileName = fileName.replace(new RegExp(searchText, 'g'), replaceText);
  fs.renameSync(filePath, path.join(path.dirname(filePath), newFileName));
}

// Función para reemplazar el texto en el nombre de la carpeta
function renameFolder(folderPath, searchText, replaceText) {
  const folderName = path.basename(folderPath);
  const newFolderName = folderName.replace(new RegExp(searchText, 'g'), replaceText);
  fs.renameSync(folderPath, path.join(path.dirname(folderPath), newFolderName));
}

async function main() {
  try {
    const currentPath = process.cwd(); // Directorio padre

    const searchText = await getSearchText(); // Pedir el texto original a modificar

    const userReplaceText = await getNewText();
    console.log(`El texto "${searchText}" se cambiará por "${userReplaceText}" en todos los archivos y carpetas de "${currentPath}".`);

    const rlConfirmation = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(`\nAntes de continuar, recomendable tener el árbol de git limpio para poder hacer rollback fácilmente en caso de error.\n`);

    rlConfirmation.question('¿Confirmar cambios? (S/N): ', confirmation => {
      rlConfirmation.close();
      if (confirmation.toLowerCase() === 's') {
        // Cambiar texto en archivos y carpetas del directorio padre
        function processDirectory(folderPath) {
          if (!EXCLUDED_DIRS.includes(path.basename(folderPath))) { // Excluir el directorio ".git", etc
            const items = fs.readdirSync(folderPath);
            items.forEach(item => {
              const itemPath = path.join(folderPath, item);
              if (fs.statSync(itemPath).isDirectory()) {
                processDirectory(itemPath);
                renameFolder(itemPath, searchText, userReplaceText);
              } else if(!EXCLUDED_FILE_EXTENSIONS.includes(path.extname(itemPath).toLowerCase())) {
                replaceTextInFile(itemPath, searchText, userReplaceText);
                renameFile(itemPath, searchText, userReplaceText);
              }
            });
          }
        }
        processDirectory(currentPath);

        console.log('Operación completada.');
      } else {
        console.log('Operación cancelada por el usuario.');
      }
    });
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
  }
}

main();