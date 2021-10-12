<template>
  <div>
    <Portal to="header">
      <Logo class="mx-auto h-20 w-auto" />
      <h2 class="mt-8 text-center text-5xl font-extrabold text-gray-900">
        Change Password
      </h2>
    </Portal>
    <form @submit.prevent="changePassword">
      <div class="space-y-5">
        <t-input-group label="New Password" variant="important">
          <PasswordInput v-model="password" />
        </t-input-group>
        <t-input-group label="Confirm Password" variant="important">
          <PasswordInput v-model="repeatPassword" />
        </t-input-group>
      </div>
      <div class="py-2">
        <t-button class="w-full" type="submit">Change Password</t-button>
      </div>
    </form>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useRoute,
  computed,
  ref,
} from '@vue/composition-api'
import { useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'

export default defineComponent({
  name: 'ChangePassword',
  layout: 'bare',
  setup() {
    const password = ref('')
    const repeatPassword = ref('')
    const route = useRoute()
    const token = computed(() => route.value.query.token)
    const id = computed(() => route.value.query.id)
    const {
      mutate: changePassword,
      onDone,
      error,
    } = useMutation(
      gql(/* GraphQL */ `
        mutation ChangePassword(
          $token: String!
          $id: ID!
          $newPassword: String!
        ) {
          changePassword(token: $token, id: $id, newPassword: $newPassword) {
            ... on UserReturned {
              user {
                id
              }
            }
            ... on InputValidationProblem {
              problems {
                path
                message
              }
            }
            ... on TokenProblem {
              message
            }
          }
        }
      `),
      () => ({
        variables: {
          token: token.value,
          id: id.value,
          newPassword: password.value,
        },
      })
    )
    const router = useRouter()
    onDone(() => {
      void router.push({ name: 'user-login' })
    })
    return { password, error, changePassword, repeatPassword }
  },
})
</script>
