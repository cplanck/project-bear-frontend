import { useContext } from 'react'
import { AppContext, UserContext } from '@/components/Context'
import { useEffect } from 'react'
import React, { useState } from "react";
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function HomePage() {

  const fetchCookie = () =>{
    console.log('COOKIE FETCH RUNNING!')
    fetch('http://localhost:8000/auth/testrequest', {method: "GET", credentials: "include"}).then(res=>res.json()).then(res=>console.log(res))
}

  return (
    <div className={styles.heading}>
      Welcome to BitBear!
      <button onClick={()=>fetchCookie()}>Test request</button>
    </div>
  )
}