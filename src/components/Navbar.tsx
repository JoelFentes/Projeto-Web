'use client';

import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import Logo from '@/assets/DEVlogo.png';


export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar sx={{ bgcolor: 'secondary.main', width: '100%', height: '80px' }} position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{width: '180px', height: '180px'}}>
          <Image src={Logo} alt="Logo" style={{width: '100%', height: '100%'}} />
        </Box> 
        <Box sx={{ display: 'flex', gap: 5, mr: 10 }}>
          <Button sx={{ color: "text.secondary" }} onClick={() => router.push('/')}>Home</Button>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'text.secondary' }}/>
          <Button sx={{ color: "text.secondary" }} onClick={() => router.push('/')}>Sobre</Button>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'text.secondary' }}/>
          <Button sx={{ color: "text.secondary" }} onClick={() => router.push('/')}>Devs</Button>
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'text.secondary' }}/>
          <Button sx={{ color: "text.secondary" }} onClick={() => router.push('/auth')}>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
