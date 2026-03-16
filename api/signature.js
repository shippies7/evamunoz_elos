const crypto = require('crypto')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { meetingNumber, role } = req.body

    const sdkKey = process.env.VITE_ZOOM_SDK_KEY
    const sdkSecret = process.env.ZOOM_SDK_SECRET

    if (!sdkKey || !sdkSecret) {
      return res.status(500).json({ error: 'Faltan credenciales de Zoom en el servidor.' })
    }

    if (!meetingNumber && meetingNumber !== 0) {
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
      role: role ?? 0,
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

    const signatureBase = `${encodedHeader}.${encodedPayload}`

    const hash = crypto
      .createHmac('sha256', sdkSecret)
      .update(signatureBase)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')

    const signature = `${signatureBase}.${hash}`

    return res.status(200).json({ signature })
  } catch (error) {
    console.error('Error generando signature:', error)
    return res.status(500).json({ error: 'No se pudo generar la signature.' })
  }
}
