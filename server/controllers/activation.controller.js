const User = require('../../config/db').User;
const jwt = require('jsonwebtoken');


module.exports = {
	activation(req, res) {
    let token = req.headers['x-access-token'];

    /*const token = jwt.sign({
      email: "zlata@ukr.net",
      id: "19"
    }, "andrew");*/
    //res.send(token);

    
    let decoder;
    try {
    	decoder = jwt.verify(token, 'andrew');
    } catch (err) {
    	return res.status(401).send({message: 'link are not valid or time expired'});
    }
    	//res.status(200).send(decoder.id);

    //let decoded = jwt.decode(token, {complete: true});
    //res.send(decoded.payload.id);


    /*let decoder = jwt.verify(token, "andrew", function(err, decoded) {
  if (err) {
      err = {
        name: 'TokenExpiredError',
        message: 'links time expired'
      }
      res.status(404).send(err);
  }
  //res.status(200).send(decoded);
});
res.status(200).send(decoder.id);*/

    User.findOne({
        where: {
          id: decoder.id
        }
      })
    .then(user => {
      if (!user) {
        return res.status(404).send({message: 'link is not active'});
      } else {
        if (user.is_activate) {
          return res.status(200).send({message: 'link has already actived'});
        } else {
        User.update({
          is_activate: true
        }, {
          where: {
            id: decoder.id
          }
        });
        return res.status(200).send({message: 'congratulation'});
        }
      }
    });
  }
};
