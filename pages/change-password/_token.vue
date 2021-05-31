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
} from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'
import { gql } from 'graphql-tag'
import { useChangePasswordMutation } from '../../apollo/graphql'
export default defineComponent({
  name: 'ChangePassword',
  layout: 'bare',
  setup() {
    const password = ref('')
    const repeatPassword = ref('')
    gql`
      mutation ChangePassword(
        $token: String!
        $email: String!
        $newPassword: String!
      ) {
        changePassword(
          token: $token
          email: $email
          newPassword: $newPassword
        ) {
          id
        }
      }
    `
    const route = useRoute()
    const token = computed(() => route.value.query.token)
    const email = computed(() => route.value.query.email)
    const {
      mutate: changePassword,
      onDone,
      error,
    } = useChangePasswordMutation(() => ({
      variables: {
        token: token.value,
        email: email.value,
        newPassword: password.value,
      },
    }))
    const router = useRouter()
    onDone(() => {
      router.push('/dashboard')
    })
    return { password, error, changePassword, repeatPassword }
  },
})
</script>
