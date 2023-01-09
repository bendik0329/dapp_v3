/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../../components/Page';
import { Register } from '../../components/Auth/Register';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
  // backgroundImage: `url("/static/home/team-page-bg.png")`,
  backgroundPosition: 'right 30%',
  backgroundRepeat: 'no-repeat no-repeat'
});

const ContentStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <RootStyle title="App | Backed Capital" id="move_top">
      <ContentStyle>
          <Register />
      </ContentStyle>
    </RootStyle>
  );
}
