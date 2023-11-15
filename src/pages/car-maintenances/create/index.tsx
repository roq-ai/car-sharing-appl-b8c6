import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { carMaintenanceValidationSchema } from 'validationSchema/car-maintenances';
import { CarInterface } from 'interfaces/car';
import { CarMaintenanceInterface } from 'interfaces/car-maintenance';

function CarMaintenanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: CarMaintenanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.car_maintenance.create({ data: values as RoqTypes.car_maintenance });
      resetForm();
      router.push('/car-maintenances');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CarMaintenanceInterface>({
    initialValues: {
      maintenance_date: new Date(new Date().toDateString()),
      maintenance_details: '',
      service_center: '',
      service_cost: 0,
      car_id: (router.query.car_id as string) ?? null,
    },
    validationSchema: carMaintenanceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Car Maintenances',
              link: '/car-maintenances',
            },
            {
              label: 'Create Car Maintenance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Car Maintenance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="maintenance_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Maintenance Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.maintenance_date ? new Date(formik.values?.maintenance_date) : null}
              onChange={(value: Date) => formik.setFieldValue('maintenance_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.maintenance_details}
            label={'Maintenance Details'}
            props={{
              name: 'maintenance_details',
              placeholder: 'Maintenance Details',
              value: formik.values?.maintenance_details,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.service_center}
            label={'Service Center'}
            props={{
              name: 'service_center',
              placeholder: 'Service Center',
              value: formik.values?.service_center,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Service Cost"
            formControlProps={{
              id: 'service_cost',
              isInvalid: !!formik.errors?.service_cost,
            }}
            name="service_cost"
            error={formik.errors?.service_cost}
            value={formik.values?.service_cost}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('service_cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<CarInterface>
            formik={formik}
            name={'car_id'}
            label={'Select Car'}
            placeholder={'Select Car'}
            fetcher={() => roqClient.car.findManyWithCount({})}
            labelField={'make'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/car-maintenances')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'car_maintenance',
    operation: AccessOperationEnum.CREATE,
  }),
)(CarMaintenanceCreatePage);
