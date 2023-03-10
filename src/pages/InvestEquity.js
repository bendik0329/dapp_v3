/* eslint-disable prettier/prettier */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { Equity } from '../components/_external-pages/privacy';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

export default function PrivacyPage() {
  return (
    <RootStyle title="App | Backed Capital" id="move_top">
      <ContentStyle>
          {/* <Header /> */}
          {/* <Content /> */}
          <Equity />
      </ContentStyle>
    </RootStyle>
  );
}
