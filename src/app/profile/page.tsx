'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface PortfolioData {
    name: string;
    bio: string;
    email: string;
    profilePicture?: string; // base64 ou url da imagem
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

    // Buscar dados atuais do portfolio na API (GET /api/portfolio) -- supondo que retorna { portfolios: [...] }
    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/portfolio');
                const json = await res.json();
                // Pega o primeiro portfolio do usuário por exemplo
                const portfolio = json.portfolios?.[0];
                if (portfolio) {
                    setData({
                        name: portfolio.name || '',
                        bio: portfolio.bio || '',
                        email: portfolio.email || '',
                        profilePicture: portfolio.projectImage || '', // supondo que projectImage é a foto
                        github: portfolio.github || '',
                        linkedin: portfolio.linkedin || '',
                        website: portfolio.website || '',
                    });
                    setPreview(portfolio.projectImage || null);
                }
            } catch (error) {
                console.error('Erro ao buscar portfolio', error);
            }
        }
        fetchProfile();
    }, []);

    // Atualiza campo no state
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    // Upload de imagem e preview
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview com URL
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Converter para base64 para enviar ao backend (simples, mas para arquivos maiores usar upload direto)
        const reader = new FileReader();
        reader.onloadend = () => {
            setData({ ...data, profilePicture: reader.result as string });
        };
        reader.readAsDataURL(file);
    }

    // Submeter form
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    bio: data.bio,
                    email: data.email,
                    projectImage: data.profilePicture, // enviar a base64 da imagem como projectImage
                    github: data.github,
                    linkedin: data.linkedin,
                    website: data.website,
                }),
            });
            const json = await res.json();
            if (res.ok) {
                setMessage('Perfil atualizado com sucesso!');
            } else {
                setMessage(json.error || 'Erro ao atualizar perfil');
            }
        } catch (error) {
            setMessage('Erro na requisição');
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <main style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
            <h1>Editar Perfil</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Nome:<br />
                        <input
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: 8 }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        Bio:<br />
                        <textarea
                            name="bio"
                            value={data.bio}
                            onChange={handleChange}
                            required
                            rows={4}
                            style={{ width: '100%', padding: 8 }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        E-mail:<br />
                        <input
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: 8 }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        GitHub:<br />
                        <input
                            name="github"
                            value={data.github}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8 }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        LinkedIn:<br />
                        <input
                            name="linkedin"
                            value={data.linkedin}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8 }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        Website:<br />
                        <input
                            name="website"
                            value={data.website}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8 }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>
                        Foto do Perfil:<br />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview profile"
                                style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: '50%', marginBottom: 8 }}
                            />
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar Perfil'}
                </button>
            </form>

            {message && (
                <p style={{ marginTop: 16, color: message.includes('sucesso') ? 'green' : 'red' }}>
                    {message}
                </p>
            )}
        </main>
    );
}
