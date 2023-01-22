// remove all IDs from the given object recursively
type OmitRecursively<T, K extends PropertyKey> = T extends any[]
  ? OmitRecursively<T[number], K>[]
  : T extends object
  ? { [P in Exclude<keyof T, K>]: OmitRecursively<T[P], K> }
  : T

export function removeIds<T>(obj: T): OmitRecursively<T, 'id'> {
  if (Array.isArray(obj)) {
    return obj.map(removeIds) as unknown as OmitRecursively<T, 'id'>
  } else if (obj instanceof Date) {
    return obj as unknown as OmitRecursively<T, 'id'>
  } else if (typeof obj === 'object' && obj !== null) {
    const result = { ...obj }
    // @ts-expect-error: hard to type this properly
    delete result.id
    for (const key in result) {
      // @ts-expect-error: hard to type this properly
      result[key] = removeIds(result[key])
    }
    return result as unknown as OmitRecursively<T, 'id'>
  } else {
    return obj as unknown as OmitRecursively<T, 'id'>
  }
}
