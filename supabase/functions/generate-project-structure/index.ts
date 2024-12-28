import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
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
                      code: `
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Generated Project
        </h1>
      </div>
    </header>
  );
};

export default Header;`,
                      language: "typescript"
                    },
                    {
                      name: "Footer.tsx",
                      type: "component",
                      path: "/src/components/layout/Footer.tsx",
                      description: "Main footer component",
                      code: `
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300">
          Generated with Lovable
        </p>
      </div>
    </footer>
  );
};

export default Footer;`,
                      language: "typescript"
                    },
                    {
                      name: "Layout.tsx",
                      type: "component",
                      path: "/src/components/layout/Layout.tsx",
                      description: "Main layout wrapper",
                      code: `
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;`,
                      language: "typescript"
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
                      code: `
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`,
                      language: "typescript"
                    },
                    {
                      name: "Card.tsx",
                      type: "component",
                      path: "/src/components/ui/Card.tsx",
                      description: "Card component",
                      code: `
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-md p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;`,
                      language: "typescript"
                    }
                  ]
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
      JSON.stringify({ 
        structure,
        currentCode: structure.components[0].children[0].children[0].children[0].code 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})