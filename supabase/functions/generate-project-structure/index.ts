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
    console.log('Generating project structure for prompt:', prompt)

    // より詳細なプロジェクト構造を生成
    const structure = {
      name: "Generated React Project",
      description: prompt,
      components: [
        {
          name: "src",
          type: "directory",
          path: "/src",
          description: "Source code directory",
          children: [
            {
              name: "components",
              type: "directory",
              path: "/src/components",
              description: "Reusable components",
              children: [
                {
                  name: "layout",
                  type: "directory",
                  path: "/src/components/layout",
                  description: "Layout components",
                  children: [
                    {
                      name: "Header.tsx",
                      type: "component",
                      path: "/src/components/layout/Header.tsx",
                      description: "Main header component",
                    },
                    {
                      name: "Footer.tsx",
                      type: "component",
                      path: "/src/components/layout/Footer.tsx",
                      description: "Main footer component",
                    },
                    {
                      name: "Layout.tsx",
                      type: "component",
                      path: "/src/components/layout/Layout.tsx",
                      description: "Main layout wrapper",
                    }
                  ]
                },
                {
                  name: "ui",
                  type: "directory",
                  path: "/src/components/ui",
                  description: "UI components",
                  children: [
                    {
                      name: "Button.tsx",
                      type: "component",
                      path: "/src/components/ui/Button.tsx",
                      description: "Custom button component",
                    },
                    {
                      name: "Card.tsx",
                      type: "component",
                      path: "/src/components/ui/Card.tsx",
                      description: "Card component",
                    }
                  ]
                }
              ]
            },
            {
              name: "hooks",
              type: "directory",
              path: "/src/hooks",
              description: "Custom React hooks",
              children: [
                {
                  name: "useAuth.ts",
                  type: "hook",
                  path: "/src/hooks/useAuth.ts",
                  description: "Authentication hook",
                },
                {
                  name: "useForm.ts",
                  type: "hook",
                  path: "/src/hooks/useForm.ts",
                  description: "Form handling hook",
                }
              ]
            },
            {
              name: "pages",
              type: "directory",
              path: "/src/pages",
              description: "Page components",
              children: [
                {
                  name: "Home.tsx",
                  type: "component",
                  path: "/src/pages/Home.tsx",
                  description: "Home page",
                },
                {
                  name: "About.tsx",
                  type: "component",
                  path: "/src/pages/About.tsx",
                  description: "About page",
                }
              ]
            },
            {
              name: "utils",
              type: "directory",
              path: "/src/utils",
              description: "Utility functions",
              children: [
                {
                  name: "api.ts",
                  type: "utility",
                  path: "/src/utils/api.ts",
                  description: "API utilities",
                },
                {
                  name: "validation.ts",
                  type: "utility",
                  path: "/src/utils/validation.ts",
                  description: "Validation utilities",
                }
              ]
            }
          ]
        }
      ],
      dependencies: [
        "react",
        "react-dom",
        "react-router-dom",
        "typescript",
        "tailwindcss",
        "@tanstack/react-query",
        "lucide-react",
        "clsx",
        "class-variance-authority"
      ]
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