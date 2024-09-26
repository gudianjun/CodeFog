const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * 1ÅCéwíËå¥énòHåa
 * 2ÅCéwíË?èoç™òHåa
 * 3ÅCï’?èäóLìIå¥énòHåaíÜìIï∂åèòaï∂åè?ÅB
 * 4ÅCî@â ê•jsï∂åèÅC??ópnpxñΩóﬂ?çsë„???òaç¨ü¿ÅC?óùç@ìIï∂åè?èoìû??ìI?èoòHåaíÜÅB
 *    ç¨ü¿ñΩóﬂÅFnpx terser [å¥énòHåa-ï∂åèñº] -o [?èoòHåa-ï∂åèñº] -c -m
 *    çÇ?ç¨ü¿ñΩóﬂÅFnpx javascript-obfuscator [?èoòHåa-ï∂åèñº] --output [ç≈??èoòHåa-ï∂åèñº] --compact true --controlFlowFlattening true
 * 5ÅCîÒjs?ï∂åè??íºê⁄?êßìû?èoòHåaíÜÅB
 */
function processFiles(inputDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.readdirSync(inputDir).forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, file);
        const finalOutputFilePath = path.join(outputDir, `obfuscated_${file}`);

        if (fs.lstatSync(inputFilePath).isDirectory()) {
            processFiles(inputFilePath, outputFilePath);
        } else if (path.extname(file) === '.js') {
            const terserCommand = `npx terser ${inputFilePath} -o ${outputFilePath} -c -m`;
            exec(terserCommand, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error processing file ${inputFilePath} with terser: ${err}`);
                    return;
                }
                console.log(`Processed file ${inputFilePath} with terser`);

                const obfuscatorCommand = `npx javascript-obfuscator ${outputFilePath} --output ${outputFilePath} --compact true --control-flow-flattening true`;
                exec(obfuscatorCommand, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`Error processing file ${outputFilePath} with javascript-obfuscator: ${err}`);
                        return;
                    }
                    console.log(`Processed file ${outputFilePath} with javascript-obfuscator`);
                });
            });
        } else {
            fs.copyFileSync(inputFilePath, outputFilePath);
        }
    });
}

// ?éÊñΩóﬂçséQêî
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node app.js <inputDir> <outputDir>');
    process.exit(1);
}

const [inputDir, outputDir] = args;
processFiles(inputDir, outputDir);
