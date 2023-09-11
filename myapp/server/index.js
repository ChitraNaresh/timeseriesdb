const express = require("express");
const app = express();
const crypto = require("crypto");
const assert = require("assert");
const events = require("events");
const sqlite3 = require("sqlite3").verbose();
const http = require("http");
const mongoose = require("mongoose");
const moment = require("moment");

const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
app.use(cors());
const eventEmitter = new events.EventEmitter();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userData = {
  names: [
    "Joanne Cassin",
    "Hector Kuphal",
    "Faye Rath Esq.",
    "Alphonso Kihn IV",
    "Amb. Lacy Wiza",
    "Marica Green",
    "Lise Conn III",
    "Sen. Bob Lubowitz",
    "Maria Schulist DDS",
    "Beulah Brekke",
    "Eliseo Cummerata",
    "Carri Donnelly",
    "Winfred Okuneva",
    "Son Wilderman",
    "Leonora Mueller",
    "Jonas Bahringer",
    "Florrie Nolan",
    "Katina Kunze I",
    "Jenae Becker",
    "Drew Nitzsche",
    "Chuck Windler IV",
    "Kenny Dickinson",
    "Herbert Abbott",
    "Kip Wilderman",
    "Krissy Zboncak",
    "Rep. Sang Weber",
    "Erline Kirlin IV",
    "Msgr. Clarence VonRueden",
    "Rev. Esperanza Klocko",
    "Althea Bashirian DC",
    "Fr. Kymberly Boyle",
    "Waldo Kuvalis",
    "Vince Schuster",
    "Mindi Johnson",
    "Wen Powlowski",
    "Mireille Lind",
    "Warner Sanford",
    "Msgr. Jayson Bahringer",
    "Amb. Luann Doyle",
    "Federico McLaughlin",
    "Lesli Homenick",
    "Msgr. Abraham Wilkinson",
    "Albert McGlynn",
    "Darell Ernser III",
    "Rep. Darryl Gutkowski",
    "Emery Windler",
    "Nu Reichert Ret.",
    "Pres. Keven Bartoletti",
    "Tam Grant",
    "Elsie Schmeler",
    "Victor Gusikowski",
    "Omar Botsford",
    "The Hon. Jessie Herzog",
    "Merry Klein",
    "Sen. Geraldo Kihn",
    "Refugio Prohaska",
    "Rev. Nguyet Wolff",
    "Rob Paucek",
    "Leanora Schneider",
    "Sandi Kerluke Ret.",
    "Israel Hagenes",
    "Augustus Bogan",
    "Ms. Lyman Jacobi",
    "Harland Ritchie",
    "Emogene Boyle",
    "Dr. Wm Jacobs",
    "Margot Jerde VM",
    "Laverna Rohan",
    "Josefa Reichert",
    "Darrel Collier",
    "Tosha Brekke",
    "Ralph Pfannerstill",
    "Santana Doyle",
    "Mrs. Bret Johnson",
    "Alene Lemke",
    "Clinton Ledner",
    "Darcel Kassulke",
    "Jeni Wolff",
    "Lakia Moen",
    "Gerri Sipes",
    "Miss Chantel Brekke",
    "Kia Kiehn",
    "Ruben Rolfson I",
    "Glenn Rowe",
    "Walter Swaniawski II",
    "Santos Predovic",
    "Nova Bernhard",
    "Eleanore Oberbrunner",
    "Sonia Zboncak",
    "Elvis Hirthe Esq.",
    "Valencia Greenfelder JD",
    "Rene Beier",
    "Gov. Loralee Farrell",
    "Asa Jast",
    "Rev. Newton Cummerata",
    "Jon Wisozk",
    "Tom Hane",
    "Hanh Bode",
    "Mose Feeney",
    "Ashli Bartoletti",
  ],
  cities: [
    "Donteview",
    "Lake Frederick",
    "Russelville",
    "Pollichfurt",
    "Marksberg",
    "Shenaberg",
    "East Codi",
    "Heathcoteberg",
    "South Russburgh",
    "Lake Barrie",
    "East Deon",
    "Angleaside",
    "East Cornell",
    "North Thurman",
    "Conceptionland",
    "Homenickside",
    "New Richardmouth",
    "Marcelinoland",
    "West Noelburgh",
    "Lake Rachellview",
    "Naderville",
    "South Devin",
    "Kingfurt",
    "West Kanesha",
    "Russelfort",
    "Lake Patrick",
    "Lake Novella",
    "Juliushaven",
    "Kilbackfurt",
    "Murphychester",
    "West Evantown",
    "West Filomenaton",
    "Wunschland",
    "East Robbie",
    "Chrisfurt",
    "East Sharmaineland",
    "Fadelmouth",
    "West Lourdes",
    "New Demetra",
    "North Long",
    "Gerholdhaven",
    "New Wade",
    "Metzmouth",
    "South Emmett",
    "New Leighburgh",
    "East Chanaburgh",
    "East Caridadburgh",
    "East Chelsiefort",
    "Lake Mauricioborough",
    "Gerardofort",
    "West Marquis",
    "North Tommie",
    "Bobetteview",
    "New Ursulashire",
    "South Lorriane",
    "West Stanstad",
    "Port Maxiebury",
    "Lueilwitzfort",
    "Lake Florinda",
    "Efrainview",
    "New Jorge",
    "Prosaccoview",
    "Osvaldoside",
    "Judsonville",
    "Paristown",
    "Francescotown",
    "Hilllshire",
    "Tamieville",
    "Shirelyfort",
    "Douglasstad",
    "West Wm",
    "North Beverlee",
    "Manfurt",
    "West Leighaville",
    "Bobbybury",
    "South Ginatown",
    "Philomenaview",
    "Lake Junie",
    "Stewartstad",
    "West Malcomberg",
    "Lake Vicente",
    "Litteltown",
    "East Christalberg",
    "West Orenfurt",
    "Chadwickbury",
    "New Zola",
    "West Carol",
    "Kihnberg",
    "South Elmerton",
    "New Elmer",
    "Port Emileburgh",
    "North Charis",
    "Marksside",
    "Guybury",
    "Port Allyson",
    "North Jinaville",
    "Lake Colemanmouth",
    "New Yongside",
    "Port Rosette",
    "Abernathyborough",
  ],
};

mongoose
  .connect(
    "mongodb+srv://ChitraNaresh18:ChitraNaresh18@cluster1.ahdanvp.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
db1 = mongoose.connection;

db1.on("error", console.error.bind(console, "MongoDB connection error:"));
db1.once("open", () => {
  console.log("Connected to MongoDB");
});

// / Define MongoDB schema and model for time series data
const timeSeriesSchema = new mongoose.Schema({
  timestamp: String,
  data: Array,
});

const TimeSeries = mongoose.model("TimeSeriesDataBase", timeSeriesSchema);

// insert();

let db = null;
const intializeDB = () => {
  db = new sqlite3.Database("./usersData.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the usersData.db database.");
  });
  //   db.run(
  //     "CREATE TABLE usersData(name varchar(200),origin varchar(200),destination varchar(200),date_time DATETIME)"
  //   );
};
intializeDB;

// const insertDataIntoTable = (userDataValue) => {
//   const { name, origin, destination } = userDataValue;

//   //db.serialize let us run sqlite operations in serial order
//   db.serialize(() => {
//     //2nd operation (insert into users table statement)

//     const date = new Date();
//     console.log(
//       `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
//     );

//     const timeStamp = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

//     db.run(
//       `INSERT INTO usersData(name,origin,destination,date_time)
//                 VALUES("${name}","${origin}","${destination}","${timeStamp}")`,
//       (err) => {
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//       },
//       () => {
//         console.log("query completed");
//       }
//     );
//     // 3rd operation (retrieve data from users table)
//     db.each(
//       `SELECT * FROM usersData`,
//       (err, row) => {
//         if (err) {
//           console.log(err);
//           throw err;
//         }
//       },
//       () => {
//         console.log("query completed");
//       }
//     );
//   });
//   db.all(`SELECT * FROM usersData`, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log("all");
//   });
// };}

const generateRandomMessage = () => {
  const { names, cities } = userData;
  const name = names[Math.floor(Math.random() * names.length)];
  const origin = cities[Math.floor(Math.random() * cities.length)];
  const destination = cities[Math.floor(Math.random() * cities.length)];

  const originalMessage = {
    name,
    origin,
    destination,
  };

  const secret_key = crypto
    .createHash("sha256")
    .update(JSON.stringify(originalMessage))
    .digest("hex");

  const sumCheckMessage = {
    ...originalMessage,
    secret_key,
  };

  class Encrypter {
    constructor(encryptionKey) {
      this.algorithm = "aes-192-cbc";
      this.key = crypto.scryptSync(encryptionKey, "salt", 24);
    }

    encrypt(clearText) {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
      const encrypted = cipher.update(clearText, "utf8", "hex");
      return [
        encrypted + cipher.final("hex"),
        Buffer.from(iv).toString("hex"),
      ].join("|");
    }
  }

  const encrypter = new Encrypter("secret");
  const clearText = JSON.stringify(sumCheckMessage);
  const encrypted = encrypter.encrypt(clearText);
  console.log(encrypted);
  eventEmitter.emit("he", encrypted);
};

io.on("connection", (socket) => {
  console.log("Emitter connected");
  // Constants for randomization

  setInterval(() => {
    generateRandomMessage();
    // db.run(`DELETE FROM usersData`, (err) => {
    //   if (err) console.log(err);
    // });
  }, 10000);

  eventEmitter.on("he", (data) => {
    // console.log("second", data);
    const [encrypted, iv] = data.split("|");
    if (!iv) throw new Error("IV not found");
    const decipher = crypto.createDecipheriv(
      "aes-192-cbc",
      crypto.scryptSync("secret", "salt", 24),
      Buffer.from(iv, "hex")
    );
    const userDataObject =
      decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    const parseUserData = JSON.parse(userDataObject);
    // insertDataIntoTable(parseUserData);
    console.log(parseUserData);
    parseUserData.createdAt = new Date();
    async function insert() {
      await TimeSeries.create({
        timestamp: new Date(),
        data: [parseUserData],
      });
      console.log("User Created");
    }
    insert();
    socket.emit("receive_message1", parseUserData);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
