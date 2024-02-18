import React, { type ReactNode } from 'react'
import { useForm, FormProvider, type FieldValues, type SubmitHandler } from 'react-hook-form'

interface Props<T extends FieldValues> {
  children: ReactNode
  onSubmit: SubmitHandler<T>
}
function Form<T extends object>({ children, onSubmit }: Props<T>) {
  const methods = useForm<T>()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      <input type='submit' />
    </FormProvider>
  )
}

Form.whyDidYouRender = true
export default Form
