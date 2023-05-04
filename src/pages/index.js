import { useContext } from 'react'
import { AppContext, UserContext } from '@/components/Context'
import { useEffect } from 'react'
import React, { useState } from "react";
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function Dashboard() {
                                              
  const [user, setUser] = useContext(UserContext)
  const router = useRouter()

  useEffect(()=>{
    console.log(user)
  }, [router.isReady]);


  return (
    <div className={styles.heading}>
      Welcome to BitBear!
    </div>
  )
}