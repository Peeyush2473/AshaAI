import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

// Enable promise-based transactions for cleaner async/await syntax
enablePromise(true);

const DATABASE_NAME = 'AshaAI.db';
const TABLE_CITIZENS = 'citizens';
const TABLE_SCREENINGS = 'screenings';

// Function to get a database connection
export const getDBConnection = async () => {
  return openDatabase({ name: DATABASE_NAME, location: 'default' });
};

// Function to create tables if they don't exist
export const createTables = async (db) => {
  // Create Citizens Table
  const citizensQuery = `
    CREATE TABLE IF NOT EXISTS ${TABLE_CITIZENS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.executeSql(citizensQuery);

  // Create Screenings Table
  const screeningsQuery = `
    CREATE TABLE IF NOT EXISTS ${TABLE_SCREENINGS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      citizen_id INTEGER,
      type TEXT NOT NULL,
      value TEXT,
      level TEXT NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      isSynced INTEGER DEFAULT 0,
      FOREIGN KEY(citizen_id) REFERENCES ${TABLE_CITIZENS}(id)
    );
  `;
  await db.executeSql(screeningsQuery);
  console.log('Database tables created/verified successfully.');
};

// --- Citizen Functions ---

export const addCitizen = async (db, { name, age, gender }) => {
  const insertQuery = `
    INSERT INTO ${TABLE_CITIZENS} (name, age, gender)
    VALUES (?, ?, ?);
  `;
  const [results] = await db.executeSql(insertQuery, [name, age, gender]);
  return results;
};

export const getCitizens = async (db) => {
  const citizens = [];
  const results = await db.executeSql(`SELECT id, name, age, gender FROM ${TABLE_CITIZENS}`);
  results.forEach(resultSet => {
    for (let i = 0; i < resultSet.rows.length; i++) {
      citizens.push(resultSet.rows.item(i));
    }
  });
  return citizens;
};


// --- Screening Functions ---

export const addScreening = async (db, { citizenId, type, value, level }) => {
    const insertQuery = `
      INSERT INTO ${TABLE_SCREENINGS} (citizen_id, type, value, level)
      VALUES (?, ?, ?, ?);
    `;
    const [results] = await db.executeSql(insertQuery, [citizenId, type, value, level]);
    return results;
};

export const getCitizenHistory = async (db, citizenId) => {
    const history = [];
    const results = await db.executeSql(`
      SELECT type, value, level, date 
      FROM ${TABLE_SCREENINGS} 
      WHERE citizen_id = ? 
      ORDER BY date DESC
    `, [citizenId]);
    results.forEach(resultSet => {
        for (let i = 0; i < resultSet.rows.length; i++) {
            history.push(resultSet.rows.item(i));
        }
    });
    return history;
};

export const getUnsyncedScreenings = async (db) => {
    const screenings = [];
    const results = await db.executeSql(`SELECT * FROM ${TABLE_SCREENINGS} WHERE isSynced = 0`);
    results.forEach(resultSet => {
        for (let i = 0; i < resultSet.rows.length; i++) {
            screenings.push(resultSet.rows.item(i));
        }
    });
    return screenings;
};

export const markScreeningAsSynced = async (db, screeningId) => {
    const updateQuery = `UPDATE ${TABLE_SCREENINGS} SET isSynced = 1 WHERE id = ?`;
    await db.executeSql(updateQuery, [screeningId]);
};
