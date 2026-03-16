import crypto from 'crypto'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body || {}

    const { meetingNumber, role = 0 } = body

    const sdkKey =
      process.env.ZOOM_SDK_KEY || process.env.VITE_ZOOM_SDK_KEY
    const sdkSecret = process.env.ZOOM_SDK_SECRET

    if (!sdkKey) {
      return res.status(500).json({ error: 'Falta ZOOM_SDK_KEY en Vercel.' })
    }

    if (!sdkSecret) {
      return res.status(500).json({ error: 'Falta ZOOM_SDK_SECRET en Vercel.' })
    }

    if (!meetingNumber) {
      return res.status(400).json({ error: 'meetingNumber es requerido.' })
    }

    const iat = Math.floor(Date.now() / 1000) - 30
    const exp = iat + 60 * 60 * 2

    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }

    const payload = {
      sdkKey,
      mn: meetingNumber,
      role,
      iat,
      exp,
      appKey: sdkKey,
      tokenExp: exp
    }

    const base64UrlEncode = (obj) =>
      Buffer.from(JSON.stringify(obj))
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')

    const encodedHeader = base64UrlEncode(header)
    const encodedPayload = base64UrlEncode(payload)
    const message = `${encodedHeader}.${encodedPayload}`

    const signatureHash = crypto
      .createHmac('sha256', sdkSecret)
      .update(message)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

    const signature = `${message}.${signatureHash}`

    return res.status(200).json({ signature })
  } catch (error) {
    console.error('Error generando signature:', error)
    return res.status(500).json({
      error: error?.message || 'No se pudo generar la signature.'
    })
  }
}