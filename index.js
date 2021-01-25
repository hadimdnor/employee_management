const express = require("express");
const app = express();
const cors = require("cors");
const run_sql = require('./db')
const pg = require('pg');

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs')

app.use(express.static('public'))

// const userRoutes = require('./controllers/users')
// const sessionRoutes = require('./controllers/session')

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(session({
//     key: 'user_sid',
//     secret: process.env['EXPRESS_SESSION_SECRET_KEY'], 
//     // express_session_secret_key can be anything jumble of letters and numbers (minimum length = +40 characters)
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 600000 }

// }))

// app.use(methodOverride('_method'))


app.post("/create", (req, res) => {
    console.log(req.body)
  const name = req.body.name;
  const staff_id = req.body.staff_id
  const age = req.body.age;
  const email = req.body.email;
  const position = req.body.position;
  const department = req.body.department
  const wage = req.body.wage;
  run_sql('INSERT INTO employees(name, staff_id,age, email, position, department, wage) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [name,staff_id,age, email, position,department, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


// app.use(userRoutes)
// app.use(sessionRoutes)

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});