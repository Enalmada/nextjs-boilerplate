// import ReactTooltip from "react-tooltip";
import React from 'react';
import Link from 'next/link';
import { TaskStatus, type Task } from '@/client/gql/generated/graphql';
import { UPDATE_TASK } from '@/client/gql/queries-mutations';
import { Card, Skeleton } from '@/client/ui';
import { useMutation } from '@apollo/client';
import { CardBody, Checkbox } from '@nextui-org/react';
import { format } from 'date-fns';

interface TaskBodyProps {
  task?: Task;
  handleUpdateTask?: React.MouseEventHandler<HTMLInputElement>; // updated this line
}

export const TaskBody = (props: TaskBodyProps) => {
  const { title, description, dueDate, status } = props.task || {};

  const isLoaded = props.task !== undefined;

  return (
    <Card>
      <CardBody>
        <div className="flex">
          <div className="flex w-full items-start">
            <div>
              <Skeleton isLoaded={isLoaded}>
                <Checkbox
                  size="lg"
                  radius="none"
                  defaultSelected={status === TaskStatus.Completed}
                  onClick={props.handleUpdateTask}
                />
              </Skeleton>
            </div>

            <div className="ml-5 w-full">
              <Skeleton isLoaded={isLoaded}>
                <div className="flex items-center justify-between">
                  <h2 className="-mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                  {dueDate && (
                    <>
                      Due:&nbsp;
                      {format(new Date(dueDate), 'PP')}
                    </>
                  )}
                </div>

                {/* {clientSide && <ReactTooltip effect="solid" />} */}

                <p className="mt-3 text-sm text-gray-700 dark:text-white">{description}</p>
              </Skeleton>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface Props {
  task: Task;
}

// NOTE: ReactTooltip doesn't seem to be SSR friendly.  Doing some state shenagains
// https://stackoverflow.com/questions/64079321/react-tooltip-and-next-js-ssr-issue
// https://haodong.io/render-client-side-only-component-in-next-js
export default function Task(props: Props) {
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
      <TaskBody task={props.task} handleUpdateTask={(e) => void handleUpdateTask(e)} />
    </Link>
  );
}
