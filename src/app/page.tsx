import { TaskManagementInterface } from '@/components/ui/Home/TaskManagementInterface';
import { Stack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Stack
      w="100%"
      flex={1}
      p="1.88rem 3.75rem 1.88rem 3.13rem"
      overflowY="auto"
      h="calc(100vh - 6.5rem)"
    >
      <TaskManagementInterface />
    </Stack>
  );
}
