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
} from '@mui/material';
import Image from 'next/image';

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
            height: '100vh',
            maxHeight: '100%',
            width: '100%',
            mx: 'auto',
            p: 6,
            bgcolor: 'text.primary',
        }}>
            <Typography variant="h4" color='text.secondary' fontWeight="bold" mb={4} textAlign="start">
                Descubra os Devs atráves dos seus portfólios
            </Typography>

            {/* Filtros */}

        </Box>
    );
}
