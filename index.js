import express from "express";
import Agenda from "agenda";
import Agendash from "agendash";
import dotenv from "dotenv";
dotenv.config();

const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: "agendaJobs",
  },
});

(async () => {
  await agenda.start();
  const app = express();
  app.use('/dash', Agendash(agenda));
  app.listen(process.env.PORT, () => {
    console.log("Agenda Dashboard started at http://localhost:3000/dash");
  });
})();

