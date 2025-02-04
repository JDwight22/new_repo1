import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import generateName from 'sillyname';
import { randomSuperhero } from 'superheroes';

inquirer
    .prompt([{
        message: "What is your name?\n",
        name: "name1"
    }])
    .then((answers) => {
        const villainName = generateName();
        const superheroName = randomSuperhero();

        qrConvert(answers.name1, 'name.png');
        qrConvert(villainName, 'sillyname.png');
        qrConvert(superheroName, 'superheroname.png');

        console.log("\nHello", answers.name1);
        console.log("Your villain name will be", villainName);
        console.log("Your superhero name will be", superheroName);

        createTxt(answers.name1, villainName, superheroName);
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment");
        } else {
            console.error("Something went wrong:", error);
        }
    });

function qrConvert(text, filename) {
    var qr_img = qr.image(text, { type: 'png' });
    qr_img.pipe(fs.createWriteStream(filename));
}

function createTxt(name, villain, hero) {
    const logEntry = `Name: ${name}\nVillain Name: ${villain}\nSuperhero Name: ${hero}\n\n`;
    fs.appendFile('qr.txt', logEntry, (err) => {
        if (err) throw err;
        console.log("\nQR codes are generated\nText file updated");
    });
}
