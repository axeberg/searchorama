import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Flex, Link, MenuButton } from 'theme-ui';
import Search from '../Search/Search';

const Nav = () => {
  return (
    <React.Fragment>
      <Box as="nav">
        <Container>
          <Flex
            sx={{
              alignItems: 'center',
            }}
          >
            <Link
              as={RouterLink}
              variant="logo"
              sx={{
                mr: 3,
              }}
            >
              Searchorama
            </Link>
            <Search
              sx={{
                mr: 3,
                flex: '1',
              }}
            />
            <MenuButton onClick={() => {}}>Menu</MenuButton>
          </Flex>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Nav;
