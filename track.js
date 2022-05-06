const axios = require('axios')
const cheerio = require('cheerio')

const urls = {
    eth:'https://etherscan.io/token/0xaf5191b0de278c7286d6c7cc6ab6bb8a73ba2cd6' ,
    poly: 'https://polygonscan.com/token/0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590',
    bsc: 'https://www.bscscan.com/token/0xb0d502e938ed5f4df2e681fe6e419ff29631d62b',
    avax: 'https://snowtrace.io/token/0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590',
    arbi: 'https://arbiscan.io/token/0x6694340fc020c5e6b96567843da2df01b2ce1eb6',
    optimism: 'https://optimistic.etherscan.io/token/0x296f55f8fb28e498b858d0bcda06d955b2cb3f97',
    ftm: 'https://ftmscan.com/token/0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590'
}

async function getHolders() {
    for(const key in urls) {
        await axios(urls[key])
        .then(response=> {
            const html = response.data
            const $ = cheerio.load(html)
            let numHolders
            if(key==='ftm') { //fantomscan users fewer divs
                numHolders = $('div[id="ContentPlaceHolder1_tr_tokenHolders"]')
                    .find('div > div > div').text().trim()
               numHolders = numHolders.replace('\n','')
               numHolders = numHolders.replace('Holders:','')

            } else {
                numHolders = $('div[id="ContentPlaceHolder1_tr_tokenHolders"]')
                    .find('div > div > div > div > div ').text().trim()
            }
            console.log(key, numHolders)
        }).catch(console.error)
    }
}
getHolders()

