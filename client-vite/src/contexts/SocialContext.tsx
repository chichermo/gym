import React, { createContext, useContext, useState } from 'react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  content: string;
  likes: number;
  comments: number;
  time: string;
  liked: boolean;
}

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  avatar: string;
  available: boolean;
  price: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  reward: string;
  joined: boolean;
}

interface SocialContextType {
  posts: Post[];
  mentors: Mentor[];
  challenges: Challenge[];
  createPost: (content: string) => void;
  likePost: (id: string) => void;
  joinChallenge: (id: string) => void;
  bookMentor: (id: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

interface SocialProviderProps {
  children: React.ReactNode;
}

export const SocialProvider: React.FC<SocialProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'María García',
        avatar: 'M',
        level: 'Avanzado'
      },
      content: '¡Completé mi primera maratón! Gracias a todos por el apoyo durante el entrenamiento. 💪',
      likes: 24,
      comments: 8,
      time: '2 horas',
      liked: false
    },
    {
      id: '2',
      user: {
        name: 'Carlos López',
        avatar: 'C',
        level: 'Intermedio'
      },
      content: '¿Alguien tiene recomendaciones para mejorar en press de banca? Estoy estancado en 80kg.',
      likes: 12,
      comments: 15,
      time: '5 horas',
      liked: false
    },
    {
      id: '3',
      user: {
        name: 'Ana Rodríguez',
        avatar: 'A',
        level: 'Principiante'
      },
      content: 'Empezando mi viaje fitness hoy. ¡Cualquier consejo es bienvenido! 🏃‍♀️',
      likes: 31,
      comments: 22,
      time: '1 día',
      liked: false
    }
  ]);

  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Dr. Roberto Silva',
      specialty: 'Nutrición Deportiva',
      rating: 4.9,
      experience: '8 años',
      avatar: 'R',
      available: true,
      price: 50
    },
    {
      id: '2',
      name: 'Lic. Patricia Morales',
      specialty: 'Entrenamiento Funcional',
      rating: 4.8,
      experience: '5 años',
      avatar: 'P',
      available: true,
      price: 40
    },
    {
      id: '3',
      name: 'Coach Miguel Torres',
      specialty: 'Powerlifting',
      rating: 4.7,
      experience: '10 años',
      avatar: 'M',
      available: false,
      price: 60
    }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Desafío 30 Días',
      description: '30 días de entrenamiento consecutivo',
      participants: 156,
      daysLeft: 12,
      reward: '500 XP + Insignia',
      joined: false
    },
    {
      id: '2',
      title: 'Reto Cardio',
      description: 'Completar 100km de cardio este mes',
      participants: 89,
      daysLeft: 8,
      reward: '300 XP + Trofeo',
      joined: true
    },
    {
      id: '3',
      title: 'Fuerza Máxima',
      description: 'Aumentar 1RM en press de banca',
      participants: 203,
      daysLeft: 15,
      reward: '800 XP + Medalla',
      joined: false
    }
  ]);

  const createPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: {
        name: 'Tú',
        avatar: 'T',
        level: 'Intermedio'
      },
      content,
      likes: 0,
      comments: 0,
      time: 'Ahora',
      liked: false
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const likePost = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const joinChallenge = (id: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === id) {
        return {
          ...challenge,
          joined: !challenge.joined,
          participants: challenge.joined ? challenge.participants - 1 : challenge.participants + 1
        };
      }
      return challenge;
    }));
  };

  const bookMentor = (id: string) => {
    console.log(`Reservando sesión con mentor ${id}`);
    // Aquí se implementaría la lógica de reserva
  };

  const value: SocialContextType = {
    posts,
    mentors,
    challenges,
    createPost,
    likePost,
    joinChallenge,
    bookMentor
  };

  return (
    <SocialContext.Provider value={value}>
      {children}
    </SocialContext.Provider>
  );
}; 