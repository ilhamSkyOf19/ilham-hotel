import { useEffect, useState, type FC } from "react";
import { formatTime } from "../../utils/util";

type Props = {
  resetTrigger: number;
  onFinished: () => void;
  isDisabled?: boolean;
  time: string;
};

const TimeComponent: FC<Props> = ({ onFinished, resetTrigger, time }) => {
  const calculateRemaining = () => {
    const start = new Date(time).getTime();
    const target = start + 2 * 60 * 1000; // tambah 2 menit
    return Math.max(target - Date.now(), 0);
  };

  const [remaining, setRemaining] = useState<number>(calculateRemaining);

  useEffect(() => {
    setRemaining(calculateRemaining()); // reset saat trigger berubah

    const interval = setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTrigger, time]);

  useEffect(() => {
    if (remaining <= 0) {
      onFinished();
    }
  }, [remaining, onFinished]);

  return <p className="text-base font-bold">{formatTime(remaining)}</p>;
};

export default TimeComponent;
