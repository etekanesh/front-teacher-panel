import { Button, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CustomButtonProps extends ButtonProps {
    colorType?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    variant = 'contained',
    colorType = 'primary',
    ...props
}) => {
    const theme = useTheme();

    return (
        <Button
            variant={variant}
            sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: variant === 'contained' ? theme.palette[colorType].main : undefined,
                color: variant === 'contained' ? theme.palette[colorType].contrastText : theme.palette[colorType].main,
                '&:hover': {
                    backgroundColor: variant === 'contained' ? theme.palette[colorType].dark : theme.palette[colorType].light,
                },
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

