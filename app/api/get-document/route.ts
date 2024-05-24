export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key') as string

  const paramsObj = {
    objectKey: key,
  }
  const newSearchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/get-bucket-item?' + newSearchParams,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
      //   TODO: enable caching
      next: {
        revalidate: 0,
      },
    }
  )
  return response
}
