import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { esES } from '@mui/material/locale';
import ListArticles from './ListArticles';

const ExampleWithThemeProvider = ({articles,deletearticle}) => {
  const theme = useTheme(); //replace with your theme/createTheme
  return (
    //Setting Material UI locale as best practice to result in better accessibility
    <ThemeProvider theme={createTheme(theme, esES)}>
      <ListArticles articles={articles} deletearticle={deletearticle} />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;