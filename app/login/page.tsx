"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // SignIn from next-auth
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      console.log(result.error)
    } else {
      router.push("/")
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        {/* Below is for provider directly matches with we define provider */}
        {/* <button onClick={() => signIn("google")}>Sign in with Google</button> */}
        Dont have an account?
        <button onClick={() => router.push("/register")}>Register</button>
      </div>
    </div>
  )
}

export default LoginPage
