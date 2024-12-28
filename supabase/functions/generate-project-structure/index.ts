import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { generateProjectStructure } from './structure.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORSプリフライトリクエストの処理
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    console.log('Generating project structure for prompt:', prompt)

    const structure = generateProjectStructure(prompt);
    
    // 構造が正しく生成されているか確認
    if (!structure || !structure.components || !Array.isArray(structure.components)) {
      throw new Error('Invalid project structure generated');
    }

    // 初期コードの取得を安全に行う
    let initialCode = null;
    try {
      initialCode = structure.components[0]?.children?.[0]?.children?.[0]?.children?.[0]?.code || null;
    } catch (e) {
      console.error('Error accessing initial code:', e);
      initialCode = null;
    }

    return new Response(
      JSON.stringify({ 
        structure,
        currentCode: initialCode
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in generate-project-structure:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
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