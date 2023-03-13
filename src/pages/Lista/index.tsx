import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { v4 as uuidv4 } from 'uuid'

import illustrationImg from '../../assets/images/activitys.png';

import style from './lista.module.scss';

type TaskProps = {
  id: string;
  title: string;
  isFinished: boolean;
}

export function Lista() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [activity, setActivity] = useState('');

  useEffect(() => {
    if (localStorage.getItem('listTasks')) {
      const listTasks = JSON.parse(localStorage.getItem('listTasks') as any);
      setTasks([...listTasks])
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('listTasks', JSON.stringify(tasks));
    } else {
      return;
    }
  }, [tasks])

  function handleAddTaskToList(activity: string) {
    if (activity.trim() === '') {
      return;
    }

    setTasks([...tasks, {
      id: uuidv4(),
      title: activity,
      isFinished: false,
    }]);
    setActivity('');
  }

  function handleSetTaskFinished(taskAtual: TaskProps) {
    setTasks(tasks.map(task => (task.id === taskAtual.id ? { ...task, isFinished: !task.isFinished } : task)));
  }

  return (
    <div className={style.viewList}>
      <div className={style.viewList__top}>
        <div className={style.viewList__top__subtitle}>
          <i><FontAwesomeIcon icon={faCheck} /></i>
          <h3>TASKS</h3>
          <p>Daily</p>
        </div>
        <input
          type="text"
          placeholder='Qual atividade vamos começar?'
          onChange={(e) => setActivity(e.target.value)}
          value={activity}
        />
        <Button
          icon={<FontAwesomeIcon icon={faEdit} />}
          children=' Adicionar'
          onClick={() => { handleAddTaskToList(activity) }}
        />
      </div>
      <div className={style.viewList__bottom}>
        {tasks.length > 0 ? tasks.map(task => (
          <div key={task.id} className={style.viewList__bottom__tasks}>
            <div className={`${style.viewList__bottom__tasks__container} ${task.isFinished ? style.viewList__bottom__tasks__container_finished : ''}`}>
              <button
                onClick={() => handleSetTaskFinished(task)}
                children={task.isFinished ? <FontAwesomeIcon icon={faCheck} color="white" /> : ''}
              />
              <span>{task.title}</span>
            </div>
          </div>
        )) : (
          <div className={style.viewList__bottom__notfound}>
            <img src={illustrationImg} alt="rapaz brincando com o cachorro" />
            <p>Que tal começarmos alguma atividade agora?</p>
          </div>
        )}
      </div>
    </div>
  );
}