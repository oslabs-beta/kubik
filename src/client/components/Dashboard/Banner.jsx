import React from 'react';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const Banner = styled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
  height: 124,
  width: '100vw',
  borderRadius: 4,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-around',
  //   '& .iframesRow': {
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
}));

const Items = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  borderRight: `1px solid ${theme.palette.divider}`,
  background: '#171c20',
}));

const LastItem = styled('div')({
  border: 'none',
});

const ItemHeading = styled('p')(({ theme }) => ({
  fontFamily: 'Lato',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '17px',
  letterSpacing: 0.21666666865348816,
  textAlign: 'center',
  paddingTop: 10,
  color: theme.palette.text.secondary,
}));

const ItemValue = styled('p')(({ theme }) => ({
  fontFamily: 'Lato',
  fontSize: 36,
  fontWeight: 500,
  lineHeight: '43px',
  letterSpacing: 0.21666666865348816,
  textAlign: 'center',
  //   lineHeight: '15px',
  color: theme.palette.text.primary,
}));

const BannerComponent = (props) => {
  const { items, width } = props;

  const renderedItems = items.map((item, index) => (
    <Items
      key={item.header}
      className={index === items.length - 1 ? LastItem : ''}
    >
      <ItemHeading>{item.header}</ItemHeading>
      <ItemValue>{item.value}</ItemValue>
    </Items>
  ));

  return (
    <Banner style={width ? { width } : {}} className="iframesRow">
      {renderedItems}
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
