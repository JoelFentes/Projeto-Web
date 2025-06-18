'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Stack,
    Chip,
    Divider,
    Button,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardMedia,
    IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
        name?: string;
        profilePicture?: string;
    };
}

export default function DevDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tabIndex, setTabIndex] = useState(0);

    const [isFollowing, setIsFollowing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [projectLikes, setProjectLikes] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        if (!id) return;

        async function fetchPortfolio() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/portfolio/${id}`);
                if (!res.ok) throw new Error('Erro ao buscar os detalhes do desenvolvedor');
                const data = await res.json();
                setPortfolio(data.portfolio);
                setProjectLikes(data.portfolio.projectLikes ?? 0);
                setFollowers(data.portfolio.followers ?? 0);
                setFollowing(data.portfolio.following ?? 0);
                setLikes(data.portfolio.likes ?? 0);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchPortfolio();
    }, [id]);

    const handleFollow = () => {
        setIsFollowing((prev) => !prev);
        setFollowers((prev) => isFollowing ? prev - 1 : prev + 1);
    };

    const handleLikeProject = () => {
        setIsLiked((prev) => !prev);
        setProjectLikes((prev) => isLiked ? prev - 1 : prev + 1);
        setLikes((prev) => isLiked ? prev - 1 : prev + 1);
    };

    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;
    if (error) return <Typography color="error" align="center" mt={4}>{error}</Typography>;
    if (!portfolio) return <Typography align="center" mt={4}>Nenhum portfólio encontrado.</Typography>;

    const backgroundImageUrl =
        portfolio.projectImage && portfolio.projectImage.trim() !== ''
            ? portfolio.projectImage
            : 'https://cdn.dribbble.com/userupload/19072029/file/original-964d527aa2947ce15e717e7bb2f9a749.png?resize=752x&vertical=center';

    return (
        <Box
            width="100vw"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ overflowX: 'hidden' }}
        >
            <Box sx={{ width: '100%', height: 125, bgcolor: 'text.secondary', boxShadow: 3 }} />

            <Box
                component="img"
                src={portfolio.user?.profilePicture || '/default-avatar.png'}
                alt={`Foto de ${portfolio.name}`}
                sx={{
                    position: 'absolute',
                    left: '5%',
                    top: 120,
                    width: 210,
                    height: 210,
                    objectFit: 'cover',
                    borderRadius: 10,
                    mt: -6,
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                }}
            />

            <Box>
                {/* Nome + Stacks */}
                <Box mt={4} width="100%" maxWidth={800} position={'absolute'} left="23%">
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {portfolio.user?.name || portfolio.name}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {portfolio.stacks.map((stack) => (
                            <Chip key={stack} label={stack} color="primary" variant="outlined" />
                        ))}
                    </Stack>

                    {/* Botões Follow e Like */}
                    <Stack direction="row" spacing={2} sx={{ mt: 2, width: '80%' }}>
                        <Button
                            variant={isFollowing ? 'outlined' : 'contained'}
                            color="primary"
                            onClick={handleFollow}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </Button>

                        <Button
                            variant={isLiked ? 'contained' : 'outlined'}
                            color="secondary"
                            startIcon={<FavoriteIcon />}
                            onClick={handleLikeProject}
                        >
                            {isLiked ? 'Liked' : 'Like'}
                        </Button>
                    </Stack>
                </Box>
            </Box>

            <Divider sx={{ mt: 25, width: '80%' }} />

            {/* Tabs */}
            <Box sx={{ width: '80%', mt: 5 }}>
                <Tabs
                    value={tabIndex}
                    onChange={(_, newValue) => setTabIndex(newValue)}
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{
                        '& .MuiTab-root': { color: 'grey.600' },
                        '& .Mui-selected': { color: 'secondary.main' },
                    }}
                >
                    <Tab label="Works" />
                    <Tab label="Likes" />
                    <Tab label="About" />
                </Tabs>

                {/* Works */}
                {tabIndex === 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Card sx={{ mt: 5, width: "30%", minHeight: "300px", mb: 5, bgcolor: 'transparent', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                image={backgroundImageUrl}
                                alt={portfolio.projectTitle}
                                sx={{
                                    objectFit: 'fill',
                                    borderRadius: 10,
                                    width: '100%',
                                    height: 300,
                                }}
                            />

                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        {portfolio.projectTitle}
                                    </Typography>

                                    <Stack direction="row" alignItems="center">
                                        <IconButton onClick={handleLikeProject}>
                                            <FavoriteIcon color={isLiked ? 'error' : 'disabled'} />
                                        </IconButton>
                                        <Typography variant="body2">
                                            {projectLikes}
                                        </Typography>
                                    </Stack>
                                </Box>

                                <Typography variant="body2" mb={2}>
                                    {portfolio.projectDescription}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {/* Likes Tab */}
                {tabIndex === 1 && (
                    <Box sx={{ mt: 3, px: 2 }}>
                        <Typography variant="h6" mb={2}>Followers: {followers}</Typography>
                        <Typography variant="h6" mb={2}>Following: {following}</Typography>
                        <Typography variant="h6" mb={2}>Likes: {likes}</Typography>
                    </Box>
                )}

                {/* About Tab */}
                {tabIndex === 2 && (
                    <Box sx={{ mt: 3, px: 2, maxWidth: 800 }}>
                        <Typography variant="body1" mb={3}>
                            {portfolio.bio}
                        </Typography>
                        <Typography variant="h6" mb={1}>Techs:</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {portfolio.techList.map((tech) => (
                                <Chip key={tech} label={tech} color="secondary" variant="outlined" />
                            ))}
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
