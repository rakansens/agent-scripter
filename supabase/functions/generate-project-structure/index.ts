import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    // Example structure generation (in reality, this would use an AI model)
    const structure = {
      name: "Generated Project",
      description: prompt,
      components: [
        {
          name: "components",
          type: "component",
          path: "/src/components",
          description: "Root components directory",
          children: [
            {
              name: "Header.tsx",
              type: "component",
              path: "/src/components/Header.tsx",
              description: "Application header component",
            },
            {
              name: "Footer.tsx",
              type: "component",
              path: "/src/components/Footer.tsx",
              description: "Application footer component",
            },
          ],
        },
        {
          name: "hooks",
          type: "hook",
          path: "/src/hooks",
          description: "Custom hooks directory",
          children: [
            {
              name: "useAuth.ts",
              type: "hook",
              path: "/src/hooks/useAuth.ts",
              description: "Authentication hook",
            },
          ],
        },
      ],
      dependencies: ["react", "typescript", "tailwindcss"],
    }

    return new Response(
      JSON.stringify({ structure }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})