"use client"

import { useActionState } from "react"

// Constants
import {
  FORM_STATUS_PENDING,
  FORM_STATUS_READY,
} from "@constants/form.constants"

// Utils
import { signinWithCredentials } from "@utils/actions/auth"
import { parseErrors } from "./helpers/error.helpers"

// Styles
import styles from "./SigninForm.module.css"

// Components
import {
  InputField,
  PasswordInputField,
  ErrorMessages,
} from "@components/forms"
import { Button } from "@components/buttons"

// Setup
const INITIAL_STATE = {
  data: {
    name: "",
    email: "",
    password: "",
  },
  errors: {
    formErrors: [],
    fieldErrors: {},
  },
}

const SigninForm = () => {
  const [formState, formAction, pending] = useActionState(
    signinWithCredentials,
    INITIAL_STATE
  )

  const { email, password } = formState?.data || {}

  const err = parseErrors(formState.errors)

  return (
    <form className={styles.wrapper} action={formAction}>
      <InputField
        type="email"
        id="email"
        name="email"
        label="E-mail"
        placeholder="jsmith@example.com"
        defaultValue={email}
        required
        errors={err.fieldErrors?.email}
      />

      <PasswordInputField
        type="password"
        id="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        defaultValue={password}
        required
        autoComplete="off"
        errors={err.fieldErrors?.password}
      />

      <Button
        className={styles.submitBtn}
        type="submit"
        variant="primary"
        disabled={pending}
      >
        {pending ? FORM_STATUS_PENDING : FORM_STATUS_READY}
      </Button>

      <ErrorMessages errors={err.formErrors} />
    </form>
  )
}

export default SigninForm
