import React from 'react';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

const Banner = styled('div')(({ theme }) => ({
  height: 124,
  width: '100vw',
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-around',
}));

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '4px',
  background: '#171c20',
}));

const ItemHeading = styled('p')(({ theme }) => ({
  fontFamily: 'Gill Sans',
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '17px',
  letterSpacing: 0.21666666865348816,
  textAlign: 'center',
  paddingTop: 10,
  color: theme.palette.text.secondary,
}));

const ItemValue = styled('p')(({ theme }) => ({
  fontFamily: 'Gill Sans',
  fontSize: 30,
  fontWeight: 500,
  lineHeight: '43px',
  letterSpacing: 0.21666666865348816,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: -2,
}));

const BannerComponent = (props) => {
  const { items, width } = props;

  return (
    <Banner style={{ width: '197px' }}>
      <Grid container spacing={0.5} style={{ height: '100%' }}>
        {items.map((item) => (
          <Grid item key={item.header} xs={3} sm={6} md={3}>
            <Item style={{ width: '19.75vw' }}>
              <ItemHeading>{item.header}</ItemHeading>
              <ItemValue>{item.value}</ItemValue>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Banner>
  );
};

BannerComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BannerComponent;
