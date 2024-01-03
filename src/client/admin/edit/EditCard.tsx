import { type ReactNode } from 'react';
import FormError from '@/client/admin/edit/FormError';
import CancelButton from '@/client/components/admin/buttons/CancelButton';
import DeleteButton from '@/client/components/admin/buttons/DeleteButton';
import { extractErrorMessages } from '@/client/gql/errorHandling';
import { Button, Card, CardBody } from '@/client/ui';
import { type FieldValues, type UseFormHandleSubmit } from 'react-hook-form';

interface EditCardProps<T extends FieldValues> {
  save: boolean;
  errors: unknown[];
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (formData: T) => Promise<void>;
  children: ReactNode;
  isSubmitting: boolean;
  handleDelete: () => Promise<void>;
  deleteFetching?: boolean;
  enableDelete?: boolean;
  reUrl: string;
}

const EditCard = <T extends FieldValues>(props: EditCardProps<T>) => {
  const {
    save,
    errors,
    handleSubmit,
    onSubmit,
    children,
    isSubmitting,
    handleDelete,
    deleteFetching,
    enableDelete = true,
    reUrl,
  } = props;

  return (
    <Card radius="sm" shadow="sm" className="max-w-sm sm:max-w-md md:max-w-lg">
      <CardBody>
        <div>
          <FormError errors={extractErrorMessages(errors)} />

          <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
            {children}

            <div className={'mt-10 flex justify-between'}>
              <div className={'flex justify-center'}>
                <Button color={'primary'} type="submit" isLoading={isSubmitting} className={'mr-5'}>
                  {save ? 'Save' : 'Create'}
                </Button>

                <CancelButton href={reUrl} isDisabled={isSubmitting} />
              </div>

              {enableDelete && save && (
                <DeleteButton onPress={() => void handleDelete()} isLoading={deleteFetching} />
              )}
            </div>
          </form>
        </div>
      </CardBody>
    </Card>
  );
};

export default EditCard;
