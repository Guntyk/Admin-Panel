import { useRef, useState, useEffect } from 'react';
import { timeFormatter } from '../../../../helpers/timeFormatter';
import { getCurrentUser, changeUserKey } from '../../../../helpers/userHelpers';
import './Timer.css'

const rate = 0.02777;

export default function Timer({ user, setUsers }) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerIdRef = useRef(null);
  const price = Math.round(time * rate);
  useEffect(() => {
    if (!user.start) {
      return;
    }
    const pausesSum = user.pauses.reduce((total, pause) => {
      const pauseDuration = (pause.end || Date.now()) - pause.start;
      return total + pauseDuration;
    }, 0);
    if (user.end) {
      setTime((user.end - user.start - pausesSum) / 1000);
      return;
    }
    setTime((Date.now() - user.start - pausesSum) / 1000);
    const lastPause = user.pauses.at(-1);
    if (lastPause && lastPause.start && !lastPause.end) {
      setIsPaused(true);
      return;
    }
    startTimer();
  }, []);

  function start() {
    if (user.hall && user.type && user.name1) {
      setUsers((prev) => changeUserKey(prev, user.id, 'start', Date.now()));
      startTimer();
    } else {
      alert('Заповніть усі поля');
    }
  }
  function end() {
    setUsers((prev) => {
      const currentUser = getCurrentUser(prev, user.id);
      currentUser.end = Date.now();
      const lastPause = user.pauses.at(-1);
      if (lastPause && lastPause.start && !lastPause.end) {
        lastPause.end = Date.now();
      }
      return [...prev];
    });
    stopTimer();
  }
  function pause() {
    if (isPaused) {
      startTimer();
      setUsers((prev) => {
        const currentUser = getCurrentUser(prev, user.id);
        currentUser.pauses.at(-1).end = Date.now();
        return [...prev];
      });
    } else {
      stopTimer();
      setUsers((prev) => {
        const currentUser = getCurrentUser(prev, user.id);
        currentUser.pauses.push({
          start: Date.now()
        });
        return [...prev];
      });
    }
    setIsPaused((p) => !p);
  }
  function startTimer() {
    timerIdRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }
  function stopTimer() {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  }
  return (
    <>
      <div className='timer' disabled>{timeFormatter(time)}</div>
      {!user.start && (
        <button
          className={`btn userBtn ${user.end ? 'userBtnStopped' : ''}`}
          onClick={start}>
          Почати
        </button>
      )}
      {user.start && !user.end && (
        <>
          <button className="btn userBtn" onClick={pause}>
            {isPaused ? 'Продовжити' : 'Пауза'}
          </button>
          <button className="btn userBtn" onClick={end}>
            Зупинити
          </button>
        </>
      )}
      <input className="btn price" type="text" readOnly value={price + `₴`} />
    </>
  );
}
