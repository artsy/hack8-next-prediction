import { NextApiRequest, NextApiResponse } from 'next'
import { UserSessionData } from '../../lib/auth/user'
import { getTokenCookie } from '../../lib/auth/cookies'
import { decryptSession } from '../../lib/auth/session-encryption'
import { metaphysicsFetcher } from 'lib/metaphysics'

export default async function causalityGraphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = getTokenCookie(req)
  const session: UserSessionData = cookie && (await decryptSession(cookie))

  const { query, variables = {} } = req.body

  let response = {}
  try {
    // we need an anonymous causality jwt or we can't show this
    if (!variables?.saleId) {
      throw new Error('missing saleId')
    }
    if (!session?.accessToken) {
      throw new Error('you must be logged in to see auction state')
    }
    const causalityJwt = await getCausalityJwt({
      accessToken: session.accessToken,
      saleId: variables.saleId,
    })

    const causalityRes = await fetch(
      `${process.env.NEXT_PUBLIC_CAUSALITY_URL}/graphql`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${causalityJwt}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    )
    response = await causalityRes.json()

    return res.status(200).json(response)
  } catch (e) {
    console.error('causality fetching error', e)
    return res.status(200).json({ data: null, errors: [JSON.stringify(e)] })
  }
}

const getCausalityJwt = async ({
  accessToken,
  saleId = 'ipcny-benefit-auction-2020',
}: {
  accessToken: string
  saleId?: string
}): Promise<string | null | undefined> => {
  try {
    const metaphysicsRes = await metaphysicsFetcher({
      accessToken,
      xappToken: process.env.NEXT_PUBLIC_ARTSY_XAPP_TOKEN,
      v1: true,
      // v1 causality_jwt requires a sale_id even though we
      query: `{ jwt: causality_jwt(sale_id: "${saleId}", role: PARTICIPANT) }`,
      variables: {},
    })
    return metaphysicsRes?.jwt
  } catch (e) {
    console.error('metaphysics jwt fetching error', e)
  }
  return null
}
