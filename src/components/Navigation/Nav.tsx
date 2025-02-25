import React from 'react';
import { Box, Container, Flex, Link } from '@shadcn/ui';
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
              href="/"
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
          </Flex>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Nav;
