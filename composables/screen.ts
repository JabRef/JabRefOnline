import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export const isSmallDisplay =
  useBreakpoints(breakpointsTailwind).smallerOrEqual('md')
