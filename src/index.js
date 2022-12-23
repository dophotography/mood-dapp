const moodContractAdress = '0x7A02C4000E15Fb5723a5f5A39cE38695b8c17b50';
const moodContractABI = [{
                                "constant": false,
                                "inputs": [
                                    {
                                        "internalType": "string",
                                        "name": "_mood",
                                        "type": "string"
                                    }
                                ],
                                "name": "setMood",
                                "outputs": [],
                                "payable": false,
                                "stateMutability": "nonpayable",
                                "type": "function"
                            },
                            {
                                "constant": true,
                                "inputs": [],
                                "name": "getMood",
                                "outputs": [
                                    {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                    }
                                ],
                                "payable": false,
                                "stateMutability": "view",
                                "type": "function"
                            }];
let MoodContract;
let signer;
const provider = new ethers.providers.Web3Provider(window.ethereum, 'Goerli');

provider.send("eth_requstAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(moodContractAdress, moodContractABI, signer);
    });
});

async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const mood = await getMoodPromise;
    console.log(mood);
}

async function setMood() {
    const mood = document.getElementById("mood".value);
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}