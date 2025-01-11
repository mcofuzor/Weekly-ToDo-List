import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "school123",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  const date = new Date().getDay();
  console.log(date)
  const dayResult = await db.query("SELECT * FROM weekdays  WHERE date=($1)", [date]);
  const dayQuery = dayResult.rows[0];
  const result = await db.query("SELECT * FROM items  WHERE day_id=($1) ORDER BY id ASC", [date]);
  const queryResult = result.rows;
  items= queryResult;
  console.log(items)
  res.render("index.ejs", {
    listTitle: dayQuery.day,
    dayId:dayQuery.date,
    listItems: items,
  });
});


app.post("/days", async (req, res) => {
  const daySelected = req.body.days;
  const dayResult = await db.query("SELECT * FROM weekdays  WHERE date=($1)", [daySelected]);
  const dayQuery = dayResult.rows[0];
  const result = await db.query("SELECT * FROM items WHERE day_id=($1) ORDER BY items.id ASC", [daySelected]);
  const queryResult = result.rows;
  items= queryResult;
  //console.log(dayQuery.date)
  res.render("index.ejs", {
    listTitle: dayQuery.day,
    dayId:dayQuery.date,
    listItems: items,
  });

});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const dayId = req.body.dayId;
  console.log(dayId)
 await db.query("INSERT INTO items (title, day_id) VALUES ($1, $2)", [item, dayId]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
const id = req.body.updatedItemId;
const item = req.body.updatedItemTitle;
 await db.query("UPDATE  items SET title=($1) WHERE id=($2)", [item, id]);

res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const deleteItem = req.body.deleteItemId;
  await db.query("DELETE FROM  items WHERE id=($1)", [deleteItem]);
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
