// Shim for @ark-ui/react/utils which isn't exported as a subpath
// Re-exports the utilities that Park UI components need

import {
  createContext as createReactContext,
  useContext,
} from "react"

export { mergeProps } from "@zag-js/react"

interface CreateContextOptions<T> {
  strict?: boolean
  hookName?: string
  providerName?: string
  errorMessage?: string
  name?: string
  defaultValue?: T
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>]

export function createContext<T>(
  options: CreateContextOptions<T> = {}
): CreateContextReturn<T> {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options

  const Context = createReactContext<T>(defaultValue as T)
  Context.displayName = name

  function useContextHook(): T {
    const context = useContext(Context)
    if (!context && strict) {
      const error = new Error(
        errorMessage ??
          `${hookName} returned \`undefined\`. Seems you forgot to wrap component within ${providerName}`
      )
      error.name = "ContextError"
      Error.captureStackTrace?.(error, useContextHook)
      throw error
    }
    return context
  }

  return [Context.Provider, useContextHook, Context] as CreateContextReturn<T>
}
