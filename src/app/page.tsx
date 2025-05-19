'use client';


import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import DevSVG from '@/assets/websiteHome.svg';
import { useAuth } from './context/AuthContext'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function HomePage() {
  const { user } = useAuth(); 

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
            <Typography variant="body2" color="text.primary">
              
            </Typography>
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
            Sobre
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="800px" textAlign="center">
            O DevPortfolio é uma plataforma para desenvolvedores exibirem seus projetos, habilidades e experiências.
            Ideal para quem deseja criar uma vitrine profissional online e ser notado no mercado.
          </Typography>
        </Box>

        {/* Divider */}
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
          <Typography variant="body1" color="text.secondary" maxWidth="800px" textAlign="center">
            Explore os perfis de desenvolvedores talentosos, veja seus projetos, e inspire-se para criar o seu próprio portfólio.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}