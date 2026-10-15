import express from "express";
import  {env } from "./src/config/env.js";

const app = express();;
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`));