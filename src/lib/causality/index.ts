import { GraphQLTaggedNode } from 'react-relay'
import { RenderProps, useQuery } from 'relay-hooks'
import { OperationType } from 'relay-runtime'

export async function useCausality<RP extends OperationType>({
  jwt = null,
  query,
  variables = {},
}: {
  jwt: string | null
  query: GraphQLTaggedNode
  variables: object
}): Promise<RenderProps<RP>> {
  if (!jwt) {
    jwt = await getJwt()
  }

  return useQuery(query, variables, {})
}

const getJwt = () => 'foo'
