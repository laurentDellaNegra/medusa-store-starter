import { useState } from "react"
import { css } from "styled-system/css"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function LoginRegister() {
  const [view, setView] = useState<"login" | "register">("login")

  return (
    <div className={css({ display: "flex", justifyContent: "center", py: "12", px: "4" })}>
      {view === "login" ? (
        <LoginForm onSwitch={() => setView("register")} />
      ) : (
        <RegisterForm onSwitch={() => setView("login")} />
      )}
    </div>
  )
}
