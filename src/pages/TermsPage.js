/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Content } from '../components/_external-pages/terms';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function TermsPage() {
  return (
    <RootStyle title="App | Backed Capital" id="move_top">
      <ContentStyle>
          <Content />
      </ContentStyle>
    </RootStyle>
  );
}
