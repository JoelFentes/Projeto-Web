import {
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    styled,
    stepConnectorClasses,
    useTheme,
    Theme,
} from '@mui/material';

// Conector customizado (opcional)
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 12,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        width: '100%',
        height: 2,
        border: 0,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 1,
    },
}));

const customLabelStyles = (theme: Theme) => ({
    '& .MuiStepLabel-label': {
        color: theme.palette.text.primary,
        fontSize: 14,
        fontWeight: 400,
        '&.Mui-active': {
            color: theme.palette.text.primary,
            fontWeight: 500,
        },
        '&.Mui-completed': {
            color: theme.palette.secondary.main,
        },
    },
});

const customStepIconStyles = (theme: Theme) => ({
    '& .MuiStepIcon-root': {
        color: theme.palette.text.primary,
        borderRadius: '50%',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& .MuiStepIcon-root.Mui-active': {
        color: theme.palette.secondary.main,
        borderRadius: '50%',
    },
    '& .MuiStepIcon-root.Mui-completed': {
        color: theme.palette.secondary.main,
        borderRadius: '50%',
    },
});

type CustomStepperProps = {
    activeStep: number;
    steps: string[];
};

export default function CustomStepper({ activeStep, steps }: CustomStepperProps) {
    const theme = useTheme();

    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<CustomConnector />}
            sx={{
                mt: 2,
                mb: 2,
                ...customStepIconStyles(theme),
            }}
        >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel sx={customLabelStyles(theme)}>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}
