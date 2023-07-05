import { useEffect, useState } from "react";
// import ReactTooltip from "react-tooltip";
import { TaskStatus, type Task, type TaskInput } from "@/client/gql/graphql";
import { UPSERT_TASK } from "@/client/queries-mutations";
import { formatRelativeDate } from "@/client/utils/date";
import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { Text, Paper } from '@mantine/core';
import { Checkbox, Container } from '@mantine/core';

interface Props {
  task: Task;
}

// NOTE: ReactTooltip doesn't seem to be SSR friendly.  Doing some state shenagains
// https://stackoverflow.com/questions/64079321/react-tooltip-and-next-js-ssr-issue
// https://haodong.io/render-client-side-only-component-in-next-js
const Task = (props: Props) => {
  const { id, title, description, dueDate, status } = props.task;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientSide, setClientSide] = useState(false);

  const [upsertTask] = useMutation(UPSERT_TASK);

  useEffect(() => {
    // update some client side state to say it is now safe to render the client-side only component
    setClientSide(true);
  }, []);

  return (
      <>
      <Container size="sm" className={"mb-3"}>

        <Paper shadow="xs" p="xl">

          <Checkbox
              label={title}
              size="lg"
              defaultChecked={status === "COMPLETED"}
              onClick={event => event.stopPropagation()}
              onChange={(e) => {
                const input: TaskInput = {
                  id: id,
                  title: title,
                  description: description,
                  dueDate: dueDate ? dueDate : undefined,
                  status: status === "ACTIVE" ? TaskStatus.Completed : TaskStatus.Active,
                };

                try {
                  // use void to skip await in a void callback
                  // https://github.com/typescript-eslint/typescript-eslint/issues/4619#issuecomment-1055614155
                  void upsertTask({ variables: { input } });
                } catch (e) {
                  //
                }
              }}
          />

        </Paper>
      </Container>
    <div className="mb-3 flex max-w-md rounded-lg bg-white shadow-lg md:mx-auto md:max-w-2xl ">
      <div className="flex w-full items-start px-4 py-6">
        <div>
          <label className="inline-flex">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 cursor-pointer text-purple-600"
              defaultChecked={status === "COMPLETED"}
              onClick={(e) => {
                const input: TaskInput = {
                  id: id,
                  title: title,
                  description: description,
                  dueDate: dueDate ? dueDate : undefined,
                  status: status === "ACTIVE" ? TaskStatus.Completed : TaskStatus.Active,
                };

                try {
                  e.stopPropagation();
                  // use void to skip await in a void callback
                  // https://github.com/typescript-eslint/typescript-eslint/issues/4619#issuecomment-1055614155
                  void upsertTask({ variables: { input } });
                } catch (e) {
                  //
                }
              }}
            />
          </label>
        </div>
        <div className="ml-5 w-full">
          <div className="flex items-center justify-between">
            <h2 className="-mt-1 text-lg font-semibold text-gray-900">{title}</h2>
            {dueDate && (
              <>
                {dueDate}
                <small
                  data-tip={format(new Date(dueDate), "MM/dd/yyyy")}
                  className="text-right text-sm text-gray-700"
                >
                  {formatRelativeDate(new Date(dueDate))}
                </small>
              </>
            )}
          </div>

          {/* {clientSide && <ReactTooltip effect="solid" />} */}

          <p className="mt-3 text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
        </>
  );
};

export default Task;
