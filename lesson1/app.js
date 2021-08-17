// const fs = require('fs');
// const path = require('path');
//
// const dirGendersFemale = path.join(__dirname, 'dir', 'genders', 'Karina.txt');
// const dirGendersMale = path.join(__dirname, 'dir', 'genders', 'Oleg.txt');
// const derGenderKarina = path.join(__dirname, 'dir', 'genders');
// const dirGenders = path.join(__dirname, 'dir', 'genders');

// fs.writeFile(dirGendersFemale, '{"gender": "female"}', err => {
//     if (err) {
//         console.log(err);
//     }
// });
//
// fs.writeFile(dirGendersMale, '{"gender": "male"}', err => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.readdir(derGenderKarina, (err, files) => {
//     if (err) {
//         console.log(err);
//     }
// });
//
// fs.readFile(derGenderKarina, (err, data) => {
//     if (JSON.parse(data).gender === 'female') {
//         console.log(JSON.parse(data).gender);
//     }
// });
//
// fs.readdir(dirGenders, (err, files) => {
//     if (err) {
//         console.log(err);
//     }
//
//     files.map(fileName => {
//         fs.readFile(path.join(dirGenders, fileName), (err1, data) => {
//             console.log(fileName);
//             if (JSON.parse(data).gender === "male") {
//                 fs.rename(path.join(__dirname, 'dir', 'genders', fileName), path.join(__dirname, 'dir', 'boys', fileName), err2 => {
//                     if (err2) {
//                         console.log(err2);
//                     }
//                 })
//             }
//         });
//     });
// });
//
// fs.readdir(dirGenders, (err, files) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(files);
//
//     files.map(fileName => {
//         fs.readFile(path.join(dirGenders, fileName), (err1, data) => {
//             console.log(fileName);
//
//             if (JSON.parse(data).gender === "female") {
//                 fs.rename(path.join(__dirname, 'dir', 'genders', fileName), path.join(__dirname, 'dir', 'girls', fileName), err2 => {
//                     if (err2) {
//                         console.log(err2);
//                     }
//                 })
//             }
//         });
//     });
// });

// function sortingFiles(links) {
//     fs.readdir(links, (err, files) => {
//         err ? console.log(err) : null;
//
//         files.forEach(fileNames => {
//             const pathFiles = path.join(links, fileNames);
//             fs.stat(pathFiles, (err1, stats) => {
//                 if (stats.isDirectory()) {
//                     console.log(true);
//                     return sort(pathFiles);
//                 }
//
//                 console.log(false)
//                 const pathSort = path.join(__dirname, 'sortFiles', fileNames);
//                 fs.rename(pathFiles, pathSort,
//                     err => {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         }
//                     })
//             })
//         })
//     });
// };
//
// sortFiles(randomFiles);