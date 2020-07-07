// // import fs from 'fs'
// // var fs = require('fs');

// export const getEmployees = async (file) => {
//     console.log(`in get employees, file: ${file}`)
//     return new Promise((resolve,reject) => {
//         if (fs.existsSync(file)) {
//             fs.readFile(file,'utf8')
//             .then((results) => resolve(JSON.parse(results)))
//             .catch((error) => reject(error))
//         }
//         reject("file does not exist or is not accessible")
//     })
// }