
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SupportRequest {
  user_id: string;
  request_type: string;
  subject: string;
  message: string;
  user_email?: string;
  user_name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Support email function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { user_id, request_type, subject, message, user_email, user_name }: SupportRequest = await req.json();

    console.log("Processing support request:", { user_id, request_type, subject });

    // Primeiro, salvar no banco de dados
    const { data: supportData, error: dbError } = await supabaseClient
      .from("support_requests")
      .insert([
        {
          user_id,
          request_type,
          subject,
          message,
          status: "pending"
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Erro ao salvar solicitação: ${dbError.message}`);
    }

    console.log("Support request saved to database:", supportData);

    // Simular envio de e-mail (em produção, você usaria um serviço como Resend)
    const emailContent = `
      Nova solicitação de suporte recebida:
      
      Tipo: ${request_type}
      Assunto: ${subject}
      Mensagem: ${message}
      
      Usuário: ${user_name || 'Não informado'} (${user_email || 'Email não disponível'})
      ID do usuário: ${user_id}
      Data/Hora: ${new Date().toLocaleString('pt-BR')}
      ID da solicitação: ${supportData.id}
    `;

    console.log("Email content prepared:", emailContent);

    // Aqui você pode integrar com um serviço de e-mail real
    // Por enquanto, vamos simular o envio
    const emailSent = true; // Simular sucesso

    if (!emailSent) {
      throw new Error("Falha ao enviar e-mail");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Solicitação enviada com sucesso!",
        request_id: supportData.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-support-email function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Erro interno do servidor"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
