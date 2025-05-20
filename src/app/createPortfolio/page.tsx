'use client';

import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { stringify } from "querystring";
import CustomTextField from "@/components/CustomTextFieldPortfolio";
import theme from "@/theme";
import CustomStepper from "@/components/CustomStepper";
import React from "react";


type FormData = {
  name: string;
  bio: string;
  stack: string;
  stacks: string[];
  github: string;
  linkedin: string;
  email: string;
  website: string;
  technologies: string;
  techList: string[];
  experience: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  projectImage: string;
};

const steps = [
  'Informações Pessoais',
  'Stacks e Tecnologias',
  'Experiência',
  'Destaque',
  'Contato'
];

export default function CreatePortfolio() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    stack: '',
    stacks: [],
    github: '',
    linkedin: '',
    email: '',
    website: '',
    technologies: '',
    techList: [],
    experience: '',
    projectTitle: '',
    projectDescription: '',
    projectLink: '',
    projectImage: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStack = () => {
    if (formData.stack.trim()) {
      setFormData(prev => ({
        ...prev,
        stacks: [...prev.stacks, prev.stack.trim()],
        stack: ''
      }));
    }
  };

  const handleRemoveStack = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stacks: prev.stacks.filter((_, i) => i !== index)
    }));
  };

  const handleAddTech = () => {
    if (formData.technologies.trim()) {
      setFormData(prev => ({
        ...prev,
        techList: [...prev.techList, prev.technologies.trim()],
        technologies: ''
      }));
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techList: prev.techList.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    // Validações básicas antes de avançar
    if (activeStep === 0 && (!formData.name || !formData.bio)) {
      alert('Preencha seu nome e bio para continuar');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // garante envio do cookie
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao enviar dados');
        return;
      }

      const result = await response.json();
      alert('Portfólio salvo com sucesso!');
      console.log(result);
    } catch (error) {
      alert('Erro ao enviar formulário');
      console.error(error);
    }
  };



  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <CustomTextField
              label="Seu nome completo"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
              fullWidth
              required

            />
            <CustomTextField
              label="Bio (uma breve descrição sobre você)"
              variant="outlined"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}

            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Sua stack principal</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomTextField
                label="Adicionar stack (ex: Frontend, Fullstack, etc.)"
                variant="outlined"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                fullWidth
                customColor={{
                  border: 'grey400',
                  hover: theme.palette.secondary.main,
                  focus: theme.palette.text.primary,
                  label: 'grey'
                }}
              />
              <IconButton onClick={handleAddStack} color="primary">
                <AddIcon />
              </IconButton>
            </Box>

            {
              formData.stacks.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {formData.stacks.map((stack, index) => (
                    <Chip
                      key={index}
                      label={stack}
                      onDelete={() => handleRemoveStack(index)}
                    />
                  ))}
                </Stack>
              )
            }

            <Typography variant="h6">Tecnologias que você domina</Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <CustomTextField
                label="Adicionar tecnologia (ex: React, Node.js, etc.)"
                variant="outlined"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                fullWidth
                customColor={{
                  border: 'grey400',
                  hover: theme.palette.secondary.main,
                  focus: theme.palette.text.primary,
                  label: 'grey'
                }}
              />
              <IconButton onClick={handleAddTech} color="primary">
                <AddIcon />
              </IconButton>
            </Box>

            {
              formData.techList.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {formData.techList.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => handleRemoveTech(index)}
                    />
                  ))}
                </Stack>
              )
            }
          </Box >
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Conte um pouco de suas experiências:</Typography>
            <CustomTextField
              label="Sua experiência (anos de experiência, empresas, etc.)"
              variant="outlined"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Faça um preview de um projeto favorito:</Typography>
            <CustomTextField
              label="Título do projeto"
              variant="outlined"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              fullWidth
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
            <CustomTextField
              label="Descrição do projeto"
              variant="outlined"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
            <CustomTextField
              label="Link do projeto"
              variant="outlined"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
            <CustomTextField
              label="URL da imagem de preview (opcional)"
              variant="outlined"
              name="projectImage"
              value={formData.projectImage}
              onChange={handleChange}
              fullWidth
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
          </Box>
        );
      case 4:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6">Preencha seu contato:</Typography>
            <CustomTextField
              label="Link do GitHub"
              variant="outlined"
              name="github"
              value={formData.github}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon />
                  </InputAdornment>
                ),
              }}
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
            <CustomTextField
              label="Link do LinkedIn (opcional)"
              variant="outlined"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkedInIcon />
                  </InputAdornment>
                ),
              }}
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
            <CustomTextField
              label="Seu email para contato"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
            <CustomTextField
              label="Seu website/portfólio (opcional)"
              variant="outlined"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
              customColor={{
                border: 'grey400',
                hover: theme.palette.secondary.main,
                focus: theme.palette.text.primary,
                label: 'grey'
              }}
            />
          </Box>
        );
      default:
        return 'Etapa desconhecida';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'text.primary',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
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
            px: 6,
            boxSizing: 'border-box',
          }}
        >
          <Box id="description" sx={{ display: 'flex', flexDirection: 'column', pb: 8, maxWidth: '600px' }}>
            <Typography variant="h2" fontWeight="bold" color="text.secondary" >
              Crie seu portfólio em minutos!
            </Typography>
            <Typography variant="body1" color="text.secondary" >
              Compartilhe seus projetos, habilidades e experiências com a comunidade tech.
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              Preencha o formulário passo a passo para criar um perfil completo.
            </Typography>
          </Box>

          <Box
            id="form"
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxWidth: '500px',
              width: '100%',
              bgcolor: '#FFFAFF',
              p: 4,
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="text.primary" >
              {steps[activeStep]}
            </Typography>

            <CustomStepper activeStep={activeStep} steps={steps} />


            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {/* Botão Voltar */}
              <IconButton
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[200],
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              {/* Botão Finalizar ou Avançar */}
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<CheckIcon />}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  Finalizar
                </Button>
              ) : (
                <IconButton
                  onClick={handleNext}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}