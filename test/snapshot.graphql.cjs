// Convert to ts esm module as soon as https://github.com/facebook/jest/pull/12014 is released

// Minimize snapshot of GraphQL responses (no extensions and http field)
module.exports = {
  test(value) {
    return value != null && value.http !== undefined
  },
  serialize(value, config, indentation, depth, refs, printer) {
    const { data, errors } = value
    return printer(
      {
        ...(data !== undefined && {
          data,
        }),
        ...(errors !== undefined && {
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
