'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Chip,
    Link as MuiLink,
    CircularProgress,
    Grid,
    TextField,
    MenuItem,
    Pagination,
    Button,
} from '@mui/material';
import Image from 'next/image';
import LayersIcon from '@mui/icons-material/Layers';
import CodeIcon from '@mui/icons-material/Code';
import theme from '@/theme';
import { useRouter } from 'next/navigation';


interface Portfolio {
    id: string;
    name: string;
    bio: string;
    stacks: string[];
    techList: string[];
    experience: string;
    projectTitle: string;
    projectDescription: string;
    projectLink: string;
    projectImage?: string | null;
    github?: string | null;
    linkedin?: string | null;
    website?: string | null;
}

export default function DevsPage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchName, setSearchName] = useState('');
    const [selectedStack, setSelectedStack] = useState('');
    const [selectedTech, setSelectedTech] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const portfoliosPerPage = 4;

    const router = useRouter();


    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const res = await fetch('/api/portfolio');
                if (!res.ok) throw new Error('Erro ao buscar portfólios');
                const data = await res.json();
                setPortfolios(data.portfolios || data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolios();
    }, []);

    const allStacks = useMemo(() => {
        const set = new Set<string>();
        portfolios.forEach((p) => p.stacks.forEach((s) => set.add(s)));
        return Array.from(set);
    }, [portfolios]);

    const allTechs = useMemo(() => {
        const set = new Set<string>();
        portfolios.forEach((p) => p.techList.forEach((t) => set.add(t)));
        return Array.from(set);
    }, [portfolios]);

    const filteredPortfolios = useMemo(() => {
        return portfolios.filter((p) => {
            const matchesName = p.name.toLowerCase().includes(searchName.toLowerCase());
            const matchesStack = selectedStack ? p.stacks.includes(selectedStack) : true;
            const matchesTech = selectedTech ? p.techList.includes(selectedTech) : true;
            return matchesName && matchesStack && matchesTech;
        });
    }, [portfolios, searchName, selectedStack, selectedTech]);

    const totalPages = Math.ceil(filteredPortfolios.length / portfoliosPerPage);
    const paginatedPortfolios = filteredPortfolios.slice(
        (currentPage - 1) * portfoliosPerPage,
        currentPage * portfoliosPerPage
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography textAlign="center" color="error" mt={10}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            mx: 'auto',
            p: 6,
            bgcolor: 'text.secondary',
        }}>
            <Typography variant="h4" color='text.primary' fontWeight="bold" mb={4} textAlign="start">
                Descubra os Devs através dos seus portfólios
            </Typography>

            {/* Filtros */}
            <Box mb={4} display="flex" gap={2} >
                <TextField
                    label="Buscar por Nome"
                    value={searchName}
                    onChange={(e) => {
                        setSearchName(e.target.value);
                        setCurrentPage(1);
                    }}
                    variant="outlined"
                    focused
                    color="primary"
                />

                <TextField
                    sx={{ minWidth: 200, }}
                    select
                    label="Filtrar por Stack"
                    value={selectedStack}
                    onChange={(e) => {
                        setSelectedStack(e.target.value);
                        setCurrentPage(1);
                    }}
                    variant="outlined"
                    focused
                    color="primary"
                >
                    <MenuItem value="">Todas</MenuItem>
                    {allStacks.map((stack) => (
                        <MenuItem key={stack} value={stack}>{stack}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    sx={{ minWidth: 200 }}
                    select
                    label="Filtrar por Tech"
                    value={selectedTech}
                    onChange={(e) => {
                        setSelectedTech(e.target.value);
                        setCurrentPage(1);
                    }}
                    variant="outlined"
                    focused
                    color="primary"
                >
                    <MenuItem value="">Todas</MenuItem>
                    {allTechs.map((tech) => (
                        <MenuItem key={tech} value={tech}>{tech}</MenuItem>
                    ))}
                </TextField>
            </Box>

            {/* Lista de Portfolios */}
            <Grid
                container
                spacing={1}
                sx={{
                    flexGrow: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: 2,
                    overflow: 'auto',
                }}
            >
                {paginatedPortfolios.length === 0 ? (
                    <Typography color="text.secondary">Nenhum portfolio encontrado.</Typography>
                ) : (
                    paginatedPortfolios.map((portfolio) => (
                        <Box
                            key={portfolio.id}
                            onClick={() => router.push(`/devs/${portfolio.id}`)}
                            sx={{
                                p: 3,
                                color: 'text.primary',
                                borderRadius: 3,
                                borderColor: 'primary.main',
                                borderWidth: 1,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                overflow: 'hidden',
                                cursor: 'pointer',

                            }}
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="bold" gutterBottom noWrap>
                                    {portfolio.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    mb={2}
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'normal',
                                    }}
                                >
                                    {portfolio.bio}
                                </Typography>

                                {/* Stacks */}
                                <Box mb={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    {portfolio.stacks.map((stack, index) => (
                                        <Chip
                                            key={index}
                                            label={stack}
                                            size="medium"
                                            icon={<LayersIcon sx={{ fontSize: 24, color: theme.palette.text.secondary }} />}
                                            sx={{
                                                fontWeight: '400',
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.text.secondary,
                                            }}
                                        />
                                    ))}
                                </Box>

                                {/* Tecnologias */}
                                <Box mb={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {portfolio.techList.map((tech, index) => (
                                        <Chip
                                            key={index}
                                            label={tech}
                                            size="medium"
                                            icon={<CodeIcon sx={{ fontSize: 24, color: theme.palette.text.secondary }} />}
                                            sx={{
                                                fontWeight: '400',
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.text.secondary,
                                            }}
                                        />
                                    ))}
                                </Box>


                                {/* Projeto */}
                                {portfolio.projectTitle && (
                                    <Box mb={2}>
                                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                            {portfolio.projectTitle}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                maxHeight: 50,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                            }}
                                            mb={1}
                                        >
                                            {portfolio.projectDescription}
                                        </Typography>

                                    </Box>
                                )}
                            </Box>

                            {/* Contatos */}
                            <Box
                                mt="auto"
                                sx={{ display: 'flex', justifyContent: 'space-around', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
                            >
                                {portfolio.github && (
                                    <MuiLink href={portfolio.github} target="_blank" sx={{ fontSize: 13, fontWeight: 'medium' }}>
                                        GitHub
                                    </MuiLink>
                                )}
                                {portfolio.linkedin && (
                                    <MuiLink href={portfolio.linkedin} target="_blank" sx={{ fontSize: 13, fontWeight: 'medium' }}>
                                        LinkedIn
                                    </MuiLink>
                                )}
                                {portfolio.website && (
                                    <MuiLink href={portfolio.website} target="_blank" sx={{ fontSize: 13, fontWeight: 'medium' }}>
                                        Website
                                    </MuiLink>
                                )}
                            </Box>
                        </Box>

                    ))
                )}
            </Grid>

            {totalPages > 1 && (
                <Box mt={3} display="flex" justifyContent="center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </Box>

    );
}
