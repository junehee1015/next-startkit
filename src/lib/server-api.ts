import { cookies } from 'next/headers'
import ky from 'ky'

const PREFIX_URL = process.env.NEXT_PUBLIC_PREFIX_URL || '/api'

export const serverApi = ky.create({
  prefix: PREFIX_URL,
  retry: 0,
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
  },
})
