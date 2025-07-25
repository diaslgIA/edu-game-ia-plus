
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SupportRequest {
  tipo_solicitacao: string;
  assunto: string;
  mensagem: string;
  usuario_email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { tipo_solicitacao, assunto, mensagem, usuario_email }: SupportRequest = await req.json();

    // Salvar no banco de dados primeiro
    const { data, error: dbError } = await supabaseClient
      .from('suporte_duvidas')
      .insert([
        {
          tipo_solicitacao,
          assunto,
          mensagem,
          usuario_email,
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar solicitação no banco de dados' }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Tentar enviar e-mail (se falhar, ainda teremos salvo no banco)
    try {
      const typeLabels = {
        'question': 'Dúvida',
        'bug': 'Problema técnico',
        'suggestion': 'Sugestão',
        'other': 'Outro'
      };

      const emailResponse = await resend.emails.send({
        from: "EduGame Support <onboarding@resend.dev>",
        to: ["iaedugame@gmail.com"],
        subject: `Nova solicitação de suporte: ${assunto}`,
        html: `
          <h2>Nova solicitação de suporte recebida</h2>
          <p><strong>Tipo:</strong> ${typeLabels[tipo_solicitacao as keyof typeof typeLabels] || tipo_solicitacao}</p>
          <p><strong>Assunto:</strong> ${assunto}</p>
          <p><strong>E-mail do usuário:</strong> ${usuario_email}</p>
          <p><strong>Mensagem:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${mensagem.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          <hr>
          <p><em>Esta mensagem foi enviada automaticamente pelo sistema EduGame.</em></p>
        `,
      });

      console.log("Email enviado com sucesso:", emailResponse);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail (mas dados salvos no banco):", emailError);
      // Não retornamos erro aqui porque os dados foram salvos no banco
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Solicitação enviada com sucesso!',
        data 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Erro geral na função:", error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
