'use client';

import { Box, Typography, Chip, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Portfolio {
    id: string;
    name: string;
    stacks: string[];
    techList: string[];
    projectImage: string;
    user?: {
        name?: string;
    };
}

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/devs/${portfolio.id}`);
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                width: 300,
                height: 450,
                bgcolor: 'grey.200',
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                    cursor: 'pointer',
                },
            }}
        >
            {/* Imagem do Projeto */}
            <Box sx={{ height: 300, position: 'relative', borderRadius: 3 }}>
                <Image
                    src={portfolio.projectImage || '/placeholder.jpg'}
                    alt="Projeto em destaque"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </Box>

            {/* Conteúdo */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                    Dev: {portfolio.user?.name || portfolio.name}
                </Typography>

                <Divider />

                {/* Stacks */}
                <Typography variant="h6" color="text.primary" fontSize={14}>
                    Stacks:
                </Typography>
                <Typography variant="body2" color="primary.main" fontSize={12}>
                    {portfolio.stacks.join(', ')}
                </Typography>

                <Divider />

                {/* Tech list */}
                <Typography variant="h6" color="text.primary" fontSize={14}>
                    Tecnologias:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {portfolio.techList.map((tech: string) => (
                        <Chip
                            key={tech}
                            label={tech.trim()}
                            size="small"
                            sx={{ bgcolor: 'text.primary', color: 'background.default' }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
