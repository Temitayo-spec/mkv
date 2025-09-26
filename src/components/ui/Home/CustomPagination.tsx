'use client';

import {
  Box,
  Flex,
  IconButton,
  Select,
  HStack,
  Text,
  Pagination,
  ButtonGroup,
} from '@chakra-ui/react';

import { ArrowLeft2, ArrowRight2, ArrowDown2 } from 'iconsax-reactjs';
import { pageSizeCollection } from '@/constants/task-management';

export const CustomPagination: React.FC<{
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Flex
      justify="space-between"
      align="center"
      px="0.625rem"
      bg="white"
      borderRadius="0 0 0.625rem 0.625rem"
      h="5rem"
      borderWidth="1px"
      borderColor="strokes.1"
      borderTop={0}
      fontFamily={'var(--font-montserrat)'}
    >
      <Pagination.Root
        count={totalItems}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={(e) => onPageChange(e.page)}
        siblingCount={1}
        bg="bg.1"
        p="0.625rem"
        py="0.31rem"
        borderRadius="1.25rem"
      >
        <ButtonGroup gap={0}>
          <IconButton
            size="sm"
            variant="ghost"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            _hover={{ bg: 'gray.50' }}
            color="#1A1C1E"
          >
            <ArrowLeft2 size={10} />
            <Box transform="translateX(-18px)">
              <ArrowLeft2 size={10} />
            </Box>
          </IconButton>

          <Pagination.PrevTrigger asChild>
            <IconButton
              size="sm"
              variant="ghost"
              _hover={{ bg: 'gray.50' }}
              color="#1A1C1E"
            >
              <ArrowLeft2 size={16} />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            style={{ display: 'flex', gap: '0.5rem' }}
            render={(page) => (
              <IconButton
                key={page.value}
                variant="ghost"
                w="1.875rem"
                h="1.875rem"
                mr="0.25rem"
                bg={
                  page.type === 'page' && page.value === currentPage
                    ? '#75C5C1'
                    : 'white'
                }
                rounded="full"
                color={
                  page.type === 'page' && page.value === currentPage
                    ? 'white'
                    : 'gray.700'
                }
                border="1px solid"
                borderColor="#75C5C1"
                fontSize="sm"
                fontWeight="medium"
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton
              size="sm"
              variant="ghost"
              _hover={{ bg: 'gray.50' }}
              color="#1A1C1E"
            >
              <ArrowRight2 size={16} />
            </IconButton>
          </Pagination.NextTrigger>

          <IconButton
            size="sm"
            variant="ghost"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            _hover={{ bg: 'gray.50' }}
            color="#1A1C1E"
          >
            <Box transform="translateX(18px)">
              <ArrowLeft2 size={10} style={{ transform: 'rotate(180deg)' }} />
            </Box>
            <ArrowLeft2 size={10} style={{ transform: 'rotate(180deg)' }} />
          </IconButton>
        </ButtonGroup>
      </Pagination.Root>

      <HStack gap={2}>
        <Text
          fontSize="1rem"
          color="text.black_1"
          fontWeight={600}
          flexShrink={0}
        >
          Rows Per page:
        </Text>
        <Select.Root
          collection={pageSizeCollection}
          value={[pageSize.toString()]}
          onValueChange={(e) => onPageSizeChange(parseInt(e.value[0]))}
          size="sm"
        >
          <Select.Control w="4.5rem">
            <Select.Trigger
              bg="bg.1"
              border="1px solid"
              borderColor="bg.aqua_blue"
              borderRadius="1.25rem"
              fontSize="sm"
              h="2.5rem"
              pl="1.25rem"
              py="0.94rem"
              color="#545464"
              fontWeight={600}
            >
              <Select.ValueText />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator pr="0.94rem" color="#1A1C1E">
                <ArrowDown2 size={12} />
              </Select.Indicator>
            </Select.IndicatorGroup>
          </Select.Control>
          <Select.Positioner>
            <Select.Content bg="bg.1">
              {pageSizeCollection.items.map((item) => (
                <Select.Item
                  item={item}
                  key={item.value}
                  p="0.5rem"
                  fontSize="sm"
                  color="#545464"
                  fontWeight={600}
                >
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </HStack>
    </Flex>
  );
};
