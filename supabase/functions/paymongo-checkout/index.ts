import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const PAYMONGO_SECRET_KEY = Deno.env.get('PAYMONGO_SECRET_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const url = new URL(req.url)

  // Route 1: Create Payment Link
  if (url.pathname.endsWith('/create-link')) {
    try {
      const authHeader = req.headers.get('Authorization')!
      if (!authHeader) throw new Error('Missing Authorization header')
      
      const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      if (userError || !user) throw new Error('Unauthorized')

      const response = await fetch('https://api.paymongo.com/v1/links', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Basic ${btoa(PAYMONGO_SECRET_KEY)}`
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount: 10000, // ₱100.00 in centavos
              description: 'TipidMoto Legit Partner Setup',
              remarks: user.id 
            }
          }
        })
      })

      const paymentData = await response.json()
      if (!paymentData.data || !paymentData.data.attributes) {
        throw new Error('Failed to create payment link: ' + JSON.stringify(paymentData))
      }

      return new Response(JSON.stringify({ checkoutUrl: paymentData.data.attributes.checkout_url }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders })
    }
  }

  // Route 2: PayMongo Webhook Callback
  if (url.pathname.endsWith('/webhook')) {
    try {
      const body = await req.json()
      const event = body.data.attributes

      if (event.type === 'link.payment.success') {
        const userId = event.data.attributes.remarks // Stored user ID earlier
        
        // Upgrade user to Legit Partner
        const { error } = await supabase
          .from('profiles')
          .update({ 
            is_legit_partner: true, 
            legit_partner_until: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
          })
          .eq('id', userId)

        if (error) throw error
      }

      return new Response('Webhook received', { status: 200 })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
  }

  return new Response('Not found', { status: 404 })
})
