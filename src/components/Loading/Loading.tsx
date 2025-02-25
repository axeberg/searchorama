import { Flex, Spinner } from '@shadcn/ui';

const Loading = () => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1',
      }}
    >
      <Spinner />
    </Flex>
  );
};

export default Loading;
