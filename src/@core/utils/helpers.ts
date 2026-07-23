// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = (date: Date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  )
}

export const canUserAccess = (val: string) => {
  const permissions = localStorage.getItem('permissions')
  if (!permissions) return false
  const user_permissions = permissions.split(',')
  return user_permissions.includes(val)
} 

// 👉 Slug
export const slugify = (slug:string) => {
  
  return slug.toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');

} 

export const commaFormate = (num: number) => {
  return (
      Number(num)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  );
}

