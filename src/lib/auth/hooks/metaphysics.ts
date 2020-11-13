import useSWR from 'swr'
import { useUser } from './user'

export const metaphysicsFetcher = async ({
  query,
  variables = {},
  accessToken,
  xappToken,
}: {
  query: string
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  variables: object
  accessToken?: string
  xappToken?: string
}) => {
  const url = `${process.env.NEXT_PUBLIC_METAPHYSICS_URL}/v2`
  // console.log({ variables, xappToken })

  const headers = {
    'Content-Type': 'application/json',
  }
  if (accessToken) {
    headers['X-Access-Token'] = accessToken
  }
  if (accessToken) {
    headers['X-xapp-Token'] = xappToken
  }
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(response.statusText || response.status.toString())
  }

  const json = await response.json()
  const { data, errors } = json // TODO: errors
  if (errors) {
    // console.error(errors)
    throw new Error(JSON.stringify(errors))
  }
  return data
}

export const useMetaphysics = ({
  query,
  variables = {},
}: {
  query: string
  variables: object
}) => {
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
