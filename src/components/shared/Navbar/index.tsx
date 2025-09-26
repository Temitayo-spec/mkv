import company_1 from '@/svgs/company_1.svg';
import company_2 from '@/svgs/company_2.svg';
import company_3 from '@/svgs/company_3.svg';
import company_4 from '@/svgs/company_4.svg';
import { Box, Flex, IconButton, HStack } from '@chakra-ui/react';
import { Link1, Notification } from 'iconsax-reactjs';
import { SearchBox } from './SearchBox';
import { CompanyIcon } from './CompanyIcon';
import { UserMenu } from './UserMenu';
import { ActionButton } from './ActionButton';

const companyLogos = [company_1, company_2, company_3, company_4];

const actionButtons = [
  { label: 'Meldingmaken', bg: 'bg.indigo' },
  { label: 'VIM', bg: 'bg.aqua_blue' },
  { label: 'LMS', bg: 'bg.aqua_blue' },
  { label: 'BHV', bg: 'bg.aqua_blue' },
  { label: 'DataLek', bg: 'bg.aqua_blue' },
];

const Navbar: React.FC = () => {
  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="strokes.1"
      py="1.38rem"
      px="3.12rem"
      w="100%"
      flex="1"
    >
      <Flex align="center" justify="space-between" w="full" gap={4}>
        <SearchBox />

        <HStack gap="0.63rem">
          {companyLogos.map((logo, index) => (
            <CompanyIcon
              key={index}
              src={logo}
              alt={`Company ${index + 1} logo`}
            />
          ))}
        </HStack>

        <HStack gap={0}>
          <HStack
            gap={3}
            p="0.25rem"
            borderRadius={'0.625rem'}
            borderWidth="1px"
            borderColor="strokes.2"
            bg="bg.1"
          >
            {actionButtons.map(({ label, bg }) => (
              <ActionButton key={label} label={label} bg={bg} />
            ))}
          </HStack>

          <IconButton
            aria-label="External link"
            px="0.5rem"
            py="0.69rem"
            bg="bg.1"
            borderWidth="1px"
            borderColor="strokes.2"
            ml="0.63rem"
            _hover={{ bg: 'gray.100' }}
          >
            <Link1 color="#464B50" />
          </IconButton>
        </HStack>

        <HStack ml="auto">
          <IconButton
            aria-label="Notifications"
            w={'2.875rem'}
            h={'2.875rem'}
            borderRadius="50%"
            bg="bg.1"
            _hover={{ bg: 'gray.100' }}
          >
            <Notification color="#292D32" />
          </IconButton>

          <UserMenu />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
