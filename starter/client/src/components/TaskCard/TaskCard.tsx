import React, { useState } from "react";
import CheckListIcon from "assets/svg/checklist";
import TrashIcon from "assets/svg/trash";
import EditIcon from "assets/svg/edit";
import DeleteModal from "components/DeleteModal/DeleteModal";
import { useMutation, useQueryCache } from "react-query";
import classnames from "classnames";
import { updateTodo } from "api/updateTodo";
import ClockIcon from "assets/svg/clock";
import { deleteTodo } from "api/deleteTodo";
import Form from "components/Form/form";

type Props = {
  title: string;
  taskId: string;
  status: "completed" | "uncompleted";
};

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {
  const cache = useQueryCache();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const [checkTodo, { isLoading }] = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries("todos");
    },
  });

  const handleEditTodo = (type: "edits") => {
    if (type === "edits") {
      setEdit(false);
    }
  };

  const [removeTodo] = useMutation(deleteTodo, {
    onSuccess: () => {
      cache.invalidateQueries("todos");
    },
  });

  const handleRemoveTodo = (type: "delete" | "cancel") => {
    if (type === "delete") {
      removeTodo(taskId);
      setShowDeleteModal(false);
    }
    if (type === "cancel") {
      setShowDeleteModal(false);
    }
  };

  const containerClass = classnames(
    "flex justify-center items-center relative rounded shadow-lg p-4 mb-2",
    {
      "bg-white text-darkPurple": status === "uncompleted",
      "bg-gray-300 bg-opacity-50": status === "completed",
    }
  );

  const titleClass = classnames(
    "flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate",
    {
      "line-through": status === "completed",
    }
  );

  const checkListClass = classnames("w-5 h-5 ml-4", {
    "text-green-400": status === "completed",
    "text-green-600": status === "uncompleted",
  });

  return (
    <React.Fragment>
      <div className={containerClass}>
        <p className={titleClass}>{title}</p>
        <div className="flex text-darkPurple">
          <span>
            {isLoading ? (
              <ClockIcon />
            ) : (
              <CheckListIcon
                className={checkListClass}
                onClick={() => checkTodo(taskId)}
              />
            )}
          </span>
          <span className="w-5 h-5 ml-4 text-red-600">
            <TrashIcon onClick={() => setShowDeleteModal(true)} />
          </span>
          <span>
            <EditIcon onClick={() => handleEditTodo} />
            {!edit ? (
              <>
                <form>
                  <input type="checkbox" />
                </form>
              </>
            ) : (
              <input type="text" />
            )}
          </span>
        </div>
        <DeleteModal
          inProp={showDeleteModal}
          taskStatus={status}
          onDelete={() => handleRemoveTodo("delete")}
          onCancel={() => handleRemoveTodo("cancel")}
        />
      </div>
    </React.Fragment>
  );
};

export default TaskCard;
