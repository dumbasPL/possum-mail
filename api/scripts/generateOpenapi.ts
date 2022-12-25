import {spawn} from 'child_process';
import openapitoolsConfig from '../openapitools.json';

function spawnOpenAPIGenerator(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Running OpenAPI Generator: openapi-generator-cli ${args.join(' ')}`);
    const openApiGeneratorCLI = spawn('openapi-generator-cli', args);

    // openApiGeneratorCLI.stdout.pipe(process.stdout);
    openApiGeneratorCLI.stderr.pipe(process.stderr);

    openApiGeneratorCLI.on('error', error => reject(error));
    openApiGeneratorCLI.on('close', code => {
      if (code == 0) {
        console.log('OpenAPI Generator finished');
        resolve();
      } else {
        reject(new Error(`OpenAPI Generator failed with code: ${code}`));
      }
    });
  });
}

function spawnYarn(cwd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Running yarn(${cwd}): yarn ${args.join(' ')}`);

    const yarn = spawn('yarn', args, {cwd});

    // yarn.stdout.pipe(process.stdout);
    yarn.stderr.pipe(process.stderr);

    yarn.on('error', error => reject(error));
    yarn.on('close', code => {
      if (code == 0) {
        console.log(`yarn finished`);
        resolve();
      } else {
        reject(new Error(`yarn failed with code: ${code}`));
      }
    });
  });
}

async function run() {
  try {
    const outputDir = openapitoolsConfig['generator-cli'].generators['api-client'].output;

    await spawnOpenAPIGenerator(['generate']);
    await spawnYarn(outputDir, ['build']);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

run();
