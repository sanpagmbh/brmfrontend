import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import ClientOAuth2  from 'client-oauth2'


let amount = 0

const Home = props => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SBEN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {props.resp}
        </h1>
        <text>
          {props.date}
        </text>
          {/* {props.memberArray && (props.memberArray.map((member) => {
           console.log()
           return (<div></div>)
            // <text>
            //   {member.name}
            // </text>

          
          }))} */}
      </main>
    </div>
  )
}

Home.getInitialProps = async () => {

  const config = {
    client: {
      id: '6792d505eb8845b1b845fe962e06ecd5',
      secret: 'Wge0wfQo3Od9A7MPRUnhOBZwj4gppfaiNivJXmbv'
    },
    auth: {
      tokenHost: 'https://login.eveonline.com/v2/oauth/authorize'
    },
    options: {
      bodyFormat: 'json'
    }
  }
  const client = new ClientOAuth2(config)


  let webApiUrl = 'https://login.eveonline.com/v2/oauth/token'
  let auth = {
    username: '6792d505eb8845b1b845fe962e06ecd5',
    password: 'Wge0wfQo3Od9A7MPRUnhOBZwj4gppfaiNivJXmbv'
  }

  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', 'yPRoUaRFdkq0tCPE2sdXDw==')
  params.append('scope', 'esi-wallet.read_corporation_wallets.v1')

  const resp = await axios.post(webApiUrl, params, {
      auth: auth,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "login.eveonline.com"
      }
    })

  let accessToken = client.createToken(resp.data)
  let brmDataURL = 'https://esi.evetech.net/latest/corporations/98666713/wallets/1/journal/'
  let amount = 0
  const brmData = await axios.get(brmDataURL, { headers: { "Authorization": `Bearer ${accessToken.data.access_token}` } })
  
  let startDate = new Date('2021-05-03T07:00:00Z')
  
  let diff = (new Date() - startDate) / 1000 / 60 / 60
  let count = 0
  while (diff > 25 || count > 100) {
    count++
    startDate.setHours(startDate.getHours() + 25);
    diff = (new Date() - startDate) / 1000 / 60 / 60
  }

  
  if (brmData && brmData.data) {
    console.log(startDate)
    brmData.data.map(brmData =>{
      // if (brmData.description.includes('SBEN-Q') && brmData.date > '2021-05-04T08:00:00Z') {
      if (brmData.description.includes('SBEN-Q') && new Date(brmData.date) > startDate) {

        amount = amount + brmData.amount
      }
    })
  }

  let result = Math.ceil(amount * 20)
  result = result.toString();
  var pattern = /(-?\d+)(\d{3})/
  while (pattern.test(result))
    result = result.replace(pattern, "$1.$2")


  return { resp: result, date: startDate.toString()}
  }
export default Home