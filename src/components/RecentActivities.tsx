
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserActivities } from "@/hooks/useUserActivities";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookOpen, Trophy, Clock } from "lucide-react";

export const RecentActivities = () => {
  const { activities, isLoading } = useUserActivities();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Nenhuma atividade realizada ainda.
              <br />
              Complete um quiz para ver suas atividades aqui!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'quiz_complete':
        return <Trophy className="h-4 w-4" />;
      case 'quiz_question':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getActivityDescription = (activity: any) => {
    if (activity.activity_type === 'quiz_complete') {
      const accuracy = activity.metadata?.accuracy || 0;
      return `Quiz completo - ${accuracy.toFixed(0)}% de acertos`;
    }
    if (activity.activity_type === 'quiz_question') {
      return activity.is_correct ? 'Questão respondida corretamente' : 'Questão respondida incorretamente';
    }
    return 'Atividade realizada';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-shrink-0">
                {getActivityIcon(activity.activity_type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {activity.subject}
                  </Badge>
                  {activity.topic && (
                    <span className="text-xs text-muted-foreground">
                      {activity.topic}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {getActivityDescription(activity)}
                </p>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.created_at), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </span>
                  
                  {activity.points_earned > 0 && (
                    <Badge variant="default" className="text-xs">
                      +{activity.points_earned} pts
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
