var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sql"

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.log(err.message)
      throw err
    }
    console.log("db connect");

});
//create table
//    const  crSQL=`CREATE TABLE users (
//              id INTEGER PRIMARY KEY AUTOINCREMENT,
//              first_name text, 
//              last_name text,
//              age INTEGER ,
//              email text , 
//              password text )`;

//     db.run(crSQL ,(err)=> {
//     if (err){console.log(err)}
//     console.log("create")});


exports.create = (req, res)=>{
    console.log('Connected to the SQLite database.');

    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var create_user =`INSERT INTO users(first_name,last_name,age, email, password) VALUES (?,?,?,?,?)`;

    db.run(create_user,[req.body.first_name,req.body.last_name, req.body.age, req.body.email, req.body.password],(err, row )=>{
        if (err){
            console.log(err)
        }
        res.render('home', {alert:"User created!"});
        console.log(row);
    })
   
    // var sql =`INSERT INTO users(first_name,last_name,age, email, password) VALUES (?,?,?,?,?)`;
    // db.run(sql, [req.body.first_name,req.body.last_name, req.body.age, req.body.email, req.body.password], (err ,result)=> {
    //     if (err){
    //         // res.status(400).json({"error": err.message})
    //         console.log(err);
    //         return;
    //     }
    //     // res.redirect('/', {alert:"User created!"})
    //     console.log(result)
       
    //     console.log('Connected to the SQLite database.')

    // });
}

// home page 
exports.view = (req, res) => {
    res.render('home');
}


//
exports.form = (req, res) => {
    var sql = "select * from users where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.render('user', {row});
      });
  
};

// Add new user

// exports.profil = (req, res) => {
//     // User the connection
//     connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
//       if (!err) {
//         res.render('user', { rows });
//       } else {
//         console.log(err);
//       }
//       console.log('The data from user table: \n', rows);
//     });
//   }
exports.login=(req, res, next)=> {
    let admin =true;
    var errors=[]

    

    
  
    db.get(`SELECT * FROM users WHERE email=? AND password=?`,[req.body.email , req.body.password], (err, row)=> {
        console.log(row)
      if (err) {
        errors.push(err.message);
        console.log(err)
        
      }
  
      if (row) {
        // req.session.authorised = true;
        req.body.email = row[0];
        req.body.password = row[0];
        let noImg1=row.first_name.charAt(0).toUpperCase(),
        noImg2=row.last_name.charAt(0).toUpperCase();

        // res.redirect("/")
        res.render('user-profil' ,{alert:"User confirmed successfuly" ,row ,noImg1, noImg2 ,auth:true} );
        console.log("login")
        console.log(row)
        
      } else {
        errors.push('The username or password is incorrect.');
        res.render('home' ,{ alert: 'The username or password is incorrect.'});
        console.log("novvi xoto")
        console.log(req.body.password)
        console.log(err)
      }
  
    });
    // res.redirect("/login")

  
  }
  exports.dashboard=(req ,res)=>{
    var sql = "SELECT * FROM users";
    db.all(sql, [], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          console.log(err)
          return;
        }
        console.log("rows")

        res.render('user', {row });
      });
  }


  
  function runKey(range , outputCount){
    const array = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


    
    let results = [];

    for (let i = 0; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      results.push(array[random]);
      array[random] = array[range - i];
    }

    
    return results;
    

}
console.log(runKey(35 ,5))
key=runKey(35 ,6)
// Edit user
exports.edit = (req, res) => {
    
  // User the connection
  db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('user-edit', { rows , status:"Online" , key});
    } else {
      console.log(err);
    }
    console.log('update user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
    // key=runKey(35 ,5)
  // User the connection

   const  kapca =()=>{
       for (let i = 0; i < key.length; i++) {
           let a = key[i],
           b=req.bodyconfirmKey.charAt(i)
           if(a==b){
            console.log(true);

               return true;
           }else{
            console.log(false);

            return false;
           }
           
       }
   }
    if(kapca==true){
        db.run(`UPDATE users SET first_name = ?, last_name = ?, email = ?, age = ?, password = ? WHERE id = ${req.params.id}`, [req.body.first_name, req.body.last_name, req.body.email, req.body.age, req.body.password], (err, row) => {

            if (!err) {
            // User the connection
                db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
                    // When done with the connection, release it
                    
                    if (!err) {
                        res.render('user-edit', { row, alert: `${row.first_name} has been updated.` , status:"Online"});
                    } else {
                    console.log(err);
                    }
                    console.log('The data from user table: \n', row);
                });
                
            } else {
                console.log(err);
            }
            console.log('NOT UPDATE: \n', row);
            console.log(err);
        });
    }else{
        console.log('invalid kapcha: \n', kapca );

    }
}

// Delete User
exports.delete = (req, res) => {

//   Delete a record

//   User the connection
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], (err, row) => {

    if(!err) {
      res.redirect('/users');
    console.log("deletes");

    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', row);

  });

  // Hide a record

//   db.get('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
//     if (!err) {
//       let removedUser = encodeURIComponent('User successeflly removed.');
//       res.redirect('/?removed=' + removedUser);
//     } else {
//       console.log(err);
//     }
//     console.log('The data from beer table are: \n', rows);
//   });

}

// View Users
exports.find = (req, res) => {

  // User the connection
  db.all('SELECT * FROM users WHERE first_name = ?', [req.body.first_name], (err, row) => {
    if (!err) {
      res.render('user', { row });
    } else {
      console.log(err);
    }
    if(!row){
        res.render('user', { alert: "sorry we could not find such a user!" , auth:true});
    }
    console.log('The data from user table: \n', row);
  });
}