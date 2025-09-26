'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  VStack,
  HStack,
  Text,
  Dialog,
  Textarea,
  Alert,
} from '@chakra-ui/react';

import {
  Calendar,
  TaskSquare,
  Status,
  TickCircle,
  Flag,
  ProfileCircle,
  Stickynote,
  InfoCircle,
} from 'iconsax-reactjs';
import { mockUsers } from '@/constants/task-management';



export const AddTaskModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id'>) => void;
  defaultStatus?: Task['status'];
  editingTask?: Task;
}> = ({ open, onClose, onAdd, defaultStatus = 'To Do', editingTask }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    assignees: [] as User[],
    priority: 'Medium' as Task['priority'],
    status: defaultStatus,
    description: '',
  });

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name,
        startDate: editingTask.startDate,
        endDate: editingTask.endDate,
        assignees: editingTask.assignees,
        priority: editingTask.priority,
        status: editingTask.status,
        description: '',
      });
    } else if (open) {
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        assignees: [],
        priority: 'Medium',
        status: defaultStatus,
        description: '',
      });
    }
    setUserSearchQuery('');
    setErrors({});
  }, [editingTask, open, defaultStatus]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Task name must be at least 3 characters long';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Task name must be less than 100 characters';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }

      if (endDate < startDate) {
        newErrors.dateRange = 'End date must be after start date';
      }

      const daysDiff = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );
      if (daysDiff > 365) {
        newErrors.dateRange = 'Task duration cannot exceed 365 days';
      }
    }

    if (formData.assignees.length === 0) {
      newErrors.assignees = 'At least one assignee is recommended';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      onAdd({
        ...formData,
        assignees:
          formData.assignees.length > 0 ? formData.assignees : [mockUsers[0]],
      });
      onClose();
    } catch {
      setErrors({ general: 'Failed to create task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const formatDateRange = () => {
    if (formData.startDate && formData.endDate) {
      return `${formData.startDate} - ${formData.endDate}`;
    }
    return '00/00/0000';
  };

  const handleAssigneeSelect = (user: User) => {
    if (!formData.assignees.find((a) => a.id === user.id)) {
      setFormData({
        ...formData,
        assignees: [...formData.assignees, user],
      });
      if (errors.assignees) {
        setErrors({ ...errors, assignees: undefined });
      }
    }
  };



  const handleInputChange = (field: FormDataField, value: FormDataValue) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }

    if (errors.general) {
      setErrors({ ...errors, general: undefined });
    }

    if ((field === 'startDate' || field === 'endDate') && errors.dateRange) {
      setErrors({ ...errors, dateRange: undefined });
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      size="lg"
    >
      <Dialog.Backdrop />
      <Dialog.Positioner
        display={'flex'}
        alignItems="center"
        justifyContent="center"
      >
        <Dialog.Content
          maxW="50rem"
          bg="white"
          borderRadius="1rem"
          p="2rem"
          position="relative"
        >
          <IconButton
            aria-label="Close"
            onClick={onClose}
            position="absolute"
            top="1.5rem"
            right="1.5rem"
            variant="ghost"
            size="sm"
            color="#252A41"
            _hover={{ color: 'gray.600' }}
            w="2.8125rem"
            h="2.8125rem"
            rounded="full"
            bg="#F6F6FA"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.266 5.73405C20.6891 6.15712 20.6891 6.84305 20.266 7.26611L7.26599 20.2661C6.84292 20.6892 6.15699 20.6892 5.73393 20.2661C5.31086 19.843 5.31086 19.1571 5.73393 18.734L18.7339 5.73405C19.157 5.31098 19.8429 5.31098 20.266 5.73405Z"
                fill="#252A41"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.73393 5.73405C6.15699 5.31098 6.84292 5.31098 7.26599 5.73405L20.266 18.734C20.6891 19.1571 20.6891 19.843 20.266 20.2661C19.8429 20.6892 19.157 20.6892 18.7339 20.2661L5.73393 7.26611C5.31086 6.84305 5.31086 6.15712 5.73393 5.73405Z"
                fill="#252A41"
              />
            </svg>
          </IconButton>

          <VStack align="stretch" gap="1.5rem" pt="4rem">
            {errors.general && (
              <Alert.Root
                status="error"
                borderRadius="0.5rem"
                bg="red.50"
                border="1px solid"
                borderColor="red.200"
              >
                <Alert.Indicator>
                  <InfoCircle size={20} color="#E53E3E" />
                </Alert.Indicator>
                <Alert.Title color="red.600" fontSize="sm">
                  {errors.general}
                </Alert.Title>
              </Alert.Root>
            )}

            <VStack align="stretch" gap="0.5rem">
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Task Name"
                fontSize="1.875rem"
                fontWeight="600"
                border="none"
                p="0"
                _placeholder={{ color: 'gray.300' }}
                _focus={{ boxShadow: 'none' }}
                outline="none"
                letterSpacing="-0.0375rem"
                lineHeight={'100%'}
                borderBottom={errors.name ? '2px solid #E53E3E' : 'none'}
              />
              {errors.name && (
                <Text color="red.500" fontSize="xs" mt="0.25rem">
                  {errors.name}
                </Text>
              )}
            </VStack>

            <HStack align="center" gap="1rem" overflow="visible">
              <HStack gap="0.5rem" minW="120px">
                <Box color="#BAC1CC">
                  <Status size={20} />
                </Box>
                <Text color="icons.2" fontSize="sm">
                  Status
                </Text>
              </HStack>
              <Menu.Root>
                <Menu.Trigger>
                  <Button
                    variant="solid"
                    size="sm"
                    bg={
                      formData.status === 'To Do'
                        ? '#CFB7E8'
                        : formData.status === 'In Progress'
                        ? '#F6BE38'
                        : '#75C5C1'
                    }
                    borderRadius="0.375rem"
                    p="0.31rem"
                    color="white"
                  >
                    {formData.status === 'To Do' ? (
                      <TaskSquare variant="Bold" color="white" size={16} />
                    ) : formData.status === 'In Progress' ? (
                      <Status variant="Bold" color="white" size={16} />
                    ) : formData.status === 'Complete' ? (
                      <TickCircle variant="Bold" color="white" size={16} />
                    ) : (
                      <TaskSquare variant="Bold" color="white" size={16} />
                    )}
                    {formData.status}
                  </Button>
                </Menu.Trigger>
                <Menu.Positioner>
                  <Menu.Content
                    bg="white"
                    borderRadius="0.5rem"
                    p="0.5rem"
                    minW="150px"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Menu.Item
                      value="To Do"
                      onClick={() => handleInputChange('status', 'To Do')}
                      p="0.5rem"
                      borderRadius="0.25rem"
                      _hover={{ bg: 'gray.50' }}
                    >
                      <HStack gap="0.5rem">
                        <TaskSquare variant="Bold" color="#CFB7E8" size={16} />
                        <Text>To Do</Text>
                      </HStack>
                    </Menu.Item>
                    <Menu.Item
                      value="In Progress"
                      onClick={() => handleInputChange('status', 'In Progress')}
                      p="0.5rem"
                      borderRadius="0.25rem"
                      _hover={{ bg: 'gray.50' }}
                    >
                      <HStack gap="0.5rem">
                        <Status variant="Bold" color="#F6BE38" size={16} />
                        <Text>In Progress</Text>
                      </HStack>
                    </Menu.Item>
                    <Menu.Item
                      value="Complete"
                      onClick={() => handleInputChange('status', 'Complete')}
                      p="0.5rem"
                      borderRadius="0.25rem"
                      _hover={{ bg: 'gray.50' }}
                    >
                      <HStack gap="0.5rem">
                        <TickCircle variant="Bold" color="#75C5C1" size={16} />
                        <Text>Complete</Text>
                      </HStack>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            </HStack>

            <VStack align="stretch" gap="0.5rem">
              <HStack align="center" gap="1rem">
                <HStack gap="0.5rem" minW="120px">
                  <Box color="#BAC1CC">
                    <Calendar size={20} />
                  </Box>
                  <Text color="icon.2" fontSize="sm">
                    Dates
                  </Text>
                </HStack>
                <Menu.Root>
                  <Menu.Trigger>
                    <Button
                      variant="ghost"
                      color={
                        errors.startDate || errors.endDate || errors.dateRange
                          ? 'red.400'
                          : 'gray.400'
                      }
                      _hover={{
                        color:
                          errors.startDate || errors.endDate || errors.dateRange
                            ? 'red.600'
                            : 'gray.600',
                      }}
                      justifyContent="flex-start"
                      p="0"
                      border={
                        errors.startDate || errors.endDate || errors.dateRange
                          ? '1px solid #E53E3E'
                          : 'none'
                      }
                      borderRadius="0.25rem"
                      px={
                        errors.startDate || errors.endDate || errors.dateRange
                          ? '0.5rem'
                          : '0'
                      }
                    >
                      {formatDateRange()}
                    </Button>
                  </Menu.Trigger>
                  <Menu.Positioner>
                    <Menu.Content
                      bg="white"
                      borderRadius="0.5rem"
                      p="1rem"
                      minW="250px"
                      boxShadow="lg"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <VStack gap="1rem">
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            handleInputChange('startDate', e.target.value)
                          }
                          placeholder="Start Date"
                          borderColor={
                            errors.startDate ? 'red.300' : 'gray.200'
                          }
                        />
                        <Input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            handleInputChange('endDate', e.target.value)
                          }
                          placeholder="End Date"
                          borderColor={errors.endDate ? 'red.300' : 'gray.200'}
                        />
                      </VStack>
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu.Root>
              </HStack>
              {(errors.startDate || errors.endDate || errors.dateRange) && (
                <Text color="red.500" fontSize="xs" ml="9rem">
                  {errors.startDate || errors.endDate || errors.dateRange}
                </Text>
              )}
            </VStack>

            <VStack align="stretch" gap="0.5rem">
              <HStack align="center" gap="1rem">
                <HStack gap="0.5rem" minW="120px">
                  <Box color="#BAC1CC">
                    <ProfileCircle size={20} />
                  </Box>
                  <Text color="icon.2" fontSize="sm">
                    Assignees
                  </Text>
                </HStack>
                <Menu.Root>
                  <Menu.Trigger>
                    <Button
                      variant="ghost"
                      color="#BAC1CC"
                      _hover={{ color: 'gray.600' }}
                      justifyContent="flex-start"
                      px="1rem"
                    >
                      {formData.assignees.length > 0 ? (
                        <AvatarGroup size="xs">
                          {formData.assignees.map((user) => (
                            <Avatar.Root key={user.id} size="xs">
                              <Avatar.Image src={user.avatar} />
                              <Avatar.Fallback name={user.name} />
                            </Avatar.Root>
                          ))}
                        </AvatarGroup>
                      ) : (
                        'Select Assignee'
                      )}
                    </Button>
                  </Menu.Trigger>
                  <Menu.Positioner>
                    <Menu.Content
                      bg="white"
                      borderRadius="0.5rem"
                      p="1rem"
                      minW="280px"
                      boxShadow="lg"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <VStack align="stretch" gap="0.5rem">
                        <Input
                          placeholder="Search user"
                          value={userSearchQuery}
                          onChange={(e) => setUserSearchQuery(e.target.value)}
                          size="sm"
                          mb="0.5rem"
                        />
                        {filteredUsers.map((user) => (
                          <HStack
                            key={user.id}
                            p="0.5rem"
                            borderRadius="0.25rem"
                            _hover={{ bg: 'gray.50' }}
                            cursor="pointer"
                            onClick={() => handleAssigneeSelect(user)}
                          >
                            <Avatar.Root size="sm">
                              <Avatar.Image src={user.avatar} />
                              <Avatar.Fallback name={user.name} />
                            </Avatar.Root>
                            <Text fontSize="sm">{user.name}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu.Root>
              </HStack>
              {errors.assignees && (
                <Text color="red.500" fontSize="xs" ml="9rem">
                  {errors.assignees}
                </Text>
              )}
            </VStack>

            <HStack align="center" gap="1rem">
              <HStack gap="0.5rem" minW="120px">
                <Box color="#BAC1CC">
                  <Flag size={20} />
                </Box>
                <Text color="icon.2" fontSize="sm">
                  Priority
                </Text>
              </HStack>
              <Menu.Root>
                <Menu.Trigger>
                  <Button
                    variant="ghost"
                    color="#BAC1CC"
                    _hover={{ color: 'gray.600' }}
                    justifyContent="flex-start"
                    px="1rem"
                  >
                    {formData.priority === 'Medium'
                      ? 'Select Priority'
                      : formData.priority}
                  </Button>
                </Menu.Trigger>
                <Menu.Positioner>
                  <Menu.Content
                    bg="white"
                    borderRadius="0.5rem"
                    p="0.5rem"
                    minW="150px"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    {[
                      { label: 'Urgent', value: 'Urgent', color: '#FF515D' },
                      {
                        label: 'Important',
                        value: 'Important',
                        color: '#F6BE38',
                      },
                      { label: 'Normal', value: 'Medium', color: '#75C5C1' },
                      { label: 'Low', value: 'Low', color: 'gray' },
                    ].map((priority) => (
                      <Menu.Item
                        key={priority.value}
                        value={priority.value}
                        onClick={() =>
                          handleInputChange(
                            'priority',
                            priority.value as Task['priority']
                          )
                        }
                        p="0.5rem"
                        borderRadius="0.25rem"
                        _hover={{ bg: 'gray.50' }}
                      >
                        <HStack gap="0.5rem">
                          <Flag
                            variant="Bold"
                            color={priority.color}
                            size={16}
                          />
                          <Text>{priority.label}</Text>
                        </HStack>
                      </Menu.Item>
                    ))}
                    <Menu.Separator />
                    <Menu.Item
                      value="clear"
                      onClick={() => handleInputChange('priority', 'Medium')}
                      p="0.5rem"
                      borderRadius="0.25rem"
                      _hover={{ bg: 'gray.50' }}
                    >
                      <HStack gap="0.5rem">
                        <Box w="16px" h="16px" />
                        <Text>Clear</Text>
                      </HStack>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            </HStack>

            <VStack align="stretch" gap="0.5rem">
              <HStack gap="0.5rem">
                <Box color="#BAC1CC">
                  <Stickynote size={20} />
                </Box>
                <Text color="icon.2" fontSize="sm">
                  Description
                </Text>
              </HStack>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                placeholder="Write something or type"
                minH="120px"
                bg="bg.1"
                border="1px solid #EEF1F9"
                borderRadius="0.5rem"
                p="1rem"
                _focus={{ boxShadow: 'none', bg: 'gray.100' }}
                color="text.1"
                fontWeight="500"
                resize="none"
              />
            </VStack>

            <Button
              bg="bg.aqua_blue"
              color="white"
              borderRadius="0.625rem"
              onClick={handleSubmit}
              _hover={{ bg: '#6AB5B1' }}
              _disabled={{
                bg: 'gray.300',
                cursor: 'not-allowed',
                _hover: { bg: 'gray.300' },
              }}
              mt="1rem"
              w="100%"
              alignSelf="flex-end"
              maxW="15.625rem"
              fontWeight={600}
              lineHeight="100%"
              letterSpacing="-0.02rem"
              disabled={isSubmitting}
              loading={isSubmitting}
              loadingText="Creating..."
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </VStack>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
