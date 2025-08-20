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

function isValidGitURL(url) {
  const gitURLRegex = /^https:\/\/.*\.git$/;
  return gitURLRegex.test(url);
}

function executeGitCommand(command) {
  try {
    return execSync(command).toString().trim();
  } catch (error) {
    return null;
  }
}


(async () => {
  try {
    let newRepoURL = '';
    while (!isValidGitURL(newRepoURL)) {
      newRepoURL = await getUserInput('Introduce la URL del nuevo repositorio de git: ');
      if (!isValidGitURL(newRepoURL)) {
        console.log('URL inválida. Asegúrate de que comience con "https://" y termine con ".git"');
      }
    }

    const userNameCommand = 'git config user.name';
    const userEmailCommand = 'git config user.email';

    const isUserNameSet = executeGitCommand(userNameCommand);
    const isUserEmailSet = executeGitCommand(userEmailCommand);

    if (!isUserNameSet) {
      const userName = await getUserInput('Introduce tu nombre de usuario de git: ');
      execSync(`git config user.name "${userName}"`);
    }

    if (!isUserEmailSet) {
      const userEmail = await getUserInput('Introduce tu email de usuario de git: ');
      execSync(`git config user.email "${userEmail}"`);
    }
    
    // Borra el repositorio de git actual (eliminando la carpeta .git)
    execSync('rm -rf .git');

    // Inicializa un nuevo repositorio
    execSync('git init --initial-branch=main');

    // Añade todos los archivos al staging area
    execSync('git add .');

    // Hace commit de los cambios con el texto "Initial commit"
    execSync('git commit -m "Initial commit"');

    // Asocia al remote introducido por el usuario y hace push de los cambios
    execSync(`git remote add origin ${newRepoURL}`);
    execSync('git push --set-upstream origin main');

    console.log('¡El repositorio ha sido configurado correctamente!');
  } catch (error) {
    console.error('Ha ocurrido un error:', error.message);
  } finally {
    rl.close();
  }
})();