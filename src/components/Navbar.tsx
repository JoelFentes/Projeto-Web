'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Divider, IconButton, Avatar, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/DEVlogo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '@/app/context/AuthContext';
import { AccountCircle, PersonAdd, Settings, Logout } from '@mui/icons-material';

interface Portfolio {
  id: string;
  name: string;
  bio: string;
  stacks: string[];
  techList: string[];
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  projectPreviewImageUrl?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  followers?: number;
  following?: number;
  likes?: number;
  projectLikes?: number;
  projectViews?: number;
  projectImage?: string;
  user?: {
    profilePicture?: string;
  };
}


export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const params = useParams();
  const id = params.id as string;

  const [userData, setUserData] = useState<{ profilePicture?: string; name?: string } | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const json = await res.json();
          setUserData(json.user);
        }
      } catch (err) {
        console.error('Erro ao buscar perfil', err);
      }
    }
    fetchUserProfile();
  }, []);



  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);


  useEffect(() => {
    if (!id) return;

    async function fetchPortfolio() {

      try {
        const res = await fetch(`/api/portfolio/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar os detalhes do desenvolvedor');
        const data = await res.json();
        setPortfolio(data.portfolio);
      } catch (err) {
      } finally {

      }
    }

    fetchPortfolio();
  }, [id]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: { currentTarget: SetStateAction<null>; }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AppBar sx={{ bgcolor: 'secondary.main', width: '100%', height: '80px' }} position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ width: '180px', height: '180px' }}>
          <Image src={Logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 5, mr: 10, alignItems: 'center' }}>
          <Button sx={{ color: "text.secondary" }} component="a" href="/">Home</Button>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'text.secondary' }} />
          <Button sx={{ color: "text.secondary" }} component="a" href="/#sobre">Sobre</Button>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'text.secondary' }} />
          <Button sx={{ color: "text.secondary" }} component="a" href="/#devs">Devs</Button>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'text.secondary' }} />

          {!user ? (
            <Button
              sx={{ color: "text.secondary" }}
              onClick={() => {
                router.push('/auth');
              }}
            >
              Login
            </Button>
          ) : (
            <>
              {portfolio?.user?.profilePicture ? (
                <Box
                  component="img"
                  src={portfolio.user.profilePicture}
                  alt={`Foto de ${portfolio.name}`}
                />
              ) : (
                <AccountCircleIcon
                  fontSize="large"
                  onClick={handleMenuOpen}
                  aria-label="Perfil do usuário"
                  sx={{ cursor: 'pointer' }}
                />
              )}


              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    bgcolor: 'text.secondary', // ash-gray
                    color: 'text.primary',      // black-olive
                    minWidth: 150,
                    '& .MuiDivider-root': {
                      borderColor: 'secondary.main' // lion
                    }
                  }
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push('/profile');
                  }}
                  sx={{
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'text.secondary'
                    }
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle fontSize="small" sx={{ color: 'text.primary' }} />
                  </ListItemIcon>
                  Minha conta
                </MenuItem>

                <Divider />


                <MenuItem
                  onClick={handleClose}
                  sx={{
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'text.secondary'
                    }
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" sx={{ color: 'text.primary' }} />
                  </ListItemIcon>
                  Configurações
                </MenuItem>

                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'text.secondary'
                    }
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: 'text.primary' }} />
                  </ListItemIcon>
                  Sair
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
