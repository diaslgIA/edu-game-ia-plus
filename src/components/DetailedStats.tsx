
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Trophy, Target, Clock, TrendingUp, BookOpen, Star } from 'lucide-react';

interface DetailedStatsProps {
  userProgress: any[];
  quizScores: any[];
}

const DetailedStats: React.FC<DetailedStatsProps> = ({ userProgress, quizScores }) => {
  // Dados mockados para exemplo
  const subjectData = [
    { subject: 'Matemática', score: 85, time: 120, questions: 45 },
    { subject: 'Português', score: 92, time: 90, questions: 52 },
    { subject: 'Física', score: 78, time: 150, questions: 38 },
    { subject: 'Química', score: 88, time: 110, questions: 41 },
    { subject: 'Biologia', score: 94, time: 80, questions: 47 }
  ];

  const progressData = [
    { month: 'Jan', score: 65 },
    { month: 'Fev', score: 72 },
    { month: 'Mar', score: 78 },
    { month: 'Abr', score: 85 },
    { month: 'Mai', score: 90 },
    { month: 'Jun', score: 88 }
  ];

  const timeSpentData = [
    { day: 'Seg', hours: 2.5 },
    { day: 'Ter', hours: 3.2 },
    { day: 'Qua', hours: 1.8 },
    { day: 'Qui', hours: 4.1 },
    { day: 'Sex', hours: 2.9 },
    { day: 'Sáb', hours: 5.2 },
    { day: 'Dom', hours: 3.7 }
  ];

  const difficultyData = [
    { name: 'Fácil', value: 35, color: '#10B981' },
    { name: 'Médio', value: 45, color: '#F59E0B' },
    { name: 'Difícil', value: 20, color: '#EF4444' }
  ];

  const totalScore = subjectData.reduce((sum, item) => sum + item.score, 0);
  const averageScore = Math.round(totalScore / subjectData.length);
  const totalTime = subjectData.reduce((sum, item) => sum + item.time, 0);
  const totalQuestions = subjectData.reduce((sum, item) => sum + item.questions, 0);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-500" size={20} />
              <div>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <div className="text-xs text-gray-600">Média Geral</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="text-blue-500" size={20} />
              <div>
                <div className="text-2xl font-bold">{totalQuestions}</div>
                <div className="text-xs text-gray-600">Questões</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="text-green-500" size={20} />
              <div>
                <div className="text-2xl font-bold">{Math.round(totalTime / 60)}h</div>
                <div className="text-xs text-gray-600">Tempo Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-purple-500" size={20} />
              <div>
                <div className="text-2xl font-bold">+15%</div>
                <div className="text-xs text-gray-600">Melhoria</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance por Matéria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} />
              Performance por Matéria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Evolução Temporal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Evolução dos Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tempo de Estudo Semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Tempo de Estudo Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição de Dificuldade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star size={20} />
              Distribuição de Dificuldade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detalhes por Matéria */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes por Matéria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectData.map((subject, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{subject.subject}</h4>
                  <span className="text-2xl font-bold text-blue-600">{subject.score}%</span>
                </div>
                <Progress value={subject.score} className="h-2 mb-2" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{subject.questions} questões</span>
                  <span>{Math.round(subject.time / 60)} min estudados</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedStats;
