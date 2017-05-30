'use strict';
const jwt = require('jsonwebtoken');
const user = true;

module.exports = {
  auth(req, res) { 

    const token = jwt.sign({
        email: req.body.email,
        password: req.body.password
        }, 'secret');
      
    return res.json({'token': token});
  }
};




// app.post('*', (req, res) => {
//   if (req.body.email == 'hello@test.com') {
//       res.status(200)
//           .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'});
//   } else {
//       res.sendStatus(403);
//   }
// });

// app.get('/', (req, res) => {
//     let token = req.headers['authorization'];
//     if (!token) {
//         res.sendStatus(401);
//     } else {
//         try {
//             let decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
//             res.status(200)
//                 .json({data: 'Valid JWT found! This protected data was fetched from the server.'});
//         } catch (e) {
//             res.sendStatus(401);
//         }
//     }
// })
