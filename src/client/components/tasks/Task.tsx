// import ReactTooltip from "react-tooltip";
import Link from 'next/link';
import { TaskStatus, type Task } from '@/client/gql/generated/graphql';
import { UPDATE_TASK } from '@/client/gql/queries-mutations';
import { Card } from '@/client/ui/Card';
import { formatRelativeDate } from '@/client/utils/date';
import { useMutation } from '@apollo/client';
import { CardBody } from '@nextui-org/card';
import { format } from 'date-fns';

interface Props {
  task: Task;
}

// NOTE: ReactTooltip doesn't seem to be SSR friendly.  Doing some state shenagains
// https://stackoverflow.com/questions/64079321/react-tooltip-and-next-js-ssr-issue
// https://haodong.io/render-client-side-only-component-in-next-js
const Task = (props: Props) => {
  const { id, title, description, dueDate, status } = props.task;

  const [updateTask, { error: updateTaskError }] = useMutation(UPDATE_TASK);

  const handleUpdateTask = async (e: React.MouseEvent<HTMLInputElement>) => {
    const input = {
      id: id,
      title: title,
      description: description,
      dueDate: dueDate ? dueDate : undefined,
      status: status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active,
    };

    try {
      e.stopPropagation();
      // use void to skip await in a void callback
      // https://github.com/typescript-eslint/typescript-eslint/issues/4619#issuecomment-1055614155
      await updateTask({ variables: { input } });
      if (updateTaskError) {
        console.error('Oh no!', updateTaskError.message);
      }
    } catch (error) {
      //
    }
  };

  return (
    <Link href={`/app/task/${id}`}>
      <Card isPressable>
        <CardBody>
          <div className="flex">
            <div className="flex w-full items-start">
              <div>
                <label className="inline-flex">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 cursor-pointer text-purple-600 dark:text-white"
                    defaultChecked={status === TaskStatus.Completed}
                    onClick={(e) => void handleUpdateTask(e)}
                  />
                </label>
              </div>
              <div className="ml-5 w-full">
                <div className="flex items-center justify-between">
                  <h2 className="-mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  {dueDate && (
                    <>
                      {dueDate}
                      <small
                        data-tip={format(new Date(dueDate), 'MM/dd/yyyy')}
                        className="text-right text-sm text-gray-700 dark:text-white"
                      >
                        {formatRelativeDate(new Date(dueDate))}
                      </small>
                    </>
                  )}
                </div>

                {/* {clientSide && <ReactTooltip effect="solid" />} */}

                <p className="mt-3 text-sm text-gray-700 dark:text-white">{description}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default Task;
