const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "047b88552ca83b7f7011c6a4bdc048371c38d2e2ac93cf89a9625eb3056b4053b40e992e115dc30aa4dd52c8579ada829dca2894e487d6b34ee06d45a196ca7757": 100,
  "0411891e94ed9e82be2434a04adbb971ceb53a56552e627c86d024c70f77e318220baf9a19864d0ef40d11f057c0de730d85f65d052840d9d686f8ac26cd103b1e": 50,
  "0465973579734286a10c0bf9c1b8a1a2fbda7f547c8d0343c35a232aeaaf7965408de35eb256c8b3f3fd6c7afce331b3b8e2ae54a806cf78b653fc9163892a3454": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
