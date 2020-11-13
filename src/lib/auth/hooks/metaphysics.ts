import { metaphysicsFetcher } from 'lib/metaphysics'
import useSWR from 'swr'
import { useUser } from './user'

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
