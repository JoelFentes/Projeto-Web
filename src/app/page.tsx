'use client';

import { Box, Typography, Button, Divider, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import AboutSVG from '@/assets/aboutHome.svg';
import DevSVG from '@/assets/websiteHome.svg';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import PortfolioCard from '@/components/PorfolioCard';

interface Portfolio {
  id: string;
  bio: string;
  name: string;
  stacks: string[];
  techList: string[];
  projectImage: string;
}


export default function HomePage() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setPortfolios(data.portfolios);
      } catch (error) {
        console.error('Erro ao buscar portfólios:', error);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflowX: 'hidden',
      }}
    >
      <Navbar />

      <Box
        sx={{
          width: '100%',
          maxWidth: '100vw',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* Primeira seção */}
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            px: 4,
            boxSizing: 'border-box',
          }}
        >
          <Box id="home" sx={{ gap: 2, display: 'flex', flexDirection: 'column', pb: 8, maxWidth: '600px' }}>
            <Typography variant="h2" fontWeight="bold" color="text.primary">
              Bem-vindo ao <br />DevPortfolio!
            </Typography>
            <Typography variant="body2" color="text.primary">
              Um mundo para compartilhar seus projetos, habilidades e experiências.
            </Typography>

            {!user ? (
              <Link href="/auth" passHref>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    width: '100%',
                    bgcolor: 'text.primary',
                    color: 'background.default',
                    fontWeight: 'light',
                    '&:hover': { bgcolor: 'secondary.main' },
                  }}
                >
                  Começar
                </Button>
              </Link>
            ) : (
              <Link href="/createPortfolio" passHref>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    height: '50px',
                    width: '100%',
                    bgcolor: 'secondary.main',
                    color: 'background.default',
                    fontWeight: 'light',
                    '&:hover': { bgcolor: 'text.primary' },
                  }}
                >
                  Criar seu Portfólio
                </Button>
              </Link>
            )}
          </Box>

          <Box sx={{ width: { xs: '100%', md: '35%' }, maxWidth: '500px', mt: { xs: 4, md: 0 } }}>
            <Image
              src={DevSVG}
              alt="Developer Illustration"
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </Box>
        </Box>

        <Divider sx={{ width: '80%', mx: 'auto', bgcolor: '#202020' }} />

        {/* Segunda seção: Sobre */}
        <Box
          id="sobre"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            px: 4,
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '35%' }, maxWidth: '500px', mt: { xs: 4, md: 0 } }}>
            <Image
              src={AboutSVG}
              alt="About Illustration"
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              maxWidth: '500px',
            }}
          >
            <Typography variant="h2" color="text.primary" fontWeight="bold">
              Sobre
            </Typography>
            <Typography variant="h6" fontSize={19} color="text.primary" textAlign="center">
              O DevPortfolio é uma plataforma para desenvolvedores exibirem seus projetos, habilidades e experiências.
              Ideal para quem deseja criar uma vitrine profissional online e ser notado no mercado.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ width: '80%', mx: 'auto', bgcolor: '#202020' }} />

        {/* Terceira seção: Devs */}
        <Box
          id="devs"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
            py: 8,
            gap: 2,
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h3" color="text.primary" fontWeight="bold">
            Devs em Destaque
          </Typography>
          <Typography variant="h6" color="text.primary" maxWidth="600px" textAlign="center">
            Explore os perfis de desenvolvedores talentosos, veja seus projetos, e inspire-se para criar o seu próprio portfólio.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
              mt: 4,
            }}
          >
            {portfolios.slice(0, 3).map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </Box>
        </Box>


        {/* Quarta seção: Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
            bgcolor: 'secondary.main',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 DevPortfolio. Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}