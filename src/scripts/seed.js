const {
  templates,
  customers,
  groups,
  presets,
  groupedCustomers,
} = require("../app/lib/placeholder-data");

const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2/promise");

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  maxIdle: 10,
  idleTimeout: 3000,
  queueLimit: 0,
});

async function query(sql, params) {
  const [results] = await connectionPool.execute(sql, params);
  return results;
}

async function seedTemplates() {
  try {
    for (const template of templates) {
      const inputsString = JSON.stringify(template.inputs);
      await query(
        "INSERT INTO templates (name, html, user_id, inputs) VALUES ( ?, ?, ?, ?)",
        [
          template.name,
          template.html,
          "2ee8ec9d-28d2-11ef-8a5b-7054d2c120c7",
          inputsString,
        ]
      );
    }
    // const result = await query("SELECT * FROM templates", []);
    // console.log("Templates:", result);
  } catch (err) {
    console.error("Error seeding templates:", err);
  }
}

async function seedCustomers() {
  // Add your seeding logic here
  try {
    for (const customer of customers) {
      await query(
        "INSERT INTO customers ( name, email, company) VALUES ( ?, ?, ?)",
        [customer.name, customer.email, customer.company]
      );
    }

    // const result = await query("SELECT * FROM customers", []);
    // console.log("Customers:", result);
  } catch (err) {
    console.error("Error seeding customers:", err);
  }
}

async function seedPresets() {
  // Add your seeding logic here
  try {
    for (const preset of presets) {
      await query(
        "INSERT INTO presets ( name, user_id, html) VALUES (?, ?, ?)",
        [
          preset.name,
          preset.html,
          "2ee8ec9d-28d2-11ef-8a5b-7054d2c120c7",
          preset.html,
        ]
      );
    }

    // const result = await query("SELECT * FROM presets", []);
    // console.log("Presets:", result);
  } catch (err) {
    console.error("Error seeding presets:", err);
  }
}

async function main() {
  // await seedTemplates();
  await seedCustomers();
  // await seedPresets();
  // await seedGroupedCustomers();

  process.exit();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
