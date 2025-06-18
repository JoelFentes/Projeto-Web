'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
    Box,
    TextField,
    Button,
    Avatar,
    Typography,
    CircularProgress,
} from '@mui/material';

interface PortfolioData {
    name: string;             // user.name
    bio: string;              // portfolio.bio
    email: string;            // portfolio.email
    profilePicture?: string;  // user.profilePicture (base64 ou url)
    github?: string;
    linkedin?: string;
    website?: string;
}

export default function ProfilePage() {
    const [data, setData] = useState<PortfolioData>({
        name: '',
        bio: '',
        email: '',
        profilePicture: '',
        github: '',
        linkedin: '',
        website: '',
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const userRes = await fetch('/api/user/profile');
                if (!userRes.ok) throw new Error('Erro ao buscar usuário');
                const userJson = await userRes.json();

                const portfolioRes = await fetch('/api/portfolio', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: data.name,
                        bio: data.bio,
                        email: data.email,
                        github: data.github,
                        linkedin: data.linkedin,
                        website: data.website,
                    }),
                });
                const portfolioJson = await portfolioRes.json();
                const portfolio = portfolioJson.portfolios?.[0];

                setData({
                    name: userJson.user?.name || '',
                    bio: portfolio?.bio || '',
                    email: userJson.user?.email || '',
                    profilePicture: userJson.user?.profilePicture || '',
                    github: portfolio?.github || '',
                    linkedin: portfolio?.linkedin || '',
                    website: portfolio?.website || '',
                });

                setPreview(userJson.user?.profilePicture || null);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        }
        fetchData();
    }, []);


    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        const reader = new FileReader();
        reader.onloadend = () => {
            setData({ ...data, profilePicture: reader.result as string });
        };
        reader.readAsDataURL(file);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Atualiza o profilePicture e name no User
            const userRes = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profilePicture: data.profilePicture,
                    name: data.name,
                }),
            });
            if (!userRes.ok) {
                const err = await userRes.json();
                throw new Error(err.error || 'Erro ao atualizar perfil do usuário');
            }

            // Atualiza os dados do portfolio
            const portfolioRes = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bio: data.bio,
                    email: data.email,
                    github: data.github,
                    linkedin: data.linkedin,
                    website: data.website,
                }),
            });

            if (!portfolioRes.ok) {
                const err = await portfolioRes.json();
                throw new Error(err.error || 'Erro ao atualizar portfólio');
            }

            setMessage('Perfil atualizado com sucesso!');
        } catch (error) {
            setMessage((error as Error).message || 'Erro na requisição');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box
            maxWidth={600}
            mx="auto"
            mt={4}
            px={2}
            component="main"
            display="flex"
            flexDirection="column"
            gap={3}
        >
            <Typography variant="h4" fontWeight="bold" textAlign="center">
                Editar Perfil
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar
                        src={preview || undefined}
                        alt="Foto do Perfil"
                        sx={{ width: 120, height: 120 }}
                    />
                </Box>

                <Button variant="contained" component="label" sx={{ mb: 2, width: 'fit-content', mx: 'auto' }}>
                    Alterar Foto
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                    />
                </Button>

                <TextField
                    label="Nome"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    fullWidth
                    focused
                />

                <TextField
                    label="Bio"
                    name="bio"
                    value={data.bio}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    focused
                />

                <TextField
                    label="E-mail"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    fullWidth
                    focused
                />

                <TextField
                    label="GitHub"
                    name="github"
                    value={data.github}
                    onChange={handleChange}
                    fullWidth
                    focused
                />

                <TextField
                    label="LinkedIn"
                    name="linkedin"
                    value={data.linkedin}
                    onChange={handleChange}
                    fullWidth
                    focused
                />

                <TextField
                    label="Website"
                    name="website"
                    value={data.website}
                    onChange={handleChange}
                    fullWidth
                    focused
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Salvar Perfil'}
                </Button>
            </Box>

            {message && (
                <Typography
                    mb={2}
                    color={message.includes('sucesso') ? 'success.main' : 'error.main'}
                    textAlign="center"
                    mt={2}
                    fontWeight="medium"
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
}
