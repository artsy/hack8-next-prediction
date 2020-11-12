import useSWR from 'swr'
import { useUser } from './user'

export const metaphysicsFetcher = async (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  variableJSON: string = '{}',
  accessToken?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_METAPHYSICS_URL}/v2`
  const variables = JSON.parse(variableJSON)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    console.log(response)
    throw new Error(response.statusText || response.status.toString())
  }

  const json = await response.json()
  const { data, errors } = json // TODO: errors

  return data
}

export const useMetaphysics = (query: string, variables: object = {}) => {
  const user = useUser()
  const { data, error } = useSWR(
    user ? [query, JSON.stringify(variables), user.accessToken] : null,
    metaphysicsFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
