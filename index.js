const express = require("express");
const path = require('path')
const cookieParser = require('cookie-parser')
const {connectToMongoDB} = require('./connection')
const {restrictToLoggedinUsersOnly} = require("./middlewares/auth")
const URL = require('./models/url')

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8002;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log('MongoDB connected'))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));  


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUsersOnly, urlRoute);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.get('/url/:shortId', async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, 
    {$push:{
        visitHistory: {
            timestamp: Date.now(),
        }
    }})
    res.redirect(entry.redirectURL)
})
app.listen(PORT, ()=> console.log(`Server start at PORT ${PORT}`))
