import { NextApiRequest, NextApiResponse } from 'next'
import { UserSessionData } from '../../lib/auth/user'
import { getTokenCookie } from '../../lib/auth/cookies'
import { decryptSession } from '../../lib/auth/session-encryption'

export default async function causalityGraphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = getTokenCookie(req)
  const session: UserSessionData = cookie && (await decryptSession(cookie))

  const { query, variables = {} } = req.body
  console.log(variables)
  const { saleId } = variables
  let jwt = 'badjwt'
  let response = {}

  if (!saleId) {
    return res.status(400).json({ error: 'saleId variable required' })
  }

  // we need an anonymous causality jwt or we can't show this
  if (!session?.accessToken) {
    return res
      .status(400)
      .json({ error: 'you must be logged in to see auction state' })
  }

  // fetch user jwt from metaphysics v1
  try {
    console.log('fetching jwt...')
    const metaphysicsRes = await fetch(
      `${process.env.NEXT_PUBLIC_METAPHYSICS_URL}`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-access-token': session.accessToken,
        },
        body: JSON.stringify({
          query: `{ jwt: causality_jwt(sale_id: "${saleId}", role: PARTICIPANT) }`,
        }),
      }
    )
    const jwtRes = await metaphysicsRes.json()
    if (jwtRes.errors) {
      console.error(jwtRes.errors)
    }
    console.warn({ jwtRes })
    jwt = jwtRes.data.jwt
  } catch (e) {
    console.error('metaphysics jwt fetching error', e)
    res.status(569)
  }

  try {
    console.log('calling causality ...')
    const causalityRes = await fetch(
      `${process.env.NEXT_PUBLIC_CAUSALITY_URL}/graphql`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          query,
          // hack: shove userId in from session
          variables: { ...variables, userId: session.userId },
        }),
      }
    )
    response = await causalityRes.json()
  } catch (e) {
    console.error('causality fetching error', e)
    res.status(569)
  }

  res.status(200).json(response)
}
