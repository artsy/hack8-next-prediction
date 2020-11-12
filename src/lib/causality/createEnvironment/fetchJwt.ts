import { metaphysicsFetcher } from 'lib/auth/hooks/metaphysics'

export const fetchJwt = (): Promise<string> =>
  metaphysicsFetcher(
    `
     query client_JwtQuery {
       causalityJwt
     }
   `
  ).then((res) => res.data.causalityJwt)
