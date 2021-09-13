import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_TASK_DETAIL_SAGA, SET_DELETE_BUTTON } from '../../../redux/constants/Jira/Jira';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DELETE_TASK_SAGA } from './../../../redux/constants/Jira/Jira';

export default function ContentMain(props) {
  const { projectDetail } = props;

  const dispatch = useDispatch();
  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
        <div key={index} className="card " style={{ width: '17rem', height: 'auto' }}>
          <div className="card-header">{taskListDetail.statusName}</div>

          <ul className="list-group list-group-flush">
            {taskListDetail.lstTaskDeTail.map((task, index) => {
              return (
                <div style={{ position: 'relative' }}>
                  <li
                    onClick={() => {
                      dispatch({
                        type: GET_TASK_DETAIL_SAGA,
                        taskId: task.taskId,
                      });
                    }}
                    key={index}
                    className="list-group-item m-2"
                    data-toggle="modal"
                    data-target="#infoModal"
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{task.taskName}</p>
                    </div>

                    <div className="block" style={{ display: 'flex' }}>
                      <div className="block-left">
                        <p className="text-danger">{task.priorityTask.priority}</p>
                      </div>
                      <div className="block-right">
                        <div className="avatar-group" style={{ display: 'flex' }}>
                          {task.assigness.map((mem, index) => {
                            return (
                              <div className="avatar" key={index}>
                                <img src={mem.avatar} alt={mem.avatar} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="deleteIcon" style={{ position: 'absolute', zIndex: 999, top: '6%', right: '5%' }}>
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={() => {
                        dispatch({
                          type: DELETE_TASK_SAGA,
                          taskId: task.taskId,
                          projectId: task.projectId,
                        });
                      }}
                      placement="bottom"
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined className="mt-1" />
                    </Popconfirm>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: 'flex' }}>
      {renderCardTaskList()}
    </div>
  );
}
