import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    users.push({username, avatar});
    res.send("Ok");
})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    tweets.push({username, tweet});
    res.send("Ok");
})

app.get('/tweets', (req, res) => {
    if(tweets.length===0){
        console.log("Não há tweets!");
    }
   const last10Tweets = [];
   for(let i=0;i<tweets.length;i++){
    const avatar = users.find((user) => user.username === tweets[i].username);
    last10Tweets.push({avatar, ...tweets[i]});
   }
   res.send(last10Tweets);
});

app.listen(5000, () => console.log("Listening on port 5000"));