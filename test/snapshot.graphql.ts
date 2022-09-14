// Minimize snapshot of GraphQL responses (no extensions and http field)
// https://vitest.dev/guide/snapshot.html#custom-serializer
export const GraphqlSerializer = {
  test(value: any): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return value != null && value.http !== undefined
  },
  serialize(
    value: any,
    config: any,
    indentation: any,
    depth: any,
    refs: any,
    printer: any
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, errors } = value
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return printer(
      {
        ...(data !== undefined && {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data,
        }),
        ...(errors !== undefined && {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors,
        }),
      },
      config,
      indentation,
      depth,
      refs
    )
  },
}
