import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LanguageSelector() {
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    const locale = event.target.value;
    router.push(`/${locale}`);
  };

  return (
    <Select
      sx={{ 
        minWidth: 100,
        color: 'white',
        '& .MuiSelect-icon': { color: 'white' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }
      }}
      defaultValue="zh"
      onChange={handleChange}
    >
      <MenuItem value="zh">中文</MenuItem>
      <MenuItem value="en">English</MenuItem>
    </Select>
  );
} 