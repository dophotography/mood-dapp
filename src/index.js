    const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    const moodContractAddress = '0xf2B376632b99ad52986a67c9eBd93Ab4453914CD';
    const moodContractABI = [
                                {
                                "inputs": [
                                    {
                                    "internalType": "string",
                                    "name": "_mood",
                                    "type": "string"
                                    }
                                ],
                                "name": "setMood",
                                "outputs": [],
                                "stateMutability": "nonpayable",
                                "type": "function"
                                },
                                {
                                "inputs": [],
                                "name": "getMood",
                                "outputs": [
                                    {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                    }
                                ],
                                "stateMutability": "view",
                                "type": "function"
                                }
                            ];
    let MoodContract;
    let signer;


    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            signer = provider.getSigner(accounts[0]);
            MoodContract = new ethers.Contract(moodContractAddress, moodContractABI, signer);
        });
    });

    async function getMood() {
        const getMoodPromise = MoodContract.getMood();
        const mood = await getMoodPromise;
        console.log(mood);
    }

    async function setMood() {
        const mood = document.getElementById("mood").value;
        const setMoodPromise = MoodContract.setMood(mood);
        await setMoodPromise;
    }