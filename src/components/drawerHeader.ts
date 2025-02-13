import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
const DrawerHeader = styled('div')(({  }) => {
    const theme = useTheme();
    return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }
});
export default DrawerHeader;