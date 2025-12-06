import { useEffect, useRef, useState, type FC } from "react";
import { formatTime } from "../../utils/util";

type Props = {
  resetTrigger: number;
  onFinished: () => void;
};

const TimeComponent: FC<Props> = ({ onFinished, resetTrigger }) => {
  const [remaining, setRemaining] = useState(60 * 1000);
  const isFirstRender = useRef(true); // cegah efek premature

  useEffect(() => {
    // cegah effect pertama memanggil onFinished()
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    setRemaining(60 * 1000);

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);

          // hanya panggil onFinished jika benar-benar habis
          onFinished();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTrigger, onFinished]);

  return <span>{formatTime(remaining)}</span>;
};

export default TimeComponent;
