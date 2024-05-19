const decodeUrlString = (str: string) => {
  const decoded = decodeURIComponent(str.replace(/\+/g, '%20'))
  return decoded
}

export default decodeUrlString
