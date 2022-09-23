import { toFormValidator } from '@vee-validate/zod'
import { SubmissionContext, useField, useForm } from 'vee-validate'
import { Ref } from 'vue'
import * as zod from 'zod'

type MaybeRef<T> = Ref<T> | T

// I had to reimpliment this interface as it is not exported by vee-validate
interface FieldOptions<TValue = unknown> {
  initialValue?: MaybeRef<TValue>
  validateOnValueUpdate: boolean
  validateOnMount?: boolean
  bails?: boolean
  type?: string
  valueProp?: MaybeRef<TValue>
  checkedValue?: MaybeRef<TValue>
  uncheckedValue?: MaybeRef<TValue>
  label?: MaybeRef<string | undefined>
  standalone?: boolean
}

// I had to reimpliment this interface as it is not exported by vee-validate
interface FormOptions<TValues extends Record<string, any>> {
  initialValues?: MaybeRef<TValues>
  initialErrors?: Record<keyof TValues, string | undefined>
  initialTouched?: Record<keyof TValues, boolean>
  validateOnMount?: boolean
}

// Essentially taken from https://github.com/logaretm/vee-validate/issues/3375#issuecomment-909407701
// Only change: useField doesn't return a reactive
export function useZodForm<
  Schema extends zod.ZodObject<any>,
  Values extends zod.infer<Schema>
>(schema: Schema, options: Omit<FormOptions<Values>, 'validationSchema'> = {}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const validationSchema = toFormValidator(schema)
  const form = useForm<Values>({
    ...options,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    validationSchema,
  })
  return {
    ...form,
    useField: <Field extends keyof Values, FieldType extends Values[Field]>(
      field: Field,
      opts?: FieldOptions<FieldType>
    ) => useField<FieldType>(field as string, undefined, opts),
    handleSubmit: (
      cb: (values: Values, ctx: SubmissionContext<Values>) => unknown
    ) => form.handleSubmit(cb),
  }
}
