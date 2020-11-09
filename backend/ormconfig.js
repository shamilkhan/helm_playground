module.exports = {
 // type: 'postgres',
 // url: process.env.DATABASE_URI,
 // use sqlite for local dev
 type: "sqlite",
 database: "database.sqlite",
 synchronize: true,
 logging: true,
 entities: ["src/entity/**/*.ts"],
 migrations: ["src/migration/**/*.ts"],
 subscribers: ["src/subscriber/**/*.ts"],
 cli: {
  entitiesDir: "src/entity",
  migrationsDir: "src/migration",
  subscribersDir: "src/subscriber"
 }
}