import { ClientOAuth2 } from 'client-oauth2'
import axios from 'axios'


let webApiUrl = 'https://login.eveonline.com/v2/oauth/token'
let auth = {
    username: '6792d505eb8845b1b845fe962e06ecd5',
    password: 'Wge0wfQo3Od9A7MPRUnhOBZwj4gppfaiNivJXmbv'
}

const params = new URLSearchParams()
params.append('grant_type', 'refresh_token')
params.append('refresh_token', 'yPRoUaRFdkq0tCPE2sdXDw==')
params.append('scope', 'esi-wallet.read_corporation_wallets.v1')

const BRM = async () => {
    const resp = async () => {
        try {
            const resp = await axios.post(webApiUrl, params, {
                auth: auth,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "login.eveonline.com"
                }
            })
            return {resp}

        }
        catch (error) {
            return { error }
        }
    }

    return await resp()
}



    // const resp = async () => {
    //     try {
    //         const resp = await axios.post(webApiUrl, params, {
    //             auth: auth,
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //                 "Host": "login.eveonline.com"
    //             }
    //         })
    //         return {resp}

    //     }
    //     catch (error) {
    //         return { error }
    //     }
    // }
    // const esiAuth = ClientOAuth2()
    // let accessToken = esiAuth.createToken()
    // let accessToken = client.createToken(amount.data)
    // webApiUrl = 'https://esi.evetech.net/latest/corporations/98666713/wallets/1/journal/'
    // console.log(resp)
    // return true
        // .then(async (res) => {

        //     axios.get(webApiUrl, { headers: { "Authorization": `Bearer ${accessToken.token.access_token}` } })
        //         .then(
        //             function (res) {
        //                 if (res && res.data) {
        //                     let amount = 0
        //                     res.data.map(res => {
        //                         if (res.description.includes('SBEN-Q') && res.date > '2021-04-27T01:00:41Z') {
        //                             amount = amount + res.amount
        //                         }
        //                     })
        //                     amount = amount * 20
        //                     return amount
        //                 }
        //             }
        //         )
        //     return amount
        // })
        // .catch(function (error) {
        //     if (error.response) {
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //     }
        // })
// }

export default BRM