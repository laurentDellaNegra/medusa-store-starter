import { css } from "styled-system/css"

interface SignInPromptProps {
  countryCode: string
}

export default function SignInPrompt({ countryCode }: SignInPromptProps) {
  return (
    <div
      className={css({
        bg: "bg.muted",
        p: "4",
        borderRadius: "md",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      <div>
        <p className={css({ fontSize: "sm", fontWeight: "medium" })}>
          Already have an account?
        </p>
        <p className={css({ fontSize: "xs", color: "fg.muted" })}>
          Sign in for a better experience.
        </p>
      </div>
      <a
        href={`/${countryCode}/account`}
        className={css({
          px: "4",
          py: "2",
          borderWidth: "1px",
          borderColor: "border.default",
          borderRadius: "md",
          fontSize: "sm",
          fontWeight: "medium",
          textDecoration: "none",
          color: "fg.default",
          _hover: { bg: "bg.subtle" },
        })}
      >
        Sign in
      </a>
    </div>
  )
}
