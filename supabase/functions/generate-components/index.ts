import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const generateComponentContent = (name: string, type: string) => {
  switch (type) {
    case 'layout':
      return `import React from 'react';
import { cn } from '@/lib/utils';

interface ${name}Props {
  children?: React.ReactNode;
  className?: string;
}

const ${name}: React.FC<${name}Props> = ({ children, className }) => {
  return (
    <div className={cn('w-full', className)}>
      {children}
    </div>
  );
};

export default ${name};`;

    case 'page':
      return `import React from 'react';
import { Layout } from '@/components/layout/Layout';

const ${name}: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">${name}</h1>
        {/* Add your page content here */}
      </div>
    </Layout>
  );
};

export default ${name};`;

    case 'hook':
      return `import { useState, useCallback } from 'react';

export const ${name} = () => {
  const [state, setState] = useState(null);

  const handleChange = useCallback((value: any) => {
    setState(value);
  }, []);

  return {
    state,
    handleChange,
  };
};`;

    case 'utility':
      return `export const ${name} = {
  // Add your utility functions here
  example: () => {
    return 'example';
  },
};`;

    default:
      return `import React from 'react';

interface ${name}Props {
  // Add your props here
}

const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div>
      {/* Add your component content here */}
    </div>
  );
};

export default ${name};`;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { structure } = await req.json()
    console.log('Generating components for structure:', structure)

    const components: any[] = [];

    const processComponent = (component: any) => {
      if (component.type === 'component' || component.type === 'hook' || component.type === 'utility') {
        const name = component.name.replace(/\.[^/.]+$/, "");
        const type = component.path.includes('/layout/') ? 'layout' :
                    component.path.includes('/pages/') ? 'page' :
                    component.type;
        
        components.push({
          path: component.path,
          content: generateComponentContent(name, type),
        });
      }

      if (component.children) {
        component.children.forEach(processComponent);
      }
    };

    structure.components.forEach(processComponent);

    return new Response(
      JSON.stringify({ components }),
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