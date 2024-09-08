import app from './app';
import { connectToDatabase } from './db/connection';

//connections and listeners
const PORT = process.env.PORT || 5000;

connectToDatabase().then(()=>{
    app.listen(PORT,()=>{
      console.log("server is open in port 5000");
    });
  }).catch((error)=>{
    console.log(error);
  });